---
title: mc服务端部署方式-1
date: 2026-01-27 13:17:44
top_group_index: 3
swiper_index: 3
category: 服务搭建
tags:
  - 服务器
  - 游戏
  - minecraft
cover: https://img.aresdev.qzz.io/images/mc.webp
description: 适用于windows的mc服务端搭建教程
ai: 本文介绍了在Windows系统本地搭建《我的世界》（Minecraft）服务器的方法。首先概述了游戏背景和服务器搭建工具，推荐使用MSL开服器或mcsmanager启动器。详细介绍了不同类型的服务端（插件端、模组端、混合端等）及其特点，推荐使用Arclight混合服务端。通过图文结合的方式演示了使用MSL开服器配置服务器的完整流程，包括选择模式、设置路径、配置Java环境等步骤。最后提供了实现公网联机的四种方案，重点说明了MSL支持的FRP内网穿透和点对点联机两种方式。
---

## 1 前言

《我的世界》（Minecraft）是一款沙盒类电子游戏，开创者为马库斯·阿列克谢·泊松（Notch）。游戏由Mojang Studios维护，现隶属于微软Xbox游戏工作室。游戏最初于2009年5月17日作为Classic版本发布，并于2011年11月18日发布Java正式版。游戏平台囊括桌面设备、移动设备和游戏主机。中国版于2016年5月20日在中国大陆运营 ，由网易游戏代理 。

本教程来介绍一下在本地搭建mc服务器的方法。

## 2 所需工具

