# Infrastructure Documentation

This document explains how the Static Website Builder infrastructure mirrors the patterns from `storezy-ui-monorepo-main`.

## Architecture Overview

```
                                 Internet
                                     │
                    ┌────────────────┴────────────────┐
                    │           Cloudflare            │
                    │   ┌─────────────────────────┐   │
                    │   │       DNS Zone          │   │
                    │   │   (storezy.tech zone)   │   │
                    │   │                         │   │
                    │   │  A  storezy.tech → EC2  │   │
                    │   │  A  *.storezy.tech → EC2│   │
                    │   │  A  newsite.* → EC2     │   │
                    │   └─────────────────────────┘   │
                    │                                 │
                    │   ┌─────────────────────────┐   │
                    │   │          CDN            │   │
                    │   │   - SSL termination     │   │
                    │   │   - DDoS protection     │   │
                    │   │   - Caching             │   │
                    │   └─────────────────────────┘   │
                    └────────────────┬────────────────┘
                                     │
                                     ▼
                    ┌────────────────────────────────┐
                    │         AWS EC2 Instance       │
                    │                                │
                    │   ┌────────────────────────┐   │
                    │   │         Nginx          │   │
                    │   │    (Reverse Proxy)     │   │
                    │   │                        │   │
                    │   │  / → :9292 (static)    │   │
                    │   │  /login → :9090 (admin)│   │
                    │   │  /store → :9393 (cust) │   │
                    │   │  /newsite → :9500 (new)│   │
                    │   └────────────────────────┘   │
                    │              │                 │
                    │   ┌──────────┼──────────┐      │
                    │   │          │          │      │
                    │   ▼          ▼          ▼      │
                    │ :9090     :9292      :9393     │
                    │ Admin   Static-site  Customer  │
                    │   │          │          │      │
                    │   └──────────┴──────────┘      │
                    │              │                 │
                    │              ▼                 │
                    │   ┌────────────────────────┐   │
                    │   │         PM2            │   │
                    │   │   (Process Manager)    │   │
                    │   │                        │   │
                    │   │  - Auto restart        │   │
                    │   │  - Load balancing      │   │
                    │   │  - Log management      │   │
                    │   └────────────────────────┘   │
                    └────────────────────────────────┘
```

## Cloudflare Integration

### Zone Sharing Strategy

Both the main storezy platform and this Static Website Builder share the same Cloudflare zone. This is achieved by:

1. **Non-conflicting Subdomains**: Each deployment gets a unique subdomain
2. **Same API Credentials**: Uses the same `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ZONE_ID`
3. **Programmatic DNS**: Creates records via API, not manual configuration

### DNS Record Management

```typescript
// From lib/cloudflare/client.ts
const cloudflare = new CloudflareClient();

// Create subdomain for new site
await cloudflare.upsertSubdomain('mysite', EC2_IP, {
  proxied: true,  // Use Cloudflare CDN
  comment: 'Created by Static Website Builder'
});

// This creates: mysite.storezy.tech → EC2_IP
```

### Preventing Conflicts

The library includes safeguards:

```typescript
// Check if subdomain already exists before creating
const existing = await cloudflare.findDNSRecordByName('mysite');
if (existing) {
  // Update existing record instead of creating duplicate
  await cloudflare.updateDNSRecord(existing.id, { content: newIP });
}
```

## EC2 Deployment Pattern

### Main Platform Pattern

From `.github/workflows/deploy.yml` in storezy-ui-monorepo:

```yaml
# 1. Build locally
npm run build

# 2. Prepare SSH
echo "${{ secrets.EC2_KEY }}" > ec2_key.pem
chmod 600 ec2_key.pem

# 3. Transfer files
scp -i ec2_key.pem -r build/* user@host:/deploy/dir/

# 4. Start with PM2
ssh -i ec2_key.pem user@host << 'EOF'
  pm2 delete service-name || true
  pm2 start serve --name service-name -- -s . -l PORT
EOF
```

### This Project's Implementation

Mirrors the exact same pattern:

