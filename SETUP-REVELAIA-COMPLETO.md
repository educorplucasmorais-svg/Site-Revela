# 🌐 Configuração Completa: revelaia.com.br + Vercel

## 📋 ETAPA 1: Corrigir Erro TypeScript (URGENTE)

Execute este comando:

```batch
cd C:\Users\Pichau\Documents\GitHub\Site-Revela
fix-deploy.bat
```

Ou manualmente:
```batch
npm install --save-dev @types/bcryptjs
npm run build
git add .
git commit -m "fix: adicionar @types/bcryptjs"
git push origin main
```

---

## 🌐 ETAPA 2: Configurar DNS na Hostinger

### Passo 1: Acessar Zona DNS

1. Acesse: https://hostinger.com.br
2. Faça login
3. Vá em **Domínios** → Clique em **revelaia.com.br**
4. Clique em **DNS / Name Servers**

### Passo 2: Configurar Registros DNS

**IMPORTANTE**: Adicione OU edite os registros abaixo:

#### Registro A (Principal)
```
Tipo: A
Nome: @
Aponta para: 76.76.21.21
TTL: 3600
```

#### Registro CNAME (www)
```
Tipo: CNAME
Nome: www
Aponta para: cname.vercel-dns.com
TTL: 3600
```

### Passo 3: Remover Conflitos (SE HOUVER)

Se já existir registro A ou CNAME para `@` ou `www`:
- **DELETE** os antigos
- **ADD** os novos acima

⚠️ **ATENÇÃO**: Se o domínio está apontando para hospedagem Hostinger, você VAI PERDER acesso ao painel da Hostinger para este domínio. A Vercel vai assumir completamente.

---

## 🚀 ETAPA 3: Configurar na Vercel

### Passo 1: Adicionar Domínio Principal

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto **revela-site**
3. Vá em **Settings** → **Domains**
4. Clique **"Add"**
5. Digite: `revelaia.com.br` (SEM www)
6. Clique **"Add"**

### Passo 2: Adicionar Subdomínio WWW

1. Na mesma tela de Domains
2. Clique **"Add"** novamente
3. Digite: `www.revelaia.com.br` (COM www)
4. Clique **"Add"**
5. Marque: **"Redirect to revelaia.com.br"** (opcional mas recomendado)

---

## ⏱️ ETAPA 4: Aguardar Propagação

### Tempo Estimado
- ⚡ **Mínimo**: 5-15 minutos
- ⏳ **Normal**: 1-4 horas  
- 🐌 **Máximo**: 24-48 horas

### Verificar Propagação

**Opção 1: DNS Checker**
1. Acesse: https://dnschecker.org
2. Digite: `revelaia.com.br`
3. Tipo: `A`
4. Procure: **76.76.21.21** (verde ✓)

**Opção 2: Comando Local**
```batch
nslookup revelaia.com.br
# Deve retornar: 76.76.21.21
```

---

## 🔒 ETAPA 5: Ativar SSL (HTTPS)

A Vercel gera SSL **automaticamente** quando:
1. DNS propagou corretamente
2. Domínio foi verificado

### Verificar SSL

**Dashboard Vercel:**
- Settings → Domains
- Ao lado de `revelaia.com.br`: ✅ (verde) = SSL ativo
- Ao lado de `www.revelaia.com.br`: ✅ (verde) = SSL ativo

**No navegador:**
```
https://revelaia.com.br
https://www.revelaia.com.br
```
Ambos devem mostrar **cadeado verde** 🔒

### Se SSL não ativar após 1 hora

1. Vercel → Settings → Domains
2. Clique nos **três pontinhos** ao lado do domínio
3. **Refresh SSL Certificate**

---

## ✅ CHECKLIST COMPLETO

### DNS Hostinger
- [ ] Registro A: `@` → `76.76.21.21`
- [ ] Registro CNAME: `www` → `cname.vercel-dns.com`
- [ ] Registros antigos removidos (se conflitavam)
- [ ] Mudanças salvas

### Vercel
- [ ] Domínio `revelaia.com.br` adicionado
- [ ] Domínio `www.revelaia.com.br` adicionado
- [ ] Status: **Valid** (não "Invalid Configuration")
- [ ] SSL: ✅ ativo em ambos

### Teste Final
- [ ] `https://revelaia.com.br` carrega o site
- [ ] `https://www.revelaia.com.br` redireciona ou carrega
- [ ] Cadeado verde (HTTPS) funcionando
- [ ] Sem erros de "Not Secure"

---

## 🆘 TROUBLESHOOTING

### Problema 1: "Invalid Configuration" na Vercel

**Causa**: DNS ainda não propagou ou configurado errado

**Solução**:
1. Verifique DNS: https://dnschecker.org
2. Se verde, aguarde mais 30 min
3. Vercel → Settings → Domains → Refresh

### Problema 2: "This site can't be reached"

**Causa**: DNS não propagou ainda

**Solução**:
- Aguarde 1-4 horas
- Teste em: https://dnschecker.org
- Limpe cache DNS local:
```batch
ipconfig /flushdns
```

### Problema 3: "Not Secure" ou "ERR_SSL_PROTOCOL_ERROR"

**Causa**: SSL não foi gerado ainda

**Solução**:
1. Aguarde 30 min após DNS propagar
2. Force refresh: Vercel → Domains → Refresh SSL
3. Se persistir após 24h, contate suporte Vercel

### Problema 4: Site carrega mas mostra erro 404

**Causa**: Deploy com erro ou não concluído

**Solução**:
1. Execute: `fix-deploy.bat`
2. Aguarde 3 min
3. Vercel Dashboard → Deployments → veja se passou (verde)

### Problema 5: CSS/JS não carregam

**Causa**: Cache do navegador ou build incompleto

**Solução**:
```
# Hard reload
Ctrl + Shift + R

# Ou limpe cache
Ctrl + Shift + Delete
```

---

## 📊 STATUS ATUAL

Baseado no erro de deploy que você mostrou:

❌ **Build TypeScript**: ERRO (falta @types/bcryptjs)
⏳ **DNS**: Precisa configurar
⏳ **SSL**: Vai ativar após DNS propagar
⏳ **Site**: Vai funcionar após corrigir build

---

## 🎯 ORDEM DE EXECUÇÃO (FAÇA AGORA)

### 1. Corrigir Build (2 min)
```batch
cd C:\Users\Pichau\Documents\GitHub\Site-Revela
fix-deploy.bat
```

### 2. Configurar DNS Hostinger (5 min)
- Login: https://hostinger.com.br
- Domínios → revelaia.com.br → DNS
- Adicionar registros A e CNAME conforme ETAPA 2

### 3. Aguardar (1-4 horas)
- Verificar: https://dnschecker.org
- Quando verde ✓, prossiga

### 4. Verificar Vercel (2 min)
- Dashboard: https://vercel.com/dashboard
- Projeto: revela-site
- Domains: Ambos com ✅ verde

### 5. Testar Site
```
https://revelaia.com.br
https://www.revelaia.com.br
```

---

## 📞 PRÓXIMO PASSO

**Execute agora:**
```batch
cd C:\Users\Pichau\Documents\GitHub\Site-Revela
fix-deploy.bat
```

Enquanto roda, vá configurar o DNS na Hostinger!

Me avise quando terminar e eu verifico se está tudo certo.
