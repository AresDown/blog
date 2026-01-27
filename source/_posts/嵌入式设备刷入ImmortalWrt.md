---
title: 嵌入式设备刷入ImmortalWrt
date: 2026-01-27 18:03:56
category: 路由器
tags:
  - 嵌入式
  - 网络
  - Linux
cover: https://img.aresdev.qzz.io/images/linux/immortalwrt.webp
description: Xiaomi Mi Router AX3000T
ai: 本文介绍了在路由器上安装OpenWrt/ImmortalWrt系统的详细步骤和实用插件推荐。主要内容包括：1) 刷机准备工作，如确定路由器型号、下载固件和uboot；2) 以小米AX3000T为例的刷机流程；3) 11个实用插件推荐，包括主题美化(luci-theme-argon)、带宽监控(luci-app-nlbwmon)、定时重启(luci-app-autoreboot)、KMS激活工具(luci-app-vlmcsd)等，涵盖路由管理、性能优化和功能扩展多个方面。文章为路由器刷机和功能扩展提供了实用的指导，适合有一定Linux基础的读者。
---

## 1  前言

[vmware安装istoreOS嵌入式软路由](https://blog.csdn.net/qq_51891724/article/details/155774351)
或站内搜索`vmware安装软路由`查看
[vmware安装openwrt与immortalwrt](https://blog.csdn.net/qq_51891724/article/details/155779683)
或站内搜索`vmware安装openwrt与immortalwrt`查看
前两篇文章主要是在VMware中配置与安装，我们了解了不同系统的特点，由于在嵌入式设备中安装受硬件限制，所以我们可以选择openwrt与immortalwrt在路由器上安装使用。
本文来介绍一些在路由器上可使用的插件与对特定嵌入式设备安装的总结。

## 2.1 所需工具

- 1.确定刷入的路由器型号
- 2.了解相关刷入方法
- 3.下载对应固件包
- 4.SSH远程连接工具
- 5.uboot

## 2.2 固件刷入

`注：当前xiaomiAX3000t已经更换了硬件，可能旧方法不适用`
本文选择的是xiaomiAX3000t刷入系统。
我们在选择路由设备的时候需要通过很多因素来选择，刚好xiaomiAX3000t在价格和其他方面较有优势，所以选择此设备进行刷入。
刷入方法可以参考以下文章：
[小米AX3000T保姆级免拆刷openWrt教程以及排坑指南](https://blog.csdn.net/jgw2008/article/details/135645594)
[rax3000m 刷机 uboot + immortalwrt](https://blog.csdn.net/qq_27158179/article/details/135440875)
目前官方支持的设备如下：
[点此查看](https://openwrt.org/supported_devices)

在确定设备后在如下网站选择固件并下载（也可自己定制）

[点此下载](https://firmware-selector.immortalwrt.org/)
{% imgf linux/immortalwrt/imm1.webp %}
下载后我们还需要uboot：

U-Boot（Universal Bootloader）是一个开源的引导加载程序，主要用于嵌入式系统中。它支持多种CPU架构，包括ARM、MIPS、PowerPC、x86等。U-Boot通常作为系统启动的第一阶段软件，负责初始化硬件、加载操作系统内核并传递启动参数。
也就是说功能与BIOS相似
[mt798x uboot 功能介绍](https://cmi.hanwckf.top/p/mt798x-uboot-usage/)
[下载地址](https://github.com/hanwckf/bl-mt798x/releases/tag/20241115)

[小米 AX3000T 路由器刷入使用官方原版 OpenWrt / ImmortalWrt 固件](https://note.okhk.net/xiaomi-ax3000t-router-install-openwrt-immortalwrt)
在刷入成功后我们在
浏览器输入相应的管理地址
{% imgf linux/immortalwrt/imm2.webp %}

## 3 插件推荐

我们可以添加一些软件包来对登陆界面美化：

- 1.luci-theme-argon （主题美化插件）
{% imgf linux/immortalwrt/imm3.webp %}
{% imgf linux/immortalwrt/imm4.webp %}
安装后刷新可以看到之前的管理页变得更好看了
- 2.luci-app-argon-config
luci-theme-argon的配套插件，可以更改登陆页面为每日bing的壁纸，我们需要在安装插件时还需要安装汉化包luci-i18n-argon-config-zh-cn
{% imgf linux/immortalwrt/imm5.webp %}
安装之后登陆页面就可以变的更好看
- 3.luci-app-autoreboot （定时重启插件）
{% imgf linux/immortalwrt/imm6.webp %}
安装之后可以设置重启时间来定时重启路由设备
- 4.luci-app-nlbwmon （带宽监控）
安装之后可以查询当前路由的流量状况
{% imgf linux/immortalwrt/imm7.webp %}
- 5.luci-app-statistics （状态统计）
可以查看当前接口，系统负载，内存等状态
{% imgf linux/immortalwrt/imm8.webp %}
- 6.luci-app-vlmcsd （kms激活工具）
{% imgf linux/immortalwrt/imm9.webp %}
- 7.luci-app-vsftpd （FTP服务器）
可以用来传输数据
{% imgf linux/immortalwrt/imm10.webp %}
- 8.luci-app-wechatpush （微信推送）
可设置不同推送方式，向指定应用推送路由状态信息
{% imgf linux/immortalwrt/imm11.webp %}
- 9.luci-app-ramfree （内存释放工具）
安装后点击可释放内存
{% imgf linux/immortalwrt/imm12.webp %}
- 10.luci-app-arpbind （IP/MAC绑定）
{% imgf linux/immortalwrt/imm13.webp %}
- 11.luci-app-ddns （动态DNS）
{% imgf linux/immortalwrt/imm14.webp %}
