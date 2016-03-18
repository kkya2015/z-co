# tabMark
***


用于多窗口内容浏览,用户通过滑动切换各个窗口,或者通过点击顶部menu栏切换各个窗口.各窗口内容支持本地网页文件和网络的url链接.通过app.require("tabMark")方法获取该对象.每require一次,就会获取一个新的tabMark对象.在使用中注意作用域以及重复require.



###	索引
***
###	[方法](#方法)：

*	[setDataSource](#setDataSource) ：设置数据源.
*	[setFrame](#setFrame) ：设置插件的显示位置及尺寸.
*	[show](#show) ：显示内容视图.
*	[hide](#hide) ：隐藏内容视图.
*	[remove](#remove) ：移除内容视图.
*	[addEditCallback](#addEditCallback) ：添加编辑按钮监听回调.
*	[showContentAtIndex](#showContentAtIndex) ：滚动到某个子视图.
*	[addScrollCallback](#addScrollCallback) ： 添加滚动回调.
*	[addIgnoreArea](#addIgnoreArea) ：添加忽略手势窗口区域，不支持iOS.


##	<div style="color:red">tabMark</div>

		//注意  在整篇文档中,此对象只创建一次. 请不要重复创建.
	     var  tabmark  = app.require("tabMark");

###	<div id="方法">方法</div>
***

#### <div id="setDataSource" style="color:red">setDataSource</div>
-	####	setDataSource(dataSources)   ⇒ void

			设置数据源，此方法要在调用show之前设置，优先级最高。
			通过此方法，设置插件所需要的数据源，包括menu标题，每个menu对应的窗口的内容url，以及menu的样式等参数。

	-	**dataSources**：数据源
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			- **titleFont** : （*Number*）导航栏文字大小
			- **titleHighlightFont** : （*Number*）选中状态时导航栏文字大小
			- **titleColor** : （*String*）导航栏文字颜色
			- **titleHighlightColor** : （*String*）选中状态时导航栏文字颜色
			- **vernierColor** : （*String*）游标颜色
			- **naviBgColor** : （*String*）导航栏背景色
			- **btnHeight** : （*Number*）导航栏高度(每个按钮的高度)
			- **manyBtn** : （*Boolean*）多按钮状态,true(自适应按钮宽度) false:(自动等距分割)
			- **EditButtonImg** : （*String*）编辑按钮的图片 当manyBtn为true,并且EditButtonImg有值时,编辑按钮才会显示
			- **interval** : （*Boolean*）是否显示分割线 true:显示 false:不显示，Android不支持
			- **naviHidden** : （*Boolean*）导航栏隐藏. true:隐藏 false:不隐藏导航栏
			- **defaultIndex** : （*Number*）设置默认显示第几个视图内容
			- **dataSource** : （*Array[JSON]*）内容视图数组
				-	menu : ( String ) 内容视图的标题.用于显示在导航栏.
				-	url :( String ) 内容视图的url.

-	#####	示例：

			//注意  在整篇文档中,此对象只创建一次. 请不要重复创建.
	     	var  tabmark  = app.require("tabMark");
	        var  dataSources = {
	            titleFont:12.0, //文字大小
	            titleHighlightFont:15.0,//文字高亮大小
	            titleColor:"#000000",//文字颜色
	            titleHighlightColor:"#FF0000",//文字高亮颜色
	            vernierColor:"#000000",//游标颜色
	            naviBgColor:"#D1D1D1",//导航条背景色
	            btnHeight:36.0,//导航条(按钮)高度
	            manyBtn:false,//true:多按钮模式(自适应按钮宽度)  false:自动等距分割
	            EditButtonImg:"abc.png",//编辑按钮图片
	            interval: true, //分割线，android不支持
	            naviHidden:false, //是否隐藏导航条
	            defaultIndex:4,//默认开启的页面 
	            dataSource:[
	                        {menu:'百度1',
	                        url:'device.html'
	                        },
	                        {menu:'新浪2',
	                        url:'alert.html'
	                        },
	                        {menu:'腾讯3',
	                        url:'windowTest.html'
	                        },
	                        {menu:'搜狐4',
	                        url:'refresh.html'
	                        },
	                        {menu:'新浪1',
	                        url:'refresh.html'
	                        },
	                        {menu:'腾讯1',
	                        url:'refresh.html'
	                        },
	                        {menu:'搜狐1',
	                        url:'refresh.html'
	                        },
	                        {menu:'网易5',
	                        url:'video.html'
	                        }
	                        ]
	        }
	    	tabmark.setDataSource(dataSources);

#### <div id="setFrame" style="color:red">setFrame</div>
-	####	setFrame(x, y, width, height)   ⇒ void

			通过此方法,设置插件将要显示的位置及尺寸.

	-	**x**：x轴开始坐标 仅支持整型
		-	**type**：Number
		-	**默认值**：无
	-	**y**：y轴开始坐标 仅支持整型
		-	**type**：Number
		-	**默认值**：无
	-	**width**：所占区域的宽度 仅支持整型
		-	**type**：Number
		-	**默认值**：无
	-	**height**：所占区域的高度 仅支持整型
		-	**type**：Number
		-	**默认值**：无

-	#####	示例：

			//注意  在整篇文档中,此对象只创建一次. 请不要重复创建.
	     	var  tabmark  = app.require("tabMark");
	        tabmark.setFrame(0,0,300,500);

#### <div id="show" style="color:red">show</div>
-	####	show()   ⇒ void

			通过此方法,显示插件。

-	#####	示例：

			//注意  在整篇文档中,此对象只创建一次. 请不要重复创建.
	     	var  tabmark  = app.require("tabMark");
	        tabmark.show();

#### <div id="hide" style="color:red">hide</div>
-	####	hide()   ⇒ void

			通过此方法,隐藏已经显示的插件。

-	#####	示例：

			//注意  在整篇文档中,此对象只创建一次. 请不要重复创建.
	     	var  tabmark  = app.require("tabMark");
	        tabmark.hide();

#### <div id="remove" style="color:red">remove</div>
-	####	remove()   ⇒ void

			通过此方法,移除插件。

-	#####	示例：

			//注意  在整篇文档中,此对象只创建一次. 请不要重复创建.
	     	var  tabmark  = app.require("tabMark");
	        tabmark.remove();

#### <div id="addEditCallback" style="color:red">addEditCallback</div>
-	####	addEditCallback(editCallback)   ⇒ void

			添加编辑按钮点击事件回调.

	-	**editCallback**：编辑按钮被点击回调方法
		-	**type**：Function
		-	**默认值**：无

-	#####	示例：

			//注意  在整篇文档中,此对象只创建一次. 请不要重复创建.
	     	var  tabmark  = app.require("tabMark");
	        tabmark.addEditCallback(function(){
				console.log('点击了编辑按钮'); 
			});

#### <div id="addScrollCallback" style="color:red">addScrollCallback</div>
-	####	addScrollCallback(scrollCallback)   ⇒ void

			当内容区域切换时,通过此方法添加的回调函数通知开发者.

	-	**scrollCallback**：内容滚动回调方法
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**index**： 内容视图在数组中的位置下标
				-	**type**：Number
				-	**默认值**：无

-	#####	示例：

			//注意  在整篇文档中,此对象只创建一次. 请不要重复创建.
	     	var  tabmark  = app.require("tabMark");
	        tabmark.addScrollCallback(function(index){
				console.log(index); 
			});

#### <div id="showContentAtIndex" style="color:red">showContentAtIndex</div>
-	####	showContentAtIndex(index)   ⇒ void

			通过此方法,切换当前显示内容.也可以通过滑动内容视图或者点击导航栏选项实现.

	-	**index**： 视图下标 
		-	**type**：Number
		-	**默认值**：无
		-	取值范围： 1~内容视图个数

-	#####	示例：

			//注意  在整篇文档中,此对象只创建一次. 请不要重复创建.
	     	var  tabmark  = app.require("tabMark");
	        tabmark.showContentAtIndex(2); //显示第二个tab页面

#### <div id="addIgnoreArea" style="color:red">addIgnoreArea</div>
-	####	addIgnoreArea(tabName,IgnoreParams)   ⇒ void

			该方法只用于安卓,iOS不需要执行此方法.

	-	**tabName**： tab menu名称（对应dataSource对象的menu属性），设置某个tab窗口忽略手势
		-	**type**：String
		-	**默认值**：无
	-	**IgnoreParams**： 窗口区域信息
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			-	**x**：区域坐标x值.
				-	**type**：Number
				-	**默认值**：无
			-	**y**：区域坐标x值.
				-	**type**：Number
				-	**默认值**：无
			-	**width**：区域宽度.
				-	**type**：Number
				-	**默认值**：无
			-	**height**：区域高度.
				-	**type**：Number
				-	**默认值**：无		

-	#####	示例：

			//注意  在整篇文档中,此对象只创建一次. 请不要重复创建.
	     	var tabmark = app.require("tabMark");
			var IgnoreParams = {
				x: 0,
				y: 0,
				width: 500,
				height: 500
			};
			tabMark.addIgnoreArea("tab menu name", IgnoreParams);