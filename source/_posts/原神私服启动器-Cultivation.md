---
title: 原神私服启动器
date: 2026-01-18 1:26:31
category: 服务搭建
tags:
  - python
  - flask
cover: https://img.aresdev.qzz.io/images/Cultivation/yuangame.webp
description: Cultivation
ai: true
---

## 开始之前

在阅读此教程前需要了解以下内容:

- 1.[原神私服(5.3)本地搭建方法](https://blog.csdn.net/qq_51891724/article/details/151295110?spm=1001.2014.3001.5501)
- 2.[原神私服修改器](https://blog.csdn.net/qq_51891724/article/details/151296849?spm=1001.2014.3001.5501)

## 程序介绍

如GitHub仓库介绍中所说：一个游戏启动器，旨在轻松将某动漫游戏的流量代理到私人服务器。

## 下载地址

此处提供Cultivation启动器的下载地址
[Cultivation](https://github.com/Grasscutters/Cultivation)

## 使用方法

在GitHub仓库下载Cultivation后解压并运行程序
{% imgf Cultivation/yuan1.webp %}
{% imgf Cultivation/yuan2.webp %}
我们点击右上角的设置调整为中文并设置服务器和客户端位置
{% imgf Cultivation/yuan3.webp %}
{% imgf Cultivation/yuan4.webp %}
在里面有个`自动修改RSA`这个选项勾选就是启用此程序内置补丁，也就不需要之前教程的`hk4e-patch-universal补丁`了，当然如果之前已经下载了补丁也可以不勾选；
这里勾选的好处就是可以随时在主页面调整程序ip地址和端口(`但需要对服务端ip和端口做相应的调整`)
{% imgf Cultivation/yuan5.webp %}
设置中有随游戏启动`Grasscutter选项`这个勾选后在启动游戏时会`自动打开服务端`；
如果想自定义java路径的可以设置下面的配置
{% imgf Cultivation/yuan6.webp %}
点击右上角的下载按钮可以自己选择下载游戏的不同版本!
{% imgf Cultivation/yuan7.webp %}

不过程序内置的下载速度并不理想，所以建议自行下载好需要的客户端和服务器直接在程序内指定

以上就是Cultivation的全部内容，感谢你的支持
