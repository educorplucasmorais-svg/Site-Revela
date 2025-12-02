@echo off
echo Iniciando frontend Site-Revela em http://127.0.0.1:3050 ...

REM Abre um terminal separado rodando o Vite na porta 3050
start "Frontend - Site Revela" cmd /k "npm run dev -- --host=127.0.0.1 --port 3050"

REM Aguarda alguns segundos e abre o navegador na porta correta
timeout /t 4 /nobreak >nul
start "" http://127.0.0.1:3050/
