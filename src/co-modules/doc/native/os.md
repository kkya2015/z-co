# os
***
os模块管理操作系统信息



###	索引
***
###	[方法](#方法)：

*	[getLanguage](#getLanguage) ：获取当前操作系统设置的系统语言
*	[getVersion](#getVersion) ：获取当前操作系统的版本信息
*	[getName](#getName) ：获取当前操作系统的名称
*	[getVendor](#getVendor) ：获取当前操作系统的供应商名称

***
#	<div id="方法">方法</div>
***

## <div id="getLanguage" style="color:red">getLanguage</div>
-	####	app.os.getLanguage()   ⇒ String
			获取当前操作系统设置的系统语言

-	#####	示例：

			var lg = app.os.getLanguage()

## <div id="getVersion" style="color:red">getVersion</div>
-	####	app.os.getVersion()   ⇒ String
			获取当前操作系统的版本信息

-	#####	示例：

			var version = app.os.getVersion()

## <div id="getName" style="color:red">getName</div>
-	####	app.os.getName()   ⇒ String
			获取当前操作系统的名称,Android设备返回字符串“Android” iOS设备返回字符串“iOS”

-	#####	示例：

			var name = app.os.getName()
			if(name == 'Android')console.log('Android');

## <div id="getVendor" style="color:red">getVendor</div>
-	####	app.os.getVendor()   ⇒ String
			获取当前操作系统的供应商名称

-	#####	示例：

			var vendor = app.os.getVendor()
