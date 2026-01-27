---
title: vmware安装软路由
date: 2026-01-27 16:59:36
top_group_index: 4
swiper_index: 4
category: 路由器
tags:
  - 嵌入式
  - 网络
  - Linux
cover: https://img.aresdev.qzz.io/images/linux/istoreOS.webp
description: istoreOS软路由
ai: 本文介绍了在VMware虚拟机中部署iStoreOS软路由系统的详细步骤。iStoreOS是一款基于OpenWrt定制的网络存储操作系统，适合新手用户使用。文章首先说明了所需工具：VMware虚拟机、iStoreOS镜像文件和QEMU转换工具。随后详细讲解了安装过程，包括VMware安装、iStoreOS固件下载、QEMU安装及镜像格式转换等步骤。最后指导用户完成虚拟机网络配置和iStoreOS的初始化设置，包括IP地址分配和网络接口配置。通过本文，用户可以轻松在Windows系统下搭建iStoreOS软路由系统，实现网络存储和路由功能。
---

## 1 前言

istoreOS 是一款基于 OpenWrt 定制的软路由系统，旨在为用户提供一个易于入门的网络存储操作系统。其核心定位在路由和存储上，特别适合刚接触软路由系统的小白用户。
vmware是通过虚拟化技术让一台物理服务器运行多个虚拟机，从而提升资源利用率、降低成本并支持云计算发展。

## 2.1所需工具

- 1.vmware虚拟机（根据自身的系统版本选择相应版本）
- 2.istoreOS镜像文件
- 3.qemu镜像文件转换工具

## 2.2 安装方法

此处文章使用Windows11+vmware17.6.4+istoreOS x64部署

- 1.安装vmware
可自行网上下载或[点击此处下载vmware](https://www.puresys.net/637.html)
{% imgf linux/istoreOS/store1.webp %}
{% imgf linux/istoreOS/store2.webp %}
{% imgf linux/istoreOS/store3.webp %}
这里可以根据自己想安装的位置选择合适位置安装（如D盘）
{% imgf linux/istoreOS/store4.webp %}
{% imgf linux/istoreOS/store5.webp %}
安装完成后打开桌面创建的vmware程序
{% imgf linux/istoreOS/store6.webp %}
- 2.下载istoreOS固件
[点击此处下载x64固件](https://site.istoreos.com/firmware/download?devicename=x86_64)
{% imgf linux/istoreOS/store7.webp %}
由于现在大部分电脑使用UEFI启动我们选择24.10.4下载
{% imgf linux/istoreOS/store8.webp %}
- 3.下载并安装qemu
[点击此处下载qemu](https://qemu.weilnetz.de/w64/)
{% imgf linux/istoreOS/store9.webp %}
下载并安装qemu-w64-setup-20251203.exe
{% imgf linux/istoreOS/store10.webp %}
{% imgf linux/istoreOS/store11.webp %}
{% imgf linux/istoreOS/store12.webp %}
{% imgf linux/istoreOS/store13.webp %}
{% imgf linux/istoreOS/store14.webp %}
此处保持默认文件夹安装即可
{% imgf linux/istoreOS/store15.webp %}
{% imgf linux/istoreOS/store16.webp %}
进入安装目录后打开命令提示符窗口（cmd）
{% imgf linux/istoreOS/store17.webp %}
出现以上内容为安装成功

- 4.解压istoreos文件并转换为vmdk文件
使用7-zip解压
{% imgf linux/istoreOS/store18.webp %}
在解压位置可以找到.img的文件
然后执行如下代码

```bash
cd Downloads
dir
cd C:\Program Files\qemu
qemu-img convert -f raw -O vmdk C:\Users\Ares\Downloads\istoreos-24.10.4-2025120511-x86-64-squashfs-combined-efi.img C:\Users\Ares\Downloads\istoreos-24.10.4.vmdk
```

{% imgf linux/istoreOS/store19.webp %}
此时我们可以看到istoreos-24.10.4.vmdk被创建
{% imgf linux/istoreOS/store20.webp %}

## 2.3 虚拟机创建

在VMware中新建虚拟机并选择自定义
{% imgf linux/istoreOS/store21.webp %}
这里选择第三个
{% imgf linux/istoreOS/store22.webp %}
这里选择Linux
{% imgf linux/istoreOS/store23.webp %}
这里需要自己设定一个虚拟机名并创建一个文件夹用来存放
{% imgf linux/istoreOS/store24.webp %}
处理器和内存根据需要自行选择
{% imgf linux/istoreOS/store25.webp %}
{% imgf linux/istoreOS/store26.webp %}
{% imgf linux/istoreOS/store27.webp %}
{% imgf linux/istoreOS/store28.webp %}
{% imgf linux/istoreOS/store29.webp %}
此处选择第二个并选择之前qemu转换的vmdk文件
{% imgf linux/istoreOS/store30.webp %}
{% imgf linux/istoreOS/store31.webp %}
这里根据需要选择第一个或第二个
{% imgf linux/istoreOS/store32.webp %}
点击完成后虚拟机创建完成
{% imgf linux/istoreOS/store33.webp %}

## 2.4 虚拟机网络配置与istoreos安装

点击vmware的编辑并选择虚拟网络编辑器，查看当前网络设置
{% imgf linux/istoreOS/store34.webp %}
{% imgf linux/istoreOS/store35.webp %}
点击更改设置并选择vmnet8
{% imgf linux/istoreOS/store36.webp %}
确定DHCP配置确定地址
{% imgf linux/istoreOS/store37.webp %}
之后启动虚拟机
{% imgf linux/istoreOS/store38.webp %}
{% imgf linux/istoreOS/store39.webp %}
启动后输入quickstart配置网络ip
{% imgf linux/istoreOS/store40.webp %}
回车后输入之前虚拟机查到的ip
{% imgf linux/istoreOS/store41.webp %}
配置完后浏览器输入`http://192.168.40.128可进入istoreos管理页面`
{% imgf linux/istoreOS/store42.webp %}
默认没有密码，直接点击登陆
{% imgf linux/istoreOS/store43.webp %}

## 3 istoreos网络配置

点击网络中的接口
{% imgf linux/istoreOS/store44.webp %}
添加网关和DNS服务IP
{% imgf linux/istoreOS/store45.webp %}
{% imgf linux/istoreOS/store46.webp %}
添加后保存并应用，可以发现网络测试可以ping通，并且也显示连接正常了
{% imgf linux/istoreOS/store47.webp %}
{% imgf linux/istoreOS/store48.webp %}
{% imgf linux/istoreOS/store49.webp %}

## 4 总结

- 1.利用qemu将img镜像转换为VMware可识别的文件
- 2.创建并配置VMware虚拟机，使得可以正常启动istoreos软路由
- 3.配置软路由IP，DNS,网关来使系统可以正常访问网络
