@echo off
echo.
echo ========================================
echo  Servidor Local - Portfolio Wesley Gomes
echo ========================================
echo.
echo Iniciando servidor na porta 8000...
echo.
echo Acesse: http://localhost:8000
echo.
echo Pressione CTRL+C para parar o servidor
echo.
cd /d "%~dp0"
python -m http.server 8000

