@echo off
echo ========================================
echo Corrigir Deploy + Dominio
echo ========================================
echo.

cd /d C:\Users\Pichau\Documents\GitHub\Site-Revela

echo [1/4] Instalando dependencia faltante...
call npm install --save-dev @types/bcryptjs
echo ✓ @types/bcryptjs instalado
echo.

echo [2/4] Testando build...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build falhou!
    pause
    exit /b 1
)
echo ✓ Build OK
echo.

echo [3/4] Commitando correcao...
git add .
git commit -m "fix: adicionar @types/bcryptjs para corrigir erro TypeScript"
echo ✓ Commit criado
echo.

echo [4/4] Push para GitHub...
git push origin main
echo ✓ Deploy acionado
echo.

echo ========================================
echo ✅ CORRECAO ENVIADA!
echo ========================================
echo.
echo Aguarde 2-3 minutos para rebuild na Vercel.
echo.
echo PROXIMO PASSO: Configurar DNS do dominio
echo Me informe qual dominio voce quer usar!
echo.
pause
