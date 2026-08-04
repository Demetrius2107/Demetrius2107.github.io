@echo off
rem 全局命令: newpost "标题" 在任意目录新建博文.
cd /d "%~dp0.."
bash new-post.sh %*
