# message
***
Message封装了手机系统短信的相关操作，支持发送多人。



###	索引
***
###	[方法](#方法)：

*	[createMessage](#createMessage) ：创建消息对象

###	[对象](#对象)：

*	[Message](#Message) ：消息对象
	-	方法
		-	[setRecipients](#setRecipients) ：设置收件人信息
		-	[send](#send) ：发送消息
***
#	<div id="方法">方法</div>
***

## <div id="createMessage" style="color:red">createMessage</div>
-	####	app.message.createMessage(msgType)   ⇒ [Message](#Message)
			创建指定类型的消息
	-	**msgType**： 消息类型
		-	**type**：Number
		-	**默认值**：1
		-	**取值范围**
			-	1：简单短信类型

-	#####	示例：

			var msg = app.message.createMessage() 

***
#	<div id="对象">对象</div>
***

##	<div id="Message" style="color:red">Message</div>

		var msg = app.message.createMessage() 
	
-	#### <div id="setRecipients" style="color:red">setRecipients(rps)   ⇒ void </div>   
			设置收件人信息
	-	**rps**：收件人信息
		-	**type**：Array(String)
		-	**默认值**：[]

-	#####	示例：

			var msg = app.message.createMessage() 

			msg.setRecipients(['10086', '10010']);

-	#### <div id="send" style="color:red">send(msg, success, [error])   ⇒ void </div>   
			发送消息
	-	**msg**：要发送的消息对象
		-	**type**：String 
		-	**默认值**：无
	-	**success**：消息发送成功回调函数
		-	**type**：function
		-	**默认值**：无
	-	**error**：消息发送失败回调函数
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：失败信息
				-	**type**：String

-	#####	示例：

			var msg = app.message.createMessage() 

			EX-1：
			msg.setRecipients(['10086']);
			msg.send('ni hao ',function(){
				console.log('发送成功！')
			})

			EX-2：
			msg.setRecipients(['10086']);
			msg.send('ni hao ',function(ms){
				alert(ms)
			},function(err){
				console.log(err)
			})