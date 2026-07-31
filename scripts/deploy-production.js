#!/usr/bin/env node
/**
 * Production Deployment Script
 * 
 * Deploys the built static site to EC2 production environment.
 * This script mirrors the GitHub Actions workflow for local deployment.
 * 
 * Usage:
 *   npm run build && npm run deploy:production
 */

require('dotenv').config();
const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const BUILD_DIR = path.join(__dirname, '..', 'out');
const ARCHIVE_NAME = 'deploy.tar.gz';

// Configuration from environment
const config = {
  host: process.env.EC2_HOST,
  username: process.env.EC2_USERNAME || 'ubuntu',
  keyPath: process.env.EC2_KEY_PATH || path.join(process.env.HOME, '.ssh', 'ec2_key.pem'),
  deployDir: process.env.EC2_DEPLOY_DIR || '/var/www/static-site',
  serviceName: process.env.SERVICE_NAME || 'static-site-builder',
  servicePort: process.env.SERVICE_PORT || '9500',
};

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
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

function ssh(command) {
  const sshCommand = `ssh -o StrictHostKeyChecking=no -i "${config.keyPath}" ${config.username}@${config.host}`;
  exec(`${sshCommand} '${command}'`);
}

async function deploy() {
  console.log('═'.repeat(60));
  console.log('  Static Website Builder - Production Deployment');
  console.log('═'.repeat(60));
  
  validateConfig();
  
  console.log('\nConfiguration:');
  console.log(`  Host:       ${config.host}`);
  console.log(`  Deploy Dir: ${config.deployDir}`);
  console.log(`  Service:    ${config.serviceName}:${config.servicePort}`);
  
  // Step 1: Create archive
  console.log('\n[1/4] Creating deployment archive...');
  const archivePath = path.join(__dirname, '..', ARCHIVE_NAME);
  exec(`tar -czf ${archivePath} -C ${BUILD_DIR} .`);
  
  // Step 2: Transfer to EC2
  console.log('\n[2/4] Transferring files to EC2...');
  exec(`scp -o StrictHostKeyChecking=no -i "${config.keyPath}" ${archivePath} ${config.username}@${config.host}:/tmp/`);
  
  // Step 3: Extract and prepare
  console.log('\n[3/4] Extracting on remote server...');
  ssh(`
    mkdir -p ${config.deployDir} && \
    cd ${config.deployDir} && \
    rm -rf * && \
    tar -xzf /tmp/${ARCHIVE_NAME} && \
    rm -f /tmp/${ARCHIVE_NAME}
  `);
  
  // Step 4: Start service
  console.log('\n[4/4] Starting service...');
  ssh(`
    cd ${config.deployDir} && \
    npm install -g serve pm2 2>/dev/null || true && \
    pm2 delete ${config.serviceName} 2>/dev/null || true && \
    pm2 start serve --name ${config.serviceName} -- -s . -l ${config.servicePort} && \
    pm2 save && \
    sleep 2 && \
    pm2 list
  `);
  
  // Cleanup local archive
  fs.unlinkSync(archivePath);
  
  console.log('\n═'.repeat(60));
  console.log('  ✓ Deployment complete!');
  console.log('═'.repeat(60));
  console.log(`\n  Site URL: http://${config.host}:${config.servicePort}`);
  console.log('');
}

deploy().catch(error => {
  console.error('\nDeployment failed:', error.message);
  process.exit(1);
});


