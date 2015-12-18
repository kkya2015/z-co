# audio
***
audio模块用于提供音频的录制和播放功能，可调用系统的麦克风设备进行录音操作，也可调用系统的扬声器设备播放音频文件。



###索引
***
###[方法](#方法)：

*	[getRecorder](#getRecorder) ：获取当前设备的录音对象
*	[createPlayer](#createPlayer) ：创建音频播放对象

###[对象](#对象)：

*	[AudioRecorder](#AudioRecorder) ：录音对象
	-	方法
		-	[record](#record) ：调用设备麦克风进行录音操作
		-	[stop](#stop) ：结束录音操作
		-	[getSamplerates](#getSamplerates)：获取设备录音支持的采用率
		-	[getFormats](#getFormats)：获取设备录音支持的文件格式

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

***
#<div id="方法">方法</div>
***

## <div id="getRecorder">getRecorder</div>
-	####app.audio.getRecorder()   ⇒ [AudioRecorder](#AudioRecorder) 
		获取当前设备的录音对象
#####示例：
	var recorder = app.audio.getRecorder()


##<div id="createPlayer">createPlayer</div>

-	####app.audio.createPlayer(path)   ⇒ [AudioPlayer](#AudioPlayer)
		创建一个音频文件播放对象，用于打开音频文件并播放。 可通过path参数指定要播放的音频文件。创建后返回播放对象，通过Audio.play方法开始播放。
	-	path： 音频文件路径, 要播放的音频文件的路径。
		-	type：String
		-	默认值：无


#####示例：
	var player = app.audio.createPlayer("_Doc/Audio/test.mp3");


***
#<div id="对象">对象</div>
***

##<div id="AudioRecorder">AudioRecorder</div>

	var audioRecorder = app.audio.getRecorder()
	
-	#### <div id="record">record(success, [error], [options])   ⇒ void </div>   
		调用设备麦克风进行录音操作
	-	success：录音操作成功回调
		-	type：Function
		-	默认值：无
		-	参数
			-	recordFile：录音操作保存的音频文件路径
				-	type：String
	-	error：音频操作失败回调
		-	type：Function
		-	默认值：无
		-	参数
			-	err：音频操作的错误信息
				-	type：String
	
	-	options：( JSON )调用麦克风设备进行录音的参数
		-	默认值：无
		-	keys
			-	filename：( String )保存录音文件的路径 可设置具体文件名，也可只设置路径，如果以“/”结尾则表明是路径，文件名由录音程序自动生成。 如未设置则使用默认目录生成随机文件名称，默认目录为应用%APPID%下的documents目录。
				-	默认值：无
			-	samplerate：( String )录音文件的采样率 需通过[getSamplerates](#getSamplerates)方法获取设备支持的采样率，若设置无效的值，则使用系统默认的采样率。
				-	默认值：无
			-	format：( String )录音文件的格式 需通过[getFormats](#getFormats)方法获取设备支持的录音格式，若设置无效的值，则使用系统默认的录音格式。
				-	默认值：无
	-	####示例：
			var recorder = app.audio.getRecorder();

			EX-1：
			recorder.record(function(recordFile) {
			    console.log(recordFile);
			});
			
			EX-2：
			recorder.record(function(recordFile) {
			    console.log(recordFile);
			}, function(err) {
			    console.log(err);
			});
			
			EX-3：
			recorder.record(function(recordFile) {
			    console.log(recordFile);
			}, {
			    filename: 'filename',
			    samplerate: recorder.getSamplerates()[0],
			    format: recorder.getFormats()[0]
			});
			
			EX-4：
			recorder.record(function(recordFile) {
			    console.log(recordFile);
			}, function(err) {
			    console.log(err);
			}, {
			    filename: 'filename',
			    samplerate: recorder.getSamplerates()[0],
			    format: recorder.getFormats()[0]
			});

-	#### <div id="stop">stop()   ⇒ void </div>   
		调用设备麦克风进行录音操作
	-	####示例：
			var recorder = app.audio.getRecorder();
			recorder.stop();

##<div id="AudioPlayer">AudioPlayer</div>

	var audioPlayer = app.audio.createPlayer()
	
-	#### <div id="play">play(success, [error])   ⇒ void </div>   
		开始播放音频
	-	success：播放音频操作成功回调函数,当音频文件播放完成时回调
		-	type：Function
		-	默认值：无
	-	error：音频操作失败回调
		-	type：Function
		-	默认值：无
		-	参数
			-	err：音频操作的错误信息
				-	type：String
	-	####示例：
			var player = app.audio.createPlayer();
			
			EX-1：
			player.play(function(){
			    console.log('播放成功！');
			})
			
			EX-2：
			player.play(function(){
			    console.log('播放成功！');
			}, function(err){
			    console.log(err);
			})

-	#### <div id="pause">pause()   ⇒ void </div>   
		需先调用createPlayer方法创建音频播放对象，并开始播放。音频播放对象在播放状态才能暂停，在其它状态调用此方法无任何作用。
	-	####示例：
			var player = app.audio.createPlayer();
			player.pause();

-	#### <div id="resume">resume()   ⇒ void </div>   
		音频播放对象在暂停状态才能恢复播放，在其它状态调用此方法无任何作用。
	-	####示例：
			var player = app.audio.createPlayer();
			player.resume();

-	#### <div id="stop">stop()   ⇒ void </div>   
		停止播放音频，音频播放对象在播放或暂停状态才能停止播放，在其它状态调用此方法无任何作用。 停止播放后如果需要继续播放，则需调用play方法重新开始播放。
	-	####示例：
			var player = app.audio.createPlayer();
			player.stop();

-	#### <div id="seekTo">seekTo(position)   ⇒ void </div>   
		跳到指定位置播放音频，音频播放对象在播放或暂停状态才能跳到指定播放音频，在其它状态调用此方法无任何作用。	
	-	position：音频播放要跳到的位置，单位为s
		-	type：Number
		-	默认值：无
	-	####示例：
			var player = app.audio.createPlayer();
			player.seekTo(33)；//跳到33秒播放

-	#### <div id="getDuration">getDuration()   ⇒ Number </div>   
		获取音频流的总长度，单位为秒，若长度未知则返回-1。如果还未获取到音频流信息则返回NaN，此时需要延迟获取此信息。
	-	####示例：
			var player = app.audio.createPlayer();
			var duration = player.getDuration()；

-	#### <div id="getPosition">getPosition()   ⇒ Number </div>   
		获取音频流当前播放的位置（已播放的长度），单位为s。
	-	####示例：
			var player = app.audio.createPlayer();
			var position = player.getPosition()；

-	#### <div id="setRoute">setRoute([route])   ⇒ void </div>   
		可在音频文件开始播放前或播放的过程中改变音频输出线路，默认使用扬声器输出线路。。
	-	route：音频播放时输出线路
		-	type：Number
		-	默认值：0
		-	取值范围
				-	0：设备的扬声器音频输出线路
				-	1：设备听筒音频输出线路
	-	####示例：
			var player = app.audio.createPlayer();
			player.setRoute(1)； //使用听筒播放

-	#### <div id="isPlaying">isPlaying()   ⇒ boolean </div>   
		获取是否正在播放。
	-	####示例：
			var player = app.audio.createPlayer();
			var playing = player.isPlaying()；
