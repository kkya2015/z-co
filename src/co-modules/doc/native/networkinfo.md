# networkinfo
***
用于获取网络信息



###	索引
***
###	[方法](#方法)：

*	[getCurrentType](#getCurrentType) ：获取设备当前连接的网络类型

***
#	<div id="方法">方法</div>
***

## <div id="getCurrentType"	style="color:red">getCurrentType</div>
-	####	app.networkinfo.getCurrentType()   ⇒ Number 
			获取设备当前连接的网络类型
	-	**返回值**：网络类型
		-	0：网络连接状态未知
		-	1：未连接网络
		-	2：有线网络
		-	3：无线WIFI网络
		-	4：蜂窝移动2G网络
		-	5：蜂窝移动3G网络
		-	6：蜂窝移动4G网络

-	#####	示例：

			var net = app.networkinfo.getCurrentType()
			if(net == 6)console.log('当前连接网络为4G');