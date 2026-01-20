@echo off

set TZ=Asia/Shanghai

hexo clean ^
&& hexo g ^
&& hexo g --config _config.yml,_config.github.yml ^
&& hexo d ^
&& hexo algolia

pause
