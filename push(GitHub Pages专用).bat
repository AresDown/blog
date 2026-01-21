@echo off

set TZ=Asia/Shanghai

set ALGOLIA_ADMIN_API_KEY=你的AdminApiKey

hexo clean ^
&& hexo g ^
&& hexo g --config _config.yml,_config.github.yml ^
&& hexo d ^
&& hexo algolia

pause
