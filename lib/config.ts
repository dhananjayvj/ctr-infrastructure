/**
 * Central Configuration
 * 
 * Loads and validates environment variables for
 * Cloudflare and AWS integrations.
 */

import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export interface Config {
  cloudflare: {
    apiToken: string;
    zoneId: string;
    accountId?: string;
  };
  aws: {
    accessKeyId?: string;
    secretAccessKey?: string;
    region: string;
    ec2Host: string;
    ec2Username: string;
    ec2PrivateKey: string;
    ec2DeployDir: string;
  };
  deployment: {
    defaultPort: number;
    serviceName: string;
    siteUrl: string;
  };
}

export const config: Config = {
  cloudflare: {
    apiToken: process.env.CLOUDFLARE_API_TOKEN || '',
    zoneId: process.env.CLOUDFLARE_ZONE_ID || '',
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'ap-south-1',
    ec2Host: process.env.EC2_HOST || '',
    ec2Username: process.env.EC2_USERNAME || 'ubuntu',
    ec2PrivateKey: process.env.EC2_PRIVATE_KEY || process.env.EC2_KEY || '',
    ec2DeployDir: process.env.EC2_DEPLOY_DIR || '/var/www/static-site',
  },
  deployment: {
    defaultPort: parseInt(process.env.SERVICE_PORT || '9500', 10),
    serviceName: process.env.SERVICE_NAME || 'static-site-builder',
    siteUrl: process.env.SITE_URL || 'https://example.com',
  },
};

/**
 * Validate required configuration for Cloudflare operations
 */
export function validateCloudflareConfig(): void {
  const { apiToken, zoneId } = config.cloudflare;
  const missing: string[] = [];

  if (!apiToken) missing.push('CLOUDFLARE_API_TOKEN');
  if (!zoneId) missing.push('CLOUDFLARE_ZONE_ID');

  if (missing.length > 0) {
    throw new Error(
      `Missing required Cloudflare configuration: ${missing.join(', ')}\n` +
      'Please set these environment variables in your .env file.'
    );
  }
}

/**
 * Validate required configuration for EC2 deployment
 */
export function validateEC2Config(): void {
  const { ec2Host, ec2Username, ec2PrivateKey, ec2DeployDir } = config.aws;
  const missing: string[] = [];

  if (!ec2Host) missing.push('EC2_HOST');
  if (!ec2Username) missing.push('EC2_USERNAME');
  if (!ec2PrivateKey) missing.push('EC2_PRIVATE_KEY or EC2_KEY');
  if (!ec2DeployDir) missing.push('EC2_DEPLOY_DIR');

  if (missing.length > 0) {
    throw new Error(
      `Missing required EC2 configuration: ${missing.join(', ')}\n` +
      'Please set these environment variables in your .env file.'
    );
  }
}

export default config;


