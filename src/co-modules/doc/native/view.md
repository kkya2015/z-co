# view
***
视图对象是操作当前页面引擎接口的对外调用对象，每个页面只有一个view对象（即使多次调用获取的仍是同一个对象），通过该对象来完成对该页面的大多数设置操作。

创建一个view对象很简单，只需通过app.view对象的currentView方法即可。

		var view = app.currentView();

###索引
***

###[方法](#方法)：

*	[addFooterRefresh](#addFooterRefresh) ：给当前页面添加上拉加载
*	[addHeaderRefresh](#addHeaderRefresh) ：给当前页面添加下拉刷新
*	[addSlideIgnore](#addSlideIgnore) ：添加当前页面忽略抽屉手势窗口区域（该方法只用于安卓,主要用于与JS滑动事件冲突时使用）
*	[back](#back) ：返回上一层或返回指定名字的窗口
*	[createPopover](#createPopover) ：创建Popover对象
*	[disableBounces](#disableBounces) ：设置页面不可弹动（android暂时不支持）
*	[disableDragDismiss](#disableDragDismiss) ：设置页面不支持滑动消失键盘（android暂时不支持）
*	[disableHScrollBar](#disableHScrollBar) ：设置页面不显示垂直滚动条（android暂时不支持）
*	[disableKeyboard](#disableKeyboard) ：设置键盘弹出后，输入框不自动定位（android暂时不支持）
*	[disableSlideBack](#disableSlideBack) ：设置页面支持滑动返回(Android设备暂时不支持)
*	[disableVScrollBar](#disableVScrollBar) ：设置页面不显示水平滚动条（android暂时不支持）
*	[disableZoom](#disableZoom) ：设置页面不支持缩放（android暂时不支持）
*	[enableBounces](#enableBounces) ：设置页面可弹动（android暂时不支持）
*	[enableDragDismiss](#enableDragDismiss) ：设置页面支持滑动消失键盘（android暂时不支持）
*	[enableHScrollBar](#enableHScrollBar) ：设置页面显示垂直滚动条（android暂时不支持）
*	[enableKeyboard](#enableKeyboard) ：设置键盘弹出后，输入框自动定位（android暂时不支持）
*	[enableSlideBack](#enableSlideBack) ：设置页面不支持滑动返回(Android设备暂时不支持)
*	[enableVScrollBar](#enableVScrollBar) ：设置页面显示水平滚动条（android暂时不支持）
*	[enableZoom](#enableZoom) ：设置页面支持缩放（android暂时不支持）
*	[getHeight](#getHeight) ：获取当前窗口的高度
*	[getWidth](#getWidth) ：获取当前窗口的宽度
*	[setAnimationCurve](#setAnimationCurve) ：设置页面关闭时的动画曲线（android暂时不支持）
*	[setAnimationDirection](#setAnimationDirection) ：设置页面关闭时的动画方向（android暂时不支持）
*	[setAnimationDuration](#setAnimationDuration) ：设置页面关闭时的动画持续时间（android暂时不支持）
*	[setAnimationType](#setAnimationType) ：设置页面关闭时的动画类型（android暂时不支持）
*	[setBgcolor](#setBgcolor) ：设置页面背景色，颜色支持6位RGB(例如#FFFFFF)或者8位RGBA(例如#7FFFFFFF，前两位是透明度),Android设备支持
*	[setCurrentPopoverRect](#setCurrentPopoverRect) ：设置当前页面处于显示状态的popover 的位置、长宽
*	[removeFooterRefresh](#removeFooterRefresh) ：删除上拉加载
*	[removeHeaderRefresh](#removeHeaderRefresh) ：删除下拉刷新


###[对象](#对象)：
*	[headerRefresher](#headerRefresher) ：下拉刷新对象
	-	[completeRefresh](#completeRefresh) ：结束下拉刷新
	-	[setContentFontSize](#setContentFontSize) ：设置下拉刷新区域字体大小
	-	[setContentFontColor](#setContentFontColor) ：设置下拉刷新区域字体颜色
	-	[setTimeFontSize](#setTimeFontSize) ：设置下拉刷新时间区域字体大小
	-	[setTimeFontColor](#setTimeFontColor) ：设置下拉刷新时间区域字体颜色
	-	[setImagePath](#setImagePath) ：设置下拉刷新图标地址
*	[footerRefresher](#footerRefresher) ：上拉加载对象
	-	[completeRefresh](#completeRefresh) ：结束上拉加载
	-	[setContentFontSize](#setContentFontSize) ：设置上拉加载区域字体大小
	-	[setContentFontColor](#setContentFontColor) ：设置上拉加载区域字体颜色
	-	[setImagePath](#setImagePath) ：设置上拉加载图标地址


***
#<div id="方法">方法</div>
***
##<div id="addFooterRefresh">addFooterRefresh</div>
-	#### addFooterRefresh(options)   ⇒ [footerRefresher](#footerRefresher) 
		给当前页面添加上拉加载
	-	options ：配置JSON对象
		-	type：JSON
		-	默认值：无
		-	keys
			-	contentdown：开始状态文字提示
				-	type：String
				-	默认值：'上拉显示更多'
			-	contentover：松开文字提示
				-	type：String
				-	默认值：'释放立即刷新'
			-	contentrefresh：刷新中文字提示
				-	type：String
				-	默认值：'正在加载...'
			-	callback：加载成功回调函数
				-	type：Function
				-	默认值：无

#####示例：
	EX - 1：
	var view = app.currentView();
	
	EX - 2：
	var footerRefresher = view.addFooterRefresh({
	    contentdown: '下拉可以刷新',
	    contentover: '释放立即刷新',
	    contentrefresh: '正在刷新...',
	    callback: function() {
	        footerRefresher.completeRefresh();
	    }
	});
	
	EX - 3：
	var footerRefresher = view.addFooterRefresh({
	    contentdown: '下拉可以刷新',
	    contentover: '释放立即刷新'
	    callback: function() {
	        footerRefresher.completeRefresh();
	    }
	});
	
	EX - 4：
	var footerRefresher = view.addFooterRefresh({
	    contentdown: '下拉可以刷新'
	    callback: function() {
	        footerRefresher.completeRefresh();
	    }
	});
	
	EX - 5：
	var footerRefresher = view.addFooterRefresh({
	    callback: function() {
	        footerRefresher.completeRefresh();
	    }
	});


##<div id="addHeaderRefresh">addHeaderRefresh</div>
-	#### addHeaderRefresh(options)   ⇒ [headerRefresher](#headerRefresher) 
		给当前页面添加下拉刷新 (参见：headerRefresher)
	-	options ：配置JSON对象
		-	contentdown：开始状态文字提示
			-	type：String
			-	默认值：'下拉可以刷新'
		-	contentover：松开文字提示
			-	type：String
			-	默认值：'释放立即刷新'
		-	contentrefresh：刷新中文字提示
			-	type：String
			-	默认值：'正在刷新...'
		-	callback：刷新成功回调函数
			-	type：Function
			-	默认值：无

#####示例：
	var view = app.currentView();

	EX - 1：
	var headerRefresher = view.addHeaderRefresh({
	    contentdown: '下拉可以刷新',
	    contentover: '释放立即刷新',
	    contentrefresh: '正在刷新...',
	    callback: function() {
	        headerRefresher.completeRefresh();
	    }
	});
	
	EX - 2：
	var headerRefresher = view.addHeaderRefresh({
	    contentdown: '下拉可以刷新',
	    contentover: '释放立即刷新'
	    callback: function() {
	        headerRefresher.completeRefresh();
	    }
	});
	
	EX - 3：
	var headerRefresher = view.addHeaderRefresh({
	    contentdown: '下拉可以刷新'
	    callback: function() {
	        headerRefresher.completeRefresh();
	    }
	});
	
	EX - 4：
	var headerRefresher = view.addHeaderRefresh({
	    callback: function() {
	        headerRefresher.completeRefresh();
	    }
	}); 

##<div id="addSlideIgnore">addSlideIgnore</div>
-	#### addSlideIgnore([x], [y], [width], [height])   ⇒ void 
		添加当前页面忽略抽屉手势窗口区域(该方法只用于安卓,主要用于与JS滑动事件冲突时使用)
	-	x：区域坐标x值(以左上角为基础)
		-	type：Number
		-	默认值：0
	-	y：区域坐标y值(以左上角为基础)
		-	type：Number
		-	默认值：0
	-	width：区域宽度
		-	type：Number
		-	默认值：当前窗口的宽度
	-	height：区域高度
		-	type：Number
		-	默认值：当前窗口的高度

#####示例：
	var view = app.currentView();
	view.addSlideIgnore(0,0,500,500); 

##<div id="back">back</div>
-	#### back([windowname])   ⇒ void 
		关闭当前窗口或返回指定名字的窗口,当windowname不传时，默认关闭当前窗口
	-	windowname：指定窗口的名字
		-	type：String
		-	默认值：无
	
#####示例：
	var view = app.currentView();

	EX-1：
	view.back(); //返回上一层

	EX-2：
	view.back('windowname'); //返回名字为windowname的窗口

## <div id="createPopover">createPopover</div>
-	####createPopover([x], [y], [width], [height])   ⇒ [popover](./popover.md)
		新建一个popover对象
	-	x：区域坐标x值(以左上角为基础)
		-	type：Number
		-	默认值：0
	-	y：区域坐标y值(以左上角为基础)
		-	type：Number
		-	默认值：0
	-	width：区域宽度，如果width为0，延伸到屏幕右边
		-	type：Number
		-	默认值：当前窗口的宽度
	-	height：区域高度，如果height为0，延伸到屏幕下面
		-	type：Number
		-	默认值：当前窗口的高度

#####示例：
	var view = app.currentView();
	var pop = view.createPopover(0,60,0,0);

## <div id="disableBounces">disableBounces</div>
-	####disableBounces()   ⇒ void 
		设置页面不可弹动（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.disableBounces();

## <div id="disableDragDismiss">disableDragDismiss</div>
-	####disableDragDismiss()   ⇒ void 
		设置页面不支持滑动消失键盘（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.disableDragDismiss();

## <div id="disableHScrollBar">disableHScrollBar</div>
-	####disableHScrollBar()   ⇒ void 
		设置页面不显示垂直滚动条（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.disableHScrollBar();

## <div id="disableKeyboard">disableKeyboard</div>
-	####disableKeyboard()   ⇒ void 
		设置键盘弹出后，输入框不自动定位（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.disableKeyboard();

## <div id="disableSlideBack">disableSlideBack</div>
-	####disableSlideBack()   ⇒ void 
		设置页面支持滑动返回(Android设备暂时不支持)

#####示例：
	var view = app.currentView();
	view.disableSlideBack();

## <div id="disableVScrollBar">disableVScrollBar</div>
-	####disableVScrollBar()   ⇒ void 
		设置页面不显示水平滚动条（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.disableVScrollBar();

## <div id="disableZoom">disableZoom</div>
-	####disableZoom()   ⇒ void 
		设置页面不支持缩放（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.disableZoom();

## <div id="enableBounces">enableBounces</div>
-	####enableBounces()   ⇒ void 
		设置页面可弹动（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.enableBounces();

## <div id="enableDragDismiss">enableDragDismiss</div>
-	####enableDragDismiss()   ⇒ void 
		设置页面支持滑动消失键盘（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.enableDragDismiss();

## <div id="enableHScrollBar">enableHScrollBar</div>
-	####enableHScrollBar()   ⇒ void 
		设置页面显示垂直滚动条（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.enableHScrollBar();

## <div id="enableKeyboard">enableKeyboard</div>
-	####enableKeyboard()   ⇒ void 
		设置键盘弹出后，输入框自动定位（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.enableKeyboard();

## <div id="enableSlideBack">enableSlideBack</div>
-	####enableSlideBack()   ⇒ void 
		设置页面不支持滑动返回(Android设备暂时不支持)

#####示例：
	var view = app.currentView();
	view.enableSlideBack();

## <div id="enableVScrollBar">enableVScrollBar</div>
-	####enableVScrollBar()   ⇒ void 
		设置页面显示水平滚动条（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.enableVScrollBar();

## <div id="enableZoom">enableZoom</div>
-	####enableZoom()   ⇒ void 
		设置页面支持缩放（android暂时不支持）

#####示例：
	var view = app.currentView();
	view.enableZoom();

##<div id="getHeight">getHeight</div>
-	#### getHeight()   ⇒ void 
		获取当前窗口的高度

#####示例：
	var view = app.currentView();
	view.getHeight(); //获取当前窗口的宽度

##<div id="getWidth">getWidth</div>
-	#### getWidth()   ⇒ void 
		获取当前窗口的宽度

#####示例：
	var view = app.currentView();
	view.getWidth(); //获取当前窗口的宽度

##<div id="setAnimationCurve">setAnimationCurve</div>
-	#### setAnimationCurve([curve])   ⇒ void 
		设置页面关闭时的动画曲线（android暂时不支持）
	-	curve：动画曲线类型
		-	type：Number
		-	默认值：53
		-	取值范围
			-	50：线性
			-	51：从慢到快
			-	52：从快到慢
			-	53：从慢到快到慢
	
#####示例：
	var view = app.currentView();
	view.setAnimationCurve(50); //设置动画曲线为线性

##<div id="setAnimationDirection">setAnimationDirection</div>
-	#### setAnimationDirection([direction])   ⇒ void 
		设置页面关闭时的动画方向（android暂时不支持）
	-	direction：动画方向
		-	type：Number
		-	默认值：41
		-	取值范围
			-	40：从左往右
			-	41：从右往左
			-	42：从上往下
			-	43：从下往上
#####示例：
	var view = app.currentView();

	EX-1：
	view.setAnimationDirection(40); //设置为从左往右

	EX-2：
	view.setAnimationDirection(42); //设置为从上往下

##<div id="setAnimationDuration">setAnimationDuration</div>
-	#### setAnimationDuration([duration])   ⇒ void 
		设置页面关闭时的动画持续时间（android暂时不支持）
	-	duration：动画时间
		-	type：Number
		-	默认值：300（单位ms）


#####示例：
	var view = app.currentView();
	view.setAnimationDuration(200); //设置为动画时间为200ms

## <div id="setAnimationType">setAnimationType</div>
-	####setAnimationType([type])   ⇒ void 
		设置页面关闭时的动画类型（android暂时不支持）
	-	type：窗口类型
		-	type：number
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
#####示例：
	var view = app.currentView();

	EX-1：
	view.setAnimationType(10); //设置为淡入淡出

	EX-2：
	view.setAnimationType(12); //设置为显露

## <div id="setBgcolor">setBgcolor</div>
-	####setBgcolor(bgcolor)   ⇒ void 
		设置页面背景色，如果字段为空，颜色为白色，颜色支持6位RGB(例如#FFFFFF)或者8位RGBA(例如#7FFFFFFF，前两位是透明度),Android设备支持
	-	bgcolor：背景色
		-	type：String
		-	默认值：无

#####示例：
	var view = app.currentView();
	view.setBgcolor('#000');

##<div id="setCurrentPopoverRect">setCurrentPopoverRect</div>
-	#### setCurrentPopoverRect([x], [y], [width], [height])   ⇒ void 
		设置当前页面处于显示状态的popover 的位置、长宽
	-	x：区域坐标x值(以左上角为基础)
		-	type：Number
		-	默认值：0
	-	y：区域坐标y值(以左上角为基础)
		-	type：Number
		-	默认值：0
	-	width：区域宽度
		-	type：Number
		-	默认值：当前窗口的宽度
	-	height：区域高度
		-	type：Number
		-	默认值：当前窗口的高度
#####示例：
	var view = app.currentView();
	view.setCurrentPopoverRect(0,0,300,400); //设置当前页面处于显示状态的popover 的位置、长宽

##<div id="removeFooterRefresh">removeFooterRefresh</div>
-	#### removeFooterRefresh()   ⇒ void 
		删除上拉加载

#####示例：
	var view = app.currentView();
	view.removeFooterRefresh(); //删除上拉加载

##<div id="removeHeaderRefresh">removeHeaderRefresh</div>
-	#### removeHeaderRefresh()   ⇒ void 
		删除下拉刷新

#####示例：
	var view = app.currentView();
	view.removeHeaderRefresh(); //删除下拉刷新


#<div id="对象">对象</div>
***
##<div id="headerRefresher">headerRefresher</div>
	
	var view = app.currentView();
	var headerRefresher = view.addHeaderRefresh({
            contentdown: '下拉可以刷新',
            contentover: '释放立即刷新',
            contentrefresh: '正在刷新...',
            callback:function(){
				headerRefresher.completeRefresh();
			}
          }); 
	
-	#### <div id="completeRefresh">completeRefresh()   ⇒ void </div>   
		结束下拉刷新
	-	####示例：
			headerRefresher.completeRefresh();


-	#### <div id="setContentFontSize">setContentFontSize([size])   ⇒ void </div>   
		设置刷新区域字体的大小
	-	size：字体的大小
		-	type：Number
		-	默认值：13

	-	####示例：
			headerRefresher.setContentFontSize(13);

-	#### <div id="setContentFontColor">setContentFontColor(color)   ⇒ void </div>   
		设置刷新区域字体的颜色
	-	color：颜色
		-	type：String
		-	默认值：无
	-	####示例：
			headerRefresher.setContentFontColor('#FFFFFF');

-	#### <div id="setTimeFontSize">setTimeFontSize([size])   ⇒ void </div>   
		设置刷新时间区域字体的大小
	-	size：字体的大小
		-	type：Number
		-	默认值：12

	-	####示例：
			headerRefresher.setTimeFontSize('13');

-	#### <div id="setTimeFontColor">setTimeFontColor(color)   ⇒ void </div>   
		设置刷新时间区域字体的颜色
	-	color：颜色
		-	type：String
		-	默认值：无

	-	####示例：
			headerRefresher.setTimeFontColor('#FFFFFF');

-	#### <div id="setImagePath">setImagePath(path)   ⇒ void </div>   
		设置刷新箭头图标的地址
	-	path：地址
		-	type：String
		-	默认值：无

	-	####示例：
			headerRefresher.setImagePath("res://箭头.jpg");

##<div id="footerRefresher">footerRefresher</div>
	
	var view = app.currentView();
	var footerRefresher = view.addFooterRefresh({
            contentdown: '下拉可以刷新',
            contentover: '释放立即刷新',
            contentrefresh: '正在刷新...',
            callback:function(){
				footerRefresher.completeRefresh();
			}
          }); 
	
-	#### <div id="completeRefresh">completeRefresh()   ⇒ void </div>   
		结束上拉加载
	-	####示例：
			footerRefresher.completeRefresh();


-	#### <div id="setContentFontSize">setContentFontSize([size])   ⇒ void </div>   
		设置刷新区域字体的大小
	-	size：字体的大小
		-	type：Number
		-	默认值：13

	-	####示例：
			footerRefresher.setContentFontSize('13');

-	#### <div id="setContentFontColor">setContentFontColor(color)   ⇒ void </div>   
		设置刷新区域字体的颜色
	-	color：颜色
		-	type：String
		-	默认值：无

	-	####示例：
			footerRefresher.setContentFontColor('#FFFFFF');

-	#### <div id="setImagePath">setImagePath(path)   ⇒ void </div>   
		设置刷新箭头图标的地址
	-	path：地址
		-	type：String
		-	默认值：无

	-	####示例：
			footerRefresher.setContentFontColor("res://箭头.jpg");
