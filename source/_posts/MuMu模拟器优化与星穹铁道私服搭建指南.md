---
title: MuMu模拟器优化与星穹铁道私服搭建指南
date: 2026-01-27 16:36:58
category: 模拟器
tags:
  - 游戏
  - 模拟器
cover: https://img.aresdev.qzz.io/images/Cultivation/yuangame.webp
description: 安卓模拟器
ai: 本文介绍了部署《崩坏：星穹铁道》1.2.0版本私服的方法，包括所需工具（游戏本体包和KCN-StarRailServer服务端）及基本操作步骤。同时推荐了多款自动化辅助工具（如StarRailAssistant、Auto_Simulated_Universe等）用于官方服日常任务，并详细说明MuMu模拟器的优化设置方法，包括Vulkan模式开启、独立显卡配置等，以解决渲染问题。文章还提供了相关资源链接和技术参考文档。
---

本文介绍一下目前部署崩坏星穹铁道私服的方法，由于目前私服的代码还没有更新，因此本文使用1.2.0版本，如需新版本请自行寻找。

不了此类部署的可以看我之前的文章[原神私服的部署方法](https://blog.csdn.net/qq_51891724/article/details/151295110)
此处补充一个介绍原神部署的网站[次元博客](https://blog.oikun.com)

## 一.所需工具

- 1.可选择[星铁本体包GitHub](https://github.com/360NENZ/SR-Download-Library)或者[OriLight的自留地](https://blog.amarea.cn/)提供的游戏本体
`注：如果需要1.2.0的本体目前只有`[百度网盘](https://pan.baidu.com/s/1mWNMlRFBF56g0Up_Ahcubg?pwd=cjuh)`有资源`
- 2.[KCN-StarRailServer](https://github.com/JDDKCN/KCN-StarRailServer)只支持1.2.0版本

## 二.使用方法

下载并解压游戏本体和服务端，启动服务端后指定游戏本体路径。按照github中如下步骤操作即可。
{% imgf mumu/mumu1.webp %}

## 工具推荐

目前在官方服可以用一些自动化工具来辅助完成每日任务：

- 星穹铁道
1.[自动化助手，帮你完成从启动到退出的崩铁日常 | 多账号托管](https://github.com/Shasnow/StarRailAssistant)
2.[模拟宇宙自动化 （Honkai Star Rail - Auto Simulated Universe）](https://github.com/CHNZYX/Auto_Simulated_Universe)
- 原神
4.[BetterGI](https://bettergi.com)
5.[GIAutoPlayer](https://github.com/lihua10/GIAutoPlayer)
6.[ok-ys](https://gitee.com/andnnl/ok-ys)
- 安卓模拟器
[MuMu模拟器](https://mumu.163.com/download/)

## 模拟器参数调整

这里使用MuMu模拟器来演示
{% imgf mumu/mumu2.webp %}
1.像原神星穹铁道之类的大型游戏在模拟器里面需要开启`Vulkan`模式，使用`DirectX`会出现渲染问题

据我测试如果使用`Vulkan`模式，但没有指定独立显卡的时候会出现启动后`启动异常`的问题
{% imgf mumu/mumu3.webp %}
2.其次需要在Windows设置里面添加模拟器设备
{% imgf mumu/mumu4.webp %}
在当前目录找到`nx_device`文件夹
{% imgf mumu/mumu5.webp %}
再找到`shell`文件夹
{% imgf mumu/mumu6.webp %}
找到`MuMuNxDevice.exe`并`右键`复制文件地址
{% imgf mumu/mumu7.webp %}
在Windows设置中点击添加桌面应用后粘贴之前复制的地址
{% imgf mumu/mumu8.webp %}
选中后添加并将`GPU首选项`改为`独立显卡`
{% imgf mumu/mumu9.webp %}
还需要在英伟达控制面板里将`显示器模式`换为`独立显卡`
{% imgf mumu/mumu10.webp %}
此时就可以解决渲染问题。
[具体参考这个](https://mumu.163.com/help/20230210/35048_1072613.html)
如果还没有解决需要将驱动更新到最新版本
