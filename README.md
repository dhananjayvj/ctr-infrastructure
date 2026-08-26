# CTR Infrastructure

Architecture portfolio website for CTR Infrastructure. Built with Next.js static export and hosted on **GitHub Pages**.

**Repository:** [github.com/dhananjayvj/ctr-infrastructure](https://github.com/dhananjayvj/ctr-infrastructure)

## Quick Start

```bash
git clone https://github.com/dhananjayvj/ctr-infrastructure.git
cd ctr-infrastructure
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build static site to `out/` |
| `npm run start` | Preview the built site locally |
| `npm run lint` | Run ESLint |

## Deployment

Every push to `main` automatically builds and deploys to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

Production URL: [https://dhananjayvj.github.io/ctr-infrastructure/](https://dhananjayvj.github.io/ctr-infrastructure/)

To deploy manually: push to `main`, or go to **Actions → Deploy to GitHub Pages → Run workflow**.

---

## GitHub Pages Setup

1. Open [github.com/dhananjayvj/ctr-infrastructure/settings/pages](https://github.com/dhananjayvj/ctr-infrastructure/settings/pages)
2. Under **Build and deployment**, keep **Source** set to **GitHub Actions**
3. Leave **Custom domain** empty
4. After deploy, verify the site at [https://dhananjayvj.github.io/ctr-infrastructure/](https://dhananjayvj.github.io/ctr-infrastructure/)

## Custom Domain Toggle

The repo now supports turning `ctrinfrastructure.com` on or off without changing DNS records.

- Default state: `ENABLE_CUSTOM_DOMAIN=false`
- Toggle on: set GitHub Actions repository variable `ENABLE_CUSTOM_DOMAIN=true`, then rerun the deploy workflow or push a commit
- Toggle off: unset the variable or set it back to `false`, then redeploy

When enabled, the build will:

- remove the GitHub Pages repo base path
- emit a `CNAME` file for `ctrinfrastructure.com`
- switch metadata, sitemap, robots, and form redirects back to `https://ctrinfrastructure.com`

Use the same DNS records as before:

For the root domain `ctrinfrastructure.com`:

| Type | Host | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

For `www.ctrinfrastructure.com`:

| Type | Host | Value |
|------|------|-------|
| CNAME | `www` | `dhananjayvj.github.io` |

---

## Project Structure

```
ctr-infrastructure/
├── src/
│   ├── app/           # Next.js pages (App Router)
│   ├── components/    # React components
│   └── styles/        # Global CSS
├── .github/workflows/
│   └── deploy.yml     # GitHub Pages CI/CD
├── next.config.js     # Static export config
└── package.json
```

## License

Private — All rights reserved.
