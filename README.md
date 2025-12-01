# 🚀 Site Revela - Landing Page Premium

Este README está sendo atualizado conforme os códigos e integrações do app avançam (MySQL Hostinger, Stripe, preview e deploy). Use esta versão como referência prática.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Características do Design

- 🎨 **Design Premium Revela**: Interface moderna com cor laranja (#FF6B35) como destaque
- ⚡ **Performance**: Construído com Vite para builds ultra-rápidos
- 🔒 **Type-Safe**: TypeScript em todo o projeto com tRPC para comunicação type-safe
- 📱 **Responsivo**: Design adaptável para todos os dispositivos
- 🎯 **SEO Otimizado**: Meta tags completas e estrutura semântica
- 🔔 **Notificações**: Sistema de toasts elegante com Sonner
- 🗺️ **Roteamento**: Navegação client-side com Wouter
- 💾 **Banco de Dados**: Integração com Supabase

## 🎨 Paleta de Cores

```css
Primary Orange:  #FF6B35  /* Cor principal Revela */
Dark Orange:     #E85A28  /* Hover states */
Light Orange:    #FF8555  /* Highlights */
Background:      #000000  /* Preto puro */
Text:            #FFFFFF  /* Branco */
Muted Text:      #B8B8B8  /* Cinza claro */
```

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** - Biblioteca UI moderna
- **TypeScript** - Type safety
- **Vite** - Build tool de próxima geração
- **Wouter** - Roteamento leve e rápido
- **Sonner** - Sistema de notificações toast
- **CSS Moderno** - Custom properties, gradientes, animações
- **Montserrat** - Tipografia profissional

### Backend
- **tRPC** - APIs type-safe end-to-end
- **Express** - Framework web Node.js
- **Zod** - Validação de schemas
- **MySQL (Hostinger)** - Integração via `mysql2` (opção atual)
- **Supabase/Postgres** - Alternativa opcional

### Deploy
- **Vercel** - Frontend hosting
- **Hostinger** - Backend e banco de dados
- **GitHub** - Controle de versão

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta Supabase (gratuita)

### Instalação Rápida (Windows)

```bash
# Execute o script de instalação
install.bat

# Inicie os servidores
start.bat
```

### Instalação Manual

```bash
# 1. Instalar dependências
npm install

# 2. Configurar ambiente
cp .env.example .env
# Edite `.env` com suas credenciais (Stripe/Supabase ou MySQL Hostinger)

# 3. Iniciar backend (Terminal 1)
npm run server

# 4. Iniciar frontend (Terminal 2)
npm run dev

# 5. Acessar
# Frontend (Vite dev): http://localhost:3050
# Backend: http://localhost:3060
```

## 🗄️ Configuração do Supabase (opcional)

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta (gratuita)
3. Crie um novo projeto
4. Copie a URL do projeto e a chave anônima

### 2. Criar Tabelas

Execute o SQL em `supabase/schema.sql` no editor SQL do Supabase.

### 3. Configurar Variáveis de Ambiente

Edite o arquivo `.env`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
PORT=3060
NODE_ENV=development
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 🗄️ Configuração MySQL (Hostinger)
1. Defina no `.env`:
```
DATABASE_URL=mysql://<user>:<pass>@srv1079.hstgr.io:3306/<db>
# ou
DB_HOST=srv1079.hstgr.io
DB_USER=<user>
DB_PASSWORD=<pass>
DB_PORT=3306
DB_NAME=<db>
```
2. Aplique o schema:
```
npm run apply-schema-mysql
```
3. Valide em phpMyAdmin: tabelas `users`, `contacts`, `payments`, `sessions`.
4. O backend (`server/router.ts`) insere contatos em `contacts`.

## 🔧 Scripts úteis
```
npm run server         # backend
npm run dev            # frontend (http://localhost:3050)
npm run build          # build produção (dist/client)
npm run preview        # preview (http://localhost:4173)
npm run apply-schema   # Supabase/Postgres (opcional)
npm run apply-schema-mysql  # Hostinger MySQL
npm run test-stripe    # cria PaymentIntent e imprime client_secret
```

## 🧪 Testes rápidos
- Backend health: `Invoke-WebRequest http://localhost:3060/api/health -UseBasicParsing`
- Formulário: enviar no site e verificar `contacts` no phpMyAdmin.
- Stripe: preencher `.env` e `node scripts/test_stripe.js`.

## 🧩 Preview / Troubleshooting
- Se `ERR_CONNECTION_REFUSED` no dev (`3050`):
  - `Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force`
  - Testar Edge/Chrome e desativar VPN temporariamente
  - Usar `npm run preview` (porta `4173`) para isolar

## 📁 Sincronização com Desktop
Copiar para `C:\Users\Pichau\Desktop\Site Revela`:
```
Copy-Item -Path "C:\Users\Pichau\Documents\GitHub\Site-Revela\*" -Destination "C:\Users\Pichau\Desktop\Site Revela" -Recurse -Force
```
Na pasta Desktop: `npm install`, `npm run server`, `npm run dev`.

## 🚀 Deploy

### Deploy no Vercel (Frontend)

```bash
# 1. Instale a CLI do Vercel
npm i -g vercel

# 2. Faça login
vercel login

# 3. Deploy (interativo)
vercel

# 4. Configure as variáveis de ambiente no dashboard
```

#### Variáveis rápidas (exemplo)
No painel do Vercel (Production):
```
VITE_API_URL=https://api.seu-dominio.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
```

Nota: use `VITE_API_URL` sem barra ao final ("https://api.seu-dominio.com"),
pois o cliente concatena caminhos iniciando com `/`.

PowerShell helper local (não persiste no Vercel, apenas teste):
```powershell
$env:VITE_API_URL="https://api.seu-dominio.com";
$env:VITE_STRIPE_PUBLISHABLE_KEY="pk_live_xxx";
$env:VITE_SUPABASE_URL="https://xxx.supabase.co";
$env:VITE_SUPABASE_ANON_KEY="xxx";
```

Veja também `.env.production.example` para modelo completo.

### Deploy Automático com GitHub Actions

O projeto já vem configurado com GitHub Actions. Basta:

1. Fazer push para o GitHub
2. Conectar o repositório com Vercel
3. Adicionar secrets no GitHub:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 📁 Estrutura do Projeto

```
site-revela/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ContactForm.tsx
│   │   └── ServicesGrid.tsx
│   ├── pages/              # Páginas
│   │   └── Home.tsx
│   ├── lib/                # Utilitários
│   │   ├── trpc.ts        # Cliente tRPC
│   │   └── supabase.ts    # Cliente Supabase
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Entry point
│   ├── style.css          # Estilos globais
│   └── vite-env.d.ts      # Tipos TypeScript
├── server/
│   ├── index.ts           # Servidor Express
│   ├── router.ts          # Rotas tRPC
│   └── context.ts         # Contexto tRPC
│   └── lib/db.ts          # Conexão pool MySQL
├── scripts/
│   ├── apply_schema_mysql.cjs  # Aplica schema MySQL
│   └── test_stripe.js          # Teste PaymentIntent
├── supabase/
│   └── schema.sql         # Schema do banco
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD
├── public/
│   └── favicon.svg        # Ícone do site
├── index.html             # HTML principal
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── install.bat            # Script de instalação (Windows)
├── start.bat              # Script para iniciar (Windows)
└── README.md
```

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `src/style.css`:

```css
:root {
  --color-primary: #FF6B35;
  --color-primary-dark: #E85A28;
  --color-primary-light: #FF8555;
  /* ... */
}
```

### Conteúdo

- **Textos**: `src/pages/Home.tsx`
- **Serviços**: `server/router.ts`
- **Logo**: `src/App.tsx`

### Tipografia

O projeto usa **Montserrat** do Google Fonts. Para mudar:

```css
/* Em src/style.css */
@import url('https://fonts.googleapis.com/css2?family=Sua+Fonte&display=swap');

:root {
  --font-sans: 'Sua Fonte', sans-serif;
}
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
Consulte a seção "Scripts úteis" acima.

Links rápidos:
- Dev: http://localhost:3050
- Preview: http://localhost:4173
```

## 📊 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: < 200KB (gzipped)

## 🔒 Segurança

- ✅ Validação de inputs com Zod
- ✅ Type-safety com TypeScript
- ✅ Row Level Security no Supabase
- ✅ Variáveis de ambiente para secrets
- ✅ HTTPS obrigatório em produção

## 📱 Responsividade

- ✅ Mobile First
- ✅ Tablet otimizado
- ✅ Desktop otimizado
- ✅ 4K ready

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de CORS
Verifique se o proxy está configurado corretamente no `vite.config.ts`.

### Erro de conexão com Supabase
Verifique se as variáveis de ambiente estão corretas no arquivo `.env`.

## 📚 Documentação Adicional

- **QUICKSTART.md** - Guia de início rápido (5 minutos)
- **ARCHITECTURE.md** - Arquitetura técnica detalhada
- **SEO-MARKETING.md** - Guia de SEO e marketing digital
- **CONTRIBUTING.md** - Guia de contribuição
- **CHANGELOG.md** - Histórico de versões

## 📝 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir.

## 📧 Contato

- **Email**: contato@revela.com.br
- **Website**: [revela.com.br](https://revela.com.br)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!

**Desenvolvido com ❤️ usando React, TypeScript, tRPC e Supabase**
**Integrações ativas:** MySQL Hostinger, Stripe (test), Vite dev/preview

## 🌐 Produção (Backend + Frontend)

Para que o login admin e o Hub Kaia funcionem em produção você precisa de um backend acessível via HTTPS.

### 1. Backend
Hospede o diretório `server/` (Express + tRPC) em um provedor como Railway, Render, Fly.io ou Hostinger (Node).

Variáveis mínimas no backend:
```
PORT=3060
FRONTEND_URL=https://SEU_DOMINIO_VERCELOU_APP
DATABASE_URL=mysql://user:pass@host:3306/dbname   # ou DB_HOST / DB_USER ...
WHATSAPP_TOKEN=... (opcional)
WHATSAPP_PHONE_ID=... (opcional)
WHATSAPP_PHONE=+5531993044867
STRIPE_SECRET_KEY=sk_test_...
```

Certifique-se de que o servidor responde em:
```
GET https://SEU_BACKEND_DOMINIO/api/health -> { status: "ok" }
```

### 2. Frontend (Vercel)
No dashboard do projeto em Vercel adicione Environment Variables (Production):
```
VITE_API_URL=https://SEU_BACKEND_DOMINIO
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Re-deploy após salvar.

### 3. CORS
Confirme em `server/index.ts` que os domínios do frontend estão permitidos:

- Use `FRONTEND_ORIGINS` (recomendado) com uma lista separada por vírgulas:
```
FRONTEND_ORIGINS=https://revela-alpha.vercel.app,https://seu-preview.vercel.app
```
- Ou `FRONTEND_URL` único (legado):
```
FRONTEND_URL=https://revela-alpha.vercel.app
```
Pré-configurados para dev: `http://localhost:3050`, `http://localhost:5173`.

### 4. Banco de Dados
Execute `npm run apply-schema-mysql` no ambiente do backend ou aplique manualmente o `schema.sql`.
Tabela `users` precisa conter um usuário admin:
```
INSERT INTO users (email, name, password_hash, created_at)
VALUES ('admin@local', 'admin', '<hash-bcrypt>', NOW());
```
Use bcryptjs para gerar hash:
```js
node -e "const b=require('bcryptjs');b.hash('admin123',10).then(h=>console.log(h))"
```

Ou simplesmente use o seed automático:
```bash
npm run seed-admin
```
Variáveis opcionais para customizar:
```
SEED_ADMIN_EMAIL=admin@local
SEED_ADMIN_NAME=admin
SEED_ADMIN_PASSWORD=admin123
```

### 5. Teste
1. Acesse `/admin/login` em produção.
2. Verifique painel de diagnóstico (mostra URL e status).
3. Faça login com credenciais do usuário real. Se a API estiver fora, o fallback aceita admin/admin123 (mock temporário).

### 6. Remova o Fallback
Quando o backend estiver estável, opcionalmente remova o bloco de mock em `AdminLogin.tsx` (condição `isApiUnavailable`).

### 7. Erros comuns
| Sintoma | Causa | Ação |
|--------|-------|------|
| Unexpected end of JSON input | Backend não respondeu JSON / offline | Verificar VITE_API_URL e `/api/health` |
| CORS Not allowed | Domínio não listado | Ajustar `allowedOrigins` em `server/index.ts` |
| Login inválido apesar de hash correto | Fuso horário/expiração sessão | Checar tabela `sessions` e campo `expires_at` |

### 8. Segurança rápida
- Use HTTPS sempre.
- Não exponha `STRIPE_SECRET_KEY` no frontend.
- Rotacione tokens do WhatsApp/Stripe periodicamente.
- Limite tentativas de login (implementar rate limit futuro).

---

## 🤖 WhatsApp Bot (Assistente)

Para habilitar o bot simples de atendimento:
- Backend (env):
  - `WHATSAPP_PHONE_ID`: ID do número empresarial no Meta Graph
  - `WHATSAPP_TOKEN`: token de acesso do WhatsApp Business
  - `WHATSAPP_PHONE` ou `WHATSAPP_DEFAULT_NUMBER`/`WHATSAPP_TO`: número do consultor (E.164, ex: `5531993044867`)
- Frontend (env): `VITE_API_URL` apontando para o backend público (HTTPS)

Fluxo:
- O botão flutuante (canto inferior direito) abre o chat no WhatsApp e aciona o endpoint `sendWhatsapp` do servidor em paralelo.
- O formulário de contato possui o botão “Falar no WhatsApp” que inclui nome/email/telefone na mensagem e aciona o bot com `topic=consultoria`.
- O servidor monta uma mensagem de abertura com saudação personalizada, menu com 5 opções e o contexto da mensagem inicial.

Teste rápido local:
```powershell
.\start.bat
Invoke-WebRequest http://localhost:3060/api/health -UseBasicParsing
```
Se o health falhar, suba o backend na porta `3060` e confirme as variáveis.
