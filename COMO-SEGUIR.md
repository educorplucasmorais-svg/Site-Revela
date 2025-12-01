# ✅ CHECKLIST: Como Seguir Agora

## PASSO 1: Corrigir Build (5 minutos)

Abra o **Prompt de Comando** (cmd) e execute:

```batch
cd C:\Users\Pichau\Documents\GitHub\Site-Revela
setup-revelaia.bat
```

**O que vai acontecer:**
- Instala dependência faltante
- Testa build
- Faz commit e push
- Aciona deploy na Vercel

✅ **Marque quando concluir:** [ ]

---

## PASSO 2: Configurar DNS Hostinger (10 minutos)

### 2.1 Acessar Hostinger
1. Abra: https://hostinger.com.br
2. Faça login
3. Clique em **"Domínios"**
4. Clique em **"revelaia.com.br"**
5. Clique em **"DNS / Name Servers"**

✅ **Marque quando chegar nessa tela:** [ ]

### 2.2 Adicionar Registro A

Clique em **"Adicionar Registro"** ou **"Add Record"**

Preencha:
```
Tipo: A
Nome/Host: @
Aponta para/Value: 76.76.21.21
TTL: 3600 (ou deixe padrão)
```

Clique **"Salvar"** ou **"Add Record"**

✅ **Marque quando adicionar:** [ ]

### 2.3 Adicionar Registro CNAME

Clique em **"Adicionar Registro"** novamente

Preencha:
```
Tipo: CNAME
Nome/Host: www
Aponta para/Value: cname.vercel-dns.com
TTL: 3600 (ou deixe padrão)
```

Clique **"Salvar"** ou **"Add Record"**

✅ **Marque quando adicionar:** [ ]

### 2.4 Remover Conflitos (SE HOUVER)

Se já existir registro A ou CNAME para `@` ou `www` apontando para outro lugar:
- Clique no ícone de **lixeira/delete** ao lado
- Confirme a remoção

✅ **Marque se removeu algum:** [ ] (ou N/A se não tinha)

---

## PASSO 3: Adicionar Domínio na Vercel (5 minutos)

### 3.1 Acessar Projeto
1. Abra: https://vercel.com/dashboard
2. Encontre e clique no projeto: **revela-site**
3. Clique em **"Settings"** (no topo)
4. No menu lateral, clique em **"Domains"**

✅ **Marque quando chegar nessa tela:** [ ]

### 3.2 Adicionar revelaia.com.br

1. Clique no botão **"Add"** ou **"Add Domain"**
2. Digite: `revelaia.com.br` (SEM www)
3. Clique **"Add"**
4. Aguarde aparecer na lista

✅ **Marque quando adicionar:** [ ]

### 3.3 Adicionar www.revelaia.com.br

1. Clique em **"Add"** novamente
2. Digite: `www.revelaia.com.br` (COM www)
3. Clique **"Add"**
4. Se perguntar sobre redirect, escolha **"Redirect to revelaia.com.br"**

✅ **Marque quando adicionar:** [ ]

---

## PASSO 4: Verificar Status (Imediato)

Na tela de Domains da Vercel, você vai ver:

**Cenário 1: DNS ainda não propagou**
```
revelaia.com.br - Invalid Configuration
www.revelaia.com.br - Invalid Configuration
```
👉 **Normal!** Aguarde propagação (próximo passo)

**Cenário 2: DNS já propagou**
```
revelaia.com.br - Valid ✓
www.revelaia.com.br - Valid ✓
```
👉 **Ótimo!** Pule para PASSO 6

✅ **Marque qual cenário você viu:** [ ]

---

## PASSO 5: Aguardar Propagação DNS (1-4 horas)

### 5.1 Verificar Propagação

Abra: https://dnschecker.org

Digite: `revelaia.com.br`

Tipo: Deixe em `A`

Clique **"Search"**

**Procure por:**
- Vários servidores mostrando: **76.76.21.21** com ✓ verde

**Status:**
- [ ] Alguns verdes, outros vermelhos = Propagando (aguarde)
- [ ] Todos ou maioria verde = Propagado! (continue)

### 5.2 Limpar Cache Local (opcional)

No cmd:
```batch
ipconfig /flushdns
```

✅ **Marque quando DNS propagar:** [ ]

---

## PASSO 6: Verificar SSL e Site (5 minutos)

### 6.1 Voltar na Vercel

1. Vercel → revela-site → Settings → Domains
2. Verifique se ambos mostram ✓ verde
3. Se ainda "Invalid", clique nos 3 pontinhos → **Refresh**

✅ **Ambos com ✓ verde:** [ ]

### 6.2 Testar no Navegador

Abra em uma aba anônima (Ctrl+Shift+N):

```
https://revelaia.com.br
```

**Deve mostrar:**
- ✅ Site carregando
- ✅ Cadeado verde (HTTPS)
- ✅ Sem erros

✅ **Site funciona:** [ ]

### 6.3 Testar www

```
https://www.revelaia.com.br
```

**Deve:**
- Carregar o site OU
- Redirecionar para revelaia.com.br

✅ **www funciona:** [ ]

---

## PASSO 7: Teste Final (2 minutos)

Abra em diferentes navegadores/dispositivos:

- [ ] Chrome/Edge (Desktop)
- [ ] Firefox (Desktop)
- [ ] Celular (Chrome/Safari)

Tudo funcionando = **SUCESSO!** 🎉

---

## 🆘 SE ALGO DER ERRADO

### DNS não propaga após 24h
- Volte na Hostinger
- Verifique se salvou os registros
- Screenshot e me mande

### "Invalid Configuration" persiste
- DNS checker ainda vermelho = aguarde mais
- DNS checker verde mas Vercel vermelho = clique Refresh

### Build falhou no Vercel
- Deployments → veja o erro
- Execute `setup-revelaia.bat` novamente

### Site carrega mas sem estilo
- `Ctrl + Shift + R` (hard reload)
- Limpe cache do navegador

---

## 📞 PRECISA DE AJUDA?

Me mande print de:
1. Tela DNS da Hostinger (mostre os registros)
2. Tela Domains da Vercel (mostre o status)
3. Mensagem de erro (se houver)

---

## ✅ RESUMO RÁPIDO

1. Execute: `setup-revelaia.bat`
2. Hostinger: Adicione A e CNAME
3. Vercel: Adicione os 2 domínios
4. Aguarde 1-4h (DNS propagar)
5. Acesse https://revelaia.com.br
6. **PRONTO!** 🎉

---

## AGORA FAÇA:

Abra o cmd e execute:
```batch
cd C:\Users\Pichau\Documents\GitHub\Site-Revela
setup-revelaia.bat
```

Depois vá na Hostinger configurar DNS!
