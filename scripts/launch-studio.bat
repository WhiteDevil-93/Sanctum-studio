@echo off
REM =====================================================================
REM Sanctum Studio - Windows Native Desktop Launcher
REM Launches the background studio server and opens the browser/desktop window
REM =====================================================================

cd /d "%~dp0\.."
echo Launching Sanctum Studio...

start /b "" node bin\sanctum-studio.js
timeout /t 1 /nobreak >nul
start http://127.0.0.1:4180

echo Sanctum Studio is running at http://127.0.0.1:4180
