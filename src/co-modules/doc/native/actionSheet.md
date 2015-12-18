# actionSheet
***
页面底部弹出选择框。


###索引
***
###[方法](#方法)：

*	[show](#show) ：显示弹出框


***
#<div id="方法">方法</div>
***

## <div id="show">show</div>

	

-	####app.actionSheet.show(options, success)   ⇒ void 
		显示弹出框
	-	options：配置参数
		-	type：JSON
		-	keys
			-	title：标题
				-	type：String 
				-	默认值：无
			-	cancelTitle：取消按钮标题
				-	type：String 
				-	默认值：无
			-	destrutiveTitle：红色警示按钮标题，一般用于做一些删除之类操作
				-	type：String 
				-	默认值：无
			-	buttons：按钮标题
				-	type：Array 
				-	默认值：无
	-	success：选择弹出框上按钮的回调
		-	type：function
		-	默认值：无
		-	参数
			-	index：返回从0开始依次递增的数字，分别表示为 以cancelTitle为名字的按钮--0，buttons数组里的按钮依次递增（buttons 数组里的按钮从1开始），以destructiveTitle为名字的带有红色警示的按钮为最大值

#####示例：
	app.actionSheet.show({
	    title: '底部弹出框测试',
	    cancelTitle: '这里是取消按钮',
	    destructiveTitle: '红色警告按钮',
	    buttons: ['相册', '视频', '手机', '哈哈哈'],
	}, function(index) {
	    console.log(index)
	})

