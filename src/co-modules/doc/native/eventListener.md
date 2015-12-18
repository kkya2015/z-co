# event
***
event用于事件的监听和广播



###索引
***
###[方法](#方法)：

*	[addEvent](#addEvent) ：添加事件监听
*	[removeEvent](#removeEvent) ：移除事件监听
*	[sendEvent](#sendEvent) ：发送广播
***
#<div id="方法">方法</div>
***

## <div id="addEvent">addEvent</div>
-	####app.event.addEvent(eventName, callback)   ⇒ void 
		添加事件监听
	-	eventName： 事件名称
		-	type：String
		-	默认值：无
	-	callback： 事件回调
		-	type：Function
		-	默认值：无
		-	参数
			-	params： 发送事件广播时的入参（参考：[sendEvent](#sendEvent)）
				-	type：JSON
				-	默认值：无
#####示例：
	app.event.addEvent('event', function(object) {
	    alert(object.key);
	});


##<div id="removeEvent">removeEvent</div>

-	####app.event.removeEvent(eventName)   ⇒ void
		移除事件监听
	-	eventName： 事件名称
		-	type：String
		-	默认值：无

#####示例：
	app.event.removeEvent('event');

##<div id="sendEvent">sendEvent</div>

-	####app.event.sendEvent(eventName,[params])   ⇒ void
		发送事件广播
	-	eventName： 事件名称
		-	type：String
		-	默认值：无
	-	params： 触发事件回调时传入的参数（参考：[addEvent](#addEvent)）
		-	type：JSON
		-	默认值：无

#####示例：
	app.event.sendEvent('event', {
	    key: 'value'
	});


