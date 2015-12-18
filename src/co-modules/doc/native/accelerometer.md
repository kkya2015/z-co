# accelerometer
***
Accelerometer模块管理设备加速度传感器，用于获取感应手机的运动的信息，包括x（屏幕水平方向）、y（垂直屏幕水平方向）、z（垂直屏幕平面方向）三个方向的加速度信息。



###索引
***
###[方法](#方法)：

*	[getCurrentAcceleration](#getCurrentAcceleration) ：获取当前设备的加速度信息
*	[watchAcceleration](#watchAcceleration) ：监听设备加速度变化信息
*	[clearWatch](#clearWatch) ：关闭监听设备加速度信息


***
#<div id="方法">方法</div>
***

## <div id="getCurrentAcceleration">getCurrentAcceleration</div>

	

-	####app.accelerometer.getCurrentAcceleration(success, [error])   ⇒ void 
		获取当前设备的加速度信息
	-	success：获取设备加速度信息成功回调函数
		-	type：function
		-	默认值：无
		-	参数
			-	acceleration：设备的加速度信息 Acceleration类型对象，用于获取各方向的详细加速度值。
				-	type：JSON
				-	keys
					-	xAxis：x轴方向的加速度 获取当前设备x轴方向的加速度，浮点型数据，与物理学中的加速度值一致。
					-	yAxis：y轴方向的加速度 获取当前设备y轴方向的加速度，浮点型数据，与物理学中的加速度值一致。
					-	zAxis：z轴方向的加速度 获取当前设备z轴方向的加速度，浮点型数据，与物理学中的加速度值一致。
	-	error：获取设备加速度信息失败回调函数
		-	type：function
		-	默认值：无
		-	参数
			-	error：获取加速度操作的错误信息

#####示例：
	app.accelerometer.getCurrentAcceleration(function(acceleration) {
	    console.log(acceleration.xAxis) //获取当前设备x轴方向的加速度，浮点型数据，与物理学中的加速度值一致。
	},function(err){
	    console.log(err);
	})


##<div id="watchAcceleration">watchAcceleration</div>

-	####app.accelerometer.watchAcceleration(success, [error], [options])   ⇒ void 
		监听设备加速度变化信息
	-	success：成功回调函数 当获取设备的加速度信息成功时回调，并返回加速度信息。
		-	type：function
		-	默认值：无
		-	参数
			-	acceleration：设备的加速度信息 Acceleration类型对象，用于获取各方向的详细加速度值。
				-	type：JSON
				-	keys
					-	xAxis：x轴方向的加速度 获取当前设备x轴方向的加速度，浮点型数据，与物理学中的加速度值一致。
					-	yAxis：y轴方向的加速度 获取当前设备y轴方向的加速度，浮点型数据，与物理学中的加速度值一致。
					-	zAxis：z轴方向的加速度 获取当前设备z轴方向的加速度，浮点型数据，与物理学中的加速度值一致。
	-	error：失败回调函数 当获取设备加速度信息失败回调函数，并返回错误信息。
		-	type：function
		-	默认值：无
		-	参数
			-	error：获取加速度操作的错误信息
	-	options：加速度信息参数 监听设备加速度信息的参数，更新数据的频率。
		-	type：JSON
		-	keys
			-	frequency：更新加速度信息间隔时间 监听器获取加速度信息的时间间隔，单位为ms，默认值为500ms


#####示例：
	app.accelerometer.watchAcceleration(function(acceleration) {
	    console.log(acceleration.xAxis) //获取当前设备x轴方向的加速度，浮点型数据，与物理学中的加速度值一致。
	}, function(err) {
	    console.log(err);
	}, {
	    frequency: 400
	})

##<div id="clearWatch">clearWatch</div>
-	#### app.accelerometer.clearWatch()   ⇒ void 
		关闭监听设备加速度信息

#####示例：
	app.accelerometer.clearWatch()

