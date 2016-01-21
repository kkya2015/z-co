# progress
***
加载信息提示框。



###	索引
***
###	[方法](#方法)：

*	[showProgress](#showProgress) ：显示进度框
*	[hideProgress](#hideProgress) ：隐藏进度提示框
*	[showToast](#showToast) ：显示进度提示框，但是设置的时间一到就会消失

***
#	<div id="方法">方法</div>
***

## <div id="showProgress"	style="color:red">showProgress</div>
-	####	app.progress.showProgress(options, [animationtype])   ⇒ void
			进度条，以动画方式呈现进度提示框。根据需求的不同，可以通过属性来设置。
	-	**options**：( *JSON* )进度条配置项
		-	**默认值**：无
		-	**keys**
			-	**title**：( *JSON* ) 显示的标题
				-	**默认值**：无
				-	**keys**
					-	**name**： ( *String* ) 显示的标题
						-	**默认值**：'请稍后'
					-	**fontSize**： ( Number ) 标题字体大小
						-	**默认值**：16
					-	**color**： ( *String* ) 标题字体颜色
						-	**默认值**：'#ffffff'(白色)
			-	**detailTitle**： ( *JSON* ) 显示的详细描述
				-	**默认值**：无
				-	**keys**
					-	**name**： ( *String* ) 显示的详细描述
						-	**默认值**：'加载中...'
					-	**fontSize**： ( *Number* ) 详细描述字体大小
						-	**默认值**：14
					-	**color**： ( *String* ) 详细描述字体颜色
						-	**默认值**：'#ffffff'(白色)
			-	**images**： ( *Array* ) 显示的图片 最佳大小为37*37px 若传入多个图片，则显示为动画效果 不设置该属性时，图片路径为协议路径 默认为一个白色动画轮子
				-	**默认值**：白色动画轮子
			-	**bgColor**： ( *String*  ) 背景色
				-	**默认值**：'#000000' (黑色)
			-	**bgOpacity**： ( *Number* ) 背景透明度
				-	**默认值**：0.8
	-	**animationtype**：设置弹出框显示时的动画类型
		-	**type**：*Number*
		-	**默认值**：无
		-	**可选范围**
			-	0：渐隐渐显动画
			-	1：缩放动画

-	#####	示例：

			EX-1：
			app.progress.showProgress({
			    title: {
			        name: '努力加载中...',
			        fontSize: '16',
			        color: '#3300cc'
			    },
			    detailTitle: {
			        name: '哈哈哈哈',
			        fontSize: '16',
			        color: '#3300cc'
			    },
			    images: ['res://屏幕.png', 'res://屏幕副本.png', 'res://屏幕副本2.png', 'res://屏幕副本3.png'],
			    bgColor: '#9900ff',
			    bgOpacity: '0.6'
			})
		
			EX-2：
			app.progress.showProgress({
			    title: {
			        name: '努力加载中...',
			        fontSize: '16',
			        color: '#3300cc'
			    },
			    detailTitle: {
			        name: '哈哈哈哈',
			        fontSize: '16',
			        color: '#3300cc'
			    },
			    images: ['res://屏幕.png', 'res://屏幕副本.png', 'res://屏幕副本2.png', 'res://屏幕副本3.png'],
			    bgColor: '#9900ff',
			    bgOpacity: '0.6'
			}, 0)


##	<div id="hideProgress" style="color:red">hideProgress</div>

-	####	app.progress.hideProgress()   ⇒ void
			隐藏进度提示框。

-	#####	示例：

			app.progress.hideProgress()

##	<div id="showToast" style="color:red">showToast</div>

-	####	app.progress.showToast(time, options)   ⇒ void
			隐藏进度提示框。
	-	**time**：显示的时间，时间过后自动消失，单位是秒
		-	**type**：Number
		-	**默认值**：无
	-	**options**：( *JSON* )toast配置项
		-	**默认值**：无
		-	**keys**
			-	**title**：( *JSON* ) 显示的标题
				-	**默认值**：无
				-	**keys**
					-	**name**： ( *String* ) 显示的标题
						-	**默认值**：'请稍后'
					-	**fontSize**： ( *Number* ) 标题字体大小
						-	**默认值**：16
					-	**color**： ( *String* ) 标题字体颜色
						-	**默认值**：'#ffffff'(白色)
			-	**detailTitle**： ( *JSON* ) 显示的详细描述
				-	**默认值**：无
				-	**keys**
					-	**name**： ( *String* ) 显示的详细描述
						-	**默认值**：'加载中...'
					-	**fontSize**： ( *Number* ) 详细描述字体大小
						-	**默认值**：14
					-	**color**： ( *String* ) 详细描述字体颜色
						-	**默认值**：'#ffffff'(白色)
			-	**images**： ( *Array* ) 显示的图片 最佳大小为37*37px 若传入多个图片，则显示为动画效果 
				-	**默认值**：无
			-	**bgColor**： ( *String*  ) 背景色
				-	**默认值**：'#000000' (黑色)
			-	**bgOpacity**： ( *Number* ) 背景透明度
				-	**默认值**：0.8

-	#####	示例：

			app.progress.showToast('4',{
			    title: {
			        name: '努力加载中...',
			        fontSize: '16',
			        color: '#3300cc'
			    },
			    detailTitle: {
			        name: '哈哈哈哈',
			        fontSize: '16',
			        color: '#3300cc'
			    },
			    images: ['res://屏幕.png', 'res://屏幕副本.png', 'res://屏幕副本2.png', 'res://屏幕副本3.png'],
			    bgColor: '#9900ff',
			    bgOpacity: '0.6'
			})
