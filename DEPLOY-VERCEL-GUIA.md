# 🚀 Guia Completo: Deploy Vercel com Domínio Personalizado

## Qual é o seu domínio?
Exemplo: `revelaia.com.br`, `seusite.com`, etc.

---

## 📋 PARTE 1: Corrigir Erro de Build Atual

### Passo 1: Testar Build Local
```batch
cd C:\Users\Pichau\Documents\GitHub\Site-Revela
npm run build
```

Se houver erro, corrija antes de prosseguir.

### Passo 2: Fazer Push das Correções
```batch
git add .
git commit -m "fix: corrigir erro de sintaxe AdminLogin.tsx"
git push origin main
```

---

## 📋 PARTE 2: Deploy Inicial na Vercel (SEM domínio customizado)

### Opção A: Via GitHub (Recomendado)

1. **Acesse [vercel.com](https://vercel.com)**
2. Clique em **"Add New..."** → **"Project"**
3. **Import Git Repository**:
   - Conecte sua conta GitHub
   - Selecione: `educorplucasmorais-svg/Site-Revela`
4. **Configure Project**:
   - Framework Preset: `Vite`
   - Root Directory: `./` (padrão)
   - Build Command: `npm run build`
   - Output Directory: `dist/client`
   - Install Command: `npm install`
5. **Environment Variables** (clique em "Add"):
   ```
   VITE_API_URL=http://localhost:3060
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_seu_key_aqui
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_key_aqui
   ```
6. Clique **"Deploy"**
7. Aguarde 2-3 minutos
8. ✅ Receberá URL temporária: `seu-projeto.vercel.app`

### Opção B: Via CLI Vercel

```batch
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd C:\Users\Pichau\Documents\GitHub\Site-Revela
vercel

# Seguir prompts:
# - Set up and deploy? Y
# - Which scope? Sua conta
# - Link to existing project? N
# - Project name? site-revela
# - Directory? ./
# - Want to override settings? N
```

---

## 📋 PARTE 3: Configurar Domínio Personalizado

### Onde Comprar Domínio?
- **Hostinger**: [hostinger.com.br](https://hostinger.com.br/registro-de-dominio)
- **Registro.br**: [registro.br](https://registro.br) (somente .br)
- **GoDaddy**: [godaddy.com](https://godaddy.com)
- **Namecheap**: [namecheap.com](https://namecheap.com)

### Passo 1: Adicionar Domínio na Vercel

1. Acesse seu projeto na Vercel
2. Vá em **Settings** → **Domains**
3. Clique **"Add"**
4. Digite seu domínio: `seudominio.com.br`
5. Clique **"Add"**

A Vercel vai mostrar os registros DNS necessários.

### Passo 2: Configurar DNS no Provedor

#### Se seu domínio está na Hostinger:

1. Acesse **Hostinger** → **Domínios**
2. Clique no domínio → **DNS / Name Servers**
3. Adicione estes registros:

| Tipo | Nome | Aponta Para | TTL |
|------|------|-------------|-----|
| **A** | `@` | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

#### Se seu domínio está em outro provedor:

Use os valores que a Vercel mostrou na tela.

### Passo 3: Aguardar Propagação

- ⏱️ Tempo: 5 minutos a 48 horas
- 🔍 Verificar: [dnschecker.org](https://dnschecker.org)

---

## 📋 PARTE 4: Configurar Backend (API)

### Se você tem backend próprio:

#### Opção 1: Backend na Railway

1. Acesse [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub**
3. Selecione: `educorplucasmorais-svg/Site-Revela`
4. Configure:
   - Root Directory: `./`
   - Start Command: `npm run server`
5. **Variables**:
   ```
   PORT=3060
   DATABASE_URL=mysql://...
   FRONTEND_ORIGINS=https://seudominio.com.br
   STRIPE_SECRET_KEY=sk_test_...
   ```
6. **Settings** → **Networking** → **Custom Domain**:
   - Digite: `api.seudominio.com.br`
   - Copie o CNAME fornecido
7. No provedor DNS (Hostinger):
   - Adicione: `CNAME | api | valor-fornecido-railway`

#### Opção 2: Backend na Vercel (Serverless)

⚠️ Limitado para APIs simples.

1. Crie `api/index.ts`:
```typescript
import { createServer } from '../server';
export default createServer;
```

2. Deploy normalmente na Vercel

#### Atualizar VITE_API_URL na Vercel:

1. Projeto Vercel → **Settings** → **Environment Variables**
2. Edite `VITE_API_URL`:
   - Se Railway: `https://api.seudominio.com.br`
   - Se Vercel: `https://seudominio.com.br`
3. **Redeploy** (Settings → Deployments → três pontinhos → Redeploy)

---

## 📋 PARTE 5: Checklist Final

### Antes do Deploy
- [ ] `npm run build` funciona localmente
- [ ] Código commitado e pushed para GitHub
- [ ] `.env.example` atualizado

### Deploy Vercel
- [ ] Projeto criado na Vercel
- [ ] Build passou sem erros
- [ ] Environment variables configuradas
- [ ] Site acessível em `*.vercel.app`

### Domínio Customizado
- [ ] Domínio registrado
- [ ] DNS configurado (A + CNAME)
- [ ] Domínio adicionado na Vercel
- [ ] SSL ativo (cadeado verde)
- [ ] Site acessível em `https://seudominio.com.br`

### Backend (se aplicável)
- [ ] Backend deployado (Railway/Vercel)
- [ ] `VITE_API_URL` atualizado
- [ ] CORS configurado
- [ ] API acessível em `https://api.seudominio.com.br`

---

## 🔧 Scripts de Deploy Rápido

### Script 1: Build + Test + Deploy

Salve como `deploy.bat`:
```batch
@echo off
echo [1/4] Testando build...
call npm run build
if %errorlevel% neq 0 exit /b 1

echo [2/4] Commitando...
git add .
git commit -m "deploy: atualizar site"

echo [3/4] Push para GitHub...
git push origin main

echo [4/4] Deploy Vercel automatico via GitHub...
echo ✅ Aguarde 2-3 minutos em https://vercel.com
pause
```

### Script 2: Deploy CLI Direto

Salve como `vercel-deploy.bat`:
```batch
@echo off
echo Deploy direto via Vercel CLI...
call npm run build
vercel --prod
echo ✅ Deploy concluido!
pause
```

---

## 🆘 Troubleshooting Comum

### Erro: "Transform failed with 1 error"
**Causa**: Erro de sintaxe no código
**Solução**: 
```batch
npm run build
# Veja o erro, corrija, e tente novamente
```

### Erro: "VITE_API_URL is not defined"
**Causa**: Environment variable não configurada
**Solução**: Vercel Dashboard → Settings → Environment Variables

### Erro: "CORS Policy"
**Causa**: Backend não permite o domínio frontend
**Solução**: No backend (Railway), adicione em `FRONTEND_ORIGINS`:
```
https://seudominio.com.br,https://www.seudominio.com.br
```

### Site demora muito para carregar
**Causa**: Assets não otimizados
**Solução**:
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
})
```

### "DNS_PROBE_FINISHED_NXDOMAIN"
**Causa**: DNS não propagou ainda
**Solução**: Aguarde 1-48h ou use [dnschecker.org](https://dnschecker.org)

---

## 📞 Próximos Passos

1. **Me diga qual é o seu domínio** (se já tiver)
2. **Onde você quer hospedar o backend?**
   - Railway (fácil, grátis inicialmente)
   - Vercel Serverless (limitado)
   - Hostinger (precisa configurar Node.js)
   - Outro

3. **Executar o script de correção**:
   ```batch
   cd C:\Users\Pichau\Documents\GitHub\Site-Revela
   deploy-fix.bat
   ```

Assim que você me passar essas informações, vou criar os scripts e guias específicos para o seu caso!
