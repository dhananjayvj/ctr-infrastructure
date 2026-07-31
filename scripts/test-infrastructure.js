#!/usr/bin/env node
/**
 * Infrastructure Test Script
 * 
 * Verifies that all required environment variables are set
 * and tests connectivity to Cloudflare and EC2.
 * 
 * Usage:
 *   npm run test:infra
 */

require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4';

const checks = {
  passed: 0,
  failed: 0,
  skipped: 0,
};

function log(status, message) {
  const icons = {
    pass: '✓',
    fail: '✗',
    skip: '○',
    info: '→',
  };
  console.log(`  ${icons[status] || '?'} ${message}`);
}

async function checkCloudflare() {
  console.log('\n[Cloudflare Configuration]');
  
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  
  if (!token) {
    log('fail', 'CLOUDFLARE_API_TOKEN is not set');
    checks.failed++;
    return;
  }
  log('pass', 'CLOUDFLARE_API_TOKEN is set');
  checks.passed++;
  
  if (!zoneId) {
    log('fail', 'CLOUDFLARE_ZONE_ID is not set');
    checks.failed++;
    return;
  }
  log('pass', 'CLOUDFLARE_ZONE_ID is set');
  checks.passed++;
  
  // Test API connectivity
  try {
    const response = await fetch(`${CLOUDFLARE_API_URL}/zones/${zoneId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (data.success) {
      log('pass', `API access verified - Zone: ${data.result.name}`);
      checks.passed++;
    } else {
      log('fail', `API error: ${data.errors?.[0]?.message || 'Unknown error'}`);
      checks.failed++;
    }
  } catch (error) {
    log('fail', `API connectivity failed: ${error.message}`);
    checks.failed++;
  }
}

function checkEC2() {
  console.log('\n[EC2 Configuration]');
  
  const host = process.env.EC2_HOST;
  const username = process.env.EC2_USERNAME || 'ubuntu';
  const keyPath = process.env.EC2_KEY_PATH;
  const key = process.env.EC2_KEY || process.env.EC2_PRIVATE_KEY;
  const deployDir = process.env.EC2_DEPLOY_DIR;
  
  if (!host) {
    log('fail', 'EC2_HOST is not set');
    checks.failed++;
    return;
  }
  log('pass', `EC2_HOST is set: ${host}`);
  checks.passed++;
  
  log('info', `EC2_USERNAME: ${username}`);
  
  // Check for SSH key
  let hasKey = false;
  if (keyPath && fs.existsSync(keyPath)) {
    log('pass', `EC2_KEY_PATH found: ${keyPath}`);
    hasKey = true;
    checks.passed++;
  } else if (key) {
    log('pass', 'EC2_KEY/EC2_PRIVATE_KEY is set (inline key)');
    hasKey = true;
    checks.passed++;
  } else {
    log('fail', 'No SSH key configured (set EC2_KEY_PATH or EC2_KEY)');
    checks.failed++;
  }
  
  if (!deployDir) {
    log('skip', 'EC2_DEPLOY_DIR not set (using default: /var/www/static-site)');
    checks.skipped++;
  } else {
    log('pass', `EC2_DEPLOY_DIR: ${deployDir}`);
    checks.passed++;
  }
  
  // Test SSH connectivity (only if we have a key file)
  if (hasKey && keyPath && fs.existsSync(keyPath)) {
    console.log('\n[EC2 Connectivity Test]');
    try {
      const result = execSync(
        `ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 -i "${keyPath}" ${username}@${host} "echo 'SSH_OK'"`,
        { stdio: 'pipe', timeout: 10000 }
      ).toString().trim();
      
      if (result.includes('SSH_OK')) {
        log('pass', 'SSH connectivity verified');
        checks.passed++;
      } else {
        log('fail', `Unexpected SSH response: ${result}`);
        checks.failed++;
      }
    } catch (error) {
      log('fail', `SSH connectivity failed: ${error.message}`);
      checks.failed++;
    }
  } else {
    log('skip', 'SSH connectivity test skipped (no key file path)');
    checks.skipped++;
  }
}

function checkOptional() {
  console.log('\n[Optional Configuration]');
  
  const siteUrl = process.env.SITE_URL;
  const serviceName = process.env.SERVICE_NAME;
  const servicePort = process.env.SERVICE_PORT;
  
  if (siteUrl) {
    log('pass', `SITE_URL: ${siteUrl}`);
    checks.passed++;
  } else {
    log('skip', 'SITE_URL not set (using default)');
    checks.skipped++;
  }
  
  if (serviceName) {
    log('pass', `SERVICE_NAME: ${serviceName}`);
  } else {
    log('skip', 'SERVICE_NAME not set (using default: static-site-builder)');
  }
  
  if (servicePort) {
    log('pass', `SERVICE_PORT: ${servicePort}`);
  } else {
    log('skip', 'SERVICE_PORT not set (using default: 9500)');
  }
}

async function main() {
  console.log('═'.repeat(60));
  console.log('  Static Website Builder - Infrastructure Test');
  console.log('═'.repeat(60));
  
  await checkCloudflare();
  checkEC2();
  checkOptional();
  
  console.log('\n═'.repeat(60));
  console.log('  Summary');
  console.log('═'.repeat(60));
  console.log(`  Passed:  ${checks.passed}`);
  console.log(`  Failed:  ${checks.failed}`);
  console.log(`  Skipped: ${checks.skipped}`);
  
  if (checks.failed > 0) {
    console.log('\n  ⚠ Some checks failed. Review your .env configuration.');
    process.exit(1);
  } else {
    console.log('\n  ✓ All required checks passed!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});


