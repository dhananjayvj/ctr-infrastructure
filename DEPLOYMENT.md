# Deployment Guide

This guide covers deploying the Static Website Builder to AWS EC2, mirroring the patterns from the `storezy-ui-monorepo-main`.

## Prerequisites

### EC2 Instance Setup

1. **Create EC2 Instance** (if not using existing infrastructure)
   - Ubuntu 22.04 LTS recommended
   - t2.micro or larger
   - Security group allowing ports 22 (SSH), 80 (HTTP), 443 (HTTPS), and your service port (default: 9500)

2. **Install Dependencies on EC2**

```bash
# Connect to EC2
ssh -i your-key.pem ubuntu@your-ec2-host

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 and serve globally
sudo npm install -g pm2 serve

# Create deployment directory
sudo mkdir -p /var/www/static-site
sudo chown -R ubuntu:ubuntu /var/www/static-site

# Setup PM2 to start on boot
pm2 startup
# Run the command it outputs
```

### GitHub Repository Setup

1. **Add Repository Secrets**

   Go to: Repository → Settings → Secrets and Variables → Actions

   | Secret | Value | Required |
   |--------|-------|----------|
   | `EC2_HOST` | EC2 public IP or hostname | ✅ |
   | `EC2_USERNAME` | `ubuntu` | ✅ |
   | `EC2_KEY` | Contents of your .pem file | ✅ |
   | `EC2_DEPLOY_DIR` | `/var/www/static-site` | ✅ |
   | `CLOUDFLARE_API_TOKEN` | Cloudflare API token | Optional |
   | `CLOUDFLARE_ZONE_ID` | Cloudflare zone ID | Optional |
   | `SITE_URL` | Your production URL | Optional |

2. **Copy SSH Key Content**

```bash
# Display key content (copy everything including BEGIN/END lines)
cat ~/.ssh/your-key.pem
```

## Deployment Methods

### 1. Automatic Deployment (CI/CD)

Push to `main` branch triggers automatic deployment:

```bash
git add .
git commit -m "Update site content"
git push origin main
```

The workflow will:
1. Build the static site
2. Transfer files to EC2
3. Restart the PM2 service
4. Verify deployment with health check
5. Purge Cloudflare cache (if configured)

### 2. Manual Deployment

From your local machine:

```bash
# Build the site
npm run build

# Deploy to production
npm run deploy:production
```

### 3. Preview Deployment

Create a preview with unique subdomain:

```bash
npm run build
npm run deploy:preview
```

This creates a preview accessible at `preview-xxxxx.your-domain.com`

## Cloudflare DNS Configuration

### Creating Subdomain Records

Using the CLI:

```bash
# List existing records
npm run dns:list

# Create a new subdomain pointing to EC2
node scripts/cloudflare-dns.js create --subdomain mysite --ip YOUR_EC2_IP

# Delete a record
node scripts/cloudflare-dns.js delete --name mysite.your-domain.com
```

### Manual Cloudflare Setup

1. Log into Cloudflare Dashboard
2. Select your domain
3. Go to DNS → Records
4. Add A record:
   - Type: A
   - Name: your-subdomain
   - IPv4 address: Your EC2 IP
   - Proxy status: Proxied (orange cloud)
   - TTL: Auto

## Nginx Configuration (Optional)

If running multiple services on the same EC2:

```nginx
# /etc/nginx/sites-available/static-site
server {
    listen 80;
    server_name your-subdomain.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-subdomain.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:9500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/static-site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Troubleshooting

### Deployment Fails in GitHub Actions

1. Check the workflow logs in Actions tab
2. Verify all secrets are set correctly
3. Test SSH connection locally:

```bash
ssh -i your-key.pem ubuntu@your-ec2-host "echo 'Connection works'"
```

### Service Not Starting

```bash
# SSH to EC2
ssh -i your-key.pem ubuntu@your-ec2-host

# Check PM2 status
pm2 list

# View logs
pm2 logs static-site-builder --lines 100

# Restart service
pm2 restart static-site-builder

# Check what's on the port
sudo lsof -i :9500
```

### DNS Not Working

1. Wait 5-10 minutes for propagation
2. Check Cloudflare proxy status (should be orange cloud)
3. Verify A record points to correct IP
4. Test with:

```bash
dig your-subdomain.your-domain.com
curl -v https://your-subdomain.your-domain.com
```

### Health Check Fails

The deployment verifies with `curl http://localhost:9500`. If this fails:

```bash
# Check if service is running
pm2 list

# Check if port is listening
netstat -tlnp | grep 9500

# Test locally on EC2
curl http://localhost:9500
```

## Port Conflicts

This project uses port **9500** by default. If you need a different port:

1. Update `SERVICE_PORT` in your `.env`
2. Update the GitHub secret `SERVICE_PORT`
3. Update Nginx configuration if applicable

### Port Reference (Main Platform)

| Service | Port |
|---------|------|
| Static Site (storezy.tech) | 9292 |
| Admin App | 9090 |
| Customer Engagement | 9191 |
| Customer SSR | 9393 |
| **Static Website Builder** | **9500** |

## Rollback

To rollback to a previous deployment:

1. Find the previous commit in GitHub
2. Click "Browse files" at that commit
3. Download `out/` directory from artifacts (if saved)
4. Or re-run the workflow from that commit

For immediate rollback on EC2:

```bash
# If you have a backup
ssh -i your-key.pem ubuntu@your-ec2-host << 'EOF'
cd /var/www/static-site
# Assuming you have a backup directory
rm -rf current/*
cp -r backup/* current/
pm2 restart static-site-builder
EOF
```


