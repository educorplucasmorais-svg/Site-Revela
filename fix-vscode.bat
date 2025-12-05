@echo off
echo ========================================
echo Corrigindo VS Code, Copilot Chat e Projeto
echo ========================================
echo.

echo [1/6] Parando processos Node...
taskkill /F /IM node.exe 2>nul
if %errorlevel% == 0 (
    echo ✓ Processos Node finalizados
) else (
    echo - Nenhum processo Node rodando
)
echo.

echo [2/6] Limpando cache do VS Code...
if exist "%APPDATA%\Code\Cache" (
    rd /s /q "%APPDATA%\Code\Cache" 2>nul
    echo ✓ Cache limpo
)
if exist "%APPDATA%\Code\CachedData" (
    rd /s /q "%APPDATA%\Code\CachedData" 2>nul
    echo ✓ CachedData limpo
)
echo.

echo [3/6] Limpando cache do GitHub Copilot...
if exist "%APPDATA%\Code\User\globalStorage\github.copilot" (
    rd /s /q "%APPDATA%\Code\User\globalStorage\github.copilot" 2>nul
    echo ✓ Cache do Copilot limpo
) else (
    echo - Cache do Copilot já está limpo
)
if exist "%APPDATA%\Code\User\globalStorage\github.copilot-chat" (
    rd /s /q "%APPDATA%\Code\User\globalStorage\github.copilot-chat" 2>nul
    echo ✓ Cache do Copilot Chat limpo
) else (
    echo - Cache do Copilot Chat já está limpo
)
echo.

echo [4/6] Verificando extensões do Copilot...
echo Instalando/atualizando GitHub Copilot...
code --install-extension github.copilot --force
if %errorlevel% == 0 (
    echo ✓ GitHub Copilot instalado/atualizado
) else (
    echo ⚠ Falha ao instalar GitHub Copilot. Verifique se o VS Code está instalado.
)
echo Instalando/atualizando GitHub Copilot Chat...
code --install-extension github.copilot-chat --force
if %errorlevel% == 0 (
    echo ✓ GitHub Copilot Chat instalado/atualizado
) else (
    echo ⚠ Falha ao instalar GitHub Copilot Chat. Verifique se o VS Code está instalado.
)
echo.

echo [5/6] Limpando node_modules...
if exist node_modules (
    echo Removendo node_modules...
    rd /s /q node_modules
    echo ✓ node_modules removido
) else (
    echo - node_modules já está limpo
)
echo.

echo [6/6] Reinstalando dependências...
call npm install
echo.

echo ========================================
echo ✅ Correção concluída!
echo ========================================
echo.
echo ======= PASSOS PARA ATIVAR COPILOT CHAT =======
echo.
echo 1. Feche o VS Code completamente
echo 2. Abra o VS Code novamente
echo 3. Ctrl+Shift+P e digite: "Reload Window"
echo 4. Verifique se está logado no GitHub:
echo    - Clique no ícone de conta (canto inferior esquerdo)
echo    - Faça login com sua conta GitHub
echo 5. Abra o Chat do Copilot:
echo    - Ctrl+Alt+I (Windows/Linux)
echo    - Ou clique no ícone do Copilot na barra lateral
echo 6. Se ainda não funcionar:
echo    - Ctrl+Shift+P → "GitHub Copilot: Sign Out"
echo    - Ctrl+Shift+P → "GitHub Copilot: Sign In"
echo.
echo ======= ATALHOS DO COPILOT CHAT =======
echo Ctrl+Alt+I     - Abrir painel do Chat
echo Ctrl+I         - Chat inline no editor
echo Ctrl+Shift+I   - Chat rápido
echo.
pause
