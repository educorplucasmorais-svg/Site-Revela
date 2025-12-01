@echo off
echo Testando build local antes do push...
echo.

call npm run build

if %errorlevel% neq 0 (
    echo.
    echo ❌ Build falhou! Corrija os erros antes de fazer push.
    pause
    exit /b 1
)

echo.
echo ✅ Build local funcionou!
echo Agora fazendo commit e push...
echo.

git add .
git commit -m "fix: corrigir erro de sintaxe no AdminLogin.tsx para deploy Vercel"
git push origin main

echo.
echo ✅ Push concluido! Vercel vai rebuildar automaticamente.
echo.
pause
