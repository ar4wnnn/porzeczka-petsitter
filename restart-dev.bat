@echo off
echo Killing any running Next.js processes...
taskkill /f /im node.exe
timeout /t 2
echo Starting development server...
npm run dev 