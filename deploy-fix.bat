@echo off
cd /d C:\Users\Pichau\Documents\GitHub\Site-Revela

echo ========================================
echo Corrigindo Deploy Vercel
echo ========================================
echo.

echo [1/4] Testando build local...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build falhou! Verifique os erros acima.
    pause
    exit /b 1
)
echo ✓ Build OK
echo.

echo [2/4] Adicionando arquivos ao Git...
git add .
echo ✓ Arquivos adicionados
echo.

echo [3/4] Fazendo commit...
git commit -m "fix: corrigir erro de sintaxe AdminLogin.tsx para deploy Vercel"
echo ✓ Commit criado
echo.

echo [4/4] Enviando para GitHub...
git push origin main
echo ✓ Push concluido
echo.

echo ========================================
echo ✅ CONCLUIDO!
echo ========================================
echo.
echo A Vercel vai rebuildar automaticamente em alguns segundos.
echo Acompanhe em: https://vercel.com
echo.
pause
