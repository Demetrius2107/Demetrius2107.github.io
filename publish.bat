@echo off
rem 一键提交推送（Windows 双击版）: publish.bat "提交说明"
cd /d "%~dp0"
bash publish.sh %*
pause
