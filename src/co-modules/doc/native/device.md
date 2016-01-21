
device模块管理设备信息，用于获取手机设备的相关信息，如IMEI、IMSI、型号、厂商等。通过rd.device获取设备信息管理对象。



###	索引
***
###	[方法](#方法)：

*	[getImei](#getImei) ：获取设备的国际移动设备身份码
*	[getImsi](#getImsi) ：获取设备的国际移动用户识别码
*	[getModel](#getModel) ：获取设备的型号
*	[getVendor](#getVendor) ：获取设备的生产厂商
*	[getUuid](#getUuid) ：获取设备的唯一标识
*	[dial](#dial) ：拨打电话
*	[beep](#beep) ：发出蜂鸣声
*	[vibrate](#vibrate) ：设备振动
*	[setWakeUp](#setWakeUp) ：设置应用保持唤醒（屏幕常亮）状态
*	[setWakeOff](#setWakeOff) ：关闭应用保持唤醒（屏幕常亮）状态
*	[isWakelock](#isWakelock) ：获取程序是否一直保持唤醒（屏幕常亮）状态
*	[setVolume](#setVolume) ：设置设备的系统音量
*	[getVolume](#getVolume) ：获取设备的系统音量

***
#	<div id="方法">方法</div>
***

## <div id="getImei" style="color:red">getImei</div>
-	####	app.device.getImei()   ⇒ String  
			获取设备的国际移动设备身份码。 如果设备不支持则返回空字符串,不支持iOS设备.

-	#####	示例：

			var imei = app.device.getImei()

## <div id="getImsi" style="color:red">getImsi</div>
-	####	app.device.getImsi()   ⇒ Array   
			获取设备上插入SIM的国际移动设备身份码。 如果设备支持多卡模式则返回包含所有SIM身份码的字符串数组。 如果设备不支持或没有插入SIM卡则返回空数组,不支持iOS设备.

-	#####	示例：

			var imsi = app.device.getImsi()

## <div id="getModel" style="color:red">getModel</div>
-	####	app.device.getModel()   ⇒ String  
			获取设备的型号信息。 如果设备不支持则返回空字符串。

-	#####	示例：

			var model = app.device.getModel()

## <div id="getVendor" style="color:red">getVendor</div>
-	####	app.device.getVendor()   ⇒ String  
			获取设备的型号信息。 如果设备不支持则返回空字符串。

-	#####	示例：

			var vendor = app.device.getVendor()

## <div id="getUuid" style="color:red">getUuid</div>
-	####	app.device.getUuid()   ⇒ String  
			获取设备的唯一标识号，根据包名随机生成的设备标识号。注意：在设备重置后会重新生成。

-	#####	示例：

			var uuid = app.device.getUuid()

## <div id="dial" style="color:red">dial</div>
-	####	app.device.dial(number, [confirm])   ⇒ void  
			调用系统程序拨打电话。
	-	**number**：要拨打的电话号码
		-	**type**：String
		-	**默认值**：无
	-	**confirm**：是否弹出确认对话框
		-	**type**：Boolean 
		-	**默认值**：false

-	#####	示例：
			app.device.dial('17701326856');

## <div id="beep" style="color:red">beep</div>
-	####	app.device.beep([times])   ⇒ void  
			调用此方法使得设备发出蜂鸣声。
	-	**times**：蜂鸣声重复的次数，默认发出一次蜂鸣声，iOS设备不支持
		-	**type**：Number 
		-	**默认值**：1

-	#####	示例：

			app.device.beep(2);

## <div id="vibrate" style="color:red">vibrate</div>
-	####	app.device.vibrate([milliseconds])   ⇒ void  
			调用此方法使得设备振动。
	-	**milliseconds**：设备振动持续的时间，单位为ms，默认为500ms。ios不支持
		-	**type**：Number 
		-	**默认值**：500

-	#####	示例：

			app.device.vibrate(1000);

## <div id="setWakeUp" style="color:red">setWakeUp</div>
-	####	app.device.setWakeUp()   ⇒ void  
			设置应用保持唤醒（屏幕常亮）状态

-	#####	示例：

			app.device.setWakeUp();

## <div id="setWakeOff" style="color:red">setWakeOff</div>
-	####	app.device.setWakeOff()   ⇒ void  
			关闭程序保持唤醒状态。

-	#####	示例：

			app.device.setWakeOff();

## <div id="isWakelock" style="color:red">isWakelock</div>
-	####	app.device.isWakelock()   ⇒ Boolean   
			获取程序是否一直保持唤醒（屏幕常亮）状态

-	#####	示例：

			app.device.isWakelock();

## <div id="setVolume" style="color:red">setVolume</div>
-	####	app.device.setVolume(volume)   ⇒ void   
			调用此方法调节设备的系统音量。Android设置音量后对所有项的音量生效，如通话音量、系统音量、铃声音量、音乐音量、提示声音音量。(iOS设置音量后仅对媒体声音有效)
	-	**volume**：设备的系统音量值，设置设备音量后对所有程序生效，退出程序系统仍然保持最后设定的音量值。
		-	**type**：Number 
		-	**默认值**：无
		-	**取值范围**：0 到1之间，0表示静音，1表示最大音量值

-	#####	示例：

			app.device.setVolume(0.5);

## <div id="getVolume" style="color:red">getVolume</div>
-	####	app.device.getVolume()   ⇒ Number    
			获取设备的系统音量

-	#####	示例：

			app.device.getVolume();