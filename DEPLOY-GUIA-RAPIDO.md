# 🚀 Deploy Rápido - Guia de Uso

## Scripts Disponíveis

### 1. `deploy.bat` (RECOMENDADO)
**Uso diário para atualizações**

```batch
deploy.bat
```

**O que faz:**
- ✅ Testa build localmente
- ✅ Commita mudanças
- ✅ Faz push para GitHub
- ✅ Aciona deploy automático na Vercel

**Tempo**: ~2-5 minutos

---

### 2. `deploy-fast.bat`
**Deploy expresso (sem teste)**

```batch
deploy-fast.bat
```

**O que faz:**
- ⚡ Commita e push direto
- ⚠️ NÃO testa build antes

**Use quando:**
- Mudanças pequenas (CSS, texto)
- Já testou build antes
- Pressa

**Tempo**: ~30 segundos

---

### 3. `vercel-deploy.bat`
**Deploy completo com limpeza**

```batch
vercel-deploy.bat
```

**O que faz:**
- 🧹 Limpa build anterior
- ✅ Build limpo
- ✅ Commit e push
- ✅ Deploy Vercel

**Use quando:**
- Mudanças grandes
- Erro de build estranho
- Primeira vez

**Tempo**: ~3-7 minutos

---

## Workflow Recomendado

### Mudança Simples (CSS, Texto)
```batch
# 1. Edite os arquivos
# 2. Execute:
deploy-fast.bat
```

### Mudança Normal (Componentes, Lógica)
```batch
# 1. Edite os arquivos
# 2. Execute:
deploy.bat
```

### Mudança Grande (Refactoring, Novos Features)
```batch
# 1. Teste localmente:
npm run dev

# 2. Teste build:
npm run build

# 3. Deploy:
vercel-deploy.bat
```

---

## Verificar Deploy

1. **GitHub Actions**: 
   - https://github.com/educorplucasmorais-svg/Site-Revela/actions
   - ✅ Verde = build passou
   - ❌ Vermelho = erro

2. **Vercel Dashboard**:
   - https://vercel.com/dashboard
   - Veja logs em tempo real
   - Status do deploy

3. **Site ao Vivo**:
   - Aguarde 2-3 minutos
   - Recarregue com `Ctrl+F5` (limpa cache)

---

## Reverter Deploy Ruim

### Opção 1: Via Vercel (mais rápido)
1. Acesse Vercel → Deployments
2. Encontre o deploy anterior (que funcionava)
3. Clique nos três pontinhos → **Promote to Production**

### Opção 2: Via Git
```batch
git log --oneline
# Copie o hash do commit que funcionava (ex: a1b2c3d)

git revert HEAD
git push origin main
```

---

## Troubleshooting

### "Build failed" na Vercel
```batch
# Teste localmente primeiro:
npm run build

# Veja o erro e corrija
# Depois:
deploy.bat
```

### "Nothing to commit"
```batch
# Você não fez mudanças
# Edite algum arquivo primeiro, ou:
git commit --allow-empty -m "trigger deploy"
git push origin main
```

### "Permission denied (publickey)"
```batch
# Configure SSH do GitHub:
ssh-keygen -t ed25519 -C "seu@email.com"
# Adicione a chave em GitHub → Settings → SSH Keys
```

### Deploy demora muito
- ⏱️ Normal: 2-3 minutos
- ⏱️ Primeira vez: 5-10 minutos
- 🐌 +15 minutos: veja logs na Vercel

---

## Dicas de Performance

### 1. Cache do NPM
Vercel já usa cache automático. Não precisa fazer nada.

### 2. Build Local Mais Rápido
```batch
# Adicione ao package.json:
"scripts": {
  "build:fast": "vite build --mode development"
}
```

### 3. Preview Deploy (Teste Antes de Produção)
```batch
git checkout -b teste-nova-feature
# Faça mudanças
git push origin teste-nova-feature
# Vercel cria preview automático
# URL: site-revela-git-teste-nova-feature-usuario.vercel.app
```

---

## Atalhos Úteis

### Commit + Push Rápido
```batch
git add . && git commit -m "update" && git push
```

### Ver Últimos Commits
```batch
git log --oneline -5
```

### Ver Mudanças Não Commitadas
```batch
git status
git diff
```

### Cancelar Mudanças Locais
```batch
git checkout .
```

---

## Próximos Passos

Agora você pode fazer updates facilmente! Basta:

1. Editar seus arquivos
2. Executar `deploy.bat`
3. Aguardar 2-3 minutos
4. Site atualizado!

**Precisa de ajuda com algo específico?**
