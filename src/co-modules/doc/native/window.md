
窗口对象是实现多窗口机制的基本单元。app维护了一个窗口堆栈，每个窗口以唯一的窗口名字来区别。除起始页的name是由系统默认设置为'root'，其余窗口的name值均有打开时赋值。

创建一个window对象很简单，只需通过app对象的createWindow方法即可。

		var win = app.createWindow();

###	索引
***
###	[方法](#方法)：

*	[open](#open) ：打开新创建的窗口
*	[setType](#setType) ：设置窗口类型
*	[setAnimationType](#setAnimationType) ：设置打开时的动画类型(仅IOS有效)
*	[setAnimationDirection](#setAnimationDirection) ：设置打开时的动画方向(仅IOS有效)
*	[setAnimationDuration](#setAnimationDuration) ：设置打开时的动画持续时间(仅IOS有效)
*	[setAnimationCurve](#setAnimationCurve) ：设置打开时的动画曲线(仅IOS有效)
*	[evalScript](#evalScript) ：在当前窗口执行JS语句
*	[evalScriptInPop](#evalScriptInPop) ：在当前窗口的pop中执行JS语句


***
#	<div id="方法">方法</div>
***

## <div id="open" style="color:red">open</div>

	

-	####	open(url, [windowname])   ⇒ void 

			打开一个指定地址的窗口,若存在相同name的window窗口，则展现该window窗口

	-	**url**：要打开页面的地址
		-	**type**：String
		-	**默认值**：无
	-	**windowname**：窗口的name值，默认同url相同
		-	**type**：String
		-	**默认值**：同url相同

-	#####	示例：

			var win = app.createWindow();
		
			EX-1：
			win.open('navigator.html','navigator');
		
			EX-2：
			win.open('navigator.html');


##	<div id="setType" style="color:red">setType</div>

-	####	setType([type])   ⇒ void 

			在窗口打开前，设置打开窗口类型

	-	**type**：窗口类型
		-	**type**：Number
		-	**默认值**：0
		-	**取值范围**
			-	0：本地地址
			-	1：html字符串
			-	2：网络地址	


-	#####	示例：

			var win = app.createWindow();
		
			EX-1：
			win.setType(0); //设置为本地地址
		
			EX-2：
			win.setType(1);	//设置为html字符串
		
			EX-3：
			win.setType(2);	//设置为网络地址

##	<div id="setAnimationType" style="color:red">setAnimationType</div>
-	#### setAnimationType([type])   ⇒ void 

			设置打开窗口动画效果(仅IOS有效),Android只支持设置无动画（-1）,其它动画无效。

	-	**type**：动画效果类型,仅IOS支持,Android只支持设置无动画（-1）,其它动画无效。
		-	**type**：Number
		-	**默认值**：11
		-	**取值范围**
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

-	#####	示例：

			var win = app.createWindow();
		
			EX-1：
			win.setAnimationType(10); //设置为淡入淡出
		
			EX-2：
			win.setAnimationType(12); //设置为显露

##	<div id="setAnimationDirection" style="color:red">setAnimationDirection</div>
-	#### setAnimationDirection([direction])   ⇒ void 

			设置打开窗口动画方向(仅IOS有效)

	-	**direction**：动画方向
		-	**type**：Number
		-	**默认值**：41
		-	**取值范围**
			-	40：从左往右
			-	41：从右往左
			-	42：从上往下
			-	43：从下往上

-	#####	示例：

			var win = app.createWindow();
		
			EX-1：
			win.setAnimationDirection(40); //设置为从左往右
		
			EX-2：
			win.setAnimationDirection(42); //设置为从上往下

##	<div id="setAnimationDuration" style="color:red">setAnimationDuration</div>
-	#### setAnimationDuration([duration])   ⇒ void 

			设置打开窗口动画持续时间(仅IOS有效)

	-	**duration**：动画时间
		-	**type**：Number
		-	**默认值**：300（单位ms）


-	#####	示例：

			var win = app.createWindow();
			win.setAnimationDuration(200); //设置为动画时间为200ms

##	<div id="setAnimationCurve" style="color:red">setAnimationCurve</div>
-	#### setAnimationCurve([curve])   ⇒ void 

			设置打开窗口动画曲线(仅IOS有效)

	-	**curve**:动画曲线类型
		-	**type**：Number
		-	**默认值**：53
		-	**取值范围**
			-	50：线性
			-	51：从慢到快
			-	52：从快到慢
			-	53：从慢到快到慢
	
-	#####	示例：

			var win = app.createWindow();
			win.setAnimationCurve(50); //设置动画曲线为线性

##	<div id="evalScript" style="color:red">evalScript</div>
-	#### evalScript(script)   ⇒ void 

			在该窗口对象内执行JS语句

	-	**script**:需要执行的JS语句
		-	**type**：String
		-	**默认值**:无
	
-	#####	示例：

			var win = app.createWindow();
			win.evalScript('console.log("这是从别的窗口执行的JS语句");');

##	<div id="evalScriptInPop" style="color:red">evalScriptInPop</div>
-	#### evalScriptInPop(script, popoverName)   ⇒ void 

			在该窗口指定pop执行JS语句

	-	**script**:需要执行的JS语句
		-	**type**：String
		-	**默认值**:无
	-	**popoverName**：需要执行JS语句的pop名称
		-	**type**：String
		-	**默认值**：无
	
-	#####	示例：

			var win = app.createWindow();
			win.evalScriptInPop('console.log("这是从别的窗口执行的JS语句");','popoverName');

