# 🤖 Guia de Configuração do GitHub Copilot Chat no VS Code

Este guia ajuda a configurar e resolver problemas do GitHub Copilot Chat no Visual Studio Code.

## ✅ Pré-requisitos

1. **Assinatura GitHub Copilot** - Você precisa de uma assinatura ativa do GitHub Copilot (Individual, Business ou Enterprise)
2. **VS Code atualizado** - Versão 1.84 ou superior
3. **Conta GitHub** - Logada no VS Code

## 📦 Instalação das Extensões

### Método 1: Automático (Recomendado)

Execute o script de correção:

```batch
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

1. **Verifique sua conexão com a internet**
2. **Verifique o status do GitHub Copilot**: https://www.githubstatus.com/
3. **Limpe o cache**:
   ```batch
   fix-vscode.bat
   ```

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
