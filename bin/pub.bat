@echo off
rem 全局命令: pub "提交说明" 在任意目录提交推送.
cd /d "%~dp0.."
bash publish.sh %*
