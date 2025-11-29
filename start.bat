@echo off
echo Iniciando Site Revela...
echo.
echo Abrindo 2 terminais:
echo - Terminal 1: Backend (porta 3000)
echo - Terminal 2: Frontend (porta 3050)
echo.

start "Backend - Site Revela" cmd /k "npm run server"
timeout /t 2 /nobreak >nul
start "Frontend - Site Revela" cmd /k "npm run dev -- --port 3000"
timeout /t 2 /nobreak >nul
start "Abrir Frontend" "http://localhost:3000/"

echo.
echo Servidores iniciados!
echo Frontend: http://localhost:3050
echo Backend: http://localhost:3000
echo.
echo Pressione qualquer tecla para fechar este terminal...
pause >nul
