# 介绍

项目采用 `SpringBoot` + `Vue` 作为核心框架，开发模式为前后台分离，可以使项目组内成员各司其职，发挥最大的职能。以下为前后台的工作内容：

**前端**

* UI层
* 控制逻辑、渲染逻辑
* 交互、用户体验

**后端**

* 服务层
* 数据格式、数据稳定
* 业务逻辑

## 项目同步

前后台项目目前托管于 [GitHub](https://github.com) 平台，需要各位同学注册好账号私信（微信：18553757713）发我。
![](http://ww1.sinaimg.cn/large/005yqb1Zgy1g0yup9a1nbj31kg0xy11a.jpg)

## 版本控制

如果你之前使用过版本控制工具是`Tortoise SVN`，那么很遗憾，你需要去学习一下 `Git` 啦。毕竟都 9102 年了，不会用 `Git` 会被淘汰的:see_no_evil:。
首先你需要去 [这里](https://git-scm.com/downloads) 去下载你电脑对应系统的 `Git`，安装完成之后在 IDE 工具中配置好执行的程序即可。以下为 `Git` 的一些常用命令：

``` bash
# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]

# 下载一个项目和它的整个代码历史
$ git clone [url]

# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"

# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加每个变化前，都会要求确认 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 提交暂存区到仓库区
$ git commit -m [message]

# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库
$ git push [remote] [branch]
```

准备好了这两项就可以点击右下角去搭建项目了:smiley:。
