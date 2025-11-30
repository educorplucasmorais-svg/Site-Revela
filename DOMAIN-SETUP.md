# 🌐 Configuração do Domínio RevelaIA.com.br

## Domínios

| Serviço | Domínio | Hospedagem |
|---------|---------|------------|
| Frontend | `revelaia.com.br` | Vercel |
| Frontend (www) | `www.revelaia.com.br` | Vercel |
| API Backend | `api.revelaia.com.br` | Railway |

---

## 📋 Passo 1: Registrar Domínio na Hostinger

1. Acesse [hostinger.com.br/registro-de-dominio](https://hostinger.com.br/registro-de-dominio)
2. Pesquise: **revelaia.com.br**
3. Adicione ao carrinho e finalize a compra
4. Aguarde a ativação (pode levar até 24h para .com.br)

---

## 📋 Passo 2: Configurar DNS na Hostinger

Acesse: **Hostinger → Domínios → RevelaIA.com.br → DNS Zone**

### Registros para o Frontend (Vercel)

| Tipo | Nome (Host) | Aponta para (Value) | TTL |
|------|-------------|---------------------|-----|
| **A** | `@` | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

### Registro para API (Railway)

| Tipo | Nome (Host) | Aponta para (Value) | TTL |
|------|-------------|---------------------|-----|
| **CNAME** | `api` | `site-revela-production.up.railway.app` | 3600 |

---

## 📋 Passo 3: Adicionar Domínio no Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no projeto **revela-ia**
3. Vá em **Settings → Domains**
4. Clique **Add**
5. Digite: `revelaia.com.br` → Add
6. Digite: `www.revelaia.com.br` → Add
7. Aguarde verificação (ícone verde ✓)

---

## 📋 Passo 4: Adicionar Domínio no Railway

1. Acesse [railway.app/dashboard](https://railway.app/dashboard)
2. Clique no projeto **Site-Revela**
3. Clique no serviço (deploy)
4. Vá em **Settings → Networking → Custom Domain**
5. Digite: `api.revelaia.com.br`
6. Copie o CNAME que o Railway fornecer (se diferente)

---

## 📋 Passo 5: Atualizar Variáveis de Ambiente

### No Vercel (Frontend)
```
VITE_API_URL=https://api.revelaia.com.br
```

### No Railway (Backend)
```
CORS_ORIGIN=https://revelaia.com.br,https://www.revelaia.com.br
```

---

## 📋 Passo 6: Configurar HTTPS

✅ **Vercel**: SSL automático (já incluído)
✅ **Railway**: SSL automático (já incluído)

---

## 🔍 Verificar Propagação DNS

Use estas ferramentas para verificar se o DNS propagou:

- [dnschecker.org](https://dnschecker.org/#A/revelaia.com.br)
- [whatsmydns.net](https://www.whatsmydns.net/#A/revelaia.com.br)

⏱️ **Tempo de propagação**: 5 minutos a 48 horas (geralmente < 1 hora)

---

## ✅ Checklist Final

- [ ] Domínio registrado na Hostinger
- [ ] DNS configurado (A record + CNAMEs)
- [ ] Domínio adicionado no Vercel
- [ ] Domínio adicionado no Railway
- [ ] Variáveis de ambiente atualizadas
- [ ] HTTPS funcionando
- [ ] Site acessível em https://revelaia.com.br
- [ ] API acessível em https://api.revelaia.com.br

---

## 🆘 Troubleshooting

### "DNS não encontrado"
- Aguarde até 48h para propagação completa
- Verifique se os registros DNS estão corretos

### "ERR_SSL_PROTOCOL_ERROR"
- Aguarde alguns minutos após adicionar domínio
- Vercel/Railway geram SSL automaticamente

### "CORS Error"
- Verifique se `CORS_ORIGIN` no Railway inclui o novo domínio
- Limpe cache do navegador

---

## 📞 Suporte

- **Hostinger**: [hostinger.com.br/contato](https://hostinger.com.br/contato)
- **Vercel**: [vercel.com/help](https://vercel.com/help)
- **Railway**: [railway.app/help](https://railway.app/help)
