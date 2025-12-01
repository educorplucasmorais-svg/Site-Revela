# Copilot Instructions for Site-Revela

## Project Overview
Site-Revela is a premium landing page built with React, TypeScript, and Vite. It integrates with Supabase, Stripe, and MySQL (Hostinger) for backend services. The project is optimized for performance, SEO, and responsiveness.

### Key Features
- **Frontend**: React 18, TypeScript, Vite, Wouter (routing), Sonner (notifications).
- **Backend**: Express, tRPC, Zod (validation), MySQL (Hostinger), Supabase (optional).
- **Deployment**: Vercel (frontend), Hostinger (backend).

## Architecture
### Major Components
- **Frontend**:
  - `src/components/`: Reusable React components (e.g., `ContactForm.tsx`, `ServicesGrid.tsx`).
  - `src/pages/`: Page-level components (e.g., `Home.tsx`).
  - `src/lib/`: Utility libraries for tRPC and Supabase.
  - `src/style.css`: Global styles.
- **Backend**:
  - `server/index.ts`: Express server entry point.
  - `server/router.ts`: tRPC routes.
  - `server/context.ts`: tRPC context setup.
  - `server/lib/db.ts`: MySQL connection pool.
- **Database**:
  - `supabase/schema.sql`: SQL schema for Supabase.
  - MySQL schema applied via `scripts/apply_schema_mysql.cjs`.

### Data Flow
1. **Frontend**: User interactions trigger API calls via tRPC.
2. **Backend**: tRPC routes validate and process requests, interacting with MySQL or Supabase.
3. **Database**: Data is stored/retrieved from MySQL (Hostinger) or Supabase.

## Developer Workflows
### Build and Run
- **Install dependencies**: `npm install`
- **Start frontend**: `npm run dev` (http://localhost:3050)
- **Start backend**: `npm run server` (http://localhost:3060)
- **Build production**: `npm run build`
- **Preview production**: `npm run preview` (http://localhost:4173)

### Testing
- **Backend health check**:
  ```powershell
  Invoke-WebRequest http://localhost:3060/api/health -UseBasicParsing
  ```
- **Stripe test**:
  ```bash
  node scripts/test_stripe.js
  ```
- **Database validation**: Check tables (`users`, `contacts`, `payments`, `sessions`) in phpMyAdmin.

### Deployment
- **Vercel**:
  ```bash
  npm i -g vercel
  vercel login
  vercel
  ```
- **Hostinger MySQL schema**:
  ```bash
  npm run apply-schema-mysql
  ```

## Project-Specific Conventions
1. **TypeScript**: Use explicit typing everywhere.
2. **React Functional Components**: Maintain functional components.
3. **CSS**: Use TailwindCSS or custom properties in `src/style.css`.
4. **Secrets**: Never expose secrets in the code.
5. **Environment Variables**: Configure `.env` for local development and `.env.production` for production.

## Integration Points
- **Stripe**: Payment processing via `scripts/test_stripe.js`.
- **Supabase**: Optional backend with schema in `supabase/schema.sql`.
- **MySQL**: Hostinger database with schema applied via `scripts/apply_schema_mysql.cjs`.
- **tRPC**: Type-safe API communication between frontend and backend.

## Troubleshooting
### Common Issues
- **Connection refused**: Ensure backend is running on port `3060`.
- **CORS errors**: Check `server/index.ts` for allowed origins.
- **Database errors**: Validate `.env` credentials and schema.

### Quick Fixes
- Restart processes:
  ```powershell
  Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
  ```
- Reinstall dependencies:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

## Examples
### Adding a New Component
1. Create a new file in `src/components/`.
2. Use TypeScript and TailwindCSS for styling.
3. Export the component and import it in `src/pages/Home.tsx`.

### Updating Environment Variables
1. Edit `.env`:
   ```env
   VITE_API_URL=https://api.seu-dominio.com
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
2. Restart processes to apply changes.

---

For more details, refer to `README.md` and `ARCHITECTURE.md`. Feedback is welcome to improve this guide!