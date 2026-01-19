---
title: umami部署
date: 2026-01-19 21:11:41
category: 教程
tags:
  - Vercel
  - postgreSQL
  - 博客
cover: https://img.aresdev.qzz.io/images/uma/uma.webp
description: hexo主题选择
ai: 本文介绍了如何使用Vercel部署umami，并在安知鱼主题博客来引入umami统计的方法
---

**本文开始之前需要准备一个GitHub账户，后期所有注册都可以使用GitHub来注册**

## GitHub克隆仓库

我们需要先去GitHub上将umami仓库克隆下来，然后在Vercel上部署
[umami](https://github.com/umami-software/umami)
{% imgf uma/uma1.webp %}
如果没有注册就先注册一个账户
{% imgf uma/uma2.webp %}
如图所示点击fork克隆
{% imgf uma/uma3.webp %}
fork之后去[Vercel](https://vercel.com/)
{% imgf uma/uma4.webp %}
没有注册的就注册一下账户
接下来在我的项目中我们点击右上角的add new里的project来选择项目
{% imgf uma/uma5.webp %}
{% imgf uma/uma6.webp %}
选择之前复刻的umami后的import来部署
{% imgf uma/uma7.webp %}
在Environment Variables里添加：

``` bash
|Key|Value|
|DATABASE_URL |这里需要复制数据库的url|
|APP_SECRET|这里可以随便写个密码|
```

APP_SECRET主要用来加密的，不加这个参数也没什么影响

### supabase

我们现在需要找一个数据库来给umami做存储，不过umami用的是postgreSQL
所以我们需要去supabase来创建一个数据库
[supabase](https://supabase.com/)
{% imgf uma/uma8.webp %}
注册账户后就是这样
{% imgf uma/uma9.webp %}
然后我们需要点击右上角的new project新建一个项目
{% imgf uma/uma10.webp %}
前两个是用户名和密码，第三个是需要选择的数据库地址，我们选择最近的国家即可
然后点击Create new project创建项目
{% imgf uma/uma11.webp %}
创建好后页面就是这种
现在我们需要点击最上面的connect打开连接部分
{% imgf uma/uma12.webp %}
然后在method里选择Session pooler
{% imgf uma/uma13.webp %}
复制此处的连接，并且我们需要把[YOUR-PASSWORD]替换成之前创建项目的密码后复制到Vercel的SUPABASE_URL里
做完这些后点击Vercel上的部署即可
{% imgf uma/uma14.webp %}
部署好后我们直接点击部署的网址访问后端
{% imgf uma/uma15.webp %}
此处服务默认的用户名和密码是admin/umami
登录之后可以修改登陆密码
{% imgf uma/uma16.webp %}
我们点击添加网站来指定一个网站管理
{% imgf uma/uma17.webp %}
具体配置可以参考[官方文档](https://umami.is/docs/api)

我们需要在umami里点击编辑找到网站ID和跟踪代码，分别将这两个复制到
_config.anzhiyu.yml的websiteId:

``` bash
# Umami 统计配置（关于页面访问统计卡片）地方
umami:
  enable: true
  # Umami API 地址，如 https://analytics.example.com
  apiHost: 
  # 网站 ID
  websiteId: 
  # API Token（在 Umami 后台 Settings -> API Keys 中生成）
  token: 
```

还有如下的bottom部分

``` bash
# Inject
# Insert the code to head (before '</head>' tag) and the bottom (before '</body>' tag)
# 插入代码到头部 </head> 之前 和 底部 </body> 之前
inject:
  head:
    # 自定义css
    # - <link rel="stylesheet" href="/css/custom.css" media="defer" onload="this.media='all'">

  bottom:
    # 自定义js
    # - <script src="/js/xxx"></script>
```

## 引入到about

放一个效果图
{% imgf uma/uma18.webp %}
我们参考[官方文档](https://umami.is/docs/api)可知需要Umami Cloud来解决这个问题
[点击此处](https://umami.is/pricing)
可以注册账户去使用hobby还是够用的
{% imgf uma/uma19.webp %}
或者使用我fork的仓库的[点此访问](https://github.com/AresDown/umami)
src\app\api\umami\route.js文件和vercel.json上传到github仓库里面然后在Value重新部署
不过我这个route.js需要在Value添加一些环境变量

``` bash
|Key|Value|
|SUPABASE_URL |这里需要复制supabase的url|
|UMAMI_WEBSITE_ID|这里是Umami统计配置（关于页面访问统计卡片）地方的websiteId:|
|UMAMI_FAKE_TOKEN|这里是Umami统计配置（关于页面访问统计卡片）地方的token:|
|SUPABASE_SERVICE_ROLE_KEY|这里需要复制supabase的service role key|
```

下面来说一下参数获取的地方

- 1.SUPABASE_URL
在[supabase](https://supabase.com/)
{% imgf uma/uma20.webp %}
点击project settings
{% imgf uma/uma21.webp %}
找到data api
{% imgf uma/uma22.webp %}
复制project url就是SUPABASE_URL的value值
- 2.SUPABASE_SERVICE_ROLE_KEY
在api keys里找到service role复制里面的内容就是SUPABASE_SERVICE_ROLE_KEY的value值
{% imgf uma/uma23.webp %}
- 3.UMAMI_FAKE_TOKEN
这个就是Value自己指定一个值就可以
- 4.UMAMI_WEBSITE_ID
这个就是在umami里点击编辑找到网站ID
做完这些就重新部署一下umami即可
{% imgf uma/uma24.webp %}

## 测试方法和常见问题

- 1.可使用如下代码测试（Linux）

``` bash
curl -i "https://你的域名/api/websites/你的网站id/stats?startAt=0&endAt=9999999999999" \
  -H "Authorization: Bearer 你的token" 
```

如果正常输出则说明配置成功

- 2.如果有umami密码忘记的情况可以[点此查看](https://github.com/umami-software/umami/discussions/2483)

``` bash
 INSERT INTO "user" (user_id, username, role, password) VALUES ('41e2b680-648e-4b09-bcd7-3e2b10c06264' , 'admin', 'admin', '$2b$10$BUli0c.muyCW1ErNJc3jL.vFRFtFJWrT8/GcR4A.sUdCznaXiqFXa');
```
