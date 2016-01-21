# downloader
***
Downloader模块管理文件下载，用于从网络下载各种文件，可支持跨域访问操作和支持多文件下载。



###	索引
***
###	[方法](#方法)：

*	[createDownload](#createDownload) ：新建下载任务
*	[clear](#clear) ：清除指定状态的下载任务
*	[enumerate](#enumerate) ：枚举指定任务状态的下载任务
*	[getDownLoaderById](#getDownLoaderById) ：获取指定任务Id的下载任务
*	[remove](#remove) ：清除单个下载任务
*	[setMaxRunningSize](#setMaxRunningSize) ：设置并发任务最大数
*	[setSpeed](#setSpeed) ：设置总下载速度（KB/S），每秒多少KB，仅支持Android平台
*	[startAll](#startAll) ：开始所有下载任务

###	[对象](#对象)：

*	[Downloader](#Downloader) ：单个下载任务
	-	方法
		-	[getId](#getId) ：获取下载任务的标识
		-	[getUrl](#getUrl) ：下载任务的服务器地址，在创建任务时设置的值。 
		-	[getPath](#getPath) ：获取下载文件保存的真实路径
		-	[getState](#getState) ：获取下载任务的标识
		-	[getOptions](#getOptions) ：获取下载任务的参数 
		-	[getDownloadedSize](#getDownloadedSize) ：获取已完成下载文件的大小
		-	[getTotalSize](#getTotalSize) ：获取下载任务文件的总大小
		-	[start](#start) ：开始下载任务
		-	[pause](#pause) ：暂停下载任务
		-	[resume](#resume) ：继续下载任务
		-	[abort](#abort) ：取消下载任务
		-	[addEventListener](#addEventListener) ：添加下载任务事件监听器
		-	[removeEventListener](#removeEventListener) ：移除下载任务事件监听器
		-	[addCompletedListener](#addCompletedListener) ：添加下载任务事件完成监听器
		-	[removeCompletedListener](#removeCompletedListener) ：移除下载任务事件完成监听器

***
#	<div id="方法">方法</div>
***

## <div id="createDownload" style="color:red">createDownload</div>
-	####	app.downloader.createDownload(url, option)   ⇒ [Downloader](#Downloader) 

			1、创建下载任务，创建成功则返回Download对象。
			2、在任务结束后，要及时清除任务，以免内存溢出。
			3、重复创建任务，返回原任务 。
			4、在新建task时，如果其参数中的url和option中的filePath和已存在的task相同，则返回原来已生成的task。


	-	**url**：要下载文件资源地址
		-	**type**：String
		-	**默认值**：无
	-	**option**：下载任务的参数
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			-	**method**：( *String* )网络请求类型。支持“GET”、“POST”请求。
				-	默认值：无
			-	**filePath**：( *String* )下载文件保存的路径
				-	默认值：无
			-	**timeout**：( *Number* )下载任务超时时间，单位为s，超时时间为服务器响应请求的时间。
				-	默认值：120
			-	**retry**：( *Number* )下载任务重试次数
				-	默认值：3

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

## <div id="clear" style="color:red">clear</div>
-	####	app.downloader.clear([state])   ⇒ void
			清除指定状态的下载任务。
	-	**state**：要枚举下载任务的状态。
		-	**type**：Number
		-	**默认值**：-1
		-	**取值范围**
			-	-1：全部下载任务状态
			-	0：初始化
			-	1：下载任务进行中
			-	2：下载任务暂停
			-	3：下载任务取消
			-	4：下载任务已完成
			-	5：下载任务出现错误

-	#####	示例：

			app.downloader.clear(1)

## <div id="enumerate" style="color:red">enumerate</div>
-	####	app.downloader.enumerate([state])   ⇒ Array
			枚举指定状态的下载任务。返回值为 枚举到的下载任务对象数组。
	-	**state**：要枚举下载任务的状态。
		-	**type**：Number
		-	**默认值**：-1
		-	**取值范围**
			-	-1：全部下载任务状态
			-	0：初始化
			-	1：下载任务进行中
			-	2：下载任务暂停
			-	3：下载任务取消
			-	4：下载任务已完成
			-	5：下载任务出现错误

-	#####	示例：

			var downloaders = app.downloader.enumerate(1)

## <div id="getDownLoaderById" style="color:red">getDownLoaderById</div>
-	####	app.downloader.getDownLoaderById(id)   ⇒ [Downloader](#Downloader) 
			通过id获取任务，如果当任务下载时，程序出现异常（断网、进程被杀），再次下载时可通过此方法获取以前未下载完的任务执行start继续下载，这样可节约系统资源。
	-	**id**：要获取下载任务的id。
		-	**type**：Number
		-	**默认值**：无
		
-	#####	示例：

			var  downloader = app.downloader.getDownLoaderById(1)

## <div id="remove" style="color:red">remove</div>
-	####	app.downloader.remove(id)   ⇒ void
			清除单个下载任务
	-	**id**：要清除下载任务的id。
		-	**type**：Number
		-	**默认值**：无

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});
		
			app.downloader.remove(downloader.getId())

## <div id="setMaxRunningSize" style="color:red">setMaxRunningSize</div>
-	####	app.downloader.setMaxRunningSize(num)   ⇒ void
			1、设置下载并发任务最大数，需注意并发数越大越浪费资源
			2、如开启的任务数量大于并发数，则会进入等待队列；后续当正在下载中的任务数小于并发数时，会自动从等待队列队首取任务并开始下载
			
	-	**num**：任务并发数
		-	**type**：Number
		-	**默认值**：5

-	#####	示例：

			app.downloader.setMaxRunningSize(6)

## <div id="setSpeed" style="color:red">setSpeed</div>
-	####	app.downloader.setSpeed(speed)   ⇒ void
			设置总下载速度
	-	**speed**：下载速度（KB/S），speed<=0不限速。
		-	**type**：Number
		-	**默认值**：5

-	#####	示例：

			app.downloader.setSpeed(100)

## <div id="startAll" style="color:red">startAll</div>
-	####	app.downloader.startAll()   ⇒ void
			开始所有下载任务

-	#####	示例：

			app.downloader.startAll()

***
#	<div id="对象">对象</div>
***

##	<div id="Downloader" style="color:red">Downloader</div>

		var downloader = app.downloader.createDownload('url', {
		    method: 'GET',
		    timeout: 60,
		    retry: 3,
		    filePath: 'data://download/a.pdf'
		});
	
-	#### <div id="getId" style="color:red">getId()   ⇒ Number </div>   
			获取下载任务的标识，在创建任务时系统自动分配，用于标识下载任务的唯一性。

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			var id = downloader.getId();

-	#### <div id="getUrl" style="color:red">getUrl()   ⇒ String </div>   
			获取下载任务的服务器地址，在创建任务时设置的值。

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			var url = downloader.getUrl();

-	#### <div id="getPath" style="color:red">getPath()   ⇒ String </div>   
			获取下载文件保存的真实路径 

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			var path = downloader.getPath();

-	#### <div id="getState" style="color:red">getState()   ⇒ Number </div>   
			获取下载任务的状态

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			var state = downloader.getState();

-	#### <div id="getOptions" style="color:red">getOptions()   ⇒ JSON </div>   
			获取下载任务配置的参数

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			var options = downloader.getOptions();

-	#### <div id="getDownloadedSize" style="color:red">getDownloadedSize()   ⇒ Number </div>   
			获取下载任务已完成下载文件的大小，单位为字节(Byte)。

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			var size = downloader.getDownloadedSize();

-	#### <div id="getTotalSize" style="color:red">getTotalSize()   ⇒ Number </div>   
			获取下载任务要下载文件的总大小，单位为字节（Byte）。

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			var totalSize = downloader.getTotalSize();

-	#### <div id="start" style="color:red">start()   ⇒ void </div>   
			开始下载任务，如果任务已经处于开始状态则无任何响应。 通常在创建任务或暂停任务后重新开始。

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			downloader.start();

-	#### <div id="pause" style="color:red">pause()   ⇒ void </div>   
			暂停下载任务，如果任务已经处于初始状态或暂停状态则无任何响应。 通常在任务已开始后暂停任务。

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			downloader.pause();

-	#### <div id="resume" style="color:red">resume()   ⇒ void </div>   
			继续停止的下载任务，如果任务已经处于下载状态则无任何响应。 通常在任务已暂停任务后继续下载任务。

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			downloader.resume();

-	#### <div id="abort" style="color:red">abort()   ⇒ void </div>   
			取消下载任务，如果任务已经取消则无任何响应。 如果任务未完成，将删除已下载的临时文件。

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			downloader.abort();

-	#### <div id="addEventListener" style="color:red">addEventListener(listener)   ⇒ void </div>   
			添加下载任务事件监听器。
	-	**listener**：事件监听器回调
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**download**：下载任务对象
				-	**type**：[Downloader](#Downloader) 		
			-	**status**：Http传输协议状态码，如下载成功其值通常为200
				-	**type**：Number 
					
-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			downloader.addEventListener(function(download,status){
				if(status == 200){
					console.log('下载连接创建成功！');
					console.log(download.state);
				}
			});

-	#### <div id="removeEventListener" style="color:red">removeEventListener()   ⇒ void </div>   
			移除任务事件监听器。

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			downloader.removeEventListener();

-	#### <div id="addCompletedListener" style="color:red">addCompletedListener(listener)   ⇒ void </div>   
			添加下载任务事件完成监听器。
	-	**listener**：事件监听器回调
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**download**：下载任务对象
				-	**type**：[Downloader](#Downloader) 		
			-	**status**：Http传输协议状态码，如下载成功其值通常为200
				-	**type**：Number 
				
	
-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			downloader.addCompletedListener(function(download,status){
				console.log('下载成功！');
			});

-	#### <div id="removeCompletedListener" style="color:red">removeCompletedListener()   ⇒ void </div>   
			移除下载任务事件完成监听器。

-	#####	示例：

			var downloader = app.downloader.createDownload('url', {
			    method: 'GET',
			    timeout: 60,
			    retry: 3,
			    filePath: 'data://download/a.pdf'
			});

			downloader.removeCompletedListener();
