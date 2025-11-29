# Deploy Guide — Site Revela

## Shared Hosting (Hostinger)
- Build locally:
```
npm install
npm run build
```
- Upload `dist/client` contents to `public_html`:
  - Via File Manager or FTP (place `index.html`, `assets/` under `public_html`).
- Optional: add redirects/compression in `.htaccess`.
- Verify: open your domain; assets should load from `/assets/...`.

## VPS (Hostinger)
- SSH into server and prepare Node:
```
ssh <user>@<server>
# install Node 18+ and pm2 if needed
npm i -g pm2
```
- Clone and configure:
```
git clone <repo_url> site-revela
cd site-revela
npm install
# add .env with Stripe and DB settings
npm run build
```
- Run backend with PM2:
```
pm2 start npm --name site-revela -- start
pm2 save
pm2 status
```
- Reverse proxy (Nginx) sample (optional):
```
server {
  listen 80;
  server_name yourdomain.com;
  location /api {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
  location / {
    root /path/to/site-revela/dist/client;
    try_files $uri /index.html;
  }
}
```

## Environment Variables
- Stripe: `VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (optional)
- DB (Hostinger MySQL): `DATABASE_URL` or `DB_HOST/DB_USER/DB_PASSWORD/DB_PORT/DB_NAME`
- Server: `PORT=3000`, `NODE_ENV=production`

## Database Setup
- Apply schema (from dev machine or server):
```
npm run apply-schema-mysql
```
- Verify tables in phpMyAdmin: `users`, `contacts`, `payments`, `sessions`.

## Health & Checks
- Backend: `curl http://localhost:3000/api/health`
- Frontend (static): served from `dist/client` via Nginx or shared hosting.
- Stripe test:
```
node scripts/test_stripe.js
```

## Troubleshooting
- If frontend 404 on refresh: ensure SPA fallback to `index.html` (Nginx `try_files`).
- If dev ports blocked locally: disable VPN/antivirus; use `npm run preview` (4173).
- If MySQL access denied: confirm user/password and host (`srv1079.hstgr.io`).
