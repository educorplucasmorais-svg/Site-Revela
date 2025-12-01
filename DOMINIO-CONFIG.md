# 🌐 Configuração de Domínio - Guia Rápido

## ❓ Qual é o seu domínio?

**Me informe o domínio que você quer usar:**
- Exemplo: `revelaia.com.br`
- Exemplo: `meusite.com`

---

## 📋 Passo a Passo

### 1️⃣ Adicionar Domínio na Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto **Site-Revela**
3. Vá em **Settings** → **Domains**
4. Clique **"Add Domain"**
5. Digite: `seu-dominio.com.br`
6. Clique **"Add"**

A Vercel vai mostrar os registros DNS necessários.

---

### 2️⃣ Configurar DNS (Provedor do Domínio)

#### Se o domínio está na Hostinger:

1. Acesse: https://hostinger.com.br
2. Vá em **Domínios** → Selecione seu domínio
3. Clique em **DNS / Name Servers**
4. **Adicione estes registros:**

| Tipo | Nome (Host) | Valor (Aponta Para) | TTL |
|------|-------------|---------------------|-----|
| **A** | `@` | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

#### Se o domínio está no Registro.br:

1. Acesse: https://registro.br
2. Faça login
3. Vá em **Meus domínios** → DNS
4. Adicione os mesmos registros acima

#### Se o domínio está em outro provedor:

Use os valores que a Vercel mostrou quando você adicionou o domínio.

---

### 3️⃣ Aguardar Propagação

- ⏱️ **Tempo**: 5 minutos a 48 horas (geralmente < 2 horas)
- 🔍 **Verificar propagação**: https://dnschecker.org

Digite seu domínio e veja se aparece o IP `76.76.21.21`

---

### 4️⃣ Verificar SSL (HTTPS)

A Vercel gera SSL automaticamente quando o DNS propaga.

**Verificar:**
1. Aguarde a propagação
2. Acesse: `https://seu-dominio.com.br`
3. ✅ Cadeado verde = SSL ativo

Se demorar mais de 1 hora após DNS propagar:
- Vercel Dashboard → Settings → Domains → Refresh

---

## 🆘 Problemas Comuns

### "Invalid Configuration" na Vercel
**Causa**: DNS ainda não propagou
**Solução**: Aguarde mais algumas horas

### "DNS_PROBE_FINISHED_NXDOMAIN"
**Causa**: Registros DNS incorretos ou não propagaram
**Solução**: 
1. Verifique se copiou os valores certos
2. Aguarde 24-48h
3. Use: https://dnschecker.org

### "ERR_SSL_PROTOCOL_ERROR"
**Causa**: SSL ainda não foi gerado
**Solução**: Aguarde 30 min após DNS propagar

### Site carrega mas sem CSS/JS
**Causa**: Cache do navegador
**Solução**: `Ctrl + Shift + R` (hard reload)

---

## ✅ Checklist

- [ ] Domínio adicionado na Vercel
- [ ] Registro A configurado (`@` → `76.76.21.21`)
- [ ] Registro CNAME configurado (`www` → `cname.vercel-dns.com`)
- [ ] DNS propagado (verificar em dnschecker.org)
- [ ] SSL ativo (cadeado verde)
- [ ] Site acessível em `https://seu-dominio.com.br`
- [ ] Redirecionamento `www` → domínio principal funcionando

---

## 📞 Preciso de Ajuda

**Me informe:**
1. Qual é o seu domínio?
2. Onde ele está registrado? (Hostinger, Registro.br, etc)
3. Você já adicionou na Vercel?
4. Qual erro está aparecendo?

Com essas informações vou criar um guia específico para você!
