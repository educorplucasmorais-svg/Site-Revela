@echo off
echo ========================================
echo Deploy Rapido - Vercel
echo ========================================
echo.

cd /d C:\Users\Pichau\Documents\GitHub\Site-Revela

echo [1/3] Testando build...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ Build falhou! Veja os erros acima.
    echo.
    pause
    exit /b 1
)
echo ✓ Build OK
echo.

echo [2/3] Commitando e enviando...
git add .
git commit -m "update: deploy de atualizacoes - %date% %time%"
git push origin main
echo ✓ Enviado para GitHub
echo.

echo [3/3] Deploy automatico acionado!
echo.
echo ========================================
echo ✅ CONCLUIDO!
echo ========================================
echo.
echo A Vercel vai rebuildar em 2-3 minutos.
echo Acompanhe: https://vercel.com/dashboard
echo.
pause
