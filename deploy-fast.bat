@echo off
REM Deploy rapido SEM build test (use com cuidado)
echo Deploy EXPRESS - sem teste de build
echo.

cd /d C:\Users\Pichau\Documents\GitHub\Site-Revela

git add .
git commit -m "quickfix: %date% %time%"
git push origin main

echo.
echo ✅ Enviado! Vercel vai buildar em 2min.
pause
