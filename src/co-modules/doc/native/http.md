
http网络异步请求,主要封装了类ajax请求，简化开发者在进行ajax请求的繁琐操作。



###	索引
***
###	[方法](#方法)：

*	[XMLHttpRequest](#XMLHttpRequest) ：获取网络请求对象
*	[ajax](#ajax) ：执行ajax请求
*	[get](#get) ：执行get请求
*	[getJSON](#getJSON) ：执行getJSON请求
*	[fileUpload](#fileUpload) ：执行fileUpload请求

###	[对象](#对象)：

*	[XMLHttpRequest](#XMLHttpRequest) ：网络请求对象
	-	方法
		-	[open](#open) ：初始化HTTP请求参数，例如URL和HTTP方法，但是并不发送请求
		-	[send](#send) ：发送HTTP请求
		-	[postForm](#postForm)：表单方式提交数据
		-	[abort](#abort)：取消当前请求响应及事件回调
		-	[setHeader](#setHeader)：指定一个HTTP请求的Header
		-	[setOffline](#setOffline)：指定离线策略，是否直接调用离线数据
		-	[setExpires](#setExpires)：指定离线策略，设定离线缓存过期时间
		-	[setCertificate](#setCertificate)：设置本次请求使用的数字证书

	-	事件
		-	[onSuccess](#onSuccess) ：请求成功回调事件
		-	[onError](#onError) ：请求失败回调事件

***
#	<div id="方法">方法</div>
***

## <div id="XMLHttpRequest" style="color:red">XMLHttpRequest</div>
-	####	app.http.XMLHttpRequest()   ⇒ [XMLHttpRequest](#XMLHttpRequest) 
			获取网络请求对象

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()


##	<div id="ajax" style="color:red">ajax</div>

-	####	app.http.ajax(url, settings)   ⇒ [XMLHttpRequest](#XMLHttpRequest)
			执行ajax请求
	-	**url**： 网络请求地址
		-	**type**：String
		-	**默认值**：无
	-	**settings**： ( *JSON* )网络请求配置项
		-	**默认值**：无
		-	**keys**
			-	**type**： ( *String* )异步请求方法类型
				-	**默认值**：'GET'
					-	**取值范围**
						-	GET
						-	POST
						-	PUT
						-	DELETE
						-	HEAD
			-	**data**：( *JSON* )发送到服务器的数据
				-	默认值：无
			-	**dataType**：( *String* )预期服务器返回的数据类型
				-	**默认值**：'json'
					-	**取值范围**
						-	json
						-	text
			-	**success**：( *Function* )请求成功之后调用。传入返回后的数据，以及服务器响应头信息。
				-	**默认值**：无
					-	**参数**
						-	**data**：( *String/JSON* )服务器返回数据。具体类型依赖于传入的options.dataType字段。
						-	**response**：( *JSON* )服务器响应头信息。
			-	**error**：( *Function* )请求出错时调用。
				-	**默认值**：无
					-	**参数**
						-	**message**：( *String* )错误信息
						-	**code**：( *Number* )服务器响应状态码
						-	**response**：( *JSON* )服务器响应头
			-	**timeout**：( *Number* )网络请求超时时间，单位ms。
				-	**默认值**：30000
			-	**headers**：( JSON )请求中额外的HTTP信息头对象
				-	**默认值**：无
			-	**offline**：(*String* )是否直接调用离线数据（调用离线数据需要设置离线缓存过期时间expires不为0）
				-	**默认值**：'none'
					-	**取值范围**
						-	'true'：直接调用缓存数据，如果缓存数据不存在，执行请求并缓存返回数据；
						-	'false'：直接请求数据，并把请求到的数据缓存
						-	'none'：直接请求数据，不缓存请求到的数据。
			-	**expires**：( *Number* )离线缓存过期时间，单位为ms。
				-	**默认值**：0
			-	**certificate**：( *JSON* )数字证书
				-	**默认值**：无
					-	**keys**
						-	**path**：(*String*)证书(.p12证书)的路径
						-	**password**：(*String*)提取证书的密码。


-	#####	示例：

			app.http.ajax('http://api.u148.net/json/6/1', {
			    type: 'GET',
			    data: {
			        name: 'Dom'
			    },
			    dataType: 'json',
			    timeout: 3000,
			    success: function(data, response) {
			        console.log(data)
			    },
			    error: function(message, code, response) {
			        console.log(message)
			    }
			})

##	<div id="get" style="color:red">get</div>

-	####	app.http.get(url, [data], [dataType], success)   ⇒ [XMLHttpRequest](#XMLHttpRequest)
			执行get请求
	-	**url**： 网络请求地址
		-	**type**：String
		-	**默认值**：无
	-	**data**： 发送到服务器的数据
		-	**type**：JSON
		-	**默认值**：无
	-	**dataType**： 预期服务器返回的数据类型
		-	**type**：String
		-	**默认值**：'json'
		-	**取值范围**
			-	json
			-	text
	-	**success**： 请求成功之后调用。传入返回后的数据，以及服务器响应头信息
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**data**：( *String/JSON* )服务器返回数据。具体类型依赖于传入的options.dataType字段。
			-	**response**：( *JSON* )服务器响应头信息。

-	#####	示例：

			EX-1：
			app.http.get('http://api.u148.net/json/6/1', function(data, response) {
			    console.log(data)
			})
			
			EX-2：
			app.http.get('http://api.u148.net/json/6/1', {
			    name: 'Dom'
			}, function(data, response) {
			    console.log(data)
			})
			
			EX-3：
			app.http.get('http://api.u148.net/json/6/1', {
			    name: 'Dom'
			}, 'json', function(data, response) {
			    console.log(data)
			})

##	<div id="getJSON" style="color:red">getJSON</div>

-	####	app.http.getJSON(url, [data], success)   ⇒ [XMLHttpRequest](#XMLHttpRequest)
			执行getJSON请求
	-	**url**： 网络请求地址
		-	**type**：String
		-	**默认值**：无
	-	**data**： 发送到服务器的数据
		-	**type**：JSON
		-	**默认值**：无
	-	**success**： 请求成功之后调用。传入返回后的数据，以及服务器响应头信息
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**data**：( *String/JSON* )服务器返回数据。具体类型依赖于传入的options.dataType字段。
			-	**response**：( *JSON* )服务器响应头信息。

-	#####	示例：

			EX-1：
			app.http.getJSON('http://api.u148.net/json/6/1', function(data, response) {
			    console.log(data)
			})
			
			EX-2：
			app.http.getJSON('http://api.u148.net/json/6/1', {
			    name: 'Dom'
			}, function(data, response) {
			    console.log(data)
			})

##	<div id="fileUpload" style="color:red">fileUpload</div>

-	####	app.http.fileUpload(url, files, [data], [dataType], success)   ⇒ [XMLHttpRequest](#XMLHttpRequest)
			执行文件上传请求
	-	**url**： 网络请求地址
		-	**type**：String
		-	**默认值**：无
	-	**files**： 发送到服务器的文件数组（JSON数组）
		-	**type**：Array（file）
		-	**默认值**：无
		-	**file**：（JSON）文件对象
			-	**keys**
				-	**name** ：( *String* )后台获取时的key
				-	**path**：( *String* )文件路径
				-	**fileName**：( *String* )后台保存的文件名
				-	**mimeType** ：( *String* )上传文件类型（后缀）
	-	**data**： 发送到服务器的数据
		-	**type**：JSON
		-	**默认值**：无
	-	**dataType**： 预期服务器返回的数据类型
		-	**type**：String
		-	**默认值**：'json'
		-	**取值范围**
			-	json
			-	text
	-	**success**： 请求成功之后调用。传入返回后的数据，以及服务器响应头信息
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**data**：( *String/JSON* )服务器返回数据。具体类型依赖于传入的options.dataType字段。
			-	**response**：( *JSON* )服务器响应头信息。

-	#####	示例：

			EX-1：
			app.http.fileUpload('http://api.u148.net/json/6/1', [{
			    name: 'file',
			    path: 'res://1.jpg',
			    fileName: 'upFile',
			    mimeType: 'jpg'
			}], function(data, response) {
			    console.log(data)
			})
			
			EX-2：
			app.http.fileUpload('http://api.u148.net/json/6/1', [{
			    name: 'file',
			    path: 'res://1.jpg',
			    fileName: 'upFile',
			    mimeType: 'jpg'
			}], {
			    name: 'Dom'
			}, function(data, response) {
			    console.log(data)
			})
			
			EX-3：
			app.http.fileUpload('http://api.u148.net/json/6/1', [{
			    name: 'file',
			    path: 'res://1.jpg',
			    fileName: 'upFile',
			    mimeType: 'jpg'
			}], {
			    name: 'Dom'
			}, 'json', function(data, response) {
			    console.log(data)
			})


***
#	<div id="对象">对象</div>
***

##	<div id="XMLHttpRequest" style="color:red">XMLHttpRequest</div>

		var xhr = app.http.XMLHttpRequest()
	
-	#### <div id="open" style="color:red">open(url, [method], [timeout])   ⇒ void </div>   
			这个方法初始化请求参数以供 send() 方法稍后使用。当这个方法调用的时候，不会打开一个到Web服务器的网络连接。
	-	**url**：网络请求地址
		-	**type**：String
		-	**默认值**：无
	-	**method**：异步请求方法类型
		-	**type**：String
		-	**默认值**：'GET'
		-	**取值范围**
			-	GET
			-	POST
			-	PUT
			-	DELETE
			-	HEAD
	-	**timeout**：网络请求超时时间，单位ms。
		-	**type**：Number
		-	**默认值**：30000

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()

			EX-1：
			xhr.open('http://api.u148.net/json/6/1')

			EX-2：
			xhr.open('http://api.u148.net/json/6/1','GET')

			EX-3：
			xhr.open('http://api.u148.net/json/6/1','GET',4000)

-	#### <div id="send" style="color:red">send([body], [dataType])   ⇒ void </div>   
			此方法触发HTTP请求发送，如果之前没有调用open()，send()抛出一个异常。否则，将发送HTTP请求，该请求包含通过其他设置方法对该请求对象设置的一些属性（例如：setHeader）
	-	**body**：请求HTTP提交的数据内容
		-	**type**：String
		-	**默认值**：无
	-	**dataType**：预期服务器返回的数据类型
		-	**type**：String
		-	**默认值**：'json'
		-	**取值范围**
			-	json
			-	text

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()

			EX-1：
			xhr.open('http://api.u148.net/json/6/1','GET',4000)
			xhr.send()

			EX-2：
			xhr.open('http://api.u148.net/json/6/1','GET',4000)
			xhr.send({
			    name: 'Dom'
			})

			EX-3：
			xhr.open('http://api.u148.net/json/6/1','GET',4000)
			xhr.send({
			    name: 'Dom'
			}, 'json')

-	#### <div id="postForm" style="color:red">postForm([data], [dataType], [files])   ⇒ void </div>   
			表单方式提交数据，如果之前没有调用open()，postForm()抛出一个异常。否则，将发送HTTP请求，该请求包含通过其他设置方法对该请求对象设置的一些属性（例如：setHeader）
	-	**data**： 发送到服务器的数据
		-	**type**：JSON
		-	**默认值**：无
	-	**dataType**：预期服务器返回的数据类型
		-	**type**：String
		-	**默认值**：'json'
		-	**取值范围**
			-	json
			-	text
	-	**files**： 发送到服务器的文件数组（JSON数组）
		-	**type**：Array（file）
		-	**默认值**：无
		-	**file**：（JSON）文件对象
			-	**keys**
				-	**name** ：( *String* )后台获取时的key
				-	**path**：( *String* )文件路径
				-	**fileName**：( *String* )后台保存的文件名
				-	**mimeType** ：( *String* )上传文件类型（后缀）

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()

			EX-1：
			xhr.open('http://api.u148.net/json/6/1','GET',4000)
			xhr.postForm()

			EX-2：
			xhr.open('http://api.u148.net/json/6/1','GET',4000)
			xhr.postForm({
			    name: 'Dom'
			})

			EX-3：
			xhr.open('http://api.u148.net/json/6/1','GET',4000)
			xhr.postForm({
			    name: 'Dom'
			}, 'json')

			EX-4：
			xhr.open('http://api.u148.net/json/6/1','GET',4000)
			xhr.postForm({
			    name: 'Dom'
			}, 'json'，[{
			    name: 'file',
			    path: 'res://1.jpg',
			    fileName: 'upFile',
			    mimeType: 'jpg'
			}])

-	#### <div id="abort" style="color:red">abort()   ⇒ void </div>   
			取消当前响应，即使成功返回也不会执行回调函数

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()
			xhr.abort()

-	#### <div id="setHeader" style="color:red">setHeader(headerName, headerValue)   ⇒ void </div>   
			Http的Header包含在通过后续send()调用而发起的请求中。 
	-	**headerName**： HTTP Header名称
		-	**type**：DOMString 
		-	**默认值**：无
	-	**headerValue**： HTTP Header值
		-	**type**：DOMString 
		-	**默认值**：无

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()
			xhr.setHeader('Content-Type','application/json');

-	#### <div id="setOffline" style="color:red">setOffline(type)   ⇒ void </div>   
			设置离线策略，是否直接调用离线数据。
	-	**type**： 离线策略类型
		-	**type**：String 
		-	**默认值**：'none'
		-	**取值范围**
			-	'true'：直接调用缓存数据，如果缓存数据不存在，执行请求并缓存返回数据；
			-	'false'：直接请求数据，并把请求到的数据缓存
			-	'none'：直接请求数据，不缓存请求到的数据。

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()
			xhr.setOffline('true');

-	#### <div id="setExpires" style="color:red">setExpires(millisecond)   ⇒ void </div>   
			设置离线缓存过期时间，单位为ms。
	-	**millisecond**： 缓存过期时间
		-	**type**：Number 
		-	**默认值**：0

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()
			xhr.setExpires(300000);

-	#### <div id="setCertificate" style="color:red">setCertificate(path, password)   ⇒ void </div>   
			设置本次请求使用的数字证书
	-	**path**： 证书(.p12证书)的路径
		-	**type**：String 
		-	**默认值**：无
	-	**password**： 提取证书的密码
		-	**type**：String 
		-	**默认值**：无

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()
			xhr.setCertificate('证书地址','证书密码');

-	#### <div id="onSuccess" style="color:red">onSuccess(data, response)   ⇒ void </div>   
			请求成功之后调用事件。传入返回后的数据，以及服务器响应头信息
	-	**data**：服务器返回数据。具体类型依赖于传入的options.dataType字段。
		-	**type**：String/JSON
		-	**默认值**：无
	-	**response**：服务器响应头信息。
		-	**type**：JSON 
		-	**默认值**：无

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()
			xhr.onSuccess = function(data, response) {
			    console.log(data)
			}

-	#### <div id="onError" style="color:red">onError(message, code, response)   ⇒ void </div>   
			请求出错时调用。
	-	**message**：错误信息
		-	**type**：String
		-	**默认值**：无
	-	**code**：服务器响应状态码
		-	**type**：Number 
		-	**默认值**：无
	-	**response**：服务器响应头信息。
		-	**type**：JSON 
		-	**默认值**：无

-	#####	示例：

			var xhr = app.http.XMLHttpRequest()
			xhr.onError = function(data, response) {
			    console.log(data)
			}