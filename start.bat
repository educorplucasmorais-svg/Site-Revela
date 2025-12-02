@echo off
echo Iniciando Site Revela...
echo.
echo Abrindo 2 terminais:
echo - Terminal 1: Backend (porta 3060)
echo - Terminal 2: Frontend (porta 3050)
echo.

start "Backend - Site Revela" cmd /k "npm run server"
timeout /t 5 /nobreak >nul
start "Frontend - Site Revela" cmd /k "npm run dev -- --host=127.0.0.1 --port 3050"
timeout /t 5 /nobreak >nul
start "" "http://127.0.0.1:3050/"

echo.
echo Servidores iniciados!
echo Frontend: http://127.0.0.1:3050
echo Backend: http://localhost:3060
echo.
echo Pressione qualquer tecla para fechar este terminal...
pause >nul
