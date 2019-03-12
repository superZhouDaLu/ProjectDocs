# 搭建后端项目

后端项目基于 `Java JDK1.8+` 进行开发，首先前往 [Oracle网站](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 下载系统版本所对应的 `JDK 8.x`。

 
## 项目结构
 
**SBDemo** 目录结构如下：

``` java
SBDemo
├─ src
│  ├─ main
│  │   ├─ java
│  │   │    └─ com
│  │   │        └─ stone
│  │   │             ├─ base                  // 项目基础类目录
│  │   │             ├─ conf                  // 项目配置相关目录
│  │   │             ├─ controller            // 控制器存放目录
│  │   │             ├─ mapper                // MyBatis 接口文件目录
│  │   │             ├─ model                 // 实体类存放目录
│  │   │             ├─ service               // 具体业务逻辑实现
│  │   │             ├─ util                  // 工具类存放目录
│  │   │             └─ Application           // SpringBoot 启动文件
│  │   └─ resource
│  │        ├─ generator
│  │        │     └─ generatorConfig.xml      // MyBatis 实体类生成插件配置文件
│  │        ├─ mapper                         // MyBatis xml 映射文件存放目录
│  │        ├─ sql
│  │        │   ├─ NewFiled.sql               // 数据库表结构更新记录 sql 文件
│  │        │   └─ view.sql                   // 数据库视图 sql 文件
│  │        ├─ application.yml                // SpringBoot 核心配置文件
│  │        ├─ application-dev.properties     // 对应 generatorConfig.xml 中数据库连接
│  │        ├─ banner.txt                     // SpringBoot 启动显示字体
│  │        └─ license-word.xml               // Aspose.words 验证文件
│  └─ test
│      └─ java
│           └─ com
│               └─ stone
│                    └─ test                  // Junit 测试类所在目录
├─ target (项目运行后生成)
├─ .gitignore                                 // Git 提交忽略文件
├─ pom.xml                                    // Maven 依赖配置文件
└─ README.md
```

## IDE下载

项目的开发离不开 `IDE` 软件的帮助， 强烈推荐 `IntelliJ IDEA`。这份指南是根据 `IDEA` 进行讲解的，当然你也可以根据自身情况使用 `Eclipse` 或 `MyEclipse`。毕竟这些都只是开发工具，良好的代码质量还是要看开发人员的。

前往 [IntelliJ IDEA官网](https://www.jetbrains.com/idea/download/) 下载系统版本对应的 `Ultimate` 版本并进行安装。
 
 ::: warning 注意
 `Ultimate` 版本拥有 30 天的免费试用，过期后可以在 [这里](http://idea.lanyus.com/) 进行激活:laughing:。（此方法非正规途径，请勿肆意传播！）
 :::
 
 安装完成后打开 `IDEA`，初次使用会进行简单的设置，傻瓜式的下一步即可，激活方式选择试用 30 天，到达下面这张图所在页面。

 ![](http://ww1.sinaimg.cn/large/005yqb1Zgy1g0yy9hy9hzj31100qsmyt.jpg)
 
  ::: tip Tip
  如果你是首次使用 `IntelliJ IDEA` 推荐查看 [这里](https://github.com/judasn/IntelliJ-IDEA-Tutorial) 进行学习！
  :::
 
 ## 导入项目
 
 点击 `Check out from Version Control` 下拉框选取 `Git` 选项，此时会提示你需要登录 `GitHub` 账户，输入你之前注册的用户名及密码。
 登录成功后再次选取 `Git` 选项，在第一个下拉框中勾选 `SBDemo.git`，第二个下拉框选择项目存放的本地路径。如下图所示：
 
 ![](http://ww1.sinaimg.cn/large/005yqb1Zgy1g0yz4kwq81j310y0qudif.jpg)
 
 设置好点击 Clone 按钮，之后会出现进度条，静静地等待一会就好了:smirk:，千万不要点 Cancel。
 
 进度条结束后点击 Open 按钮，接下来会加载到 IDEA 的主界面。注意右下角会有一个进度条，它正在下载项目所需的 `Maven` 依赖。
 
 ## 添加插件
 
 点击左侧 Project 按钮展示目录结构，依次选择 `SBDemo/src/main/java/com.stone/service/impl/` 中的任一 Java 文件，打开后会提示缺失 `get/set` 方法编译时警告。
 其原因是项目使用了 `Lombok`，可以简化实体类的 `get/set` 方法，解决异常的方法就是安装 `Lombok` 插件。
 IDEA 插件可以大大的简化开发步骤，接下来讲解一下如何安装吧。  
 
 首先点击左上角导航栏中的 `File` 选项选择 `Setting`，再选择 `Plugins` 选项：
 
 ::: tip Tip
   以上为 Windows 操作系统的步骤，如果你是使用 macOS 系统则需要点击 IntelliJ IDEA 后选择 Preferences。
 :::
 
 ![](http://ww1.sinaimg.cn/large/005yqb1Zgy1g0zs1ahsyaj31k812o7at.jpg)
 
 主要看右方顶部导航拥有三个选项卡，分别为 `Marketplace`、 `Installed`、 `Updates`。当前处于 `Installed`，会展示本机所安装的所有插件。安装 `Lombok` 需要点击导航栏的 `Marketplace` 选项卡，在搜索框内输入 Lombok：
 
 ![](http://ww1.sinaimg.cn/large/005yqb1Zgy1g0zsy6cb7xj31k812o0zw.jpg)
 
 选取 `Lombok Plugin` 点击 `Install`，之后会提示你重启 IDEA，确定重启后再次打开之前报错的 java 文件会发现异常消除了。另外再推荐一款插件 `Mybatis plugin`，可以在 mapper 接口中和 mapper 的 xml 文件中来回跳转，安装步骤和上述一致。
 
 ## 运行项目
 
 接下来就可以运行项目了，首先看右上角导航栏，如下图所示：
 
 ![](http://ww1.sinaimg.cn/large/005yqb1Zgy1g0zutgzamkj32lc1gqtk7.jpg)
 
 选择正常模式启动或者 Debug 模式启动，项目启动成功后会有提示。
 
 ![](http://ww1.sinaimg.cn/large/005yqb1Zgy1g0zuz9uy3nj32lc1gqkev.jpg)
 
 `SpringBoot` 启动程序可能不会自动配置，这时候就需要我们手动进行配置了。点击顶部导航栏 `Add Configuration...` 按钮，在弹出的窗口中点击 `Templates` 展开并找到 `SpringBoot`。单击进入后选择 `Main class` 并选中项目中的 `Application` 文件，如图所示：
 
 ![](http://ww1.sinaimg.cn/large/005yqb1Zly1g100pmltioj31ne16cq9r.jpg)
 
 设置完成后点击窗口左上角的 `+` 号按钮，找到 `SpringBoot` 并单击添加。
 
 ![](http://ww1.sinaimg.cn/large/005yqb1Zly1g100z8f5s0j31ni168wjx.jpg)
 
 点击 OK 后就可以运行项目啦。
 
 ::: tip Tip
   不想每次更改都重新启动服务？将最后一张图 `On 'Update' action：` 和 `On frame deactivation：` 设置为 `Update classes and resources` 就可以在修改方法后自动编译了。**仅限于对当前方法修改，如果是新增方法还是需要重启的。**
 ::: 