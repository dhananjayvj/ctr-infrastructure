/**
 * Static Website Builder - Infrastructure Library
 * 
 * This library provides the core infrastructure services for
 * building and deploying static websites:
 * 
 * - Cloudflare: DNS management, CDN, and cache control
 * - AWS EC2: SSH-based deployment and process management
 * 
 * These implementations mirror the patterns used in the
 * main storezy platform for consistency.
 */

// Re-export all modules
export * from './cloudflare';
export * from './aws';
export { config, validateCloudflareConfig, validateEC2Config } from './config';

// Convenience imports
import { CloudflareClient, getCloudflareClient } from './cloudflare';
import { EC2Deployer, createEC2Deployer } from './aws';
import { config, validateCloudflareConfig, validateEC2Config } from './config';

/**
 * Quick setup validation
 * Checks if all required environment variables are set
 */
export function validateAllConfig(): {
  cloudflare: boolean;
  ec2: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  let cloudflareValid = false;
  let ec2Valid = false;

  try {
    validateCloudflareConfig();
    cloudflareValid = true;
  } catch (err) {
    errors.push((err as Error).message);
  }

  try {
    validateEC2Config();
    ec2Valid = true;
  } catch (err) {
    errors.push((err as Error).message);
  }

  return { cloudflare: cloudflareValid, ec2: ec2Valid, errors };
}

/**
 * Full deployment workflow
 * 
 * 1. Build the site (caller handles this)
 * 2. Deploy to EC2
 * 3. Configure DNS (optional)
 * 4. Purge CDN cache
 */
export async function deployStaticSite(options: {
  buildDir: string;
  subdomain?: string;
  purgeCache?: boolean;
}): Promise<{
  deployment: Awaited<ReturnType<EC2Deployer['deploy']>>;
  dns?: Awaited<ReturnType<CloudflareClient['upsertSubdomain']>>;
}> {
  const deployer = createEC2Deployer();
  const cloudflare = getCloudflareClient();

  // Deploy to EC2
  console.log('\n=== Deploying to EC2 ===');
  const deployment = await deployer.deploy(options.buildDir);

  // Configure DNS if subdomain provided
  let dnsResult;
  if (options.subdomain && deployment.success) {
    console.log('\n=== Configuring DNS ===');
    dnsResult = await cloudflare.upsertSubdomain(
      options.subdomain,
      config.aws.ec2Host,
      {
        proxied: true,
        comment: `Static site deployed at ${new Date().toISOString()}`,
      }
    );
    console.log(`✓ DNS configured: ${dnsResult.name} → ${dnsResult.content}`);
  }

  // Purge cache if requested
  if (options.purgeCache && deployment.success) {
    console.log('\n=== Purging CDN Cache ===');
    await cloudflare.purgeCache({ purgeEverything: true });
    console.log('✓ CDN cache purged');
  }

  return {
    deployment,
    dns: dnsResult,
  };
}


