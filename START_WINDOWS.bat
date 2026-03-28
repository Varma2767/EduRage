@echo off
title EduManage Pro — Launcher
color 0B
echo.
echo  ╔══════════════════════════════════════════╗
echo  ║   EduManage Pro — Student Management    ║
echo  ║   Starting local server on port 8080... ║
echo  ╚══════════════════════════════════════════╝
echo.

:: Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Python found. Starting server...
    echo  [INFO] Opening http://localhost:8080 in your browser...
    timeout /t 2 /nobreak >nul
    start http://localhost:8080
    python -m http.server 8080
    goto :done
)

:: Fallback: check for python3
python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Python3 found. Starting server...
    timeout /t 2 /nobreak >nul
    start http://localhost:8080
    python3 -m http.server 8080
    goto :done
)

:: Fallback: try Node/npx serve
npx --version >nul 2>&1
if %errorlevel% == 0 (
    echo  [OK] Node.js found. Starting via npx serve...
    timeout /t 2 /nobreak >nul
    start http://localhost:8080
    npx serve -p 8080 .
    goto :done
)

:: Nothing found
echo  [ERROR] Python or Node.js is required to run this app.
echo.
echo  Please install Python from: https://python.org
echo  Then run this file again.
echo.
pause

:done
