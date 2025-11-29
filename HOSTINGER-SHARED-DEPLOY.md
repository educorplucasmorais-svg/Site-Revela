# 🚀 Guia de Deploy - Hostinger (Hospedagem Compartilhada)

Este guia é específico para o seu plano de hospedagem compartilhada (hPanel), onde você **não** tem acesso root via SSH.

## 📋 Pré-requisitos

1.  Acesso ao painel da Hostinger (hPanel).
2.  Domínio configurado (`revelaapp.com.br`).
3.  Chaves do Supabase e Stripe em mãos.

---

## 🛠️ Passo 1: Preparar os Arquivos

Como você não pode rodar `git clone` diretamente na pasta final facilmente, vamos fazer o upload dos arquivos.

1.  No seu computador, compacte todos os arquivos do projeto em um arquivo **ZIP** (exceto a pasta `node_modules` e `.git`).
    *   *Dica: Selecione tudo na pasta do projeto, desmarque `node_modules` e `.git`, clique com botão direito > Enviar para > Pasta compactada.*

## 📤 Passo 2: Enviar para a Hostinger

1.  Acesse o **Gerenciador de Arquivos** no hPanel.
2.  Entre na pasta `public_html`.
3.  Apague qualquer arquivo que estiver lá (ex: `default.php`).
4.  **Upload** do seu arquivo ZIP.
5.  Clique com botão direito no ZIP > **Extract** (Extrair).
6.  Mova os arquivos para que fiquem diretamente na raiz de `public_html` (se extraiu numa subpasta).

## ⚙️ Passo 3: Configurar Node.js no hPanel

1.  No hPanel, procure por **"Node.js"** na seção "Avançado" ou "Site".
2.  Clique em **Criar Aplicação** (ou Setup).
3.  Preencha:
    *   **Node.js version:** Escolha a **18** ou **20** (Recomendado).
    *   **Application mode:** Production.
    *   **Application root:** `public_html` (ou onde você colocou os arquivos).
    *   **Application startup file:** `dist/server/index.js` (Isso é importante! Mas como ainda não compilamos, coloque `server/index.ts` temporariamente ou deixe o padrão `app.js` e mudaremos depois).
4.  Clique em **Create**.

## 📦 Passo 4: Instalar Dependências e Compilar

Ainda na tela do Node.js no hPanel:

1.  Clique no botão **"NPM Install"**.
    *   *Isso vai ler seu `package.json` e instalar tudo.*
2.  Agora precisamos compilar o projeto (Build).
    *   Infelizmente, o painel compartilhado não tem um botão "NPM Run Build" fácil.
    *   **Solução:** Vamos rodar o comando via SSH do painel ou Terminal.

### Usando o Terminal do hPanel (se disponível):
1.  Procure por **Terminal** no hPanel (seção Avançado).
2.  Conecte-se.
3.  Navegue até a pasta: `cd public_html`
4.  Rode o build: `npm run build`

*Se o build falhar por falta de memória (comum em hospedagem compartilhada), você precisará fazer o build no seu computador (`npm run build`), apagar a pasta `dist` no servidor e fazer upload da pasta `dist` do seu computador.*

## 🔧 Passo 5: Configurar Variáveis de Ambiente

1.  No Gerenciador de Arquivos, crie um arquivo chamado `.env` na raiz (`public_html`).
2.  Cole o conteúdo do seu `.env.example` local.
3.  **Preencha os valores reais:**
    *   `VITE_SUPABASE_URL`: (Sua URL do Supabase)
    *   `VITE_SUPABASE_ANON_KEY`: (Sua chave anon do Supabase)
    *   `VITE_STRIPE_...`: (Suas chaves do Stripe)
    *   `PORT`: Pode deixar 3000 ou a porta que a Hostinger indicar (geralmente eles gerenciam isso automaticamente via Passenger).

## 🚀 Passo 6: Finalizar

1.  Volte na configuração de **Node.js** no hPanel.
2.  Garanta que o **Application startup file** esteja apontando para `dist/server/index.js`.
    *   *Nota: Esse arquivo só existe DEPOIS do build.*
3.  Clique em **Restart** na aplicação.

## 🎉 Testar

Acesse `revelaapp.com.br`. Se tudo deu certo, seu site estará no ar!

---

### 🆘 Problemas Comuns

*   **Erro 500 / Tela Branca:** Verifique os logs (geralmente tem um link "Error Logs" no hPanel).
*   **Build falhando:** Como mencionei, faça o build no seu PC (`npm run build`) e suba a pasta `dist` pronta. É mais garantido em hospedagem compartilhada.
