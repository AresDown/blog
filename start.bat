@echo off
start http://localhost:4000/
hexo clean && hexo g && hexo s
pause