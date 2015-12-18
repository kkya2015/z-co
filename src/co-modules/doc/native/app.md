# app
***
app是引擎对外接口的调用对象，所有对引擎的操作均通过app对象来完成。


###索引
***

###[方法](#方法)：

*	[config](#config) ：配置app系统参数
*	[createWindow](#createWindow) ：新建一个窗口对象
*	[currentView](#currentView) ：获取当前页面对象
*	[addSlideDrawer](#addSlideDrawer) ：添加侧滑抽屉效果
*	[openLeftSlideDrawer](#openLeftSlideDrawer) ：开启左侧抽屉
*	[openRightSlideDrawer](#openRightSlideDrawer) ：开启右侧抽屉
*	[closeSlideDrawer](#closeSlideDrawer) ：关闭抽屉
*	[evalScriptInWindow](#evalScriptInWindow) ：在指定窗口执行JS语句
*	[evalScriptInPop](#evalScriptInPop) ：指定pop执行JS语句
*	[lockRotate](#lockRotate) ：锁定屏幕翻转
*	[unLockRotate](#unLockRotate) ：解锁屏幕翻转
*	[alert](#alert) ：弹出单按钮对话框
*	[confirm](#confirm) ：弹出带两个或三个按钮的confirm对话框
*	[prompt](#prompt) ：弹出带两个或三个按钮和输入框的对话框


***
#<div id="方法">方法</div>
***

## <div id="config">config</div>

	

-	####app.config(options)   ⇒ void 
		通过JSON对象，对一些系统默认值进行配置,避免每次使用时都需要反复设置
	-	options ：配置JSON对象
		-	type：JSON
		-	默认值：无
		-	keys
			-	windowType ：( Number )窗口类型
				-	默认值：0
				-	取值范围
					-	0：本地地址
					-	1：html字符串
					-	2：网络地址
			-	popoverType：( Number )pop窗口类型
				-	默认值：0
				-	取值范围
					-	0：本地地址
					-	1：html字符串
					-	2：网络地址
			-	windowAnimationType：( Number )打开窗口动画类型
				-	默认值：11
				-	取值范围
					-	10：淡入淡出
					-	11：推入
					-	12：显露
					-	13：切入
					-	14：立方体翻转
					-	15：上翻页
					-	16：下翻页
					-	17：收缩
					-	18：水滴
					-	19：翻转
					-	20：旋转
					-	21：照相机打开
					-	22：照相机关闭
			-	windowAnimationDirection：( Number )打开窗口方向类型
				-	默认值：41
				-	取值范围
					-	40：从左往右
					-	41：从右往左
					-	42：从上往下
					-	43：从下往上
			-	windowAnimationDuration：( Number )打开窗口动画时间
				-	默认值：300（单位：ms）
			-	windowAnimationCurve：( Number )打开窗口动画曲线类型
				-	默认值：53
				-	取值范围
					-	50：线性
					-	51：从慢到快
					-	52：从快到慢
					-	53：从慢到快到慢
			-	viewBounces：( Boolean )是否允许页面弹动（仅对IOS有效）
				-	默认值：true
			-	viewBgcolor：( String )页面背景色
				-	默认值：白色
			-	viewVScrollBar：( Boolean )是否显示水平滚动条
				-	默认值：false
			-	viewHScrollBar：( Boolean )是否显示水平滚动条
				-	默认值：true
			-	viewZoom：( Boolean )页面是否支持缩放
				-	默认值：false
			-	viewKeyboard：( Boolean )键盘弹出后，输入框是否会自动定位，android暂时不支持
				-	默认值：false
			-	viewDragDismiss：( Boolean )是否支持滑动消失键盘，android暂时不支持
				-	默认值：false
			-	viewAnimationType：( Number )页面关闭动画效果类型
				-	默认值：11
				-	取值范围
					-	10：淡入淡出
					-	11：推入
					-	12：显露
					-	13：切入
					-	14：立方体翻转
					-	15：上翻页
					-	16：下翻页
					-	17：收缩
					-	18：水滴
					-	19：翻转
					-	20：旋转
					-	21：照相机打开
					-	22：照相机关闭
			-	viewAnimationDirection：( Number )页面关闭动画方向
				-	默认值：40
				-	取值范围
					-	40：从左往右
					-	41：从右往左
					-	42：从上往下
					-	43：从下往上
			-	viewAnimationDuration：( Number )页面关闭动画时间
				-	默认值：300（单位：ms）
			-	viewAnimationCurve：( Number )页面关闭动画曲线
				-	默认值：53
				-	取值范围
					-	50：线性
					-	51：从慢到快
					-	52：从快到慢
					-	53：从慢到快到慢

#####示例：
	若设计中的窗口打开与关闭动画为淡入淡出，可做以下设置即可
	并将该语句放在一个app自身的一个公用JS文件（每个页面都会引用的文件，不要放在CO文件夹内）中即可

		  app.config({
		    viewAnimationType:10,
		    windowAnimationType:10
		  })

##<div id="createWindow">createWindow</div>
-	#### app.createWindow()   ⇒ window
		新建一个窗口对象(参见：window)

#####示例：
	var win = app.createWindow();

##<div id="currentView">currentView</div>
-	#### app.currentView()   ⇒ view 
		获取当前页面对象(参见：view)

#####示例：
	var view = app.currentView();


##<div id="addSlideDrawer">addSlideDrawer</div>

-	####app.addSlideDrawer(url, [type], [edge])   ⇒ void 
		给首页添加侧滑抽屉效果
	-	url：要打开页面的地址
		-	type：String
		-	默认值：无
	-	type：left（左侧）、right（右侧）
		-	type：String
		-	默认值：left
	-	edge：侧滑时, 侧滑window停留时露出的宽度
		-	type：Number
		-	默认值：50


#####示例：

	EX-1：
	app.addSlideDrawer('native/view.html','left',200);

	EX-2：
	app.addSlideDrawer('native/view.html','left');

	EX-3：
	app.addSlideDrawer('native/view.html');

##<div id="openLeftSlideDrawer">openLeftSlideDrawer</div>
-	#### app.openLeftSlideDrawer()   ⇒ void 
		开启左侧抽屉

#####示例：
	app.openLeftSlideDrawer();

##<div id="openRightSlideDrawer">openRightSlideDrawer</div>
-	#### app.openRightSlideDrawer()   ⇒ void 
		开启右侧抽屉

#####示例：
	app.openRightSlideDrawer();

##<div id="closeSlideDrawer">closeSlideDrawer</div>
-	#### app.closeSlideDrawer()   ⇒ void 
		关闭抽屉

#####示例：
	app.closeSlideDrawer();

##<div id="evalScriptInWindow">evalScriptInWindow</div>
-	#### app.evalScriptInWindow(script, [windowName])   ⇒ void 
		在指定窗口执行JS语句
	-	script：需要执行的JS语句
		-	type：String
		-	默认值：无
	-	windowName：需要执行JS语句的窗口名称，默认为当前窗口
		-	type：String
		-	默认值：当前窗口
	
#####示例：

	EX-1：
	app.evalScriptInWindow('console.log("这是从别的窗口执行的JS语句");','windowName');

	EX-2：
	app.evalScriptInWindow('console.log("这是在当前窗口执行的JS语句");');


##<div id="evalScriptInPop">evalScriptInPop</div>
-	#### app.evalScriptInPop(script, popoverName, [windowName])   ⇒ void 
		指定pop执行JS语句
	-	script：需要执行的JS语句
		-	type：String
		-	默认值：无
	-	popoverName：需要执行JS语句的pop名称
		-	type：String
		-	默认值：无
	-	windowName：需要执行JS语句的窗口名称，默认为当前窗口
		-	type：String
		-	默认值：：当前窗口
	
#####示例：

	EX-1：
	app.evalScriptInPop('console.log("这是从别的窗口执行的JS语句");','popoverName'，'windowName');

	EX-2：
	app.evalScriptInPop('console.log("这是在当前窗口执行的JS语句");','popoverName');

##<div id="lockRotate">lockRotate</div>
-	#### app.lockRotate()   ⇒ void 
		锁定屏幕翻转
	
#####示例：
	app.lockRotate();

##<div id="unLockRotate">unLockRotate</div>
-	#### app.unLockRotate()   ⇒ void 
		解锁屏幕翻转
	
#####示例：
	app.unLockRotate();

##<div id="alert">alert</div>
-	#### app.alert(message, [title], [btnCaption], [callback])   ⇒ void 
		弹出单按钮对话框
	-	message：消息内容
		-	type：String/Object
		-	默认值：无
	-	title：窗口的title
		-	type：String
		-	默认值：'消息提示'
	-	btnCaption：窗口的按钮显示的内容
		-	type：String
		-	默认值：'确定'
	-	callback：按下窗口的按钮时回调函数
		-	type：Function
		-	默认值：无

#####示例：

	EX-1：
	app.alert('弹出无回调函数单按钮对话框')

	EX-2：
	app.alert('弹出默认单按钮对话框',function(){
		console.log('您点击了确定'); //按下
	});
	
	EX-3：
	app.alert('弹出带title单按钮对话框','title',function(){
		console.log('您点击了确定'); //按下
	})

	EX-4：
	app.alert('弹出带title,btnCaption单按钮对话框','title','btnCaption',function(){
		console.log('您点击了确定'); //按下
	})

	EX-5：
	app.alert({
         message: 'JSON参数弹出单按钮对话框',
         title: 'JSON',
         btnCaption: '确定',
         callback:function(){
			console.log('您点击了确定'); //按下
		 }
     })

##<div id="confirm">confirm</div>
-	#### app.confirm(message, [title], [btnCaptions], [callback])   ⇒ void 
		弹出带两个或三个按钮的confirm对话框
	-	message：消息内容
		-	type：String/Object
		-	默认值：无
	-	title：窗口的title
		-	type：String
		-	默认值：'消息提示'
	-	btnCaptions：窗口的按钮显示的内容
		-	type：Array
		-	默认值：['确认','放弃','取消']
	-	callback(buttonIndex)：按下窗口的按钮时回调函数
		-	type：Function
		-	默认值：无
		-	参数
			-	buttonIndex：按下按钮的下标
				

#####示例：

	EX-1：
	app.confirm('弹出无回调函数多按钮对话框')
	
	EX-2：
	app.confirm('弹出默认多按钮对话框', function(buttonIndex) {
		console.log(buttonIndex); //按下按钮的下标
	});

	EX-3：
	app.confirm('弹出带title多按钮对话框', 'title', function(buttonIndex) {
		console.log(buttonIndex); //按下按钮的下标
	})

	EX-4：
	app.confirm('弹出带title,btnCaptions多按钮对话框', 'title', ['按钮1', '按钮2', '按钮3'], function(buttonIndex) {
		console.log(buttonIndex); //按下按钮的下标
	})

	EX-5：
	app.confirm({
	    message: 'JSON参数弹出默认多按钮对话框',
	    title: 'JSON',
	    btnCaptions: ['按钮1', '按钮2', '按钮3'],
	    callback: function(buttonIndex) {
			console.log(buttonIndex); //按下按钮的下标
	    }
	})

##<div id="prompt">prompt</div>
-	#### app.prompt(message, [title], [btnCaptions], [inputValue], [inputTpye], [callback])   ⇒ void 
		弹出带两个或三个按钮和输入框的对话框
	-	message：消息内容
		-	type：String/Object
		-	默认值：无
	-	title：窗口的title
		-	type：String
		-	默认值：'消息提示'
	-	btnCaptions：窗口的按钮显示的内容
		-	type：Array
		-	默认值：['确认','放弃','取消']
	-	inputValue：输入框的默认值
		-	type：String
		-	默认值：' '
	-	inputTpye：输入框的类型
		-	type：String
		-	默认值：'text'
		-	取值范围
			-	'text'
			-	'password'
			-	'number'
			-	'email'
			-	'url'	
	-	callback(buttonIndex,text)：按下窗口的按钮时回调函数
		-	type：Function
		-	默认值：无
		-	参数
			-	buttonIndex：按下按钮的下标
			-   text：文本框输入的文字

#####示例：

	EX-1：
	app.prompt('弹出无回调函数多按钮prompt对话框')

	EX-2：
	app.prompt('弹出默认多按钮prompt对话框', function(buttonIndex,text) {
		console.log(buttonIndex); //按下按钮的下标
		console.log(text); //文本框输入的文字
	})

	EX-3：
	app.prompt('弹出带title多按钮prompt对话框', 'title', function(buttonIndex,text) {
		console.log(buttonIndex); //按下按钮的下标
		console.log(text); //文本框输入的文字
	})

	EX-4：
	app.prompt('弹出带title,btnCaptions多按钮prompt对话框', 'title', ['按钮1', '按钮2', '按钮3'], function(buttonIndex,text) {
		console.log(buttonIndex); //按下按钮的下标
		console.log(text); //文本框输入的文字
	})

	EX-5：
	app.prompt('弹出带title,btnCaptions,inputValue多按钮prompt对话框', 'title', ['按钮1', '按钮2', '按钮3'], 'inputValue', function(buttonIndex,text) {
		console.log(buttonIndex); //按下按钮的下标
		console.log(text); //文本框输入的文字
	})

	EX-6：
	app.prompt('弹出带title,btnCaptions,inputValue,inputTpye多按钮prompt对话框', 'title', ['按钮1', '按钮2', '按钮3'], 'inputValue', 'text', function(buttonIndex,text) {
		console.log(buttonIndex); //按下按钮的下标
		console.log(text); //文本框输入的文字
	})

	EX-7：
	app.prompt({
	    message: 'JSON参数弹出默认多按钮prompt对话框',
	    title: 'JSON',
	    btnCaptions: ['按钮1', '按钮2', '按钮3'],
	    inputValue: 'inputValue',
	    inputTpye: 'text',
	    callback: function(buttonIndex,text) {
			console.log(buttonIndex); //按下按钮的下标
			console.log(text); //文本框输入的文字
	    }
	})