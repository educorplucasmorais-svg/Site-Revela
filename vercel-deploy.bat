@echo off
echo ========================================
echo Deploy Completo - Vercel
echo ========================================
echo.

cd /d C:\Users\Pichau\Documents\GitHub\Site-Revela

echo [1/5] Limpando build anterior...
if exist dist\client rd /s /q dist\client
echo ✓ Limpo
echo.

echo [2/5] Testando build...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build falhou! Corrija os erros acima.
    pause
    exit /b 1
)
echo ✓ Build OK
echo.

echo [3/5] Verificando Git status...
git status --short
echo.

echo [4/5] Commitando mudancas...
git add .
git commit -m "deploy: atualizar site e corrigir build"
echo ✓ Commit criado
echo.

echo [5/5] Push para GitHub (deploy automatico Vercel)...
git push origin main
echo ✓ Push concluido
echo.

echo ========================================
echo ✅ DEPLOY INICIADO!
echo ========================================
echo.
echo O GitHub vai acionar o deploy automatico na Vercel.
echo.
echo Acompanhe em:
echo https://vercel.com/dashboard
echo.
echo Aguarde 2-3 minutos para conclusao.
echo.
pause
