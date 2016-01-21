
screen模块管理设备屏幕信息


###	索引
***
###	[方法](#方法)：

*	[getResolutionWidth](#getResolutionWidth) ：获取当前设备屏幕宽度分辨率
*	[getResolutionHeight](#getResolutionHeight) ：获取当前设备屏幕高度分辨率
*	[getScale](#getScale) ：获取当前设备逻辑分辨率与实际分辨率的比例
*	[getDpiX](#getDpiX) ：获取当前设备屏幕水平方向的密度
*	[getDpiY](#getDpiY) ：获取当前设备屏幕垂直方向的密度
*	[setBrightness](#setBrightness) ：设置屏幕亮度
*	[getBrightness](#getBrightness) ：获取屏幕亮度值
*	[lockOrientation](#lockOrientation) ：锁定屏幕方向,iOS设备不支持.
*	[unlockOrientation](#unlockOrientation) ：解除锁定屏幕方向,iOS设备不支持.

***
#	<div id="方法">方法</div>
***

## <div id="getResolutionWidth" style="color:red">getResolutionWidth</div>
-	####	app.screen.getResolutionWidth()   ⇒ Number 
			获取当前设备屏幕宽度分辨率，屏幕区域包括系统状态栏显示区域和应用显示区域，screen获取的是设备屏幕总区域的逻辑分辨率，单位为px。 如果需要获取实际分辨率则需要乘以比例值scale。

-	#####	示例：

			var resolutionHeight = app.screen.getResolutionWidth()

## <div id="getResolutionHeight" style="color:red">getResolutionHeight</div>
-	####	app.screen.getResolutionHeight()   ⇒ Number  
			获取当前设备屏幕高度分辨率，屏幕区域包括系统状态栏显示区域和应用显示区域，screen获取的是设备屏幕总区域的逻辑分辨率，单位为px。 如果需要获取实际分辨率则需要乘以比例值scale。

-	#####	示例：

			var resolutionHeight = app.screen.getResolutionHeight()

## <div id="getScale" style="color:red">getScale</div>
-	####	app.screen.getScale()   ⇒ Number  
			获取当前设备逻辑分辨率与实际分辨率的比例，屏幕分辨率分逻辑分辨率和实际分辨率，在html页面中使用的像素值都是相对于逻辑分辨率，此值就是逻辑分辨率和实际分辨率的比例，实际分辨率=逻辑分辨率*比例。

-	#####	示例：

			var scale = app.screen.getScale()

## <div id="getDpiX" style="color:red">getDpiX</div>
-	####	app.screen.getDpiX()   ⇒ Number  
			获取当前设备屏幕水平方向的密度，设备屏幕的密度为每英寸所显示的像素点数，密度越高显示清晰度越高，单位为dpi。

-	#####	示例：

			var dpiX = app.screen.getDpiX()

## <div id="getDpiY" style="color:red">getDpiY</div>
-	####	app.screen.getDpiY()   ⇒ Number  
			获取当前设备屏幕垂直方向的密度，设备屏幕的密度为每英寸所显示的像素点数，密度越高显示清晰度越高，单位为dpi。

-	#####	示例：

			var dpiY = app.screen.getDpiY()

##	<div id="setBrightness" style="color:red">setBrightness</div>

-	####	app.screen.setBrightness(brightness)   ⇒ void
			调用此方法调节设备屏幕亮度。
	-	**brightness**： 屏幕的亮度值，设置屏幕亮度仅对当前程序在前台运行时有效，退出程序后屏幕亮度由系统设置的值决定。
		-	**type**：Number 
		-	**默认值**：无
		-	**取值范围**：0 - 1，0表示最低亮度值，1表示最高亮度值。

-	#####	示例：

			app.screen.setBrightness(0.5)

## <div id="getBrightness" style="color:red">getBrightness</div>
-	####	app.screen.getBrightness()   ⇒ Number  
			屏幕亮度值范围为0到1，0表示最低亮度值，1表示最高亮度值。

-	#####	示例：

			var brightness  = app.screen.getBrightness()

## <div id="lockOrientation" style="color:red">lockOrientation</div>
-	####	app.screen.lockOrientation()   ⇒ void  
			锁定屏幕方向后屏幕只能按锁定的屏幕方向显示，关闭当前页面后仍然有效。 可再次调用此方法修改屏幕锁定方向或调用unlockOrientation()方法恢复到应用的默认值。

-	#####	示例：

			app.screen.lockOrientation()

## <div id="unLockOrientation" style="color:red">unLockOrientation</div>
-	####	app.screen.unLockOrientation()   ⇒ void  
			解除锁定屏幕方向后将恢复应用默认的屏幕显示方向（通常为应用打包发布时设置的方向）。

-	#####	示例：

			app.screen.unLockOrientation()
