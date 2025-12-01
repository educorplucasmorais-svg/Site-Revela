@echo off
echo Executando correcoes...

REM Passo 1: Parar Node
echo [1/4] Parando Node...
taskkill /F /IM node.exe 2>nul

REM Passo 2: Limpar cache VS Code
echo [2/4] Limpando cache...
rd /s /q "%APPDATA%\Code\Cache" 2>nul
rd /s /q "%APPDATA%\Code\CachedData" 2>nul

REM Passo 3: Limpar node_modules
echo [3/4] Limpando node_modules...
cd /d C:\Users\Pichau\Documents\GitHub\Site-Revela
rd /s /q node_modules 2>nul

REM Passo 4: Reinstalar
echo [4/4] Reinstalando...
call npm install

echo.
echo CONCLUIDO!
echo.
echo Proximos passos:
echo 1. Pressione ESC no popup Groq
echo 2. Ctrl+Shift+P ^> Reload Window
echo 3. Teste o Copilot
