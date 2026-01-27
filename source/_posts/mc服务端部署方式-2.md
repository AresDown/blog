---
title: mc服务端部署方式-2
date: 2026-01-27 13:30:17
category: 服务搭建
tags:
  - 服务器
  - 游戏
  - minecraft
cover: https://img.aresdev.qzz.io/images/mc.webp
description: 适用于windows的mc服务端搭建教程-mcsmanager部署
ai: 本文介绍了MCSManager服务器管理工具的部署与使用教程。主要内容包括：1）下载并解压MCSManager，运行start.bat启动服务；2）两种创建Minecraft服务器的方法（通过应用市场模板或手动配置）；3）服务器文件结构说明，包括libraries、mods、plugins等重要目录；4）推荐8款实用插件，如AuthMe登录插件、LuckPerms权限管理、DragonCore自定义功能扩展等。教程详细讲解了Java路径配置、工作目录设置等关键步骤，并配有操作截图，适合新手快速搭建Minecraft服务器。
---

## 1 前言

[上个教程我们介绍了MSL的部署，想了解的可以点此访问csdn](https://blog.csdn.net/qq_51891724/article/details/152803503)或者在本站搜索`mc服务端部署方式-1`查看
>本次教程介绍一些实用插件
>和mcsmanager部署方式

## 2 配置方式

[点此下载mcsmanager并解压](https://www.mcsmanager.com/)
{% imgf mc/mc1-1.webp %}
{% imgf mc/mc1-2.webp %}
>双击start.bat运行
{% imgf mc/mc1-3.webp %}
{% imgf mc/mc1-4.webp %}
{% imgf mc/mc1-5.webp %}
>创建账号
{% imgf mc/mc1-6.webp %}
>如果之前有了解相关知识就选择老用户
{% imgf mc/mc1-7.webp %}
>如果进入后页面是english可以在以下设置修改
{% imgf mc/mc1-8.webp %}
>修改之后点击下方保存，如果保存后没有改变就刷新一下网页

### 2.1 创建服务端(方法1-网速问题可能失败)

>下面来说一下怎么配置服务，首先点击应用实例
>再点击前往应用市场安装应用
{% imgf mc/mc1-9.webp %}
>这里面提供了比较多的游戏服务，我们选择minecraft
{% imgf mc/mc1-10.webp %}
>在里面可以选择相应模板进行创建
{% imgf mc/mc1-11.webp %}
>起一个服务器名字
{% imgf mc/mc1-12.webp %}
{% imgf mc/mc1-13.webp %}
>然后会自动跳转到管理界面
{% imgf mc/mc1-14.webp %}
>在里面配置启动命令，也就是指定java路径
{% imgf mc/mc1-15.webp %}
>如果java路径在C://Program Files/Java/bin/java.exe就用如下代码

```bash
>"C://Program Files/Java/bin/java.exe" -jar `server.jar`
```

>`代码中的server.jar需要替换为文件夹下的真实jar文件`

### 2.2 创建服务端(方法2)

>本方法需要提前建立服务器文件夹和下载服务器文件
[点此访问csdn博客了解服务器jar文件介绍](https://blog.csdn.net/qq_51891724/article/details/152803503)或者在本站`找mc服务端部署方式-1`查看
>此方法使用了mohist服务端

- 在应用实例里面选择新建应用

{% imgf mc/mc1-16.webp %}
>选择直接创建
{% imgf mc/mc1-17.webp %}
>先填好名称，然后选择mc java版服务器并点击创建
{% imgf mc/mc1-18.webp %}
>在应用实例设置里面配置启动命令
{% imgf mc/mc1-19.webp %}
>这里说明一下指定启动命令的时候需要先指定`java.exe`位置然后加上 -jar参数，由于在高级设置里要指定文件目录，所以这个启动命令最后指定的是`服务端jar文件`
{% imgf mc/mc1-20.webp %}
然后在高级设置里面设置工作目录
{% imgf mc/mc1-21.webp %}
>以上配置完后我们需要对终端进行设置
{% imgf mc/mc1-22.webp %}
>然后启动服务，首次运行需要下载依赖
{% imgf mc/mc1-23.webp %}
>完成之后就会启动服务
>有的时候在mcsmanager下载会网络不稳定，可以先用MSL把文件下载好在迁移到mcsmanager
>启动成功之后就是如下页面，我们要同意协议后才能继续
>在里面输入true
{% imgf mc/mc1-24.webp %}
>输入之后成功启动会出现如下内容
{% imgf mc/mc1-25.webp %}
{% imgf mc/mc1-26.webp %}

## 3 服务器文件介绍

{% imgf mc/mc1-27.webp %}
>如图libraries文件夹是之前mohist下载的依赖文件
logs为日志，mods是存放mc模组的地方，mohist-config存放的是mohist的配置内容，plugins是存放服务端插件的地方，world就是服务器的地图存放位置
{% imgf mc/mc1-28.webp %}
在上图所示的文件里面比较重要的是server.properties服务器游戏选项，ops.json权限管理，usercache.json用户登录存储
>服务器配置文件可以在下面调整
{% imgf mc/mc1-29.webp %}

## 4 服务器插件推荐

- 1.AuthMe：一个玩家登录控制插件
[点此查看介绍与下载](https://www.spigotmc.org/resources/authmereloaded.6269/)
- 2.LuckPerms-Bukkit：服务器权限控制插件
[点此查看介绍与下载](https://www.spigotmc.org/resources/luckperms.28140/)
- 3.PlaceholderAPI：允许服务器所有者以统一的格式显示来自各种插件的信息。
[点此查看介绍与下载](https://www.spigotmc.org/resources/placeholderapi.6245/)
- 4.ProtocolLib：一个优化的扩展
[点此查看介绍与下载](https://www.spigotmc.org/resources/protocollib.1997/)
- 5.ServerListPlus：服务器外观修改扩展
[点此查看介绍与下载](https://www.spigotmc.org/resources/serverlistplus.241/)
- 6.spark：分析服务器运行情况的扩展
[点此查看介绍与下载](https://www.spigotmc.org/resources/spark.57242/)
- 7.DragonCore：之前mcbbs论坛的一个具有丰富的自定义功能的扩展，但只有1.12.1的服务器版本
[点此查看介绍与下载](https://imcbbs.com/resources/%E3%80%90long-zhi-he-xin%E3%80%91-dragoncore-zi-ding-yi-bei-bao-hud-wu-pin-mo-xing-wu-pin-tie-tu-guai-wu-mo-xing-1-12-2.40/)
- 8.DragonAuthMe：需要DragonCore前置的登录插件
[点此查看介绍与下载](https://bbs.mc9y.net/resources/521/)
{% imgf mc/mc1-30.webp %}
