# 🤖 Guia de Configuração do GitHub Copilot Chat no VS Code

Este guia ajuda a configurar e resolver problemas do GitHub Copilot Chat no Visual Studio Code.

## ✅ Pré-requisitos

1. **Assinatura GitHub Copilot** - Você precisa de uma assinatura ativa do GitHub Copilot (Individual, Business ou Enterprise)
2. **VS Code atualizado** - Versão 1.84 ou superior
3. **Conta GitHub** - Logada no VS Code

## 📦 Instalação das Extensões

### Método 1: Automático (Recomendado)

Execute o script de correção no PowerShell ou CMD:

```powershell
# PowerShell (requer .\ antes do nome do script)
.\fix-vscode.bat

# CMD (pode executar diretamente)
fix-vscode.bat
```

### Método 2: Manual

1. Abra o VS Code
2. Vá para a aba de Extensões (Ctrl+Shift+X)
3. Pesquise e instale:
   - **GitHub Copilot** (`github.copilot`)
   - **GitHub Copilot Chat** (`github.copilot-chat`)

Ou via terminal:

```powershell
code --install-extension github.copilot
code --install-extension github.copilot-chat
```

## 🔐 Login no GitHub

1. Clique no ícone de conta (canto inferior esquerdo do VS Code)
2. Selecione **"Sign in with GitHub to use GitHub Copilot"**
3. Complete a autenticação no navegador
4. Autorize o VS Code a acessar sua conta

## 🚀 Como Usar o Copilot Chat

### Atalhos de Teclado

| Atalho | Função |
|--------|--------|
| `Ctrl+Alt+I` | Abrir painel do Chat (lateral) |
| `Ctrl+I` | Chat inline no editor |
| `Ctrl+Shift+I` | Chat rápido (popup) |

### Abrindo o Chat

1. **Painel lateral**: Clique no ícone do Copilot na barra lateral esquerda
2. **Comando**: `Ctrl+Shift+P` → Digite "GitHub Copilot: Open Chat"

### Comandos Úteis no Chat

- `/explain` - Explica o código selecionado
- `/fix` - Sugere correções para problemas
- `/tests` - Gera testes para o código
- `/doc` - Gera documentação
- `@workspace` - Pergunta sobre todo o projeto

## 🔧 Resolução de Problemas

### O Chat não aparece

1. **Verifique a instalação**:
   ```
   Ctrl+Shift+P → Extensions: Show Installed Extensions
   ```
   Procure por "GitHub Copilot Chat"

2. **Reinstale a extensão**:
   ```powershell
   code --uninstall-extension github.copilot-chat
   code --install-extension github.copilot-chat
   ```
   
   **Possíveis erros durante instalação:**
   - "Command 'code' not found": Adicione o VS Code ao PATH ou abra via menu (View → Command Palette → Install 'code' command in PATH)
   - "Extension not found": Verifique sua conexão com internet
   - "Cannot install": Tente executar como administrador

3. **Reinicie o VS Code**:
   ```
   Ctrl+Shift+P → Developer: Reload Window
   ```

### Erro de autenticação

1. **Faça logout e login novamente**:
   ```
   Ctrl+Shift+P → GitHub Copilot: Sign Out
   Ctrl+Shift+P → GitHub Copilot: Sign In
   ```

2. **Limpe o cache de autenticação**:
   - Feche o VS Code
   - Delete a pasta: `%APPDATA%\Code\User\globalStorage\github.copilot-chat`
   - Reabra o VS Code

### Chat está lento ou não responde

**🚨 SOLUÇÃO RÁPIDA - Chat não responde a mensagens:**

1. **Reinicie o VS Code completamente**:
   - Feche todas as janelas do VS Code
   - Abra novamente

2. **Force a reconexão do Copilot**:
   ```
   Ctrl+Shift+P → "Developer: Reload Window"
   ```

3. **Faça logout e login novamente**:
   ```
   Ctrl+Shift+P → "GitHub Copilot: Sign Out"
   Ctrl+Shift+P → "GitHub Copilot: Sign In"
   ```

4. **Limpe o cache do Copilot Chat** (PowerShell como Admin):
   ```powershell
   # Feche o VS Code primeiro!
   Remove-Item -Recurse -Force "$env:APPDATA\Code\User\globalStorage\github.copilot" -ErrorAction SilentlyContinue
   Remove-Item -Recurse -Force "$env:APPDATA\Code\User\globalStorage\github.copilot-chat" -ErrorAction SilentlyContinue
   Remove-Item -Recurse -Force "$env:APPDATA\Code\Cache" -ErrorAction SilentlyContinue
   Remove-Item -Recurse -Force "$env:APPDATA\Code\CachedData" -ErrorAction SilentlyContinue
   ```

5. **Reinstale as extensões**:
   ```powershell
   code --uninstall-extension github.copilot-chat
   code --uninstall-extension github.copilot
   code --install-extension github.copilot
   code --install-extension github.copilot-chat
   ```

6. **Ou execute o script automático** (na pasta do projeto):
   ```powershell
   .\fix-vscode.bat
   ```

7. **Verifique sua conexão com a internet**
8. **Verifique o status do GitHub Copilot**: https://www.githubstatus.com/

### Configuração de Limites do Agente

Se aparecer a mensagem: **"Copilot has been working on this problem for a while..."**, isso significa que o limite de requests foi atingido.

**Para configurar o limite:**

1. Clique em **"Configure max requests"** na mensagem, OU
2. Vá em `Ctrl+Shift+P` → "Preferences: Open Settings (JSON)" e adicione:

```json
{
  "github.copilot.chat.agent.maxTurnRequests": 25
}
```

**Valores recomendados:**
| Valor | Uso |
|-------|-----|
| **10** | Mais controle, pede confirmação frequentemente |
| **15-20** | Equilíbrio (recomendado para maioria) |
| **25-30** | Para tarefas complexas |
| **50** | Menos interrupções, tarefas muito longas |

**Dica**: Comece com **20** e ajuste conforme sua necessidade.

### "Copilot is not available"

Possíveis causas:
- Assinatura expirada - Verifique em https://github.com/settings/copilot
- Bloqueio de firewall/proxy - Libere `*.github.com` e `*.copilot.microsoft.com`
- VPN interferindo - Tente desativar temporariamente

## ⚙️ Configurações Recomendadas

O projeto já inclui configurações otimizadas em `.vscode/settings.json`:

```json
{
  "github.copilot.enable": {
    "*": true,
    "typescript": true,
    "typescriptreact": true
  },
  "github.copilot.chat.enabled": true,
  "github.copilot.chat.localeOverride": "pt-BR",
  "editor.inlineSuggest.enabled": true
}
```

## 📋 Checklist de Verificação

- [ ] VS Code versão 1.84+
- [ ] Extensão GitHub Copilot instalada
- [ ] Extensão GitHub Copilot Chat instalada
- [ ] Logado na conta GitHub
- [ ] Assinatura Copilot ativa
- [ ] Conexão com internet estável

## 🆘 Suporte Adicional

- [Documentação oficial do GitHub Copilot](https://docs.github.com/copilot)
- [Troubleshooting do Copilot](https://docs.github.com/copilot/troubleshooting-github-copilot)
- [GitHub Community](https://github.com/orgs/community/discussions)

---

**Dica**: Se o problema persistir após seguir todos os passos, tente desinstalar completamente o VS Code, deletar as pastas de configuração em `%APPDATA%\Code` e reinstalar.
