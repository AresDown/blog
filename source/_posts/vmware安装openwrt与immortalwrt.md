---
title: vmware安装openwrt与immortalwrt
date: 2026-01-27 17:43:14
category: 路由器
tags:
  - 嵌入式
  - 网络
  - Linux
cover: https://img.aresdev.qzz.io/images/linux/openwrt.webp
description: 软路由配置
ai: 本文介绍了在VMware中部署OpenWrt和ImmortalWrt软路由系统的详细步骤。首先通过QEMU工具将下载的固件转换为VMDK格式，然后在VMware中创建虚拟机并启动。对于OpenWrt，需要通过命令行修改网络配置并安装汉化包；ImmortalWrt的配置方法与OpenWrt类似。文章还提到可通过在线工具自定义固件，添加预装软件和启动脚本，但可能受网络影响导致构建失败。两种路由系统的默认管理密码均为&quot;password&quot;，配置完成后均可正常联网使用。
---

## 1 前言

[点此查看上期：vmware部署istoreos](https://blog.csdn.net/qq_51891724/article/details/155774351)
或在本站搜索`vmware安装软路由`查看
在之前我们在VMware上部署了istoreos软路由，我们今天来用同样的方法安装opwewrt与immortalwrt

## 2.1 openwrt安装与网络配置

此处我们需要获得openwrt的固件包
[点击此处下载](https://firmware-selector.openwrt.org/)
我们选择Generic x86/64并下载COMBINED-EFI (EXT4)
{% imgf linux/openwrt/open1.webp %}
按之前教程中的方法[点此查看上期：vmware部署istoreos](https://blog.csdn.net/qq_51891724/article/details/155774351)
解压并使用qemu转码成vmdk

```bash
cd C:\Program Files\qemu
qemu-img convert -f raw -O vmdk C:\Users\Ares\Downloads\openwrt-24.10.4-x86-64-generic-ext4-combined-efi.img C:\Users\Ares\Downloads\openwrt-24.10.4.vmdk
```

新建虚拟机的方法也与上期一样
{% imgf linux/openwrt/open2.webp %}
新建好后我们启动虚拟机
{% imgf linux/openwrt/open3.webp %}
由于openwrt没有quickstart命令，我们需要使用其他方法来配置
{% imgf linux/openwrt/open4.webp %}
{% imgf linux/openwrt/open5.webp %}
{% imgf linux/openwrt/open6.webp %}

```bash
vi /etc/config/network `openwrt默认使用的是root所以不使用sudo`
i `修改ipaddr后保存`
:wq
/etc/init.d/network restart
```

然后我们浏览器输入刚才设定的地址就可以得到如下页面
{% imgf linux/openwrt/open7.webp %}
我们输入password登陆
{% imgf linux/openwrt/open8.webp %}
点击network的interfaces来配置ip
{% imgf linux/openwrt/open9.webp %}
{% imgf linux/openwrt/open10.webp %}
配置完后保存并应用
{% imgf linux/openwrt/open11.webp %}
{% imgf linux/openwrt/open12.webp %}
{% imgf linux/openwrt/open13.webp %}
{% imgf linux/openwrt/open14.webp %}
然后我们ping测试发现网络已经通了
我们可以点击system的Software来下载汉化包并安装
{% imgf linux/openwrt/open15.webp %}
{% imgf linux/openwrt/open16.webp %}
{% imgf linux/openwrt/open17.webp %}
{% imgf linux/openwrt/open18.webp %}
安装完成后刷新浏览器就可以完成汉化
{% imgf linux/openwrt/open19.webp %}

## 2.2 immortalwrt安装与网络配置

[点此下载固件包](https://firmware-selector.immortalwrt.org/)
同样选择Generic x86/64并下载

COMBINED-EFI (EXT4-COMBINED-EFI.IMG.GZ)
{% imgf linux/openwrt/open20.webp %}
immortalwrt软路由也是一样的方法，我们需要qeum来将img转为vmdk
按之前教程中的方法[点此查看上期：vmware部署istoreos](https://blog.csdn.net/qq_51891724/article/details/155774351)
解压并使用qemu转码成vmdk

```bash
cd C:\Program Files\qemu
qemu-img convert -f raw -O vmdk C:\Users\Ares\Downloads\immortalwrt-24.10.4-x86-64-generic-ext4-combined-efi.img C:\Users\Ares\Downloads\immortalwrt-24.10.4.vmdk
```

新建虚拟机的方法也与上期一样
{% imgf linux/openwrt/open21.webp %}
如果在新建虚拟机的时候提前把vmdk文件放入文件时弹出这个提示直接点击继续即可
{% imgf linux/openwrt/open22.webp %}
虚拟机创建完成后启动
{% imgf linux/openwrt/open23.webp %}
与openwrt配置的方法一样
{% imgf linux/openwrt/open24.webp %}
{% imgf linux/openwrt/open25.webp %}
{% imgf linux/openwrt/open26.webp %}

```bash
vi /etc/config/network `immortalwrt默认使用的也是root所以不使用sudo`
i `修改ipaddr后保存`
:wq
/etc/init.d/network restart
```

浏览器访问配置的地址后如下
{% imgf linux/openwrt/open27.webp %}
输入默认密码password后可以登陆
{% imgf linux/openwrt/open28.webp %}
同样点击网络的接口来配置ip
{% imgf linux/openwrt/open29.webp %}
{% imgf linux/openwrt/open30.webp %}
{% imgf linux/openwrt/open31.webp %}
{% imgf linux/openwrt/open32.webp %}
保存并应用之后可以ping测试
{% imgf linux/openwrt/open33.webp %}
此时网络就正常了

## 3 immortalwrt与openwrt自定义固件（针对嵌入式设备）

以此为例，我们点击自定义预安装软件包和/或首次启动脚本
{% imgf linux/openwrt/open34.webp %}
添加相关的脚本和预安装软件包后点击请求构建就可以获得自定义的固件
{% imgf linux/openwrt/open35.webp %}
不过网络问题可能容易出现构建失败的问题

脚本内容可以写成这样（仅适用于嵌入式设备）

```bash
# Beware! This script will be in /rom/etc/uci-defaults/ as part of the image.
# Uncomment lines to apply:
#
 wlan_name="xxx"  `设置wifi名称`
 wlan_name_5G="xxx-5G"  `设置5G wifi名称`
 wlan_password="12345678"  `设置wifi密码`
#
 root_password="xxxx"  `设置管理员密码`
 lan_ip_address="192.168.1.1" `设置路由管理地址`
#
# pppoe_username=""
# pppoe_password=""

# log potential errors
exec >/tmp/setup.log 2>&1

if [ -n "$root_password" ]; then
  (echo "$root_password"; sleep 1; echo "$root_password") | passwd > /dev/null
fi

# Configure LAN
# More options: https://openwrt.org/docs/guide-user/base-system/basic-networking
if [ -n "$lan_ip_address" ]; then
  uci set network.lan.ipaddr="$lan_ip_address"
  uci commit network
fi

# Configure WLAN
# More options: https://openwrt.org/docs/guide-user/network/wifi/basic#wi-fi_interfaces
if [ -n "$wlan_name" -a -n "$wlan_password" -a ${#wlan_password} -ge 8 ]; then
  uci set wireless.@wifi-device[0].disabled='0'
  uci set wireless.@wifi-iface[0].disabled='0'
  uci set wireless.@wifi-iface[0].encryption='psk2'
  uci set wireless.@wifi-iface[0].ssid="$wlan_name"
  uci set wireless.@wifi-iface[0].key="$wlan_password"
  uci set wireless.@wifi-device[1].disabled='0'
  uci set wireless.@wifi-iface[1].disabled='0'
  uci set wireless.@wifi-iface[1].encryption='psk2'
  uci set wireless.@wifi-iface[1].ssid="$wlan_name_5G"
  uci set wireless.@wifi-iface[1].key="$wlan_password"
  uci commit wireless
fi

# Configure PPPoE
# More options: https://openwrt.org/docs/guide-user/network/wan/wan_interface_protocols#protocol_pppoe_ppp_over_ethernet
if [ -n "$pppoe_username" -a "$pppoe_password" ]; then
  uci set network.wan.proto=pppoe
  uci set network.wan.username="$pppoe_username"
  uci set network.wan.password="$pppoe_password"
  uci commit network
fi

echo "All done!"
```

## 4 总结

- 1.我们在上期的基础上对openwrt与immortalwrt进行了安装与配置
- 2.在网络配置中我们需要掌握基础的Linux命令（比如vi编辑器等）
- 3.openwrt与immortalwrt可以对固件进行一些定制，像这种初次启动脚本与自定义软件包
