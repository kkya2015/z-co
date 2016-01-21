
app是引擎对外接口的调用对象，所有对引擎的操作均通过app对象来完成。


###	索引
***

###	[方法](#方法)：

*	[addSlideDrawer](#addSlideDrawer) ：添加侧滑抽屉效果
*	[alert](#alert) ：弹出单按钮对话框
*	[cleanCache](#cleanCache) ：清空cache目录
*	[closeComponent](#closeComponent) ：关闭指定component
*	[closeCurrentComponent](#closeCurrentComponent) ：关闭当前component
*	[closeSlideDrawer](#closeSlideDrawer) ：关闭抽屉
*	[config](#config) ：配置app系统参数
*	[confirm](#confirm) ：弹出带两个或三个按钮的confirm对话框
*	[createWindow](#createWindow) ：新建一个窗口对象
*	[currentView](#currentView) ：获取当前页面对象
*	[downloadFile](#downloadFile) ：使用系统浏览器下载文件(android)
*	[evalScriptInComponent](#evalScriptInComponent) ：在指定component、window、popover执行javascript
*	[evalScriptInPop](#evalScriptInPop) ：指定pop执行JS语句
*	[evalScriptInWindow](#evalScriptInWindow) ：在指定窗口执行JS语句
*	[exit](#exit) ：退出app(android)
*	[getApplicationInfo](#getApplicationInfo) ：获取app配置信息，此app配置信息来自application.xml。
*	[getComponentInfoByName](#getComponentInfoByName) ：通过名字获取模块信息
*	[getCurrentComponentInfo](#getCurrentComponentInfo) ：获取当前模块信息
*	[getDeviceModel](#getDeviceModel) ：获取设备模型名称
*	[getDeviceName](#getDeviceName) ：获取设备名称
*	[getEngineVersion](#getEngineVersion) ：获取引擎版本号
*	[getMainComponentInfo](#getMainComponentInfo) ：获取主component的componentInfo
*	[getPlatformName](#getPlatformName) ：获取系统名称
*	[getPlatformVersion](#getPlatformVersion) ：获取系统版本
*	[installApp](#installApp) ：安装一个app
*	[isAppInstalled](#isAppInstalled) ：判断设备上是否已安装指定app
*	[isFullScreen](#isFullScreen) ：判断app是否全屏显示
*	[lockRotate](#lockRotate) ：锁定屏幕翻转
*	[openApp](#openApp) ：启动一个app
*	[openComponent](#openComponent) ：打开指定component
*	[openLeftSlideDrawer](#openLeftSlideDrawer) ：开启左侧抽屉
*	[openRightSlideDrawer](#openRightSlideDrawer) ：开启右侧抽屉
*	[prompt](#prompt) ：弹出带两个或三个按钮和输入框的对话框
*	[setStatusBarBackgroundColor](#setStatusBarBackgroundColor) ：设置app状态栏背景颜色；Android要求版本4.4以上。默认黑色
*	[statusBarFontColor](#statusBarFontColor) ：设置当前页面状态栏文字颜色 0 表示黑色。1 表示白色(仅iOS)
*	[unLockRotate](#unLockRotate) ：解锁屏幕翻转


***
#	<div id="方法">方法</div>
***

##	<div id="addSlideDrawer" style="color:red">addSlideDrawer</div>

-	####	app.addSlideDrawer(url, [type], [edge])   ⇒ void 
			给首页添加侧滑抽屉效果
	-	**url**：要打开页面的地址
		-	**type**：String
		-	**默认值**：无
	-	**type**：left（左侧）、right（右侧）
		-	**type**：String
		-	**默认值**：left
	-	**edge**：侧滑时, 侧滑window停留时露出的宽度
		-	**type**：Number
		-	**默认值**：50


-	#####	示例：

			EX - 1：
			app.addSlideDrawer('native/view.html', 'left', 200);
			
			EX - 2：
			app.addSlideDrawer('native/view.html', 'left');
			
			EX - 3：
			app.addSlideDrawer('native/view.html');

##	<div id="alert" style="color:red">alert</div>
-	#### app.alert(message, [title], [btnCaption], [callback])   ⇒ void 
			弹出单按钮对话框
	-	**message**：消息内容
		-	**type**：String/Object
		-	**默认值**：无
	-	**title**：窗口的title
		-	**type**：String
		-	**默认值**：'消息提示'
	-	**btnCaption**：窗口的按钮显示的内容
		-	**type**：String
		-	**默认值**：'确定'
	-	**callback**：按下窗口的按钮时回调函数
		-	**type**：Function
		-	**默认值**：无

-	#####	示例：

			EX - 1：
			app.alert('弹出无回调函数单按钮对话框')
			
			EX - 2：
			app.alert('弹出默认单按钮对话框', function() {
			    console.log('您点击了确定'); //按下
			});
			
			EX - 3：
			app.alert('弹出带title单按钮对话框', 'title', function() {
			    console.log('您点击了确定'); //按下
			})
			
			EX - 4：
			app.alert('弹出带title,btnCaption单按钮对话框', 'title', 'btnCaption', function() {
			    console.log('您点击了确定'); //按下
			})
			
			EX - 5：
			app.alert({
			    message: 'JSON参数弹出单按钮对话框',
			    title: 'JSON',
			    btnCaption: '确定',
			    callback: function() {
			        console.log('您点击了确定'); //按下
			    }
			})

##	<div id="cleanCache" style="color:red">cleanCache</div>
-	#### app.cleanCache()   ⇒ void 
			清空cache目录
	
-	#####	示例：

			app.cleanCache(); //清空缓存

##	<div id="closeComponent" style="color:red">closeComponent</div>
-	#### app.closeComponent(componentName,[animation])   ⇒ void 
			关闭指定component
	-	**componentName**：指定component的名称
		-	**type**：String
		-	**默认值**：无
	-	**animation**：动画参数
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			- **type** : （*Number*）动画效果类型，仅IOS支持，Android只支持设置无动画（-1），其它动画无效。
				-	**默认值**：11
				-	**取值范围**
					-	**10**：淡入淡出
					-	**11**：推入
					-	**12**：显露
					-	**13**：切入
					-	**14**：立方体翻转
					-	**15**：上翻页
					-	**16**：下翻页
					-	**17**：收缩
					-	**18**：水滴
					-	**19**：翻转
					-	**20**：旋转
					-	**21**：照相机打开
					-	**22**：照相机关闭
			- **direction** : （*Number*）动画方向
				-	**默认值**：41
				-	**取值范围**
					-	**40**：从左往右
					-	**41**：从右往左
					-	**42**：从上往下
					-	**43**：从下往上
			- **time** : （*Number*）动画时间
				-	**默认值**：1000（单位ms）
			- **curve** : （*Number*）动画曲线类型
				-	**默认值**：53
				-	**取值范围**
					-	**50**：线性
					-	**51**：从慢到快
					-	**52**：从快到慢
					-	**53**：从慢到快到慢
	
-	#####	示例：

			app.closeCurrentComponent({
			    type: 12,
			    direction: 40,
			    time: 2000,
			    curve: 51
			});

##	<div id="closeCurrentComponent" style="color:red">closeCurrentComponent</div>
-	#### app.closeCurrentComponent([animation])   ⇒ void 
			关闭当前component
	-	**animation**：动画参数
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			- **type** : （*Number*）动画效果类型，仅IOS支持，Android只支持设置无动画（-1），其它动画无效。
				-	**默认值**：11
				-	**取值范围**
					-	**10**：淡入淡出
					-	**11**：推入
					-	**12**：显露
					-	**13**：切入
					-	**14**：立方体翻转
					-	**15**：上翻页
					-	**16**：下翻页
					-	**17**：收缩
					-	**18**：水滴
					-	**19**：翻转
					-	**20**：旋转
					-	**21**：照相机打开
					-	**22**：照相机关闭
			- **direction** : （*Number*）动画方向
				-	**默认值**：41
				-	**取值范围**
					-	**40**：从左往右
					-	**41**：从右往左
					-	**42**：从上往下
					-	**43**：从下往上
			- **time** : （*Number*）动画时间
				-	**默认值**：1000（单位ms）
			- **curve** : （*Number*）动画曲线类型
				-	**默认值**：53
				-	**取值范围**
					-	**50**：线性
					-	**51**：从慢到快
					-	**52**：从快到慢
					-	**53**：从慢到快到慢
	
-	#####	示例：

			app.closeCurrentComponent({
			    type: 12,
			    direction: 40,
			    time: 2000,
			    curve: 51
			});

##	<div id="closeSlideDrawer" style="color:red">closeSlideDrawer</div>
-	#### app.closeSlideDrawer()   ⇒ void 
			关闭抽屉

-	#####	示例：

			app.closeSlideDrawer();

## <div id="config" style="color:red">config</div>
-	####	app.config(options)   ⇒ void 
			通过JSON对象，对一些系统默认值进行配置,避免每次使用时都需要反复设置
	-	**options** ：配置JSON对象
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			-	**windowType** ：( *Number* )窗口类型
				-	**默认值**：0
				-	**取值范围**
					-	**0**：本地地址
					-	**1**：html字符串
					-	**2**：网络地址
			-	**popoverType**：( *Number* )pop窗口类型
				-	**默认值**：0
				-	**取值范围**
					-	**0**：本地地址
					-	**1**：html字符串
					-	**2**：网络地址
			-	**windowAnimationType**：( *Number* )打开窗口动画类型,仅IOS支持,Android只支持设置无动画（-1）,其它动画无效。
				-	**默认值**：11
				-	**取值范围**
					-	**10**：淡入淡出
					-	**11**：推入
					-	**12**：显露
					-	**13**：切入
					-	**14**：立方体翻转
					-	**15**：上翻页
					-	**16**：下翻页
					-	**17**：收缩
					-	**18**：水滴
					-	**19**：翻转
					-	**20**：旋转
					-	**21**：照相机打开
					-	**22**：照相机关闭
			-	**windowAnimationDirection**：( *Number* )打开窗口方向类型(仅IOS有效)
				-	**默认值**：41
				-	**取值范围**
					-	**40**：从左往右
					-	**41**：从右往左
					-	**42**：从上往下
					-	**43**：从下往上
			-	**windowAnimationDuration**：( *Number* )打开窗口动画时间(仅IOS有效)
				-	**默认值**：300（单位：ms）
			-	**windowAnimationCurve**：( *Number* )打开窗口动画曲线类型(仅IOS有效)
				-	**默认值**：53
				-	**取值范围**
					-	**50**：线性
					-	**51**：从慢到快
					-	**52**：从快到慢
					-	**53**：从慢到快到慢
			-	**viewBounces**：( *Boolean* )是否允许页面弹动（仅对IOS有效）
				-	**默认值**：false
			-	**viewBgcolor**：( *String* )背景颜色，如果字段为空，颜色为白色，颜色支持6位RGB(例如#FFFFFF)或者8位RGBA(例如#7FFFFFFF，前两位是透明度),Android设备支持
				-	**默认值**：白色
			-	**viewVScrollBar**：( *Boolean* )是否显示水平滚动条,Android设备暂时不支持
				-	**默认值**：false
			-	**viewHScrollBar**：( *Boolean* )是否显示垂直滚动条 ,Android设备暂时不支持
				-	**默认值**：true
			-	**viewKeyboard**：( *Boolean* )键盘弹出后，输入框是否会自动定位，Android设备暂时不支持
				-	**默认值**：false
			-	**viewDragDismiss**：( *Boolean* )是否支持滑动消失键盘,Android设备暂时不支持
				-	**默认值**：false
			-	**viewAnimationType**：( *Number* )页面关闭动画效果类型,仅IOS支持,Android只支持设置无动画（-1）,其它动画无效。
				-	**默认值**：11
				-	**取值范围**
					-	**10**：淡入淡出
					-	**11**：推入
					-	**12**：显露
					-	**13**：切入
					-	**14**：立方体翻转
					-	**15**：上翻页
					-	**16**：下翻页
					-	**17**：收缩
					-	**18**：水滴
					-	**19**：翻转
					-	**20**：旋转
					-	**21**：照相机打开
					-	**22**：照相机关闭
			-	**viewAnimationDirection**：( *Number* )页面关闭动画方向(仅IOS有效)
				-	**默认值**：40
				-	**取值范围**
					-	**40**：从左往右
					-	**41**：从右往左
					-	**42**：从上往下
					-	**43**：从下往上
			-	**viewAnimationDuration**：( *Number* )页面关闭动画时间(仅IOS有效)
				-	**默认值**：300（单位：ms）
			-	**viewAnimationCurve**：( *Number* )页面关闭动画曲线(仅IOS有效)
				-	**默认值**：53
				-	**取值范围**
					-	**50**：线性
					-	**51**：从慢到快
					-	**52**：从快到慢
					-	**53**：从慢到快到慢
			-	**viewSlideBack**：( *Boolean* )是否支持滑动返回，设置window全局，ture表示支持，false表示不支持(仅IOS有效)
				-	**默认值**：true

-	#####	示例：
	
			若设计中的窗口打开与关闭动画为淡入淡出，可做以下设置即可，可通过一次设定，其他地方使用时均使用该值（包含其他页面）
			
			app.config({
			    viewAnimationType: 10,
			    windowAnimationType: 10
			})

##	<div id="confirm" style="color:red">confirm</div>
-	#### app.confirm(message, [title], [btnCaptions], [callback])   ⇒ void 
			弹出带两个或三个按钮的confirm对话框
	-	**message**：消息内容
		-	**type**：String/Object
		-	**默认值**：无
	-	**title**：窗口的title
		-	**type**：String
		-	**默认值**：'消息提示'
	-	**btnCaptions**：窗口的按钮显示的内容
		-	**type**：Array
		-	**默认值**：['确认','放弃','取消']
	-	**callback**(buttonIndex)：按下窗口的按钮时回调函数
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	buttonIndex：（*Number*）按下按钮的下标(从1开始取值)

-	#####	示例：

			EX - 1：
			app.confirm('弹出无回调函数多按钮对话框')
			
			EX - 2：
			app.confirm('弹出默认多按钮对话框', function(buttonIndex) {
			    console.log(buttonIndex); //按下按钮的下标
			});
			
			EX - 3：
			app.confirm('弹出带title多按钮对话框', 'title', function(buttonIndex) {
			    console.log(buttonIndex); //按下按钮的下标
			})
			
			EX - 4：
			app.confirm('弹出带title,btnCaptions多按钮对话框', 'title', ['按钮1', '按钮2', '按钮3'], function(buttonIndex) {
			    console.log(buttonIndex); //按下按钮的下标
			})
			
			EX - 5：
			app.confirm({
			    message: 'JSON参数弹出默认多按钮对话框',
			    title: 'JSON',
			    btnCaptions: ['按钮1', '按钮2', '按钮3'],
			    callback: function(buttonIndex) {
			        console.log(buttonIndex); //按下按钮的下标
			    }
			})

##	<div id="createWindow" style="color:red">createWindow</div>
-	#### app.createWindow()   ⇒ [window](./window.md)
			新建一个窗口对象

-	#####	示例：

			var win = app.createWindow();

##	<div id="currentView" style="color:red">currentView</div>
-	#### app.currentView()   ⇒ [view](./view.md) 
			获取当前页面对象

-	#####	示例：

			var view = app.currentView();

##	<div id="downloadFile" style="color:red">downloadFile</div>
-	#### app.downloadFile(url)   ⇒ void 
			使用系统浏览器下载文件(android)
	-	**url**：下载文件地址
		-	**type**：String
		-	**默认值**：无
	
-	#####	示例：

			app.downloadFile('http://192.168.168.111/1.apk');

##	<div id="evalScriptInComponent" style="color:red">evalScriptInComponent</div>
-	#### app.evalScriptInComponent(componentName, windowName, script, [popoverName])   ⇒ void 
			指定component执行JS语句
	-	**componentName**：component名字
		-	**type**：String
		-	**默认值**：：无
	-	**windowName**：需要执行JS语句的窗口名称
		-	**type**：String
		-	**默认值**：：无
	-	**script**：需要执行的JS语句
		-	**type**：String
		-	**默认值**：无
	-	**popoverName**：需要执行JS语句的pop名称
		-	**type**：String
		-	**默认值**：无
	
	
-	#####	示例：
			
			EX - 1：
			app.evalScriptInComponent('componentName','windowName','console.log("这是从别的窗口执行的JS语句");');

			EX - 2：
			app.evalScriptInComponent('componentName','windowName','console.log("这是从别的窗口执行的JS语句");','popoverName');

##	<div id="evalScriptInPop" style="color:red">evalScriptInPop</div>
-	#### app.evalScriptInPop(script, popoverName, [windowName])   ⇒ void 
			指定pop执行JS语句
	-	**script**：需要执行的JS语句
		-	**type**：String
		-	**默认值**：无
	-	**popoverName**：需要执行JS语句的pop名称
		-	**type**：String
		-	**默认值**：无
	-	**windowName**：需要执行JS语句的窗口名称，默认为当前窗口
		-	**type**：String
		-	**默认值**：：当前窗口
	
-	#####	示例：

			EX - 1：
			app.evalScriptInPop('console.log("这是从别的窗口执行的JS语句");', 'popoverName', 'windowName');
			
			EX - 2：
			app.evalScriptInPop('console.log("这是在当前窗口执行的JS语句");', 'popoverName');

##	<div id="evalScriptInWindow" style="color:red">evalScriptInWindow</div>
-	#### app.evalScriptInWindow(script, [windowName])   ⇒ void 
			在指定窗口执行JS语句
	-	**script**：需要执行的JS语句
		-	**type**：String
		-	**默认值**：无
	-	**windowName**：需要执行JS语句的窗口名称，默认为当前窗口
		-	**type**：String
		-	**默认值**：当前窗口
	
-	#####	示例：

			EX - 1：
			app.evalScriptInWindow('console.log("这是从别的窗口执行的JS语句");', 'windowName');
			
			EX - 2：
			app.evalScriptInWindow('console.log("这是在当前窗口执行的JS语句");');

##	<div id="exit" style="color:red">exit</div>
-	#### app.exit()   ⇒ void 
			退出app(android)
	
-	#####	示例：

			app.exit() //退出app

##	<div id="getApplicationInfo" style="color:red">getApplicationInfo</div>
-	#### app.getApplicationInfo()   ⇒ JSON 
			获取app配置信息，此app配置信息来自application.xml。
	-	**返回值**：JSON
		-	**keys**
			- **id**：( *String* )系统分配的id号
			- **name**：( *String* )app名称
			- **description**：( *String* )描述信息
			- **author**：( *String* )作者信息
				- **name**：( *String* )作者名字 
				- **email**：( *String* )邮箱
				- **tel**：( *String* )电话
				- **address**：( *String* )地址
			- **version**：( *String* )版本号
			- **bgcolor**：( *String* )全局背景颜色 
			- **entry**：( *String* )程序入口（默认开启的component）
			- **appkey**：( *String* )保留

-	#####	示例：

			var appInfo = app.getApplicationInfo();

##	<div id="getComponentInfoByName" style="color:red">getComponentInfoByName</div>
-	#### app.getComponentInfoByName(componentName)   ⇒ JSON 
			通过名字获取模块信息
	-	**componentName**：应用名字
		-	**type**：String
		-	**默认值**：无
	-	**返回值**：JSON
		-	**keys**
			- **name** : ( *String* ) 模块名称
			- **className** : ( *String* ) 保留
			- **description** : ( *String* ) 模块描述
			- **version** : ( *String* ) 模块版本
			- **bgcolor** : ( *String* ) 背景色
			- **url** : ( *String* ) 模块默认打开页面
	
-	#####	示例：

			var info = app.getComponentInfoByName("component_name");

##	<div id="getCurrentComponentInfo" style="color:red">getCurrentComponentInfo</div>
-	#### app.getCurrentComponentInfo()   ⇒ JSON 
			获取当前模块信息
	-	**返回值**：JSON
		-	**keys**
			- **name** : ( *String* ) 模块名称
			- **className** : ( *String* ) 保留
			- **description** : ( *String* ) 模块描述
			- **version** : ( *String* ) 模块版本
			- **bgcolor** : ( *String* ) 背景色
			- **url** : ( *String* ) 模块默认打开页面
	
-	#####	示例：

			var info = app.getCurrentComponentInfo();
	
##	<div id="getDeviceModel" style="color:red">getDeviceModel</div>
-	#### app.getDeviceModel()   ⇒ String 
			获取设备模型名称
	
-	#####	示例：

			var model = app.getDeviceModel();

##	<div id="getDeviceName" style="color:red">getDeviceName</div>
-	#### app.getDeviceName()   ⇒ String 
			获取设备名称
	
-	#####	示例：

			var dName = app.getDeviceName();

##	<div id="getEngineVersion" style="color:red">getEngineVersion</div>
-	#### app.getEngineVersion()   ⇒ Number 
			获取引擎版本号
	
-	#####	示例：

			var version = app.getEngineVersion() //获取引擎版本号

##	<div id="getMainComponentInfo" style="color:red">getMainComponentInfo</div>
-	#### app.getMainComponentInfo()   ⇒ JSON 
			获取主component的componentInfo
	-	**返回值**：JSON
		-	**keys**
			- **name** : ( *String* ) 模块名称
			- **className** : ( *String* ) 保留
			- **description** : ( *String* ) 模块描述
			- **version** : ( *String* ) 模块版本
			- **bgcolor** : ( *String* ) 背景色
			- **url** : ( *String* ) 模块默认打开页面
	
-	#####	示例：

			var info = app.getMainComponentInfo();

##	<div id="getPlatformName" style="color:red">getPlatformName</div>
-	#### app.getPlatformName()   ⇒ String 
			获取系统名称
	
-	#####	示例：

			var name = app.getPlatformName();


##	<div id="getPlatformVersion" style="color:red">getPlatformVersion</div>
-	#### app.getPlatformVersion()   ⇒ String 
			获取系统版本
	
-	#####	示例：

			var version = app.getPlatformVersion();

##	<div id="installApp" style="color:red">installApp</div>
-	#### app.installApp(path)   ⇒ void 
			安装一个app
	-	**path**：应用地址。Android上为apk包的本地路径，支持协议路径；iOS上为AppStore下载地址，或者企业发布地址
		-	**type**：String
		-	**默认值**：无

-	#####	示例：

**Android：**

		app.installApp('/sdcard/1.apk');
		app.installApp('res://1.apk');
	
**iOS:**

		app.installApp('http://appstore.com/pages');

##	<div id="isAppInstalled" style="color:red">isAppInstalled</div>
-	#### app.isAppInstalled(appSource, callback)   ⇒ void 
			判断设备上是否已安装指定app
*	注：iOS需配置scheme，详见[配置方法](./iOS9shipei#第二章)
	-	**appSource**：应用程序标识。iOS中参数为：被打开app的Scheme 后面加 "://"；Android下为应用的包名
		-	**type**：String
		-	**默认值**：无
	-	**callback**：判断完成后的回调
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**isInstalled**：（*Boolean*）true为已安装，否则未安装
	
-	#####	示例：

**iOS：**
	
		app.isAppInstalled('weixin://', function(isInstalled) {
		    if (isInstalled) {
		        console.log('已经安装微信！')
		    }
		});
**Android：**

		app.isAppInstalled('com.xhrd.mobile.hybrid', function(isInstalled) {
		    if (isInstalled) {
		        console.log('已经安装混合应用！')
		    }
		});

##	<div id="isFullScreen" style="color:red">isFullScreen</div>
-	#### app.isFullScreen()   ⇒ Boolean 
			判断app是否全屏显示
	
-	#####	示例：

			var isFull = app.isFullScreen() //是否全屏模式

##	<div id="lockRotate" style="color:red">lockRotate</div>
-	#### app.lockRotate()   ⇒ void 
			锁定屏幕翻转
	
-	#####	示例：

			app.lockRotate();

##	<div id="openApp" style="color:red">openApp</div>
-	#### app.openApp(params, success, [error])   ⇒ void 
			启动一个app
	-	**params**：打开参数
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			- **params** : ( *JsonArray* ) （可选项）传递到要打开的app的参数数组，结构为[{key:"key1", value:"value1"},{key:"key2", value:"value2"},......]
			- **iosUrl** : ( *String* ) （可选项）传递到打开app的url，[Scheme](https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html) 后面加 "://"，后面可以根据“被打开app”自行拼接参数。若iosUrl内有参数，params会拼接在iosUrl后面，并用"?"分割，若iosUrl内无参数直接将params拼接在iosUrl后面，若params无参数，则不做拼接。（iOS平台使用，iOS下必传）
			- **action** : ( *String* )（可选项）打开app的包名或action（Android平台使用，Android下必传）
			- **mime** : ( *String* ) （可选项）指定打开app的响应数据类型，如："image/png"（Android平台使用）
			- **uri** : ( *String* ) （可选项）指定打开app响应的uri（Android平台使用）
	-	**success**：打开成功回调函数
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**result**：（*String*）第三方app返回的数据，现只支持String类型数据。
	-	**error**：打开失败回调函数
		-	**type**：Function
		-	**默认值**：无
		
-	#####	示例：

			EX-1：
			app.openApp({
			    'action': 'android.intent.action.CALL',
			    'uri': 'tel:18866665555'
			}, function(result) {
			    console.log(result)
			});
			
			EX-2：
			app.openApp({
			    'action': 'android.intent.action.CALL',
			    'uri': 'tel:18866665555'
			}, function(result) {
			    console.log(result)
			},function(){
			    console.log('打开APP失败')
			});

##	<div id="openComponent" style="color:red">openComponent</div>
-	#### app.openComponent(componentName, [animation])   ⇒ void 
			打开指定component
	-	**componentName**：应用名字
		-	**type**：String
		-	**默认值**：无
	-	**animation**：动画参数
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			- **type** : （*Number*）动画效果类型,仅IOS支持,Android只支持设置无动画（-1）,其它动画无效。
				-	**默认值**：11
				-	**取值范围**
					-	**10**：淡入淡出
					-	**11**：推入
					-	**12**：显露
					-	**13**：切入
					-	**14**：立方体翻转
					-	**15**：上翻页
					-	**16**：下翻页
					-	**17**：收缩
					-	**18**：水滴
					-	**19**：翻转
					-	**20**：旋转
					-	**21**：照相机打开
					-	**22**：照相机关闭
			- **direction** : （*Number*）动画方向
				-	**默认值**：41
				-	**取值范围**
					-	**40**：从左往右
					-	**41**：从右往左
					-	**42**：从上往下
					-	**43**：从下往上
			- **time** : （*Number*）动画时间
				-	默认值**：**1000（单位ms）
			- **curve** : （*Number*）动画曲线类型
				-	**默认值**：53
				-	**取值范围**
					-	**50**：线性
					-	**51**：从慢到快
					-	**52**：从快到慢
					-	**53**：从慢到快到慢
	
-	#####	示例：

			app.openComponent('cpt', {
			    type: 12,
			    direction: 40,
			    time: 2000,
			    curve: 51
			});

##	<div id="openLeftSlideDrawer" style="color:red">openLeftSlideDrawer</div>
-	#### app.openLeftSlideDrawer()   ⇒ void 
			开启左侧抽屉

-	#####	示例：

			app.openLeftSlideDrawer();

##	<div id="openRightSlideDrawer" style="color:red">openRightSlideDrawer</div>
-	#### app.openRightSlideDrawer()   ⇒ void 
			开启右侧抽屉

-	#####	示例：

			app.openRightSlideDrawer();

##	<div id="prompt" style="color:red">prompt</div>
-	#### app.prompt(message, [title], [btnCaptions], [inputValue], [inputTpye], [callback])   ⇒ void 
			弹出带两个或三个按钮和输入框的对话框
	-	**message**：消息内容
		-	**type**：String/Object
		-	**默认值**：无
	-	**title**：窗口的title
		-	**type**：String
		-	**默认值**：'消息提示'
	-	**btnCaptions**：窗口的按钮显示的内容
		-	**type**：Array
		-	**默认值**：['确认','放弃','取消']
	-	**inputValue**：输入框的默认值
		-	**type**：String
		-	**默认值**：' '
	-	**inputTpye**：输入框的类型
		-	**type**：String
		-	**默认值**：'text'
		-	**取值范围**
			-	'text'
			-	'password'
			-	'number'
			-	'email'
			-	'url'	
	-	**callback**：按下窗口的按钮时回调函数
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**buttonIndex**：（*Number*）按下按钮的下标
			-   **text**：（*String*）文本框输入的文字
			-   **err**：( *String* ) 错误信息

-	#####	示例：

			EX-1：
			app.prompt('弹出无回调函数多按钮prompt对话框')
		
			EX-2：
			app.prompt('弹出默认多按钮prompt对话框', function(buttonIndex,text,err) {
				console.log(buttonIndex); //按下按钮的下标
				console.log(text); //文本框输入的文字
			})
		
			EX-3：
			app.prompt('弹出带title多按钮prompt对话框', 'title', function(buttonIndex,text,err) {
				console.log(buttonIndex); //按下按钮的下标
				console.log(text); //文本框输入的文字
			})
		
			EX-4：
			app.prompt('弹出带title,btnCaptions多按钮prompt对话框', 'title', ['按钮1', '按钮2', '按钮3'], function(buttonIndex,text,err) {
				console.log(buttonIndex); //按下按钮的下标
				console.log(text); //文本框输入的文字
			})
		
			EX-5：
			app.prompt('弹出带title,btnCaptions,inputValue多按钮prompt对话框', 'title', ['按钮1', '按钮2', '按钮3'], 'inputValue', function(buttonIndex,text,err) {
				console.log(buttonIndex); //按下按钮的下标
				console.log(text); //文本框输入的文字
			})
		
			EX-6：
			app.prompt('弹出带title,btnCaptions,inputValue,inputTpye多按钮prompt对话框', 'title', ['按钮1', '按钮2', '按钮3'], 'inputValue', 'text', function(buttonIndex,text,err) {
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
			    callback: function(buttonIndex,text,err) {
					console.log(buttonIndex); //按下按钮的下标
					console.log(text); //文本框输入的文字
			    }
			})

##	<div id="setStatusBarBackgroundColor" style="color:red">setStatusBarBackgroundColor</div>
-	#### app.setStatusBarBackgroundColor(color)   ⇒ void 
			设置app状态栏背景颜色；Android要求版本4.4以上。默认黑色
	-	**color**：状态栏背景颜色
		-	**type**：String
		-	**默认值**：无
	
-	#####	示例：

			app.setStatusBarBackgroundColor('#FFFFFF');

##	<div id="statusBarFontColor" style="color:red">statusBarFontColor</div>
-	#### app.statusBarFontColor(color)   ⇒ void 
			设置当前页面状态栏文字颜色 0 表示黑色。1 表示白色(iOS)
	-	**color**：状态栏文字颜色
		-	**type**：Number
		-	**默认值**：0
		-	**取值范文**
			-	**0**：黑色
			-	**1**：白色

-	#####	示例：

			app.statusBarFontColor(1)//设置当前页面状态栏文字为白色(iOS)

##	<div id="unLockRotate" style="color:red">unLockRotate</div>
-	#### app.unLockRotate()   ⇒ void 
			解锁屏幕翻转
	
-	#####	示例：

			app.unLockRotate();





























































