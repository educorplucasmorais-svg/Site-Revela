# Deploy Backend (Railway)

Este guia configura o backend Node/Express no Railway.

## 1. Conectar Repositório
- Acesse [railway.app](https://railway.app)
- New Project → Deploy from GitHub repo
- Selecione `educorplucasmorais-svg/Site-Revela`

## 2. Environment Variables
No painel do Railway, adicione:

```
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://site-revela5-0.vercel.app
STRIPE_SECRET_KEY=sk_test_...
DATABASE_URL=mysql://user:pass@host:3306/database
```

## 3. Build Settings
Railway detecta automaticamente via `railway.json`:
- Build: Nixpacks (auto)
- Start: `npm run start`
- Health check: `/api/health`

## 4. Domain
- Settings → Networking → Generate Domain
- Copie a URL (ex: `https://site-revela-production.up.railway.app`)

## 5. Atualizar Vercel
No Vercel, atualize:
```
VITE_API_URL=https://site-revela-production.up.railway.app
```

## Scripts Disponíveis
```bash
npm run dev          # Dev local (tsx)
npm run build        # Build frontend
npm run build:server # Build backend
npm run server       # Dev server (tsx)
npm run server:prod  # Prod server (node)
npm run start        # Build + start prod
```

## Teste Local
```powershell
npm run build
npm run server:prod
# Acesse http://localhost:3000/api/health
```

## CORS
O backend aceita requisições de:
- `http://localhost:3000`
- `http://localhost:5173`
- `FRONTEND_URL` (Vercel)
