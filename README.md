# CTR Infrastructure

Architecture portfolio website for [CTR Infrastructure](https://ctrinfrastructure.com). Built with Next.js static export and hosted on **GitHub Pages**.

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

To deploy manually: push to `main`, or go to **Actions → Deploy to GitHub Pages → Run workflow**.

---

## Custom Domain Setup (ctrinfrastructure.com)

Domain is registered with **Squarespace**. DNS is configured in Squarespace; hosting is on **GitHub Pages**.

### 1. GitHub Repository Settings

1. Open [github.com/dhananjayvj/ctr-infrastructure/settings/pages](https://github.com/dhananjayvj/ctr-infrastructure/settings/pages)
2. Under **Build and deployment**:
   - **Source:** GitHub Actions
3. Under **Custom domain**, enter:
   ```
   ctrinfrastructure.com
   ```
4. Click **Save**
5. Wait for DNS check — enable **Enforce HTTPS** once the certificate is issued (can take up to 24 hours)

The repo already includes `public/CNAME` with `ctrinfrastructure.com`, which is copied into the build output.

### 2. Squarespace DNS Settings

1. Log in to [Squarespace](https://account.squarespace.com)
2. Go to **Domains** → **ctrinfrastructure.com** → **DNS Settings** (or **Advanced Settings → DNS**)
3. Remove any existing A/CNAME records that conflict with GitHub Pages
4. Add these records:

**For the root domain (`ctrinfrastructure.com`):**

| Type | Host | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**For www (`www.ctrinfrastructure.com`):**

| Type | Host | Value |
|------|------|-------|
| CNAME | `www` | `dhananjayvj.github.io` |

5. Save changes. DNS propagation can take 15 minutes to 48 hours.

### 3. Verify

- GitHub Pages settings should show **DNS check successful**
- Visit [https://ctrinfrastructure.com](https://ctrinfrastructure.com)
- Visit [https://www.ctrinfrastructure.com](https://www.ctrinfrastructure.com) (should redirect to apex if configured in GitHub)

---

## Project Structure

```
ctr-infrastructure/
├── src/
│   ├── app/           # Next.js pages (App Router)
│   ├── components/    # React components
│   └── styles/        # Global CSS
├── public/
│   └── CNAME          # Custom domain for GitHub Pages
├── .github/workflows/
│   └── deploy.yml     # GitHub Pages CI/CD
├── next.config.js     # Static export config
└── package.json
```

## License

Private — All rights reserved.
