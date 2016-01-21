
zip模块管理文件压缩和解压。



###	索引
***
###	[方法](#方法)：

*	[compress](#compress) ：压缩成Zip文件。
*	[decompress](#decompress) ：解压缩Zip文件。


***
#	<div id="方法">方法</div>
***

## <div id="compress" style="color:red">compress</div>
-	####	app.zip.compress(src, zipfile, success, [error])   ⇒ void

			压缩成Zip文件

	-	**src**： 要压缩的源文件路径，支持文件路径或目录，iOS必须为协议路径。例如："res://...."
		-	**type**：String
		-	**默认值**：无
	-	**zipfile**： 压缩后保存的Zip文件路径,iOS必须为协议路径。例如："res://...."
		-	**type**：String
		-	**默认值**：无
	-	**success**： 压缩Zip文件操作成功回调，在压缩操作成功时调用
		-	**type**：Function
		-	**默认值**：无
	-	**error**：压缩Zip文件操作失败回调，在压缩操作失败时调用
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**err**：操作成功后返回相应的失败信息
				-	**type**：String

-	#####	示例：
	
			EX-1：
			app.zip.compress("res://1.png", 'data://apple1.zip', function() {
			    console.log('压缩成功！');
			});
		
			EX-2：
			app.zip.compress("res://1.png", 'data://apple1.zip', function() {
			    console.log('压缩成功！');
			}, function(err) {
			    console.log(err);
			});

## <div id="decompress" style="color:red">decompress</div>
-	####	app.zip.decompress(zipfile, target, success, [error])   ⇒ void

			解压缩Zip文件。

	-	**zipfile**： 需解压Zip文件路径，iOS必须为协议路径。例如："res://...."
		-	**type**：String
		-	**默认值**：无
	-	**target**： 解压Zip文件的目标路径，iOS必须为协议路径。例如："res://...."
		-	**type**：String
		-	**默认值**：无
	-	**success**： 解压Zip文件操作成功回调，在解压操作成功时调用。
		-	**type**：Function
		-	**默认值**：无
	-	**error**：解压Zip文件操作失败回调，在解压操作失败时调用。
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**err**：操作成功后返回相应的失败信息
				-	**type**：String

-	#####	示例：
	
			EX-1：
			app.zip.decompress('data://apple1.zip' ,'res://orange' , function() {
			    console.log('解压成功！');
			});
		
			EX-2：
			app.zip.decompress('data://apple1.zip' ,'res://orange' , function() {
			    console.log('解压成功！');
			}, function(err) {
			    console.log(err);
			});
