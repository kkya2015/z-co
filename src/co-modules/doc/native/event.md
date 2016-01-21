
event用于事件的监听和广播



###	索引
***
###	[方法](#方法)：

*	[addEvent](#addEvent) ：添加事件监听
*	[addBatteryChangeEvent](#addBatteryChangeEvent) ：添加电池状态变化事件监听
*	[addNetworkChangeEvent](#addNetworkChangeEvent) ：添加网络状态变化事件监听
*	[removeBatteryChangeEvent](#removeBatteryChangeEvent) ：删除电池状态变化事件监听
*	[removeEvent](#removeEvent) ：移除事件监听
*	[removeNetworkChangeEvent](#removeNetworkChangeEvent) ：删除网络状态变化事件监听
*	[sendEvent](#sendEvent) ：发送广播
***
#	<div id="方法">方法</div>
***

## <div id="addEvent" style="color:red">addEvent</div>
-	####	app.event.addEvent(eventName, callback)   ⇒ void 
	
			添加事件监听

	-	**eventName**： 事件名称
		-	**type**：String
		-	**默认值**：无
	-	**callback**： 事件回调
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**params**： 发送事件广播时的入参（参考：[sendEvent](#sendEvent)）
				-	**type**：JSON
				-	**默认值**：无

-	#####	示例：

			app.event.addEvent('event', function(object) {
			    console.log(object.key);
			});

## <div id="addBatteryChangeEvent" style="color:red">addBatteryChangeEvent</div>
-	####	app.event.addBatteryChangeEvent(callback)   ⇒ void
 
			添加电池状态变化事件监听

	-	**callback**： 事件回调
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**state**： 电池状态值
				-	**type**：Number
				-	**默认值**：无
					-	**值范围**：
						-	6：电量低
						-	7：从电量低恢复为正常
						-	8：正在充电
						-	9：没在充电
						-	10：AC充电器充电（iOS不支持）
						-	11：USB充电（iOS不支持）
						-	12：无线充电（iOS不支持）

-	#####	示例：

			app.event.addBatteryChangeEvent(function(state) {
			    if(state == 6)console.log('电量低！')
			});

## <div id="addNetworkChangeEvent" style="color:red">addNetworkChangeEvent</div>
-	####	app.event.addNetworkChangeEvent(callback)   ⇒ void 

			添加网络状态变化事件监听

	-	**callback**： 事件回调
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**state**： 网络状态值
				-	**type**：Number
				-	**默认值**：无
					-	**值范围**：
						-	0：无网络
						-	1：WIFI
						-	2：ETHERNET（iOS不支持）
						-	3：MOBILE
						-	4：VPN
						-	5：WIMAX（iOS不支持）

-	#####	示例：

			app.event.addNetworkChangeEvent(function(state) {
			    if(state == 0)console.log('无网络！')
			});

##	<div id="removeBatteryChangeEvent" style="color:red">removeBatteryChangeEvent</div>

-	####	app.event.removeBatteryChangeEvent()   ⇒ void

			删除电池状态变化事件监听

-	#####	示例：

			app.event.removeBatteryChangeEvent();

##	<div id="removeEvent" style="color:red">removeEvent</div>

-	####	app.event.removeEvent(eventName)   ⇒ void

			移除事件监听

	-	**eventName**： 事件名称
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

			app.event.removeEvent('event');

##	<div id="removeNetworkChangeEvent" style="color:red">removeNetworkChangeEvent</div>

-	####	app.event.removeNetworkChangeEvent()   ⇒ void

			删除网络状态变化事件监听

-	#####	示例：

			app.event.removeNetworkChangeEvent();

##	<div id="sendEvent" style="color:red">sendEvent</div>

-	####	app.event.sendEvent(eventName,[params])   ⇒ void

			发送事件广播

	-	**eventName**： 事件名称
		-	**type**：String
		-	**默认值**：无
	-	**params**： 触发事件回调时传入的参数（参考：[addEvent](#addEvent)）
		-	**type**：JSON
		-	**默认值**：无

-	#####	示例：

			app.event.sendEvent('event', {
			    key: 'value'
			});


