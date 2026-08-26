export const GITHUB_PAGES_BASE_PATH = '/ctr-infrastructure';
export const CUSTOM_DOMAIN = 'https://ctrinfrastructure.com';
export const ENABLE_CUSTOM_DOMAIN = process.env.ENABLE_CUSTOM_DOMAIN === 'true';
export const SITE_URL = process.env.SITE_URL || (
  ENABLE_CUSTOM_DOMAIN
    ? CUSTOM_DOMAIN
    : `https://dhananjayvj.github.io${GITHUB_PAGES_BASE_PATH}`
);
