# 🏗️ Arquitetura do Projeto - Site Revela

## 📐 Visão Geral

Este projeto utiliza uma arquitetura moderna de **Full-Stack TypeScript** com separação clara entre frontend e backend, comunicação type-safe via tRPC, e banco de dados gerenciado pelo Supabase.

```
┌─────────────────────────────────────────────────────────┐
│                      USUÁRIO                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (Vite + React)                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Components (React + TypeScript)                 │  │
│  │  - ContactForm.tsx                               │  │
│  │  - ServicesGrid.tsx                              │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Routing (Wouter)                                │  │
│  │  - Client-side navigation                        │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  State Management (React Hooks)                  │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Notifications (Sonner)                          │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/tRPC
                     ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND (Express + tRPC)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  tRPC Router                                     │  │
│  │  - Type-safe API endpoints                       │  │
│  │  - Input validation (Zod)                        │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Business Logic                                  │  │
│  │  - Contact form processing                       │  │
│  │  - Newsletter subscription                       │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ Supabase Client
                     ▼
┌─────────────────────────────────────────────────────────┐
│              DATABASE (Supabase/PostgreSQL)             │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Tables                                          │  │
│  │  - contacts                                      │  │
│  │  - newsletter                                    │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Row Level Security (RLS)                        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 🔧 Stack Tecnológica Detalhada

### Frontend Layer

#### Vite
- **Propósito**: Build tool e dev server
- **Vantagens**: 
  - HMR (Hot Module Replacement) instantâneo
  - Build otimizado com Rollup
  - Suporte nativo a TypeScript e JSX

#### React 18
- **Propósito**: Biblioteca UI
- **Recursos utilizados**:
  - Hooks (useState, useEffect)
  - Componentes funcionais
  - React.StrictMode

#### Wouter
- **Propósito**: Roteamento client-side
- **Vantagens**:
  - Leve (1.3KB)
  - API similar ao React Router
  - Hooks-based

#### Sonner
- **Propósito**: Sistema de notificações toast
- **Vantagens**:
  - Acessível (ARIA)
  - Customizável
  - Animações suaves

### Backend Layer

#### Express
- **Propósito**: Framework web Node.js
- **Uso**: Servidor HTTP base para tRPC

#### tRPC
- **Propósito**: APIs type-safe end-to-end
- **Vantagens**:
  - Type safety completo
  - Sem geração de código
  - Autocompletion no cliente
  - Validação automática

#### Zod
- **Propósito**: Validação de schemas
- **Uso**: Validação de inputs nas procedures tRPC

### Database Layer

#### Supabase
- **Propósito**: Backend-as-a-Service
- **Recursos**:
  - PostgreSQL gerenciado
  - Row Level Security (RLS)
  - Realtime subscriptions
  - Authentication (futuro)
  - Storage (futuro)

## 📂 Estrutura de Diretórios

```
site-revela/
│
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml         # CI/CD para Vercel
│
├── public/                     # Assets estáticos
│   └── favicon.svg            # Ícone do site
│
├── server/                     # Backend (tRPC + Express)
│   ├── index.ts               # Entry point do servidor
│   ├── router.ts              # Definição das rotas tRPC
│   └── context.ts             # Contexto tRPC (req/res)
│
├── src/                        # Frontend (React + Vite)
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ContactForm.tsx   # Formulário de contato
│   │   └── ServicesGrid.tsx  # Grid de serviços
│   │
│   ├── lib/                   # Utilitários e clientes
│   │   ├── trpc.ts           # Cliente tRPC
│   │   └── supabase.ts       # Cliente Supabase
│   │
│   ├── pages/                 # Páginas da aplicação
│   │   └── Home.tsx          # Página inicial
│   │
│   ├── App.tsx               # Componente raiz
│   ├── main.tsx              # Entry point React
│   ├── style.css             # Estilos globais
│   └── vite-env.d.ts         # Tipos TypeScript
│
├── supabase/                  # Configurações Supabase
│   └── schema.sql            # Schema do banco de dados
│
├── .env.example              # Template de variáveis de ambiente
├── .gitignore               # Arquivos ignorados pelo Git
├── index.html               # HTML principal
├── install.bat              # Script de instalação (Windows)
├── LICENSE                  # Licença MIT
├── package.json             # Dependências e scripts
├── QUICKSTART.md           # Guia de início rápido
├── README.md               # Documentação principal
├── SEO-MARKETING.md        # Guia de SEO e marketing
├── start.bat               # Script para iniciar servidores
├── tsconfig.json           # Configuração TypeScript
├── vercel.json             # Configuração Vercel
└── vite.config.ts          # Configuração Vite
```

## 🔄 Fluxo de Dados

### Submissão de Formulário de Contato

```
1. Usuário preenche formulário
   ↓
