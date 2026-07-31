#!/usr/bin/env node
/**
 * Preview Deployment Script
 * 
 * Deploys the built static site to a preview environment
 * with a unique subdomain. Useful for testing before production.
 * 
 * Usage:
 *   npm run build && npm run deploy:preview
 */

require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const BUILD_DIR = path.join(__dirname, '..', 'out');
const ARCHIVE_NAME = 'deploy-preview.tar.gz';

// Generate unique preview ID
const previewId = `preview-${crypto.randomBytes(4).toString('hex')}`;

// Configuration from environment
const config = {
  host: process.env.EC2_HOST,
  username: process.env.EC2_USERNAME || 'ubuntu',
  keyPath: process.env.EC2_KEY_PATH || path.join(process.env.HOME, '.ssh', 'ec2_key.pem'),
  baseDeployDir: process.env.EC2_PREVIEW_DIR || '/var/www/previews',
  deployDir: '',
  serviceName: previewId,
  servicePort: Math.floor(Math.random() * (9999 - 9600) + 9600).toString(),
  cloudflareToken: process.env.CLOUDFLARE_API_TOKEN,
  cloudflareZoneId: process.env.CLOUDFLARE_ZONE_ID,
  baseDomain: process.env.BASE_DOMAIN || 'example.com',
};

config.deployDir = `${config.baseDeployDir}/${previewId}`;

function validateConfig() {
  const errors = [];
  
  if (!config.host) errors.push('EC2_HOST is required');
  if (!fs.existsSync(config.keyPath)) {
    errors.push(`SSH key not found: ${config.keyPath}`);
  }
  if (!fs.existsSync(BUILD_DIR)) {
    errors.push(`Build directory not found: ${BUILD_DIR}. Run 'npm run build' first.`);
  }
  
  if (errors.length > 0) {
    console.error('Configuration errors:');
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
}

function exec(command, options = {}) {
  console.log(`\n> ${command}\n`);
  try {
    return execSync(command, { stdio: 'pipe', ...options }).toString().trim();
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

function ssh(command) {
  const sshCommand = `ssh -o StrictHostKeyChecking=no -i "${config.keyPath}" ${config.username}@${config.host}`;
  return exec(`${sshCommand} '${command}'`);
}

async function createDNSRecord() {
  if (!config.cloudflareToken || !config.cloudflareZoneId) {
    console.log('  Skipping DNS (CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_ID not set)');
    return null;
  }
  
  const subdomain = previewId;
  
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${config.cloudflareZoneId}/dns_records`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.cloudflareToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'A',
        name: subdomain,
        content: config.host,
        proxied: true,
        ttl: 1,
        comment: `Preview deployment: ${new Date().toISOString()}`,
      }),
    }
  );
  
  const data = await response.json();
  
  if (!data.success) {
    console.error('  DNS creation failed:', data.errors);
    return null;
  }
  
  return `${subdomain}.${config.baseDomain}`;
}

async function deploy() {
  console.log('═'.repeat(60));
  console.log('  Static Website Builder - Preview Deployment');
  console.log('═'.repeat(60));
  
  validateConfig();
  
  console.log('\nPreview Configuration:');
  console.log(`  Preview ID: ${previewId}`);
  console.log(`  Host:       ${config.host}`);
  console.log(`  Deploy Dir: ${config.deployDir}`);
  console.log(`  Port:       ${config.servicePort}`);
  
  // Step 1: Create archive
  console.log('\n[1/5] Creating deployment archive...');
  const archivePath = path.join(__dirname, '..', ARCHIVE_NAME);
  exec(`tar -czf ${archivePath} -C ${BUILD_DIR} .`);
  
  // Step 2: Transfer to EC2
  console.log('\n[2/5] Transferring files to EC2...');
  exec(`scp -o StrictHostKeyChecking=no -i "${config.keyPath}" ${archivePath} ${config.username}@${config.host}:/tmp/`);
  
  // Step 3: Extract and prepare
  console.log('\n[3/5] Extracting on remote server...');
  ssh(`
    mkdir -p ${config.deployDir} && \
    cd ${config.deployDir} && \
    tar -xzf /tmp/${ARCHIVE_NAME} && \
    rm -f /tmp/${ARCHIVE_NAME}
  `);
  
  // Step 4: Start service
  console.log('\n[4/5] Starting preview service...');
  ssh(`
    cd ${config.deployDir} && \
    npm install -g serve pm2 2>/dev/null || true && \
    pm2 start serve --name ${config.serviceName} -- -s . -l ${config.servicePort} && \
    pm2 save
  `);
  
  // Step 5: Configure DNS (optional)
  console.log('\n[5/5] Configuring DNS...');
  const previewUrl = await createDNSRecord();
  
  // Cleanup local archive
  fs.unlinkSync(archivePath);
  
  console.log('\n═'.repeat(60));
  console.log('  ✓ Preview deployment complete!');
  console.log('═'.repeat(60));
  console.log(`\n  Preview ID: ${previewId}`);
  console.log(`  Direct URL: http://${config.host}:${config.servicePort}`);
  if (previewUrl) {
    console.log(`  Domain URL: https://${previewUrl}`);
  }
  console.log(`\n  To delete this preview:`);
  console.log(`  ssh ${config.username}@${config.host} "pm2 delete ${config.serviceName} && rm -rf ${config.deployDir}"`);
  console.log('');
}

deploy().catch(error => {
  console.error('\nDeployment failed:', error.message);
  process.exit(1);
});


