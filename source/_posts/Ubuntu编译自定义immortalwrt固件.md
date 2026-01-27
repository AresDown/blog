---
title: Ubuntu编译自定义immortalwrt固件
date: 2026-01-27 23:40:56
category: 路由器
tags:
  - Ubuntu
  - 网络
  - Linux
cover: https://img.aresdev.qzz.io/images/linux/immortalwrt.webp
description: istoreOS软路由常用软件介绍
ai: 本文介绍了在Ubuntu系统中编译OpenWrt/ImmortalWrt/iStoreOS软件包和固件的方法。主要步骤包括：1) 准备Ubuntu虚拟机和开发工具；2) 下载对应SDK开发包；3) 安装编译依赖环境；4) 更新软件源并添加自定义软件包；5) 执行编译命令生成ipk安装包或完整固件。文章详细说明了从环境搭建到最终编译的全过程，特别提醒需要预留60GB空间用于固件编译，并针对常见问题给出了解决方案。该方法适用于需要定制路由器系统的开发者。
---
## 1 前言

istoreos中有许多可安装的软件，但如果自己需要制作一个特定的固件或者编译开源的源码时就需要编译来生成所需软件

## 2 所需工具

- 1.Ubuntu系统
- 2.VMware虚拟机
- 3.相应版本的sdk开发包
- 4.ssh连接工具
- 5.git（可选）

## 3 软件编译

### 3.1 openwrt与immortalwrt

首先我们需要在VMware中安装Ubuntu
[下载链接](https://cn.ubuntu.com/download)
{% imgf linux/Ubun/ub1.webp %}
可自行选择服务器或桌面版下载
安装好并启动后通过ssh连接
{% imgf linux/Ubun/ub2.webp %}
然后下载对应sdk包

`
注：固件编译istoreos，openwrt与immortalwrt方法相同
`

[中科大镜像](https://mirrors.ustc.edu.cn/)
{% imgf linux/Ubun/ub3.webp %}
搜索openwrt或immortalwrt来获取相应版本sdk（以immortalwrt为例）
{% imgf linux/Ubun/ub4.webp %}
然后选择对应的处理器型号（这里以mediatek为例）
{% imgf linux/Ubun/ub5.webp %}
{% imgf linux/Ubun/ub6.webp %}
{% imgf linux/Ubun/ub7.webp %}
在此页中找到immortalwrt-sdk-24.10.4-x86-64_gcc-13.3.0_musl.Linux-x86_64.tar.zst下载并上传到Ubuntu上解压
{% imgf linux/Ubun/ub8.webp %}
使用如下代码解压

```bash
tar -xvf immortalwrt-sdk-24.10.4-mediatek-filogic_gcc-13.3.0_musl.Linux-x86_64.tar.zst
cd immortalwrt-sdk-24.10.4-mediatek-filogic_gcc-13.3.0_musl.Linux-x86_64/
```

我们需要安装如下软件

```bash
sudo apt update
sudo apt install -y make python3-pip aria2 genisoimage build-essential gawk gcc-multilib g++-multilib flex bison gettext \
  unzip zlib1g-dev libncurses-dev libssl-dev rsync curl wget \
  python3 python3-venv python3-setuptools file tar git patch \
  libelf-dev libtool autoconf automake subversion xsltproc
```

其次需要更新包内容，如果是编译软件就执行

```bash
./scripts/feeds update luci
./scripts/feeds install luci
```

如果因为网络问题无法更新，需要修改feeds.conf.default的下载链接
{% imgf linux/Ubun/ub9.webp %}
我们做完这些之后需要将自己写的软件或者git下的源码放入当前目录的package文件夹下（以luci-app-parentcontrol为例）
{% imgf linux/Ubun/ub10.webp %}
然后返回上一级目录编译相应软件包

```bash
cd ..
 make package/luci-app-parentcontrol/compile V=s
```

{% imgf linux/Ubun/ub11.webp %}
显示如图情况后可以去bin/packages/aarch64_cortex-a53/base/目录查看打包软件包
{% imgf linux/Ubun/ub12.webp %}
将打包好的软件包在浏览器登陆相应设备管理页面后在软件包内上传并安装即可
{% imgf linux/Ubun/ub13.webp %}
{% imgf linux/Ubun/ub14.webp %}

### 3.2 istoreos

需要将仓库git到本地，或直接在网页下载
[点此访问](https://github.com/istoreos/istoreos.git)

```bash
git clone https://github.com/istoreos/istoreos.git
cd istoreos
./scripts/feeds update luci
./scripts/feeds install luci
```

其余部分与3.1的方法相同

`补充：如果是第一次运行打包编译软件会遇到`
{% imgf linux/Ubun/ub15.webp %}
只需要save保存.config即可退出该页面，后期编译就不会弹出这个页面了
{% imgf linux/Ubun/ub16.webp %}

## 4 固件编译

在固件编译上来说，我们需要下载全部内容

```bash
./scripts/feeds update -a
./scripts/feeds install -a
```

执行后需要自行配置相应功能

```bash
make menuconfig
```

配置好后保存并编译（期间会下载各种编译包，编译时间长并且占用空间大）

最好保留60GB空间来进行编译

```bash
make tools/install V=s
```

编译后固件也会存放在bin/packages/aarch64_cortex-a53/base/
