# 后端技术内幕

截止目前后台所用技术栈：

名称 | 功能 | 版本
----|------|----
Spring Boot|主框架|2.1.0.RELEASE
Maven|项目构建管理|3.0.0+
MyBatis|Java 持久层框架|1.3.2
MyBatis Generator|MyBatis 代码生成|1.3.6
Apache Shiro|安全验证框架|1.4.0
Redis|缓存|内嵌版本
Shiro-Redis|缓存插件|3.1.0
Page helper|分页插件|1.2.9
Druid|数据库连接池|1.1.10
Hutool|工具集合框架|4.1.19
Fastjson|json 框架|1.2.51
Lombok|简化实体类|1.18.4
Swagger 2 |接口文档|2.9.2
MySql|数据库连接|5.1.47
Apache POI|文档操作|4.0.0
Aspose.words|文档操作|18.5.0718
Zxing|二维码|3.3.3

## Spring Boot

### 什么是 Spring Boot

Spring Boot 是由 Pivotal 团队提供的全新框架，其设计目的是用来简化新 Spring 应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。它默认配置了很多框架的使用方式，就像 Maven 整合了所有的 Jar 包，Spring Boot 整合了所有的框架。

### 使用 Spring Boot 有什么好处

Spring Boot 采用[**约定优于配置**](https://zh.wikipedia.org/wiki/%E7%BA%A6%E5%AE%9A%E4%BC%98%E4%BA%8E%E9%85%8D%E7%BD%AE)的设计理念，这意味着您只需极少的配置，就可以快速获得一个正常运行的 Spring 应用程序。这些极少的配置采用了注释的形式，所以没有 XML。

### 浅析 Spring Boot 目录结构

同学们可以简单地搭建一个 Demo 来熟悉一下 Spring Boot 目录结构：

* 1、 前往 [Spring Initializr 网站](http://start.spring.io/)
* 2、 依次选择 Maven Project、 Java、 2.x.x（最新稳定版本），点击 Generate Project
* 3、 将下载好的 demo.zip 解压出来，使用 IDEA 的 File -> Open 将项目导入进来，选择 Maven 项目，之后一直 Next 即可 

成功导入项目后，我们可以看到项目组成主要分为以下三个主要部分：

* **src/main/java** 程序开发以及主程序入口
* **src/main/resources** 配置文件
* **src/test/java** 测试程序

除了这些文件夹之外我们还可以看到以下几个文件

* **DemoApplication：** Spring Boot 的启动类，默认含有一个 main() 方法
* **application.properties：** Spring Boot 配置文件
* **DemoApplicationTests：** Spring Boot 测试程序
* **pom.xml：** Maven构建文件

### 详解项目中 application.yml

`application.yml` 是后端项目的主要配置文件，包含了很多插件的配置，同时也支持[自定义属性](#自定义配置)。

 ::: tip Tip
  ` application.yml` 采用了 [YAML](https://baike.baidu.com/item/YAML?fr=aladdin) 语言，等同于 Spring 项目中的 `application.properties`
 :::

#### 系统设置

``` yaml
server:
  port: 9090
  servlet:
    context-path: /SBDemo
    session:
      timeout: 30M
```

此处设置包含了三个属性：
* **port：** 项目的端口号
* **context-path：** 访问项目的名称
* **timeout：** session 超时时间 （ S 秒 M 分钟 H 小时 ） 

#### 日志设置

``` yaml
logging:
  level:
    SBDemo: DEBUG
    com.stone.mapper: DEBUG
```

这里的 `SBDemo` 对应着上文**系统配置**中的 `context-path`，需要名称保持一致，用于打印项目启动及运行时的日志信息。`com.stone.mapper` 代表着 `MyBatis` 接口文件存放的目录，作用是打印执行的 Sql 语句信息。

 ::: tip Tip
 日志等级由小到大分别为 TRACE < INFO < DEBUG < WARN < ERROR.
 :::
 
#### 数据库设置

``` yaml
spring:
  #数据源配置
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=utf8&useSSL=false
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource
  #redis配置
  redis:
    host: localhost
    port: 6379
    jedis:
      pool:
        max-idle: 8
        min-idle: 0
        max-active: 8
        max-wait: -1
    timeout: 0
```

这部分设置包含了数据源设置以及 **redis** 配置信息，一般情况下只需要修改数据源的 **url、username、password** 这三个选项，用于切换不同业务场景下面的数据源连接。
 
#### MyBatis 设置

``` yaml
mybatis:
  type-aliases-package: com.stone.model
  mapper-locations: classpath:mapper/*.xml
```

`type-aliases-package` 用于指定实体类存放路径，避免存在同名 class 时找不到实体类的情况。`mapper-locations`指定 XML 映射文件存放路径。

#### Page Helper 设置

``` yaml
mapper:
  mappers:
    - com.stone.base.BaseMapper
  not-empty: false
  identity: MYSQL
  before: true

pagehelper:
  helperDialect: mysql
  reasonable: true
  supportMethodsArguments: true
  params: count=countSql
```

项目中使用了 `Page Helper` 作为分页插件，这些配置为 MYSQL 的连接方式，下文中会详细的解释用法。

#### 自定义配置

配置文件中包含了一些自定义配置，例如 **Swagger** 配置，值使用 **key ：value** 定义。调用的时候在实现类中使用 **@Value** 注解在变量上方就可以了。

``` java
@Value("${swagger.enable}")
private boolean enableSwagger;
```

## Maven

Apache Maven，是一个软件项目管理及自动构建工具，基于项目对象模型（缩写：POM）概念，Maven利用一个中央信息片断能管理一个项目的构建、报告和文档等步骤。简单来说就是项目的 jar 包再也不用手动添加，而是在 pom.xml 中配置通过远程仓库拉取下来。

### 添加新的依赖库

如果我们想使用一个第三方库来进行业务开发，并且发现项目内没有，这时候就需要去 Maven 官方仓库去拉取了。 

* 前往 [Maven Repository](https://mvnrepository.com/) 网站，在搜索框输入想要导入的库名称（例如 POI）：

![](http://ww1.sinaimg.cn/large/005yqb1Zly1g123y49j7qj328018wdtx.jpg)

* 记得要看清楚仓库名称和更新日期，更新日期越新、使用越多越代表这个库是正确的。上图中的 1 和 2 都显示的 `Apache POI`，更新日期也相同，其实它们不是一个库，可以看到标题下方有一行小字 `org.apache.poi >> poi` 和 `org.apache.poi >> poi-ooxml`。我们需要导入的库是 `POI` 的核心库，所以选择第一个点击进入，选择最新的版本，默认情况下用新不用旧:satisfied:。

![](http://ww1.sinaimg.cn/large/005yqb1Zly1g124jjh9u0j328018w7i9.jpg)

* 选中 Maven 选项卡中的代码复制到项目中的 pom.xml 中，在 `<dependencies>` 标签内添加。之后 Maven 会自动下载依赖文件，你就可以在项目中使用新引入的依赖库了。

## MyBatis

**MyBatis** 是一个 Java 持久化框架，它通过 XML 描述符或注解把对象与存储过程或 SQL 语句关联起来。项目中使用 MyBatis 来做数据库关系映射，如果你之前没有使用过 MyBatis 可以通过[官方文档](http://www.mybatis.org/mybatis-3/zh/index.html)或者 Google 来进行学习。

## MyBatis Generator

**MyBatis Generator** 是一个Mybatis的代码生成器，通过简单的配置可以自动生成实体类、Mapper 接口文件以及 XML 映射文件。项目采用 Maven 插件的方式来使用 MyBatis Generator

### 使用方法

使用方法使用 Mysql 数据库作为示范，如果是其它关系型数据库请查看[这里](https://blog.csdn.net/isea533/article/details/42102297)。

* 找到 `src/main/resource/generator` 包下面的 `generatorConfig.xml` 文件

``` xml
<generatorConfiguration>
    <properties resource="application-dev.properties"/>

    <context id="Mysql" targetRuntime="MyBatis3Simple" defaultModelType="flat">
        <property name="beginningDelimiter" value="`"/>
        <property name="endingDelimiter" value="`"/>

        <plugin type="tk.mybatis.mapper.generator.MapperPlugin">
            <property name="mappers" value="com.stone.base.BaseMapper"/>
        </plugin>

        <jdbcConnection driverClass="${spring.datasource.driver-class-name}"
                        connectionURL="${spring.datasource.url}"
                        userId="${spring.datasource.username}"
                        password="${spring.datasource.password}">
        </jdbcConnection>

        <javaModelGenerator targetPackage="com.stone.model.test" targetProject="src/main/java">
            <property name="enableSubPackages" value="true"/>
        </javaModelGenerator>

        <sqlMapGenerator targetPackage="mapper" targetProject="src/main/resources"/>

        <javaClientGenerator targetPackage="com.stone.mapper" targetProject="src/main/java"
                             type="XMLMAPPER"/>

        <table tableName="new_test" domainObjectName="NewTest" >
            <!--mysql 配置-->
            <!--<generatedKey column="id" sqlStatement="Mysql" identity="true"/>-->
        </table>
    </context>
</generatorConfiguration>
```
* 可以看到 `properties` 标签内的参数是 `application-dev.properties`，其内参数对应着数据源的连接，如果数据源要切换记得要修改这个文件的配置
* `javaModelGenerator` 该元素用来控制生成的实体类，以下两个属性必填：
* * **targetPackage**：生成实体类存放的包名
* * **targetProject**：指定目标项目路径，可以是绝对路径或相对路径
* `sqlMapGenerator` 标签用于指定 XML 映射文件路径
* `javaClientGenerator` 标签用于指定 Mapper 接口文件路径
* `table` 指定要生成的表名，可以使用 SQL 通配符匹配多个表，以下两个属性必填：
* * **tableName**：数据库表对应名称
* * **domainObjectName**：要生成的实体类名称
* 根据实际情况修改好相应的配置后点击 IDEA 右侧菜单栏 Maven 选项，依次选择 Plugins -> mybatis-generator -> mybatis-generator:generate 单击运行就可以生成设置好的文件了

![](http://ww1.sinaimg.cn/large/005yqb1Zly1g12brupfeoj328018w1al.jpg)

## Apache Shiro

**Apache Shiro** 是一个开源安全框架，提供身份验证、授权、密码学和会话管理。Shiro 框架直观、易用，同时也能提供健壮的安全性。
                                         