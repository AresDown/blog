---
title: x64安装istoreOS
date: 2026-01-27 23:14:06
category: 路由器
tags:
  - 网络
  - Linux
cover: https://img.aresdev.qzz.io/images/linux/istoreOS.webp
description: istoreOS软路由常用软件介绍
ai: 本文介绍了在x64设备上安装iStoreOS系统的详细步骤及其优势。相比通用Linux系统，iStoreOS专为NAS场景优化，提供开箱即用的存储管理、文件共享和图形化界面。安装过程包括下载固件、使用Rufus制作启动盘以及系统部署。文章重点推荐了iStoreX主题、路由狗可视化工具、磁盘管理、远程访问等12款实用插件，展示了iStoreOS丰富的功能生态。该系统特别适合需要低维护成本的家庭NAS应用场景，兼具路由器功能和NAS管理能力。
---
## 1 前言

我们在 VMware 上尝试过安装 OpenWrt、ImmortalWrt 和 iStoreOS 三种系统。其中 OpenWrt 和 ImmortalWrt 对硬件配置要求较低，能够灵活扩展功能，但在路由器内运行 Docker 或 KVM 等容器化/虚拟化应用时，性能和资源往往不足。这种情况下，可以考虑使用淘汰的家用电脑来承担这些任务。
[vmware安装istoreOS嵌入式软路由](https://blog.csdn.net/qq_51891724/article/details/155774351)
或本站搜索`vmware安装软路由`查看
[vmware安装openwrt与immortalwrt](https://blog.csdn.net/qq_51891724/article/details/155779683)
或本站搜索`vmware安装openwrt与immortalwrt`查看
那么为什么不直接在电脑上安装 Ubuntu 或其他通用 Linux 系统呢？

- Linux 系统适合做综合性服务器，功能全面，可运行各种服务，但在存储管理、家庭应用方面需要额外安装和配置，维护成本较高。
- 而iStoreOS专为 NAS 场景设计，内置存储管理、权限控制、文件共享协议（SMB/NFS/FTP）、图形化 Web 管理界面，以及丰富的插件生态，开箱即用，降低了部署和维护的复杂度。

## 2 安装方法

我们需要在官网选择固件并下载
[点此访问官网](https://site.istoreos.com/firmware)
{% imgf linux/x64/ins1.webp %}
此处我选择x86_64为例
下载好后我们一个U盘来制作系统安装盘
[点此下载rufus](https://rufus.ie/downloads/)
{% imgf linux/x64/ins2.webp %}
启动rufus后，选择要写入系统的设备和之前下载的系统安装包
{% imgf linux/x64/ins3.webp %}
{% imgf linux/x64/ins4.webp %}
然后点击开始来写入系统
{% imgf linux/x64/ins5.webp %}
将写好的U盘插入要制作的设备上在U盘启动后我们选择quickstart并选择install x86安装系统
安装后输入默认ip：192.168.100.1（地址可以自行修改）进入管理页面

我们可以通过网络向导来配置网络
{% imgf linux/x64/ins6.webp %}

## 3 软件推荐

{% imgf linux/x64/ins7.webp %}
在istoreos自带的商店里我们可以选择很多适合自己的插件，此处推荐几个

- 1.istorex
此插件是一个和luci-theme-argon相似功能的主题插件，luci-theme-argon默认在istoreos里预装
安装istorex后第一次进入会让你选择模式
{% imgf linux/x64/ins8.webp %}
选择路由模式就是这种
{% imgf linux/x64/ins9.webp %}
选择NAS会让你先选择一些配置
{% imgf linux/x64/ins10.webp %}
{% imgf linux/x64/ins11.webp %}
可以跳过这些配置，页面如下
{% imgf linux/x64/ins12.webp %}
- 2.路由狗
在主题页面上加了一个可视化页面
{% imgf linux/x64/ins13.webp %}
- 3.关机
{% imgf linux/x64/ins14.webp %}
- 4.cpu频率限制
{% imgf linux/x64/ins15.webp %}
可指定进程对cpu的占用率
- 5.DiskMan磁盘管理
{% imgf linux/x64/ins16.webp %}
- 6.系统便利工具
{% imgf linux/x64/ins17.webp %}
- 7.NetData系统监控
{% imgf linux/x64/ins18.webp %}
{% imgf linux/x64/ins19.webp %}
以下软件功能与下文中推荐的功能相同
[嵌入式设备（Xiaomi Mi Router AX3000T）刷入](https://blog.csdn.net/qq_51891724/article/details/155856575)或本站搜索`嵌入式设备刷入ImmortalWrt`查看
- 8.ARP绑定
{% imgf linux/x64/ins20.webp %}
- 9.定时设置
{% imgf linux/x64/ins21.webp %}
- 10.主机流量统计
{% imgf linux/x64/ins22.webp %}

## 可选软件

- 1.KSpeeder(原iStore增强)
{% imgf linux/x64/ins23.webp %}
- 2.Ubuntu
需要配置好docker后安装
{% imgf linux/x64/ins24.webp %}
- 3.DDNSTO路由远程
{% imgf linux/x64/ins25.webp %}
- 4.kvm虚拟机（配置要求较高）
有想在istoreos上跑其他系统的可以考虑，在安装之前需要先配置好docker
{% imgf linux/x64/ins26.webp %}
- 5.OpenWebUI（配置要求高）
一般在性能较好的设备安装
{% imgf linux/x64/ins27.webp %}
