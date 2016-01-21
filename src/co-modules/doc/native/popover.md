# popover
***
popover是窗口上的浮动窗口

创建一个popover对象很简单，只需通过当前页面对象的createPopover方法即可。

		var view = app.currentView();
		var popover = view.createPopover(0,64,0,0)

###	索引
***

###	[方法](#方法)：

*	[open](#open) ：打开一个指定地址的popover(重复调用的效果同front方法)
*	[setType](#setType) ：设置popover类型
*	[hide](#hide) ：设置popover隐藏
*	[show](#show) ：设置popover显示
*	[front](#front) ：把popover置于最前面
*	[frontOf](#frontOf) ：把popover置于指定popover上面
*	[behind](#behind) ：把popover置于最后面
*	[behindOf](#behindOf) ：把popover置于指定popover下面
*	[close](#close) ：关闭popover
*	[evalScript](#evalScript) ：在popover中执行JS语句


***
#	<div id="方法">方法</div>
***

## <div id="open"	style="color:red">open</div>

	

-	####	open(url, [popovername])   ⇒ void 
			打开一个指定地址的popover(重复调用的效果同front方法)
	-	**url**：要打开页面的地址
		-	**type**：String
		-	**默认值**：无
	-	**popovername**：popover的name值，默认同url相同
		-	**type**：String
		-	**默认值**：同url相同

-	#####	示例：

			var view = app.currentView();
			var popover = view.createPopover(0,64,0,0)
			popover.open('navigator.html','navigator');
			popover.open('navigator.html');


##	<div id="setType" style="color:red">setType</div>

-	####	setType([type])   ⇒ void 
			在popover打开前，设置打开popover类型
	-	**type**：popover类型
		-	**type**：Number
		-	**默认值**：0
		-	**取值范围**
			-	0：本地地址
			-	1：html字符串
			-	2：网络地址	


-	#####	示例：

			var view = app.currentView();
			var popover = view.createPopover(0,64,0,0);
			popover.setType(0);	//设置为本地地址
			popover.open('navigator.html','navigator');

##	<div id="hide" style="color:red">hide</div>
-	#### hide()   ⇒ void 
			在popover打开后，设置popover不可见

-	#####	示例：

			var view = app.currentView();
			var popover = view.createPopover(0,64,0,0);
			popover.open('navigator.html','navigator');
			popover.hide(); //隐藏popover

##	<div id="show" style="color:red">show</div>
-	#### show()   ⇒ void 
			在popover打开后，设置popover可见

-	#####	示例：

			var view = app.currentView();
			var popover = view.createPopover(0,64,0,0);
			popover.open('navigator.html','navigator');
			popover.show(); //显示popover

##	<div id="front" style="color:red">front</div>
-	#### front()   ⇒ void 
			在popover打开后，把popover置于最前面
	
-	#####	示例：

			var view = app.currentView();
			var popover = view.createPopover(0,64,0,0);
			popover.open('navigator.html','navigator');
			popover.front(); //置于最前面

##	<div id="frontOf" style="color:red">frontOf</div>
-	#### frontOf(popover)   ⇒ void 
			在popover打开后，把popover置于另一个打开的popover上面
	-	**popover**:另一个处于打开状态的popover
		-	**type**：popover
		-	**默认值**:无	

-	#####	示例：

			var view = app.currentView();
			var popover1 = view.createPopover(0,64,0,0);
			popover1.open('navigator.html','navigator');
			var popover2 = view.createPopover(0,64,0,0);
			popover2.open('tab.html','tab');
			popover.frontOf(popover2); //把popover置于popover2上面

##	<div id="behind" style="color:red">behind</div>
-	#### behind()   ⇒ void 
			在popover打开后，把popover置于最后面
	
-	#####	示例：

			var view = app.currentView();
			var popover = view.createPopover(0,64,0,0);
			popover.open('navigator.html','navigator');
			popover.behind(); //置于最后面

##	<div id="behindOf" style="color:red">behindOf</div>
-	#### behindOf(popover)   ⇒ void 
			在popover打开后，把popover置于另一个打开的popover下面
	-	**popover**:另一个处于打开状态的popover
		-	**type**：popover
		-	**默认值**:无	

-	#####	示例：

			var view = app.currentView();
			var popover1 = view.createPopover(0,64,0,0);
			popover1.open('navigator.html','navigator');
			var popover2 = view.createPopover(0,64,0,0);
			popover2.open('tab.html','tab');
			popover.behindOf(popover2); //把popover置于popover2下面


##	<div id="close" style="color:red">close</div>
-	#### close()   ⇒ void 
			在popover打开后，关闭该popover
	-	**animationType**：动画效果类型
		-	**type**：Number
		-	**默认值**：无
	
-	#####	示例：

			var view = app.currentView();
			var popover = view.createPopover(0,64,0,0);
			popover.open('navigator.html','navigator');
			popover.close(10);

##	<div id="evalScript" style="color:red">evalScript</div>
-	#### evalScript(script)   ⇒ void 
			在popover打开后，在该popover对象内的页面执行JS语句
	-	**script**:需要执行的JS语句
		-	**type**：String
		-	**默认值**:无
	
-	#####	示例：

			var view = app.currentView();
			var popover = view.createPopover(0,64,0,0);
			popover.open('navigator.html','navigator');
			popover.evalScript('console.log("这是popover内的页面执行的JS语句");');


