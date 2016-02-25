# iOS9适配
***

### 目录

第一章  [ATS](#第一章)

第二章  [URLScheme白名单](#第二章)

第三章  [企业级分发](#第三章)

第四章  [其他说明](#第四章)


### <div id="第一章">第一章	 ATS</div>
***

### 1. ATS的介绍

为了强制增强数据访问安全，iOS9默认会把大部分的HTTP请求都改为HTTPS请求。iOS9.0及以上系统，默认发出的HTTP请求统一采用TLS1.2协议。这一做法，官方文档称为ATS，全称为App Transport Security，是iOS9的一个新特性。

一个符合 ATS 要求的 HTTPS，应该满足如下条件：

* 1.Transport Layer Security协议版本要求TLS1.2以上
* 2.服务的Ciphers配置要求支持Forward Secrecy
* 3.证书签名算法符合ATS要求，ATS只信任知名CA颁发的证书。self signed certificate(自签名证书)，会被ATS拦截。

官方文档[App Transport Security Technote](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html)对CA颁发的证书要求：

 > Certificates must be signed using a SHA256 or better signature hash algorithm, with either a 2048 bit or greater RSA key or a 256 bit or greater Elliptic-Curve (ECC) key. Invalid certificates result in a hard failure and no connection

官方文档 [App Transport Security](https://developer.apple.com/library/ios/releasenotes/General/WhatsNewIniOS/Articles/iOS9.html#//apple_ref/doc/uid/TP40016198-SW14)对ATS 的介绍。


	All connections using the NSURLConnection, CFURL, or NSURLSession APIs use App Transport Security default behavior in apps built for iOS 9.0 or later, and OS X v10.11 or later. Connections that do not follow the requirements will fail. For more information on various the connection methods, see NSURLConnection Class Reference, CFURL Reference, or NSURLSession Class Reference.
	
	These are the App Transport Security requirements:
	
	 - The server must support at least Transport Layer Security (TLS) protocol version 1.2.
	 - Connection ciphers are limited to those that provide forward secrecy (see the list of ciphers below.)
	 - Certificates must be signed using a SHA256 or greater signature hash algorithm, with either a 2048-bit or greater RSA key or a 256-bit or greater Elliptic-Curve (ECC) key.
	Invalid certificates result in a hard failure and no connection.
	
	These are the accepted ciphers:
	 - TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
	 - TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
	 - TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
	 - TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA
	 - TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
	 - TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA
	 - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
	 - TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
	 - TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384
	 - TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
	 - TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA


苹果官方提供了一些可选配置项来决定是否开启ATS模式。开发者可以针对某些确定的URL不使用ATS，关于App Transport Security，每个应用一般属于以下几类：

<table border="1" cellspacing="0" cellpadding="0" style="margin-left: 26px;border: none">
<thead>
<tr>
<th> --   </th>
<th> 分类名 </th>
<th> 解释  </th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"> 1   </td>
<td align="left"> HTTPS Only （只有HTTPS，所有情况下都使用ATS）</td>
<td align="left"> 如果你的应用只基于支持HTTPS的服务器，你的应用不需要做任何改变。但是，注意App Transport Security要求TLS 1.2，而且它要求站点使用支持forward secrecy协议的密码。证书也要求是符合ATS规格的。因此慎重检查与你的应用交互的服务器是不是符合ATS的要求。 </td>
</tr>
<tr>
<td align="center"> 2        </td>
<td align="left"> Mix & Match（混合）       </td>
<td align="left"> 如果你的服务器不符合ATS要求，你需要在native端的配置文件里说明哪些地址是不符合ATS要求的。</td>
</tr>
<tr>
<td align="center"> 3</td>
<td align="left"> Opt Out（禁用ATS）     </td>
<td align="left"> 如果你在创建一个网页浏览器，因为你不能确定用户将要访问哪个网页，也就不可能指明这些网页是否支持ATS要求且在HTTPS上传输。在这种情况下，只能配置为禁用ATS。</td>
</tr>
<tr>
<tr>
<td align="center"> 4       </td>
<td align="left"> Opt Out With Exceptions（除特殊情况外，都不使用ATS）     </td>
<td align="left"> 如果想禁用ATS的同时又想定义一些例外。这个应用场景是当你的应用需要从很多不符合ATS要求的服务器上取数据，但是也要与一个你可控的API(符合ATS要求)交互。在这种情况下，需要在应用native端的配置文件中配置为允许所有请求，但是你也指定了一个或多个例外来表明哪些请求是必须符合ATS的要求。 </td>
</tr>
</tbody>
</table>


### 2. 如何适配

369cloud iOS引擎已经对该部分进行了适配，但是考虑到国内环境大部分服务器不符合ATS要求，所以默认该功能为关闭状态，即如果不进行任何配置则所有地址均可以正常访问。如果服务器符合ATS要求，想让App传输更加安全，需要在pluginConfig.xml中进行配置。配置方式如下：


	<config pluginName="InfoPlistEdit">
	    <ios>
	        <param key="AllowAllHttpConnection" value="false"></param>
	        <param key="HttpWhiteList">
	            <string>api.u148.net</string>
	            <string>www.datang.com</string>
	        </param>
	    </ios>
	</config>


说明：

* 引擎会读取pluginName字段，如果是InfoPlistEdit则表明是对iOS9的适配

* AllowAllHttpConnection字段vaule当为true时，关闭ATS模式，表明允许所有请求地址，包括http和符合ATS要求的请求地址。此时会忽略HttpWhiteList列表。

* 如果AllowAllHttpConnection字段vaule当为false时，开启ATS模式，默认不允许http地址；此时若允许部分http链接，则需要对HttpWhiteList字段进行配置。HttpWhiteList对应所有值为所有非ATS的地址。不在列表中进行说明的则默认为符合ATS的请求。

* 若第一次允许了所有的http请求，想要再改为不允许，必须要卸载应用程序重新安装，否则仍然为允许所有http请求。


### <div id="第二章"> URLScheme白名单</div>
***

### 1. URLScheme白名单

#### 1.1 什么是URLScheme

URL Scheme是为方便app之间互相调用而设计的。你可以通过一个类似URL的链接，在native端通过系统的OpenURL来打开该app，并可以传递一些参数。每个URL必须能唯一标识一个APP，如果你设置的URL与别的APP的URL冲突，此时，你的APP不一定会被调用起来，原因是当APP在安装的时候就已经在系统里面注册了此APP的URL Scheme。

#### 1.2 什么是URLScheme白名单

[WWDC 2015 Session 703: "Privacy and Your App](https://developer.apple.com/videos/wwdc/2015/?id=703) 中指出在iOS9.0及以上系统中，如果使用canOpenURL方法，该方法所涉及到的 URL scheme 必须在工程中将它们列为白名单，否则不能使用。

**白名单上限是50个**

[WWDC 2015 Session 703: "Privacy and Your App](https://developer.apple.com/videos/wwdc/2015/?id=703) 有说明：

 > “So for apps that are linked before iOS 9 and are running on iOS 9, they will be given 50 distinct URL schemes.” -- WWDC 2015 session 703 Privacy and Your App

### 2. 使用方法

URLScheme白名单是针对rd.app.isAppInstalled方法而配置的。如果调用该方法但是没有配置，该方法所有返回值均为false。

开发者需要在pluginConfig.xml中进行配置说明。配置方式如下：


	<config pluginName="InfoPlistEdit">
	    <ios>
	        <param key="SchemeWhiteList">
	            <string>wb568898243</string>
	            <string>wb801307650</string>
	        </param>
	    </ios>
	</config>


说明：

* 引擎会读取pluginName字段，如果是InfoPlistEdit则表明是对iOS9的适配

* SchemeWhiteList字段表示需要添加的URLScheme白名单列表，不写或写错都会在iOS9上无效

###　<div id="第三章"> 第三章 企业级分发</div>
***

369cloud打包默认使用证书为企业级证书，采用方式即为企业级分发。需要注意以下事项。

### 1. 扫描二维码

控制台在线编译完成以后，用iPhone扫描二维码，点击“安装”按钮进行安装。

注意：安装app所在页面必须要符合苹果`itms-services`协议，在不符合该协议的页面点击安装会没有反应。比如使用微信、QQ扫描点击安装会没有反应。

此时需要在微信或QQ安装页面点击右上角按钮，在弹出框里找到使用Safari浏览器打开选项，点击跳转到系统浏览器Safari里后再点击“安装”按钮进行安装。

微信扫描并跳转图示（QQ同理）：

![image](img/iOS9_install_wechart1.PNG =320x568)


![image](img/iOS9_install_wechart2.PNG =320x568)

### 2. 安装及证书信任

点击安装以后按home键返回主页面。可以看到程序下载安装进度。安装完成以后，在iOS9设备上会出现不被信任的按钮。

如图：

![image](img/iOS9_install_truet_alert.PNG =320x568)

此时需要用户在 设置-通用-描述文件 页面中,点击并相信相应的企业证书描述文件。

未点击证书信任时如图所示：

![image](img/iOS9_cert_page.PNG =320x568)

点击证书文件弹出信任按钮：

![image](img/iOS9_install_trust.PNG =320x568)

证书验证完成以后：

![image](img/iOS9_install_trusted.PNG =320x568)

之后就可以正常打开下载的app了。

整个认证过程可参考以下动态图：

![image](img/ios9_trustCert.gif)


###　<div id="第四章">第四章	 其他说明</div>

* 当在pluginConfig.xml中完成配置以后，请确保代码同步到SVN再进行自定义App或者使用控制台进行打包。否则在编译器去读不到配置的相关字段，则不会在native端进行相关配置信息的修改。

* 以上变化针对所有$299证书打包的应用，发布到AppStore的证书不属于该证书范围，没有该问题。

* 该操作在iOS9上才需要，iOS8及以下系统没有影响。

* 在实际操作过程中，经常遇到验证失败的问题。我们曾经尝试过很多次，证书没有问题，但是确实会有验证失败的情况。苹果的验证服务器位于美国，所以如果验证失败，请多尝试几次。

本文一些内容摘抄自[iOS程序犭袁github](https://github.com/ChenYilong/iOS9AdaptationTips)，感谢作者和所有贡献者的整理，文中其他部分讲解了native端如何适配iOS9，感兴趣的可以查看原文。