[这里提供一个前端写的mc小网页，包括了mod下载和客户端启动器，感兴趣的可以在这里了解](https://worlddawnares.github.io/MC_web-vst/)

[如果有想改进这个网页的也可以点此获取源码](https://github.com/WorldDawnAres/MC_web-vst)

在windows里可用来搭建mc服务器的方式也很多，给大家推荐几个比较简单的方式:

>- 1.[MSL开服器](https://www.mslmc.cn/)
>- 2.[mcsmanager启动器](https://www.mcsmanager.com/)
>如果动手能力强也可以直接下载服务端jar并配置环境；

下面说一下需要的软件：

- 1.java环境(根据需要部署的`mc版本`决定)
- 2.下载上面提到的开服软件或者下载`服务端jar`
- 3.添加相关的mod
- 4.根据需求选择相应的映射工具

### 2.1 各服务端介绍

由于现在的服务端比较多，给大家介绍一下不同服务端的区别:
服务端分为四个类型，第一种是`插件服务端`，这种是只支持安装服务端的插件，适合想玩原版游戏但需要扩展一些玩法的来搭建；第二种是`模组服务端`，这种是只能安装mod但是不支持一些服务端插件的，适合需要添加较多技术模组、生存模组、RPG 模组；第三种是`介于前两者之间`的服务端，这种服务端是`既支持服务端插件也支持添加mod`；最后一种就是不支持服务端插件和模组的,这种服务端主要是`快照服`,只体验快照版功能,当然也有一些比较老的服务端兼容差。

>- 1.`paper`（插件服务端）：基于 Spigot 的高性能 Minecraft 服务端。
>- 2.`purpur`（插件服务端）：完全兼容 Paper 插件，安装方式与 Paper 类似
>- 3.`Leaf`（插件服务端）:一个高性能的 Paper 分支，主打性能优化与原版机制的平衡。
>- 4.`Leaves`（插件服务端）
>- 5.`Spigot`（插件服务端）
>- 6.`Bukkit`（插件服务端）：最早的 Minecraft 插件服务端框架之一。
>- 7.`Folia`（插件服务端）：Paper 团队推出的多线程服务端分支。
>- 8.`Pufferfish`（插件服务端）：高性能的 Paper 分支。
>- 9.`Pufferfish_Purpur`（插件服务端）：Pufferfish 与 Purpur 的融合版本，结合了 Purpur 的可配置性与 Pufferfish 的性能优化。
>- 10.`PufferfishPlus`（插件服务端）：Pufferfish 的增强版本，加入了更多企业级异步机制。
>- 11.`PufferfishPlus_Purpur`（插件服务端）：PufferfishPlus 与 Purpur 的融合版本，结合了 PufferfishPlus 的性能优化与 Purpur 的可配置性。
>- 12.`Travertine`（插件服务端）：是一个由 PaperMC 团队维护的代理服务端，基于 BungeeCord，专门支持多版本互联（尤其是旧版客户端）。
>- 13.`BungeeCord`（插件服务端）：最早的 Minecraft 代理服务端之一，由 Spigot 团队开发。
>- 14.`Velocity`（插件服务端）：PaperMC 团队开发的现代代理服务端。
>- 15.`NukkitX`（插件服务端）：非官方基岩版服务端。

***

>- 16.`neoforge`（模组服务端）:官方版本
>- 17.`forge`（模组服务端）:官方版本
>- 18.`fabric`（模组服务端）:官方版本
>- 19.`Lightfall`（模组服务端）：代理服务端，基于 Waterfall 改造而来，支持 Forge 模组跨服而设计。
>- 20.`Quilt`（模组服务端）：Fabric 改进而来。

***

>- `21.Arclight（混合服务端）:分为forge,fabric,neoforge三个并支持服务端插件与mod`
>- 22.`spongevanilla`（插件服务端）
>- 23.`Youer（混合服务端）`:但当前只有1.12.1,不过这个服务端比较新
>- 24.`Mohist（混合服务端）`:仅支持forge版本
>- 25.`CatServer（混合服务端）`:仅支持forge版本
>- 26.`Banner（混合服务端）`:Mohist的Fabric 分支服务端,仅支持fabric
>- 27.`SpongeForge（混合服务端）`仅支持forge版本
>- 28.`Vanilla`（不支持模组和插件）:官方版本
>- 29.`Vanilla-Snapshot`（不支持模组和插件`快照服`）:官方版本
>推荐`Arclight`部署

## 3 配置方法

这里以MSL为例:

>- 1.首先在启动程序后点击`服务器`然后添加服务器
{% imgf mc/mc1.webp %}
{% imgf mc/mc2.webp %}
>- 2.选择一个模式来进行配置服务(我这里选择自定义模式)
{% imgf mc/mc3.webp %}
>这里配置服务器根目录和名称
{% imgf mc/mc4.webp %}
>配置java环境
{% imgf mc/mc5.webp %}
>这里选择服务端jar；没有准备的就选第一个；之前下载好的就选第二个，如果有想自定义指令的就选第三个。
{% imgf mc/mc6.webp %}
>再就是配置启动的内存和其他参数
{% imgf mc/mc7.webp %}
>创建好之后选择创建的服务器打开设置
{% imgf mc/mc8.webp %}
>这里可以调整服务器的插件和模组情况，配置好后点击开服，首次运行会下载一些必备文件
>服务启动之后会显示这样
{% imgf mc/mc9.webp %}
{% imgf mc/mc10.webp %}
>然后我们启动相应客户端就可以访问服务器了
{% imgf mc/mc11.webp %}
>这里配置的服务器地址为msl启动的地址
{% imgf mc/mc12.webp %}
{% imgf mc/mc13.webp %}

## 4 配置公网连接

由于现在大多数网络都为net模式，所以只能获得私网地址，而如果要实现联机就需要获得公网地址

- 1.拉宽带的时候有要求获取公网ip(一般情况下可能要不到)
- 2.使用ipv6(需要一些技术水平)
- 3.使用云服务器
- 4.内网穿透

>msl有两种方式来进行联机
>第一种就是使用frp来联机
{% imgf mc/mc14.webp %}
{% imgf mc/mc15.webp %}
>[这里需要用具有公网的frps客户端,方法大家可以点此了解](https://www.mslmc.cn/docs/proxy/frp/)
>
>第二种就是点对点联机
{% imgf mc/mc16.webp %}
