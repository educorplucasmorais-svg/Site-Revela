@echo off
echo ========================================
echo Corrigindo VS Code e Projeto
echo ========================================
echo.

echo [1/4] Parando processos Node...
taskkill /F /IM node.exe 2>nul
if %errorlevel% == 0 (
    echo ✓ Processos Node finalizados
) else (
    echo - Nenhum processo Node rodando
)
echo.

echo [2/4] Limpando cache do VS Code...
if exist "%APPDATA%\Code\Cache" (
    rd /s /q "%APPDATA%\Code\Cache" 2>nul
    echo ✓ Cache limpo
)
if exist "%APPDATA%\Code\CachedData" (
    rd /s /q "%APPDATA%\Code\CachedData" 2>nul
    echo ✓ CachedData limpo
)
echo.

echo [3/4] Limpando node_modules...
if exist node_modules (
    echo Removendo node_modules...
    rd /s /q node_modules
    echo ✓ node_modules removido
) else (
    echo - node_modules já está limpo
)
echo.

echo [4/4] Reinstalando dependências...
call npm install
echo.

echo ========================================
echo ✅ Correção concluída!
echo ========================================
echo.
echo Próximos passos:
echo 1. Pressione Escape para fechar popup do Groq
echo 2. Ctrl+Shift+P → "Reload Window"
echo 3. Teste o Copilot novamente
echo.
pause
