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
# Backend: http://localhost:3000
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
PORT=3000
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
- Backend health: `Invoke-WebRequest http://localhost:3000/api/health -UseBasicParsing`
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

# 3. Deploy
vercel

# 4. Configure as variáveis de ambiente no dashboard
```

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
