# tg-miniapp-demo

Telegram Mini App demo with Cloudflare Worker backend.

## Structure
- `index.html` — Mini App frontend (GitHub Pages)
- `worker/index.js` — Cloudflare Worker backend

## Deploy

### Frontend (GitHub Pages)
1. Push to GitHub
2. Settings → Pages → Source: main branch

### Backend (Cloudflare Worker)
1. `cd worker`
2. `npx wrangler login`
3. `npx wrangler secret put BOT_TOKEN`
4. `npx wrangler deploy`