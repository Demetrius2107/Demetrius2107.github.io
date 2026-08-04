@echo off
rem 双击发布：提交并推送全部改动，GitHub Actions 自动构建部署.
rem 若需自定义提交说明，命令行执行: publish.bat "说明"
cd /d "%~dp0"
bash publish.sh
pause
