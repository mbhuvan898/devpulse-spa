# DevPulse SPA — Cloudflare Pages

A DevOps infrastructure dashboard built with React + Vite.

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## Build

```bash
npm run build
# Output in dist/
```

## Deploy to Cloudflare Pages

### Option 1 — Dashboard (easiest)
1. Push to GitHub
2. Go to dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
3. Set: Build command = `npm run build` | Output directory = `dist`
4. Click Save and Deploy ✅

### Option 2 — Wrangler CLI
```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy dist/ --project-name=devpulse-spa
```

### Option 3 — GitHub Actions (auto-deploy)
Add these secrets to your repo (Settings → Secrets → Actions):
- `CLOUDFLARE_API_TOKEN` — from dash.cloudflare.com → My Profile → API Tokens
- `CLOUDFLARE_ACCOUNT_ID` — from dash.cloudflare.com sidebar

Push to `main` → deploys automatically.

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Root component + routing
├── index.css             # Global styles + CSS variables
└── components/
    ├── Sidebar.jsx        # Navigation sidebar
    ├── Dashboard.jsx      # Dashboard page (stats, chart, pipelines)
    └── Views.jsx          # Services, Deployments, Settings pages

public/
├── _redirects            # SPA routing fix for Cloudflare Pages
└── _headers              # Security + cache headers
```
