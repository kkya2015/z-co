
gallery模块管理系统相册，支持从相册中选择图片或视频文件、保存图片或视频文件到相册等功能。



###	索引
***
###	[方法](#方法)：

*	[pick](#pick) ：从系统相册选择文件（图片或视频）。
*	[save](#save) ：保存文件到系统相册中。
***
#	<div id="方法">方法</div>
***

## <div id="pick" style="color:red">pick</div>
-	####	app.gallery.pick(success, [error], [option])   ⇒ void 

			从系统相册中选择图片或视频文件。每次仅能选择一个文件，选择后通过回调函数返回选择的文件路径。

	-	**success**：从系统相册中选择文件完成后的回调函数
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**path**：选择的文件路径(当为多文件选择时，返回的是由“,”分割的字符串)
				-	**type**：String
	-	**error**：从系统相册中选择文件操作错误的回调函数。
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：操作的错误信息
				-	**type**：String
	-	**option**： 从相册中选择文件的参数。
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			-	**filter**：( String )相册中选择文件类型过滤器,可通过此参数设定相册选择器中可选择的文件类型，可设置仅可选择图片文 件或视频文件，默认值为仅可选择图片文件。
				-	**默认值**：'image'
					-	**取值范围**
						-	**'image'**：仅可选择图片文件
						-	**'video'**：仅可选择视频文件
						-	**'none'**：不过滤，可选择图片或视频文件
			-	**multiple**：是否支持多选图片,为 true 时表示可从系统相册中选择多张图片。
				-	**type**：Boolen 
				-	**默认值**：true

-	#####	示例：

			EX-1：
			app.gallery.pick(function(path) {
			    console.log(path);
			});
		
			EX-2：
			app.gallery.pick(function(path) {
			    console.log(path);
			}, {
			    filter: "image",
			    multiple: true
			});
		
			EX-3：
			app.gallery.pick(function(path) {
			    console.log(path);
			}, function(err) {
			    console.log(err);
			});
		
			EX-4：
			app.gallery.pick(function(path) {
			    console.log(path);
			}, function(err) {
			    console.log(err);
			}, {
			    filter: "image",
			    multiple: true
			});

##	<div id="save" style="color:red">save</div>

-	####	app.gallery.save(path, success, [error])   ⇒ void

			保存文件到系统相册中。 每次仅能保存一个文件，支持图片类型（jpg/jpeg、png、bmp等格式）和视频文件（3gp、mov等格式）。 若保存的文件系统不支持，则通过error返回错误信息。

	-	**path**：  要保存到系统相册中的文件文件地址
		-	**type**：String
		-	**默认值**：无
	-	**success**：保存文件到系统相册中成功的回调函数
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**info**：操作成功信息
				-	**type**：String
	-	****error**：保存文件到系统相册中失败的回调函数。
		-	type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：操作的错误信息
				-	**type**：String


-	#####	示例：

			EX-1：
			app.gallery.save("res://1.jpg",
			    function(info) {
			        console.log(info);
			    });
		
			EX-2：
			app.gallery.save("res://1.jpg",
			    function(info) {
			        console.log(info);
			    },
			    function(err) {
			        console.log(err);
			    });
	

