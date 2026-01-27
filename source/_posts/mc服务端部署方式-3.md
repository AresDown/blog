---
title: mc服务端部署方式-3
date: 2026-01-27 13:52:02
category: 服务搭建
tags:
  - 服务器
  - 游戏
  - minecraft
cover: https://img.aresdev.qzz.io/images/mc.webp
description: 适用于linux的mc服务端搭建教程
ai: 本文介绍了在Linux系统下部署Minecraft服务器的两种方法。第一种使用MCSManager面板工具，通过安装Java环境、配置防火墙端口、上传服务端jar文件完成部署；第二种纯命令行方式，通过systemd创建服务进程直接运行服务端。文章详细说明了两种方法的操作步骤，包括Java环境安装、服务端文件上传、端口配置等关键环节，并提供了相关截图和代码示例。两种方法均可成功搭建Minecraft服务器，读者可根据自身需求选择适合的部署方式。
---

## 1 前言

>在前两篇文章中我简要说明了一下在windows上面如何部署minecraft服务器，以及服务器的类型，提了一下怎么在网络映射。
>
[minecraft服务端部署方式-1](https://blog.csdn.net/qq_51891724/article/details/152803503)
[minecraft 服务器部署-2](https://blog.csdn.net/qq_51891724/article/details/152815844)
或者在本站分别搜索`mc服务端部署方式-1`，`mc服务端部署方式-2`来查看
>下面我来介绍一下在linux下如何部署mincraft服务器

## 2 所需工具

推荐使用FinalShell软件，可以看如下文章：

- [FinalShell介绍-csdn](https://blog.csdn.net/muriyue6/article/details/117520456)
- [FinalShell下载地址](https://www.hostbuf.com/t/988.html)

由于`Minecraft Server Launcher`工具是针对`Windows`的，在`linux`环境下我们可选的比较好用的就是`mcsmanager`

- 1.mcsmanager启动器（可用自行选择的`服务端jar`代替）
- 2.java环境
- 3.服务器插件（可选）
- 4.模组（可选）
- 5.内网映射（可选）

>此处我使用ubuntu-server+vmware+ssh来演示
[点此下载ubuntu服务版](https://ubuntu.com/download/server)
如果对于ubuntu-server不太熟悉，就使用带桌面的Ubuntu配置
[点此下载ubuntu桌面版](https://cn.ubuntu.com/download)

## 3 服务配置

### 3.1 方法1

[mcsmanager下载地址](https://www.mcsmanager.com/)
>在官网复制Linux指令并输入
{% imgf mc/mc2-1.webp %}
{% imgf mc/mc2-2.webp %}
{% imgf mc/mc2-3.webp %}
此时算mcsmanager安装完成
>如果在VMware环境下，一般ufw防火墙是不工作的，如果在真实Linux服务中ufw是开启状态，所以我们需要在基础上添加防火墙规则允许23333与24444端口，当然，如果你是在本地配置与管理mcsmanager可以通过规则指定局域网内指定IP访问管理

```bash
>sudo ufw allow 23333/tcp
>sudo ufw allow 24444/tcp
>//或使用指定ip访问，其中`ip地址`指定为你要在局域网访问的地址
>sudo ufw allow from 203.0.113.42 to any port 23333 proto tcp
>sudo ufw allow from 203.0.113.42 to any port 24444 proto tcp
```

>然后使用`ifconfig`确定当前Linux地址并访问`ip地址：端口号`访问管理面板
{% imgf mc/mc2-4.webp %}
{% imgf mc/mc2-5.webp %}
之后配置内容与[minecraft 服务器部署-2](https://blog.csdn.net/qq_51891724/article/details/152815844)中的一样，配置账号密码之后就可以进入软件
{% imgf mc/mc2-6.webp %}
进入可能是English版本，去settings修改为中文版即可
{% imgf mc/mc2-7.webp %}
然后就按照[minecraft 服务器部署-2](https://blog.csdn.net/qq_51891724/article/details/152815844)方法来配置服务器
`注意：按照自己选择的版本选择适合的java环境`
>作者搭建的是1.12.2的版本，所以安装java8来演示

```bash
>sudo apt install openjdk-8-jdk -y
```

>安装完成之后使用` java -version `来确定安装的版本
{% imgf mc/mc2-8.webp %}
>然后我们需要确定Java的位置，并且需要为建立的服务端建立文件夹，并在mcsmanager面版指定文件夹位置

```bash
>pwd //确定当前位置
>mkdir server 在当前文件夹内创建文件夹(/home/tom)
>ll //确定文件夹是否创建成功
>which java //查看java链接位置
```

{% imgf mc/mc2-9.webp %}
>根据输出信息在面板配置路径和启动设置
{% imgf mc/mc2-10.webp %}
{% imgf mc/mc2-11.webp %}
然后在面板的文件管理里面上传`服务端jar`文件
{% imgf mc/mc2-12.webp %}
{% imgf mc/mc2-13.webp %}
显示如下内容就是上传成功
{% imgf mc/mc2-14.webp %}
然后配置终端设置
{% imgf mc/mc2-15.webp %}

最后启动服务,并按照协议输入true启动服务端
{% imgf mc/mc2-16.webp %}
{% imgf mc/mc2-17.webp %}

### 3.1 方法2

此方法不需要下载mcsmanager
首先ssh连接服务器并安装java8，确定java位置（作者以mohist-1.12.1演示）

```bash
>sudo apt install openjdk-8-jdk -y
>which java
```

然后创建一个存放服务端的文件夹并将服务端jar上传

```bash
>scp -P 22 D:/mohist-1.12.2.jar tom@192.168.127.128:/home/tom/server/  //此代码要在Windows上执行
```

如果使用了FinalShell或其他软件可以在内部上传

```bash
>pwd //确定当前位置
>mkdir server //创建的名字可以自己起一个
>sudo touch /etc/systemd/system/mohist.service //创建进程
>sudo vi /etc/systemd/system/mohist.service //编辑内容
```

将如下内容写入`/etc/systemd/system/mohist.service`内部参数根据自身情况修改

```bash
[Unit]
Description=Mohist Minecraft Server 1.12.2     # 服务描述信息
After=network.target                           # 等待网络服务启动后再启动此服务

[Service]
# 设置工作目录（jar文件所在目录）
WorkingDirectory=/home/tom/server
ExecStart=/usr/bin/java -Xms1G -Xmx2G -jar mohist-1.12.2.jar nogui
                                               # 启动命令，运行 Mohist 服务端，初始内存 1G，最大 2G，关闭 GUI
User=tom                                       # 以 tom 用户身份运行，避免使用 root 提高安全性
Restart=on-failure                             # 如果进程异常退出则自动重启
RestartSec=10                                  # 重启前等待 10 秒
LimitNOFILE=4096                               # 提高文件描述符限制，避免连接数过多导致崩溃

[Install]
WantedBy=multi-user.target                     # 允许服务在系统启动时自动启动（多用户图形/非图形模式）
```

保存后通过如下代码确认写入情况

```bash
cat /etc/systemd/system/mohist.service
```

{% imgf mc/mc2-18.webp %}
通过以下方式启动（执行前三步）

```bash
sudo systemctl enable mohist //设置开启启动
sudo systemctl start mohist //启动服务
sudo systemctl status mohist //检查服务运行情况
sudo systemctl stop mohist //停止服务
```

显示如下内容时服务就启动成功了
{% imgf mc/mc2-19.webp %}
若在VMware环境使用Linux进行测试，ufw默认是关闭的
生产环境下在Linux的ufw需要开启25565端口用来连接服务器

```bash
>sudo ufw allow 25565
```

此方法如果需要对服务器的权限管理和文件安装较复杂，推荐使用方法一
