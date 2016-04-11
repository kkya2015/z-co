# JS-SDK概述


***

JS-SDK主要由以下三部分组成：

*	DOM：提供一些常用的类JQUERY的方法调用，便于开发人员进行dom对象的操作以及对一些移动端的事件的封装,其主要集成了zeptojs及其插件（event、ajax、fx、fx_methods、data、detect、touch），以及一些常用的JS方法

*	CO：主要提供了一些常用的JS UI组件以及常用CSS样式（Font Awesome 3.2.1，BUTTONS V. 2.0.0），其依赖于DOM.js。


*	Native：是在应用引擎的基础上进行的二次封装，目的是使开发人员在IDE中使用更加便利，并可在IDE的模拟功能中实现一些手机上的效果。

### 资源获取


*	DOM及CO部分目前已在[github](http://369cloud.github.io/D6/)上开源，有兴趣的同学可以下载自行查看源码并可自定义打包，项目地址：[http://369cloud.github.io/D6/](http://369cloud.github.io/D6/)
*	Native目前已提供最新版本下载，可随时下载最新版本用于项目，下载地址：[JS SDK](http://dev.369cloud.com/sdkdownload?sdkId=33)


### 入门指南

*	native提供统一的页面初始化方法：domReady方法，以保证在调用引擎功能时所有资源已准备就绪，所有页面初始化相关操作均需在该页面进行。

*	APP进入的第一个窗口页面name默认为：root，其他窗口以创建时传入的name为其唯一标识。

*	app对象为所有接口及对象的统一入口，所有涉及引擎的功能均通过或间接通过app对象获取或执行。通过该对象可获取当前页面对象、创建窗口对象，以及一些全局功能函数的调用。


*	通过app.currentView()获取的当前页面对象对当前页面进行操作，可通过该对象创建子页面对象popover进行复杂的页面布局。


*	app、window、view、popover四者的关系可以简单的理解为浏览器中：window对象 <--> app对象；浏览器窗口 <--> window对象；document对象 <-->  view对象；iframe对象 <--> popover对象


*	popover通常在单页面无法完成布局的情况下使用，可将页面分为重叠的两部分来达到复杂的布局功能。通常建议通过单页面完成布局。


		EX:
 
		PAGE1:普通布局

	    domReady(function(){
			var win = app.createWindow();
	        $('.button').button(function(){
	            win.open('about.html');
	        })
	    })

		PAGE2:页面嵌套布局

	    domReady(function(){
			var view = app.currentView();
			var y = $('#header').height();
		   	var popover = view.createPopover(0,y,0,0)
		   	popover.open('about_content.html');
	    })