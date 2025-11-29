# 🚀 Guia de Deploy na Hostinger (VPS)

Este guia explica como colocar seu site no ar usando um servidor VPS da Hostinger.

## 📋 Pré-requisitos

1.  **Plano VPS Hostinger** (Recomendado: KVM 1 ou superior)
2.  **Acesso SSH** ao servidor
3.  **Domínio** apontado para o IP do servidor

## 🛠️ Passo 1: Preparar o Servidor

Acesse seu servidor via SSH (terminal ou PuTTY):
```bash
ssh root@seu_ip_aqui
```

### 1.1 Atualizar o sistema
```bash
apt update && apt upgrade -y
```

### 1.2 Instalar Node.js (v18 ou v20)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```

### 1.3 Instalar PM2 (Gerenciador de Processos)
```bash
npm install -g pm2
```

### 1.4 Instalar Nginx (Servidor Web)
```bash
apt install -y nginx
```

## 📦 Passo 2: Clonar e Configurar o Projeto

### 2.1 Clonar o repositório
```bash
cd /var/www
git clone https://github.com/educorplucasmorais-svg/Site-Revela.git
cd Site-Revela
```

### 2.2 Instalar dependências
```bash
npm install
```

### 2.3 Configurar variáveis de ambiente
Crie o arquivo `.env`:
```bash
nano .env
```
Cole suas configurações (Stripe, Supabase, etc):
```env
PORT=3000
NODE_ENV=production
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
Salve com `Ctrl+X`, `Y`, `Enter`.

### 2.4 Build do projeto
```bash
npm run build
```
*Isso vai compilar o frontend (Vite) e o backend (TypeScript).*

## 🚀 Passo 3: Iniciar a Aplicação

Use o PM2 para manter o site rodando 24/7:

```bash
pm2 start dist/server/index.js --name "site-revela"
pm2 save
pm2 startup
```

## 🌐 Passo 4: Configurar Nginx (Proxy Reverso)

O Nginx vai receber os acessos na porta 80 (HTTP) e enviar para a porta 3000 (Node.js).

### 4.1 Criar configuração
```bash
nano /etc/nginx/sites-available/site-revela
```

Cole o seguinte (substitua `seu-dominio.com` pelo seu domínio real):

```nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4.2 Ativar o site
```bash
ln -s /etc/nginx/sites-available/site-revela /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

## 🔒 Passo 5: SSL (HTTPS) Grátis

Instale o Certbot para HTTPS automático:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

---

## 🎉 Pronto!

Seu site deve estar acessível em `https://seu-dominio.com`.

### Comandos Úteis

- **Ver logs**: `pm2 logs site-revela`
- **Reiniciar site**: `pm2 restart site-revela`
- **Atualizar site**:
  ```bash
  cd /var/www/Site-Revela
  git pull
  npm install
  npm run build
  pm2 restart site-revela
  ```
