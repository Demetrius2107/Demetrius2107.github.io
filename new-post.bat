@echo off
rem 新建博文（Windows 双击版）: new-post.bat "文章标题"
cd /d "%~dp0"
bash new-post.sh %*
