# 🚀 Guia de Início Rápido - Site Revela

## Primeiros Passos (5 minutos)

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Acesse https://supabase.com e crie uma conta gratuita
2. Crie um novo projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** (URL do projeto)
   - **anon public** key (chave pública anônima)

### 3. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais do Supabase:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-aqui
PORT=3000
NODE_ENV=development
```

### 4. Criar Tabelas no Supabase

1. No dashboard do Supabase, vá em **SQL Editor**
2. Copie todo o conteúdo do arquivo `supabase/schema.sql`
3. Cole no editor e execute (clique em **Run**)

### 5. Iniciar a Aplicação

**Terminal 1** - Backend:
```bash
npm run server
```

**Terminal 2** - Frontend:
```bash
npm run dev
```

### 6. Acessar

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api/health

## ✅ Checklist de Configuração

- [ ] Node.js 18+ instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Conta Supabase criada
- [ ] Projeto Supabase criado
- [ ] Arquivo `.env` configurado
- [ ] Tabelas criadas no Supabase
- [ ] Backend rodando (porta 3000)
- [ ] Frontend rodando (porta 5173)

## 🎨 Próximos Passos

### Personalizar o Conteúdo

1. **Logo e Nome**: Edite `src/App.tsx` linha 14
2. **Cores**: Edite `src/style.css` linhas 4-10
3. **Serviços**: Edite `server/router.ts` linhas 30-52
4. **Textos**: Edite `src/pages/Home.tsx`

### Testar o Formulário

1. Acesse http://localhost:5173
2. Role até o formulário de contato
3. Preencha e envie
4. Verifique no Supabase → **Table Editor** → **contacts**

### Deploy

Veja o arquivo `README.md` para instruções completas de deploy em:
- Vercel (frontend)
- Hostinger (backend)
- Supabase (banco de dados)

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Failed to fetch"
- Verifique se o backend está rodando na porta 3000
- Verifique se as credenciais do Supabase estão corretas no `.env`

### Erro: "CORS"
- Certifique-se de que o proxy está configurado no `vite.config.ts`
- Reinicie ambos os servidores

## 📚 Documentação

- [README completo](README.md)
- [Documentação do tRPC](https://trpc.io)
- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do Vite](https://vitejs.dev)

## 💡 Dicas

- Use `Ctrl+C` para parar os servidores
- Mantenha ambos os terminais abertos durante o desenvolvimento
- As mudanças no frontend são aplicadas automaticamente (Hot Module Replacement)
- Mudanças no backend requerem reiniciar o servidor

---

**Precisa de ajuda?** Abra uma issue no GitHub!
