@echo off
echo ================================================
echo Setup Completo - revelaia.com.br
echo ================================================
echo.
echo Este script vai:
echo 1. Corrigir erro TypeScript
echo 2. Fazer build e deploy
echo 3. Preparar para configuracao DNS
echo.
echo Pressione qualquer tecla para comecar...
pause >nul
cls

cd /d C:\Users\Pichau\Documents\GitHub\Site-Revela

echo ================================================
echo [1/5] Instalando @types/bcryptjs
echo ================================================
call npm install --save-dev @types/bcryptjs
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO ao instalar dependencia!
    pause
    exit /b 1
)
echo ✓ Instalado com sucesso
echo.

echo ================================================
echo [2/5] Testando Build Local
echo ================================================
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ BUILD FALHOU!
    echo Verifique os erros acima e corrija antes de continuar.
    pause
    exit /b 1
)
echo ✓ Build OK
echo.

echo ================================================
echo [3/5] Commitando Correcoes
echo ================================================
git add .
git commit -m "fix: adicionar @types/bcryptjs e preparar para revelaia.com.br"
if %errorlevel% neq 0 (
    echo ⚠️ Nada para commitar ou erro no Git
)
echo.

echo ================================================
echo [4/5] Push para GitHub (Deploy Automatico)
echo ================================================
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO ao fazer push!
    echo Verifique sua conexao e autenticacao GitHub.
    pause
    exit /b 1
)
echo ✓ Push concluido
echo.

echo ================================================
echo [5/5] Aguardando Deploy Vercel
echo ================================================
echo.
echo O deploy foi acionado automaticamente!
echo.
echo Acompanhe em:
echo https://vercel.com/dashboard
echo.
timeout /t 3 >nul
echo.

echo ================================================
echo ✅ PARTE 1 CONCLUIDA!
echo ================================================
echo.
echo ⏱️  Aguarde 2-3 minutos para o deploy completar.
echo.
echo ================================================
echo PROXIMA ETAPA: Configurar DNS
echo ================================================
echo.
echo 1. Acesse: https://hostinger.com.br
echo 2. Va em: Dominios → revelaia.com.br → DNS
echo.
echo 3. ADICIONE estes registros:
echo.
echo    Tipo: A
echo    Nome: @
echo    Valor: 76.76.21.21
echo    TTL: 3600
echo.
echo    Tipo: CNAME  
echo    Nome: www
echo    Valor: cname.vercel-dns.com
echo    TTL: 3600
echo.
echo 4. REMOVA registros antigos se conflitarem
echo.
echo 5. Depois acesse Vercel:
echo    https://vercel.com/dashboard
echo    Projeto: revela-site
echo    Settings → Domains → Add:
echo    - revelaia.com.br
echo    - www.revelaia.com.br
echo.
echo ================================================
echo Guia completo em:
echo SETUP-REVELAIA-COMPLETO.md
echo ================================================
echo.
pause