2. ContactForm.tsx valida campos
   ↓
3. trpc.submitContact.mutate() é chamado
   ↓
4. Requisição HTTP para /api/trpc/submitContact
   ↓
5. Backend valida com Zod schema
   ↓
6. Dados são salvos no Supabase
   ↓
7. Resposta retorna ao frontend
   ↓
8. Sonner exibe toast de sucesso/erro
   ↓
9. Formulário é resetado (se sucesso)
```

### Carregamento de Serviços

```
1. Home.tsx monta componente
   ↓
2. ServicesGrid.tsx executa useEffect
   ↓
3. trpc.getServices.query() é chamado
   ↓
4. Backend retorna array de serviços
   ↓
5. Estado local é atualizado
   ↓
6. Componentes são renderizados
   ↓
7. Animações CSS são aplicadas
```

## 🔐 Segurança

### Frontend
- ✅ Validação de inputs no cliente
- ✅ Sanitização de dados
- ✅ HTTPS obrigatório em produção
- ✅ Content Security Policy (CSP) - a implementar

### Backend
- ✅ Validação com Zod
- ✅ Type safety com TypeScript
- ✅ Rate limiting - a implementar
- ✅ CORS configurado

### Database
- ✅ Row Level Security (RLS)
- ✅ Prepared statements (via Supabase)
- ✅ Encrypted connections
- ✅ Backup automático (Supabase)

## 🚀 Performance

### Frontend Optimizations
- **Code Splitting**: Vite automaticamente divide o código
- **Tree Shaking**: Remove código não utilizado
- **Minification**: CSS e JS minificados em produção
- **Lazy Loading**: Componentes carregados sob demanda
- **Asset Optimization**: Imagens otimizadas

### Backend Optimizations
- **Connection Pooling**: Supabase gerencia conexões
- **Caching**: Headers de cache configurados
- **Compression**: Gzip/Brotli habilitados
- **CDN**: Vercel Edge Network

## 🧪 Testing (a implementar)

### Frontend Tests
```bash
# Vitest para testes unitários
npm install -D vitest @testing-library/react

# Playwright para testes E2E
npm install -D @playwright/test
```

### Backend Tests
```bash
# Jest para testes de API
npm install -D jest @types/jest ts-jest
```

## 📊 Monitoramento (a implementar)

### Ferramentas Recomendadas
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Vercel Analytics**: Web vitals
- **Supabase Dashboard**: Database metrics

## 🔄 CI/CD Pipeline

```yaml
GitHub Push → GitHub Actions → Build → Tests → Deploy to Vercel
                                              ↓
                                        Update Supabase
```

## 🎯 Escalabilidade

### Horizontal Scaling
- Frontend: Vercel Edge Network (automático)
- Backend: Serverless functions (Vercel/Supabase)
- Database: Supabase auto-scaling

### Vertical Scaling
- Upgrade do plano Supabase conforme necessário
- Otimização de queries
- Implementação de cache (Redis)

## 📚 Recursos Adicionais

- [tRPC Documentation](https://trpc.io)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)

---

**Última atualização**: 2025-01-29
