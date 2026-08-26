import { existsSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const customDomain = 'ctrinfrastructure.com';
const outDir = join(process.cwd(), 'out');
const cnamePath = join(outDir, 'CNAME');
const enableCustomDomain = process.env.ENABLE_CUSTOM_DOMAIN === 'true';

if (enableCustomDomain) {
  writeFileSync(cnamePath, `${customDomain}\n`, 'utf8');
  console.log(`Configured GitHub Pages custom domain: ${customDomain}`);
} else if (existsSync(cnamePath)) {
  rmSync(cnamePath);
  console.log('Removed GitHub Pages custom domain from build output.');
} else {
  console.log('GitHub Pages custom domain is disabled.');
}
