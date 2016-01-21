
Camera模块管理设备的摄像头，可用于拍照、摄像操作。



###	索引
***
###	[方法](#方法)：

*	[getCamera](#getCamera) ：获取摄像头对象

###	[对象](#对象)：

*	[Camera](#Camera) ：摄像头对象
	-	方法
		-	[captureImage](#captureImage) ：进行拍照操作
		-	[captureVideo](#captureVideo) ：用摄像头进行摄像操作

***
#	<div id="方法">方法</div>
***

## <div id="getCamera" style="color:red">getCamera</div>
-	####	app.camera.getCamera(filename,[resolution],[cameraType])   ⇒ [Camera](#Camera) 
			获取当前设备的录音对象
	-	**filename**：拍照或摄像文件保存的路径。对摄像操作而言，在iOS平台中，不需要此属性，由程序自动生成保存路径。
		-	**type**：String
		-	**默认值**：无
	-	**resolution**：拍照或摄像的文件分辨率。该属性支持iOS平台，不支持Android平台。
		-	**type**：number
		-	**默认值**：无
		-	**取值范围**
			-	0：高质量
			-	1：中等质量
			-	2：低质量
			-	3：VGA质量
			-	4：1280*720
			-	5：960*540
	-	**cameraType**：拍照或摄像默认使用的摄像头。该属性支持iOS平台，不支持Android平台。
		-	**type**：number
		-	**默认值**：无
		-	**取值范围**
			-	0：后摄像头
			-	1：前摄像头

-	#####	示例：

			var camera = app.camera.getCamera('data://hi.jpg')

***
#	<div id="对象">对象</div>
***

##	<div id="Camera" style="color:red">Camera</div>

		var camera = app.camera.getCamera('data://hi.jpg')
	
-	#### <div id="captureImage" style="color:red">captureImage(success, [error])   ⇒ void </div>   
			进行拍照操作
	-	**success**：拍照操作成功的回调函数。
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**capturedFile**：拍照操作保存的文件路径
				-	**type**：String
	-	**error**：拍照操作取消的回调函数。
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：摄像头操作取消信息
				-	**type**：String

-	#####	示例：

			var camera = app.camera.getCamera('data://hi.jpg')

			EX - 1：
			camera.captureImage(function(capturedFile) {
			    console.log(capturedFile);
			});
			
			EX - 2：
			camera.captureImage(function(recordFile) {
			    console.log(recordFile);
			}, function(err) {
			    console.log(err);
			});

-	#### <div id="captureVideo" style="color:red">captureVideo(success, [error])   ⇒ void </div>   
			用摄像头进行摄像操作
	-	**success**：摄像操作成功的回调函数。
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**capturedFile**：摄像操作保存的文件路径
				-	**type**：String
	-	**error**：摄像操作取消的回调函数。
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：摄像头操作取消信息
				-	**type**：String

-	#####	示例：

			var camera = app.camera.getCamera('data://hi.jpg')

			EX - 1：
			camera.captureVideo(function(capturedFile) {
			    console.log(capturedFile);
			});
			
			EX - 2：
			camera.captureVideo(function(recordFile) {
			    console.log(recordFile);
			}, function(err) {
			    console.log(err);
			});
