@echo off
echo ========================================
echo   Site Revela - Instalacao Automatica
echo ========================================
echo.

echo [1/4] Instalando dependencias...
call npm install

echo.
echo [2/4] Copiando arquivo de configuracao...
if not exist .env (
    copy .env.example .env
    echo Arquivo .env criado! Por favor, configure suas credenciais do Supabase.
) else (
    echo Arquivo .env ja existe.
)

echo.
echo [3/4] Verificando configuracao...
if exist node_modules (
    echo ✓ Dependencias instaladas com sucesso!
) else (
    echo ✗ Erro ao instalar dependencias
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Instalacao concluida!
echo ========================================
echo.
echo Proximos passos:
echo 1. Configure o arquivo .env com suas credenciais do Supabase
echo 2. Execute: npm run server (em um terminal)
echo 3. Execute: npm run dev (em outro terminal)
echo 4. Acesse: http://localhost:5173
echo.
echo Consulte QUICKSTART.md para mais detalhes.
echo.
pause
