# CTR Infrastructure Website

A stunning architecture portfolio website for [CTR Infrastructure](https://ctrinfrastructure.com), inspired by the elegant design of [monuma.ca](https://monuma.ca/). Built with Next.js SSG and featuring integrated Cloudflare DNS management and AWS EC2 deployment.

## Features

- 🏛️ **Architecture Portfolio** - Elegant showcase of projects with dramatic visuals
- 🚀 **Next.js SSG** - Static Site Generation for blazing-fast performance
- 🌐 **Cloudflare Integration** - Automated DNS management and CDN configuration
- ☁️ **AWS EC2 Deployment** - Production-ready deployment pipeline
- 🔄 **CI/CD Ready** - GitHub Actions workflow included
- 🎨 **Premium Design** - Dark theme with gold accents, serif typography

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd static-website-builder
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Develop Locally

```bash
npm run dev
# Open http://localhost:3000
```

### 4. Build and Deploy

```bash
npm run build          # Build static site
npm run deploy:production  # Deploy to EC2
```

## Infrastructure Architecture

This project uses the same infrastructure patterns as the main storezy platform:

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cloudflare                                │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   DNS Zone  │───▶│     CDN     │───▶│   Firewall  │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AWS EC2 Instance                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │    Nginx    │───▶│    PM2      │───▶│   Static    │         │
│  │  (Reverse   │    │  (Process   │    │   Files     │         │
│  │   Proxy)    │    │   Manager)  │    │   (serve)   │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
static-website-builder/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   └── styles/           # Global styles
├── lib/
│   ├── cloudflare/       # Cloudflare API client
│   ├── aws/              # EC2 deployment service
│   ├── config.ts         # Central configuration
│   └── index.ts          # Library exports
├── scripts/
│   ├── cloudflare-dns.js      # DNS management CLI
│   ├── deploy-production.js   # Production deployment
│   ├── deploy-preview.js      # Preview deployment
│   └── test-infrastructure.js # Infrastructure tests
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow
├── .env.example          # Environment template
└── package.json
```

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLOUDFLARE_API_TOKEN` | Yes* | Cloudflare API token with DNS edit permissions |
| `CLOUDFLARE_ZONE_ID` | Yes* | Cloudflare zone ID for your domain |
| `EC2_HOST` | Yes | EC2 instance public IP or hostname |
| `EC2_USERNAME` | Yes | SSH username (default: ubuntu) |
| `EC2_KEY_PATH` | Yes** | Path to SSH private key file |
| `EC2_DEPLOY_DIR` | Yes | Deployment directory on EC2 |
| `SERVICE_NAME` | No | PM2 service name (default: static-site-builder) |
| `SERVICE_PORT` | No | Service port (default: 9500) |
| `SITE_URL` | No | Production site URL |

\* Required for DNS management
\** Or use `EC2_KEY` with key content for CI/CD

### GitHub Secrets

For GitHub Actions deployment, configure these secrets:

```
EC2_HOST         - EC2 public IP
EC2_USERNAME     - SSH username
EC2_KEY          - SSH private key (content, not path)
EC2_DEPLOY_DIR   - Deployment directory

CLOUDFLARE_API_TOKEN  - (optional) For DNS management
CLOUDFLARE_ZONE_ID    - (optional) For DNS management
```

## CLI Commands

### Development

```bash
npm run dev         # Start development server
npm run build       # Build static site
npm run start       # Serve built site locally
npm run lint        # Run linter
```

### Deployment

```bash
npm run deploy:production  # Deploy to production EC2
npm run deploy:preview     # Deploy to preview environment
npm run test:infra         # Test infrastructure configuration
```

### DNS Management

```bash
npm run dns:list    # List all DNS records
npm run dns:create  # Create DNS record
npm run dns:delete  # Delete DNS record
```

## Deployment Workflow

### Automatic (CI/CD)

Push to `main` branch triggers automatic deployment:

1. **Build** - Next.js builds static site
2. **Upload** - Files transferred to EC2 via SCP
3. **Deploy** - PM2 restarts service with new files
4. **Verify** - Health check confirms deployment
5. **Cache** - Cloudflare CDN cache is purged

### Manual

```bash
# Build locally
npm run build

# Deploy to production
npm run deploy:production

# Or create a preview
npm run deploy:preview
```

## EC2 Server Setup

### Prerequisites

On your EC2 instance:

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 and serve
sudo npm install -g pm2 serve

# Create deployment directory
sudo mkdir -p /var/www/static-site
sudo chown -R ubuntu:ubuntu /var/www/static-site
```

### Nginx Configuration (Optional)

If using Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:9500;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Cloudflare Setup

### Creating API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click your profile → API Tokens
3. Create Token → Custom Token
4. Permissions: Zone → DNS → Edit
5. Zone Resources: Include → Specific zone → your-zone

### DNS Best Practices

- Use proxied records (orange cloud) for CDN benefits
- Create A records for subdomains pointing to EC2
- Use TTL "Auto" for proxied records

## Troubleshooting

### Deployment Fails

```bash
# Test infrastructure configuration
npm run test:infra

# Check PM2 status on EC2
ssh -i your-key.pem ubuntu@ec2-host "pm2 list"

# View logs
ssh -i your-key.pem ubuntu@ec2-host "pm2 logs static-site-builder"
```

### DNS Not Resolving

```bash
# List current records
npm run dns:list

# Verify zone access
node scripts/cloudflare-dns.js verify
```

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next out

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

## Relationship to Main Platform

This project is designed to work alongside the `storezy-ui-monorepo-main`:

- **Same Cloudflare Zone** - Shares DNS management without conflicts
- **Same EC2 Infrastructure** - Deploys to the same server (different ports)
- **Consistent Patterns** - Uses identical deployment workflow
- **Shared Conventions** - Same PM2 management, nginx routing

### Port Allocation

| Service | Port |
|---------|------|
| Static Site (main) | 9292 |
| Admin App | 9090 |
| Customer Engagement | 9191 |
| Customer SSR | 9393 |
| **Static Website Builder** | **9500** |

## License

Private - All rights reserved


