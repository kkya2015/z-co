
audio模块用于提供音频的录制和播放功能，可调用系统的麦克风设备进行录音操作，也可调用系统的扬声器设备播放音频文件。



###	索引
***
###	[方法](#方法)：

*	[getRecorder](#getRecorder) ：获取当前设备的录音对象
*	[createPlayer](#createPlayer) ：创建音频播放对象

###	[对象](#对象)：

*	[AudioRecorder](#AudioRecorder) ：录音对象
	-	方法
		-	[record](#record) ：调用设备麦克风进行录音操作
		-	[getCurrentTime](#getCurrentTime) ：录音时,获取当前录音时长
		-	[getDuration](#getDuration) ：获取录音时长上限,如果没有设置录音时长上限,则返回-1
		-	[addCalculateTimeCallback](#addCalculateTimeCallback) ：添加计时回调
		-	[addCountDownCallback ](#addCountDownCallback ) ：添加倒计时回调
		-	[addAveragePowerCallback](#addAveragePowerCallback) ：添加音量监控回调,录音时,当音量分贝有变化时,返回当前音量分贝值
		-	[playJustRecord](#playJustRecord) ：播放刚刚录制完成的录音文件
		-	[stop](#stop) ：结束录音操作

*	[AudioPlayer](#AudioPlayer) ：音频播放对象
	-	方法
		-	[play](#play) ：开始播放音频
		-	[pause](#pause) ：暂停播放音频
		-	[resume](#resume) ：恢复播放音频
		-	[stop](#stop) ：停止播放音频
		-	[seekTo](#seekTo) ：跳到指定位置播放音频
		-	[getDuration](#getDuration) ：获取音频流的总长度
		-	[getPosition](#getPosition) ：获取音频流当前播放的位置
		-	[setRoute](#setRoute) ：设置音频输出线路
		-	[isPlaying](#isPlaying) ：是否正在播放
		-	[addFinishCallback](#addFinishCallback) ：添加播放音频文件完毕回调

***
#	<div id="方法">方法</div>
***

## <div id="getRecorder" style="color:red">getRecorder</div>
-	####	app.audio.getRecorder([options])   ⇒ [AudioRecorder](#AudioRecorder) 

			获取当前设备的录音对象

	-	**options** : JSON对象，调用麦克风设备进行录音的参数	
		-	**type**：JSON
		-	**默认值**：无
		-	**keys**
			-	**filename**：( *String* )保存录音文件的路径或文件名。若未设置该值，则生成的录音文件由时间戳命名，后缀根据录音文件的格式确定。可设置具体文件名（存在文件后缀，值应同录音文件的格式相同），也可只设置路径，如果只设置路径（无文件后缀则认为是路径），文件名由录音程序自动生成。如果只设置文件名,则保存在默认目录下.iOS:默认目录是temp临时目录.Android:默认目录是协议路径的cache目录.若设置的路径或者文件名插件认为违法,则保存在默认目录下.
				-	**默认值**：无
			-	**samplerate**：( *String* )录音文件的采样率
				-	**默认值**：'8000'
					-	**取值范围**
						-	8000
						-	44100
						-	96000
			-	**format**：( *String* )录音文件的格式 
				-	**默认值**：'aac'
					-	**取值范围**（Android）
						-	aac
						-	amr
					-	**取值范围**（iOS）
						-	aac
						-	amr
						-	wav
			-	**duration**：(*Number*) 录音时长上限 如果不设置 录音时长无上限(单位为s).
				-	**默认值**：无
			
-	#####	示例：

			var recorder = app.audio.getRecorder({
			    filename: 'record.aac'
			})


##	<div id="createPlayer" style="color:red">createPlayer</div>

-	####	app.audio.createPlayer(path)   ⇒ [AudioPlayer](#AudioPlayer)

			创建一个音频文件播放对象，用于打开音频文件并播放。 可通过path参数指定要播放的音频文件。创建后返回播放对象，通过Audio.play方法开始播放。

	-	**path**： 音频文件路径, 要播放的音频文件的路径。
		-	**type**：String
		-	**默认值**：无


-	#####	示例：

			var player = app.audio.createPlayer("_Doc/Audio/test.mp3");


***
#	<div id="对象">对象</div>
***

##	<div id="AudioRecorder" style="color:red">AudioRecorder</div>

		var recorder = app.audio.getRecorder({
		    filename: 'record.aac'
		})
	
-	#### <div id="record" style="color:red">record(success, [error])   ⇒ void </div> 
  
			调用设备麦克风进行录音操作

	-	**success**：录音操作成功回调
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**recordFile**：录音操作保存的音频文件路径
				-	**type**：String
	-	**error**：音频操作失败回调
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**err**：音频操作的错误信息
				-	**type**：String
	
-	#####	示例：

			var recorder = app.audio.getRecorder({
			    filename: 'record.aac'
			})
			
			EX - 1：
			recorder.record(function(recordFile) {
			    console.log(recordFile);
			});
			
			EX - 2：
			recorder.record(function(recordFile) {
			    console.log(recordFile);
			}, function(err) {
			    console.log(err);
			});

-	#### <div id="getCurrentTime" style="color:red">getCurrentTime()   ⇒ Number </div>   

			录音时,获取当前录音时长.

-	#####	示例：

			var recorder = app.audio.getRecorder({
			    filename: 'record.aac'
			})
			recorder.record(function(recordFile) {
			    console.log(recordFile);
			});
			var currentTime = recorder.getCurrentTime();
			console.log(currentTime);

-	#### <div id="getDuration" style="color:red">getDuration()   ⇒ Number </div> 
  
			获取录音时长上限,如果没有设置录音时长上限,则返回-1.

-	#####	示例：

			var recorder = app.audio.getRecorder({
			    filename: 'record.aac'
			})
			var curation = recorder.getDuration();
			console.log(curation);

-	#### <div id="addCalculateTimeCallback" style="color:red">addCalculateTimeCallback(callback)   ⇒ void </div>   

			如果此回调被添加,则每秒回调一次.通过回调函数返回格式为"mm:ss"的字符串.内容为当前录音时长.

	-	**callback**：计时回调函数
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**time**：计时内容 格式为 "mm:ss".
				-	**type**：String

-	#####	示例：

			var recorder = app.audio.getRecorder({
			    filename: 'record.aac'
			})
			recorder.addCalculateTimeCallback(function(time) {
			    console.log(time)
			})

-	#### <div id="addCountDownCallback" style="color:red">addCountDownCallback(callback)   ⇒ void </div>   

			添加倒计时回调.若没有设置录音时长上限,此方法添加的回调函数不会被调用.

	-	**callback**：倒计时回调函数
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**time**：计时内容 格式为 "mm:ss".
				-	**type**：String

-	#####	示例：

			var recorder = app.audio.getRecorder({
			    filename: 'record.aac'
			})
			recorder.addCountDownCallback(function(time) {
			    console.log(time)
			})

-	#### <div id="addAveragePowerCallback" style="color:red">addAveragePowerCallback(callback)   ⇒ void </div>   

			添加音量监控回调,录音时,当音量分贝有变化时,返回当前音量分贝值.

	-	**callback**：音量监控回调
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**averagePower**：音量分贝值.
				-	**type**：Number

-	#####	示例：

			var recorder = app.audio.getRecorder({
			    filename: 'record.aac'
			})
			recorder.addAveragePowerCallback(function(averagePower) {
			    console.log(averagePower)
			})

-	#### <div id="playJustRecord" style="color:red">playJustRecord()   ⇒ void </div>  
 
			录音完毕之后,播放刚刚录制的声音文件.

-	#####	示例：

			var recorder = app.audio.getRecorder({
			    filename: 'record.aac'
			})
			recorder.record(function(recordFile) {
			    console.log(recordFile);
			});
			recorder.stop();
			recorder.playJustRecord();
			
-	#### <div id="stop" style="color:red">stop()   ⇒ void </div>  
 
			结束录音操作，通知设备完成录音操作。

-	#####	示例：

			var recorder = app.audio.getRecorder({
			    filename: 'record.aac'
			})
			recorder.record(function(recordFile) {
			    console.log(recordFile);
			});
			recorder.stop();

##	<div id="AudioPlayer" style="color:red">AudioPlayer</div>

		var audioPlayer = app.audio.createPlayer()
	
-	#### <div id="play" style="color:red">play(success, [error])   ⇒ void </div> 
  
			开始播放音频

	-	**success**：播放音频操作成功回调函数,当音频文件播放完成时回调
		-	**type**：Function
		-	**默认值**：无
	-	**error**：音频操作失败回调
		-	**type**：Function
		-	**默认值**：无
		-	**参数**
			-	**err**：音频操作的错误信息
				-	**type**：String

-	#####	示例：

			var player = app.audio.createPlayer();

			EX - 1：
			player.play(function() {
			    console.log('播放成功！');
			})
			
			EX - 2：
			player.play(function() {
			    console.log('播放成功！');
			}, function(err) {
			    console.log(err);
			})

-	#### <div id="pause" style="color:red">pause()   ⇒ void </div>   

			需先调用createPlayer方法创建音频播放对象，并开始播放。音频播放对象在播放状态才能暂停，在其它状态调用此方法无任何作用。

-	#####	示例：

			var player = app.audio.createPlayer();
			player.pause();

-	#### <div id="resume" style="color:red">resume()   ⇒ void </div>   

			音频播放对象在暂停状态才能恢复播放，在其它状态调用此方法无任何作用。

-	#####	示例：

			var player = app.audio.createPlayer();
			player.resume();

-	#### <div id="stop" style="color:red">stop()   ⇒ void </div>   

			停止播放音频，音频播放对象在播放或暂停状态才能停止播放，在其它状态调用此方法无任何作用。 停止播放后如果需要继续播放，则需调用play方法重新开始播放。

-	#####	示例：

			var player = app.audio.createPlayer();
			player.stop();

-	#### <div id="seekTo" style="color:red">seekTo(position)   ⇒ void </div>  
 
			跳到指定位置播放音频，音频播放对象在播放或暂停状态才能跳到指定播放音频，在其它状态调用此方法无任何作用。
	
	-	**position**：音频播放要跳到的位置，单位为s
		-	**type**：Number
		-	**默认值**：无

-	#####	示例：

			var player = app.audio.createPlayer();
			player.seekTo(33)；//跳到33秒播放

-	#### <div id="getDuration" style="color:red">getDuration()   ⇒ Number </div>
   
			获取音频流的总长度，单位为秒，若长度未知则返回-1。如果还未获取到音频流信息则返回NaN，此时需要延迟获取此信息。

-	#####	示例：

			var player = app.audio.createPlayer();
			var duration = player.getDuration()；

-	#### <div id="getPosition" style="color:red">getPosition()   ⇒ Number </div> 
  
			获取音频流当前播放的位置（已播放的长度），单位为s。

-	#####	示例：

			var player = app.audio.createPlayer();
			var position = player.getPosition()；

-	#### <div id="setRoute" style="color:red">setRoute([route])   ⇒ void </div> 
  
			可在音频文件开始播放前或播放的过程中改变音频输出线路，默认使用扬声器输出线路。

	-	**route**：音频播放时输出线路
		-	**type**：Number
		-	**默认值**：0
		-	**取值范围**
				-	0：设备的扬声器音频输出线路
				-	1：设备听筒音频输出线路

-	#####	示例：

			var player = app.audio.createPlayer();
			player.setRoute(1)； //使用听筒播放

-	#### <div id="isPlaying" style="color:red">isPlaying()   ⇒ boolean </div> 
  
			获取是否正在播放。

-	#####	示例：
	
			var player = app.audio.createPlayer();
			var playing = player.isPlaying()；

-	#### <div id="addFinishCallback" style="color:red">addFinishCallback()   ⇒ void </div> 
  
			添加播放完毕回调

-	#####	示例：
	
			var player = app.audio.createPlayer();
			player.addFinishCallback(function(){
				console.log('播放完毕');
			});