```javascript
// From lib/aws/ec2-deployer.ts

async deploy(buildDir) {
  // 1. Connect via SSH
  await this.connect();
  
  // 2. Prepare directory
  await this.executeCommand(`mkdir -p ${deployDir}`);
  await this.executeCommand(`rm -rf ${deployDir}/*`);
  
  // 3. Upload files via SFTP
  await this.uploadDirectory(buildDir, deployDir);
  
  // 4. Start with PM2
  await this.executeCommand(`
    pm2 delete ${serviceName} || true
    pm2 start serve --name ${serviceName} -- -s . -l ${port}
  `);
}
```

## GitHub Actions Workflow

### Comparison with Main Platform

**storezy-ui-monorepo workflow:**
```yaml
jobs:
  deploy-admin:
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install && npm run build
      - run: scp -i $KEY build/* $HOST:$DIR
      - run: ssh $HOST "pm2 restart admin"
```

**This project's workflow:**
```yaml
jobs:
  build:
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
  
  deploy:
    needs: build
    steps:
      - uses: actions/download-artifact@v4
      - run: tar -czf deploy.tar.gz out/
      - run: scp deploy.tar.gz $HOST:/tmp/
      - run: ssh $HOST "tar -xzf /tmp/deploy.tar.gz && pm2 restart"
```

**Improvements made:**
- Uses artifact passing between jobs for cleaner separation
- Tar archive for faster transfer
- Explicit health checks
- Cache purging step

## Configuration Mapping

| Main Platform | This Project | Purpose |
|--------------|--------------|---------|
| `EC2_HOST` | `EC2_HOST` | Same EC2 instance |
| `EC2_USERNAME` | `EC2_USERNAME` | SSH user |
| `EC2_KEY` | `EC2_KEY` | SSH private key |
| `EC2_ADMIN_DIR` | `EC2_DEPLOY_DIR` | Different directory |
| - | `SERVICE_PORT` | Different port (9500 vs 9090) |
| - | `SERVICE_NAME` | Different PM2 process |

## Environment Variable Comparison

### Main Platform (.github/workflows/deploy.yml)
```yaml
env:
  REACT_APP_API_URL: https://app.storezy.tech/dev
  NEXT_PUBLIC_POSTHOG_KEY: ${{ secrets.POSTHOG_KEY }}
```

### This Project (.env.example)
```bash
CLOUDFLARE_API_TOKEN=xxx   # Shared with main platform
CLOUDFLARE_ZONE_ID=xxx     # Shared with main platform
EC2_HOST=xxx               # Same EC2 instance
SITE_URL=xxx               # Unique to this project
SERVICE_PORT=9500          # Unique port
```

## Library Structure

### Cloudflare Client (`lib/cloudflare/client.ts`)

```typescript
class CloudflareClient {
  // DNS Management
  listDNSRecords()      // List all records in zone
  createDNSRecord()     // Create new record
  updateDNSRecord()     // Update existing record
  deleteDNSRecord()     // Remove record
  
  // Convenience Methods
  upsertSubdomain()     // Create or update subdomain
  findDNSRecordByName() // Find record by name
  
  // CDN
  purgeCache()          // Clear CDN cache
  
  // Utilities
  verifyAccess()        // Test API credentials
}
```

### EC2 Deployer (`lib/aws/ec2-deployer.ts`)

```typescript
class EC2Deployer {
  // Core Operations
  connect()             // Establish SSH connection
  executeCommand()      // Run shell command
  uploadFiles()         // Upload via SFTP
  uploadDirectory()     // Recursive upload
  
  // Deployment
  deploy()              // Full deployment workflow
  
  // Service Management
  getServiceStatus()    // Check PM2 status
  stopService()         // Stop PM2 process
  restartService()      // Restart PM2 process
  getLogs()             // Fetch PM2 logs
}
```

## Best Practices Inherited

### From Main Platform

1. **Zero-downtime Deploys**: PM2 handles graceful restarts
2. **SSH Key Security**: Keys stored as GitHub secrets, never committed
3. **Health Checks**: Verify deployment success with HTTP check
4. **Nginx Routing**: Multiple services on single instance via ports
5. **Cloudflare Proxy**: All traffic through CDN for security

### Added Improvements

1. **Artifact Passing**: Build once, deploy anywhere
2. **Preview Deployments**: Test before production
3. **CLI Tools**: Local DNS and deployment management
4. **Infrastructure Tests**: Validate config before deploy
5. **Comprehensive Docs**: This documentation!

## Scaling Considerations

### Current Architecture (Single EC2)

- ✅ Simple to manage
- ✅ Cost effective
- ✅ Works for moderate traffic
- ⚠️ Single point of failure
- ⚠️ Limited horizontal scaling

### Future Options (If Needed)

1. **Multiple EC2 Instances**
   - Add load balancer
   - Update DNS to point to LB
   - Modify deploy script for multi-instance

2. **Cloudflare Workers**
   - Static assets via Workers
   - Edge caching
   - No EC2 needed

3. **S3 + CloudFront**
   - Pure static hosting
   - Infinite scaling
   - Lower cost at scale


