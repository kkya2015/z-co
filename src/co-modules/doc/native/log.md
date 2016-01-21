# log
***
log管理模块，通过UDP传送，将log信息打印到IDE上，方便调试程序。（无字符限制）



###	索引
***
###	[方法](#方法)：

*	[info](#info) ：打印information的log
*	[warning](#warning) ：打印warning的log
*	[error](#error) ：打印error的log

***
#	<div id="方法">方法</div>
***

## <div id="info" style="color:red">info</div>
-	####	app.log.info(info)   ⇒ void 
			将Information发送到IDE控制台。
	-	**info**： 发送的信息
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

			app.log.info('info')

## <div id="warning" style="color:red">warning</div>
-	####	app.log.warning(info)   ⇒ void 
			将warning发送到IDE控制台。
	-	**info**： 发送的信息
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

			app.log.warning('warning')

## <div id="error" style="color:red">error</div>
-	####	app.log.error(info)   ⇒ void 
			将error发送到IDE控制台。
	-	**info**： 发送的信息
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

			app.log.error('error')
