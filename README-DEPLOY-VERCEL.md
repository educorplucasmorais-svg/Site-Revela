# Deploy Frontend (Vercel)

This guide connects the Vite React frontend to Vercel. Keep your Node/Express backend on Hostinger/Railway (or similar) and reference it via `VITE_API_URL`.

## Project Settings
- Framework: Vite
- Root Directory: `./`
- Install: `npm install`
- Build: `npm run build`
- Output: `dist`

## Environment Variables (Frontend)
Add only what the frontend needs:
- `VITE_API_URL`: `https://YOUR-BACKEND-HTTPS-URL`
- `VITE_STRIPE_PUBLISHABLE_KEY`: `pk_test_...`

Optional (only if frontend uses Supabase directly):
- Create Vercel Secrets `supabase_url` and `supabase_anon_key`, then set:
  - `VITE_SUPABASE_URL`: `@supabase_url`
  - `VITE_SUPABASE_ANON_KEY`: `@supabase_anon_key`

If you do not use Supabase on the frontend, do NOT set these variables.

## Backend Requirements
- HTTPS reachable base URL.
- CORS allows your Vercel domain (origin: `https://<your-project>.vercel.app`).
- Stripe secret key stays on backend only.

## Local Sanity Check
```powershell
npm install
npm run build
npx serve dist
```

## Notes
- Frontend API clients should read `import.meta.env.VITE_API_URL`.
- Opera VPN can block localhost embeds; test with Edge/Chrome without VPN.
