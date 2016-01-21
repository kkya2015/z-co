# geolocation
***
Geolocation模块管理设备位置信息，用于获取地理位置信息，如经度、纬度等,亦可以调用设备的 GPS 定位来获取高精度的地理位置信息。



###	索引
***
###	[方法](#方法)：

*	[getCurrentPosition](#getCurrentPosition) ：获取当前设备位置信息
*	[watchPosition](#watchPosition) ：监听设备位置变化信息
*	[clearWatch](#clearWatch) ：关闭监听设备位置信息

***
#	<div id="方法">方法</div>
***

## <div id="getCurrentPosition" style="color:red">getCurrentPosition</div>
-	####	app.geolocation.getCurrentPosition(success, error, options)   ⇒ void
			位置信息将通过手机GPS设备或其它信息如IP地址、移动网络信号获取，由于获取位置信息可能需要较长的时间，当成功获取位置信息后将通过success回调函数返回。
	-	**success**：获取设备位置信息成功回调函数
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**position** ：设备的地理位置信息
				-	**type**：JSON
				-	**keys**
					-	**coords**：（*JSON*）地理坐标信息，包括经纬度、海拔、速度等信息
						-	**keys**	
							-	**latitude**：( *Number* )坐标纬度值 数据类型对象，地理坐标中的纬度值。
							-	**longitude**：( *Number* )坐标经度值 数据类型对象，地理坐标中的经度值。
							-	**altitude**：(*Number*)海拔信息 数据类型对象，如果无法获取此信息，则此值为空（null）。
							-	**accuracy**：(*Number*)地理坐标信息的精确度信息 数据类型对象，单位为米，其有效值必须大于0。
							-	**altitudeAccuracy**：(*Number*)海拔的精确度信息 数据类型对象，单位为米，其有效值必须大于0。如果无法获取海拔信息，则此值为空（null）。
							-	**heading**：(*Number*)表示设备移动的方向 数据类型对象，范围为0到360，表示相对于正北方向的角度。如果无法获取此信息，则此值为空（null）。如果设备没有移动则此值为NaN。
							-	**speed**：( *Number* )表示设备移动的速度 数据类型对象，单位为米每秒（m/s），其有效值必须大于0。如果无法获取速度信息，则此值为空（null）。
					-	**coordsType**：( *String* )获取到地理坐标信息的坐标系类型,可取以下坐标系类型： “gps”：表示WGS-84坐标系； 
					-	**timestamp**： ( *Number* )获取到地理坐标的时间戳信息,时间戳值为从1970年1月1日至今的毫秒数。
	-	**error**：获取设备位置信息失败的回调函数
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：获取位置操作的错误信息
				-	**type**：String
	
	-	**options**：调用麦克风设备进行录音的参数
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			-	**enableHighAccuracy**： ( *Boolean* )是否高精确度获取位置信息 高精度获取表示需要使用更多的系统资源。
				-	**默认值**：false
			-	**timeout**：(*Number*)获取位置信息的超时时间 单位为毫秒（ms）。如果在指定的时间内没有获取到位置信息则触发错误回调函数。
				-	**默认值**：无超时设置
			-	**maximumAge**：(*Number*)获取位置信息的缓存时间 单位为毫秒（ms）。如果设备缓存的位置信息超过指定的缓存时间，将重新更新位置信息后再返回。
				-	**默认值**：0
			-	**provider**：(*String*)定位数据的供应者 可取以下供应者： “system”：表示系统定位模块，支持wgs84坐标系； “baidu”：表示百度定位模块，支持gcj02/bd09/bd09ll坐标系。 若指定的provider不存在或无效则返回错误回调。 注意：百度定位模块需要配置百度地图相关参数才能正常使用。
				-	**默认值**：'system'

-	#####	示例：
	
			EX-1：
			app.geolocation.getCurrentPosition(function(position) {
			    console.log(position.coords.latitude);
			});
		
			EX-2：
			app.geolocation.getCurrentPosition(function(position) {
			    console.log(position.coords.latitude);
			}, {
			    enableHighAccuracy: true,
			    timeout: 10,
			    maximumAge: 10,
			    provider: 'system'
			});
		
			EX-3：
			app.geolocation.getCurrentPosition(function(position) {
			    console.log(position.coords.latitude);
			}, function(err) {
			    console.log(err);
			});


##	<div id="watchPosition" style="color:red">watchPosition</div>

-	####	app.geolocation.watchPosition(success, error, options)   ⇒ void
			位置信息将通过手机GPS设备或其它信息如IP地址、移动网络信号获取。当位置信息更新后将通过success回调函数返回。位置信息获取失败则调用回调函数error。
	-	**success**：获取设备位置信息成功回调函数
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**position** ：设备的地理位置信息
				-	**type**：JSON
				-	**keys**
					-	**coords**：（JSON）地理坐标信息，包括经纬度、海拔、速度等信息
						-	**keys**	
							-	**latitude**：( *Number* )坐标纬度值 数据类型对象，地理坐标中的纬度值。
							-	**longitude**：( *Number* )坐标经度值 数据类型对象，地理坐标中的经度值。
							-	**altitude**：(*Number*)海拔信息 数据类型对象，如果无法获取此信息，则此值为空（null）。
							-	**accuracy**：(*Number*)地理坐标信息的精确度信息 数据类型对象，单位为米，其有效值必须大于0。
							-	**altitudeAccuracy**：(*Number*)海拔的精确度信息 数据类型对象，单位为米，其有效值必须大于0。如果无法获取海拔信息，则此值为空（null）。
							-	**heading**：(*Number*)表示设备移动的方向 数据类型对象，范围为0到360，表示相对于正北方向的角度。如果无法获取此信息，则此值为空（null）。如果设备没有移动则此值为NaN。
							-	**speed**：( *Number* )表示设备移动的速度 数据类型对象，单位为米每秒（m/s），其有效值必须大于0。如果无法获取速度信息，则此值为空（null）。
					-	**coordsType**：( *String* )获取到地理坐标信息的坐标系类型,可取以下坐标系类型： “gps”：表示WGS-84坐标系； 
					-	**timestamp**： ( *Number* )获取到地理坐标的时间戳信息,时间戳值为从1970年1月1日至今的毫秒数。
	-	**error**：获取设备位置信息失败的回调函数
		-	**type**：function
		-	**默认值**：无
		-	**参数**
			-	**err**：获取位置操作的错误信息
				-	**type**：String
	
	-	**options**：调用麦克风设备进行录音的参数
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			-	**enableHighAccuracy**： ( *Boolean* )是否高精确度获取位置信息 高精度获取表示需要使用更多的系统资源。
				-	**默认值**：false
			-	**timeout**：(*Number*)获取位置信息的超时时间 单位为毫秒（ms）。如果在指定的时间内没有获取到位置信息则触发错误回调函数。
				-	**默认值**：无超时设置
			-	**maximumAge**：(*Number*)获取位置信息的缓存时间 单位为毫秒（ms）。如果设备缓存的位置信息超过指定的缓存时间，将重新更新位置信息后再返回。
				-	**默认值**：0
			-	**provider**：(*String*)定位数据的供应者 可取以下供应者： “system”：表示系统定位模块，支持wgs84坐标系； “baidu”：表示百度定位模块，支持gcj02/bd09/bd09ll坐标系。 若指定的provider不存在或无效则返回错误回调。 注意：百度定位模块需要配置百度地图相关参数才能正常使用。
				-	**默认值**：'system'


-	#####	示例：

			EX-1：
			app.geolocation.watchPosition(function(position) {
			    console.log(position.coords.latitude);
			});
		
			EX-2：
			app.geolocation.watchPosition(function(position) {
			    console.log(position.coords.latitude);
			}, {
			    enableHighAccuracy: true,
			    timeout: 10,
			    maximumAge: 10,
			    provider: 'system'
			});
		
			EX-3：
			app.geolocation.watchPosition(function(position) {
			    console.log(position.coords.latitude);
			}, function(err) {
			    console.log(err);
			});

##	<div id="clearWatch" style="color:red">clearWatch</div>

-	####	app.geolocation.clearWatch()   ⇒ void
			关闭监听设备位置信息

-	#####	示例：

			app.geolocation.clearWatch()
