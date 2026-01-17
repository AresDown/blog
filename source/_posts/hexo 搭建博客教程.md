---
title: hexo 搭建博客教程
date: 2026-01-11 20:00:00
category: 教程
tags:
  - Hexo
  - 博客
cover: https://img.aresdev.qzz.io/hexo-logo.svg
---

**Hello World**

欢迎来到[Hexo](https://hexo.io/)！这是我的第一篇帖子。检查[文件](https://hexo.io/docs/)了解更多信息。如果在使用Hexo时遇到任何问题，可以在[故障排除中找到答案](https://hexo.io/docs/troubleshooting.html)或者你可以在[GitHub](https://github.com/hexojs/hexo/issues)提出问题.

## Hexo 安装

### 安装 Node.js

Hexo 是基于 Node.js 的静态博客框架，所以你需要先安装 Node.js。

在[Node.js 官网](https://nodejs.org/zh-cn/)了解更多关于 Node.js 的信息。
[Node.js 下载页](https://nodejs.org/zh-cn/download)下载并安装 Node.js，安装完成后，打开命令行工具，输入以下命令来检查 Node.js 是否安装成功：

``` bash
$ node -v
```

如果安装成功，会显示 Node.js 的版本号。

如果需要修改默认目录可以使用如下命令：

``` bash
npm prefix -g
```

然后在用户目录下**C:\Users\用户名\.npmrc**文件中添加如下内容：

``` bash
prefix = C:\Program Files\nodejs
```

此处可以根据实际想安装路径进行修改并保存。
{% imgf npm-install.webp npm 安装%}

配置环境变量示例如下：
{% imgf env.webp npm 环境变量%}

### 安装 Git

Hexo 还需要 Git 来部署到远程站点，所以你需要先安装 Git。

在[Git 官网](https://git-scm.com/)了解更多关于 Git 的信息。
[Git 下载页](https://git-scm.com/install/windows)下载并安装 Git，安装完成后，打开命令行工具，输入以下命令来检查 Git 是否安装成功：

``` bash
git --version
```

如果安装成功，会显示 Git 的版本号。

### 安装 Hexo

在命令行工具中输入以下命令来安装 Hexo：

``` bash
npm install -g hexo-cli
```

找一个合适的位置创建一个文件夹，然后进入该文件夹，输入以下命令来初始化 Hexo：

``` bash
hexo init
```

然后输入以下命令来安装 Hexo 的依赖：

``` bash
npm install
```

## 快速开始

### 创建新帖子

``` bash
hexo new "My New Post"
```

其中 "My New Post" 是文章的标题，你可以使用 `hexo new` 命令创建新文章，文章会生成在 `source/_posts` 目录下。

更多信息： [Writing](https://hexo.io/docs/writing.html)

### 启动服务

``` bash
hexo server
hexo s # 简写也可
```

更多信息： [Server](https://hexo.io/docs/server.html)

### 清理缓存

``` bash
hexo clean
```

### 生成静态文件

``` bash
hexo generate
hexo g # 简写也可
```

更多信息： [Generating](https://hexo.io/docs/generating.html)

### 部署到远程站点

``` bash
hexo deploy
hexo d # 简写也可
```

更多信息： [Deployment](https://hexo.io/docs/one-command-deployment.html)
