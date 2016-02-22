var log = $('#log')

function printout(str) {
	log.html(str)
}

function setDocTarget(tar, title) {
	app.storage.set('docTarget', tar)
	app.storage.set('title', title)
}

function getDocTarget() {
	var res = {
		docTarget: app.storage.get('docTarget'),
		title: app.storage.get('title')
	}
	return res
}

var view = app.currentView(),
	baseUrl = 'cpt://res/';
domReady(function(require) {
	app.evalScriptInWindow('alert(1)')
	var myRecorder = app.audio.getRecorder({
			filename: 'cpt://res/'
		}),
		currentSrcIndex = 0,
		currentSrc = "";


	$('.button').button(function(el, evt) {
		var htmlStr = '<div id="record" class="rp" style="display: block;">' +
			'<div style="width:100%;height:20%;"></div>' +
			'<div class="rprogress">' +
			'<div class="rschedule"></div>' +
			'</div>' +
			'<br/>' +
			'<div id="rtime" class="rtime">00:00:00</div>' +
			'<br/>' +
			'<div class="stop">点击停止录音</div>' +
			'</div>';
		$('#record').css('display', 'block')
		myRecorder.record(function(recordFile) {
			app.alert(recordFile);
		});
	})

	$('.ui-list-item-link').button(function(el, evt) {
		var title = $(el).find('.ui-list-item-title').text();
		playL($(el).data('src'), title);
	})

	$('.ui-nav-bar-right').button(function() {
		setDocTarget('doc/actionSheet.html', 'ActionSheet Doc')
		var win = app.createWindow();
		win.open('doc.html')
	})



	$('#record').button(function() {
		this.css('display', 'none');
		myRecorder.stop();
	})



});

function playL(url, title) {
	var htmlStr = '<div id="player" class="rp" style="display: block;">' +
		'<div class="current" style="width:100%;height:20%;">当前播放 <br/>' + title +
		'</div>' +
		'<div class="controls">' +
		'<div class="play_controls">' +
		'<a class="play ui-icon fa-pause"></a>' +
		'</div>' +
		'<div class="time_line">' +
		'<span class="passed_time">0:00</span>' +
		'<span class="base_bar" style="background-size: 100% 100%;">' +
		'<span class="progress_bar"></span>' +
		'</span>' +
		'<span class="total_time">0:00</span>' +
		'</div>' +
		'</div>' +
		'<br>' +
		'<a id="stop" class="button button-block button-rounded" style="margin: 5em;background-color: blue;color: white;">点击关闭</a>' +
		'</div>';

	$(document.body).append(htmlStr);
	var timeW = $(document.body).width() - 30 - 65 - 48 - 20;
	$('.base_bar').width(timeW)
	var myAudio = app.audio.createPlayer(baseUrl + url),
		$progress_bar = $(".time_line .progress_bar"),
		$passed_time = $(".time_line .passed_time"),
		$totle_time = 0;

	myAudio.paused = false;
	var $totle_time = myAudio.getDuration();
	var ttime = formatTime($totle_time);
	$('.total_time').text(ttime);
	myAudio.play(function() {
		myAudio.paused = false;
		myAudio.stoped = false;
		progress()
	})

	myAudio.addFinishCallback(function() {
		myAudio.stop();
		myAudio.stoped = true;
		$('.play').removeClass('fa-pause').addClass('fa-play')
		$progress_bar.css("width", "0%");
		$passed_time.text('0:00');
	});

	$('.play_controls').button(function(el, e) {
		if (myAudio.stoped) {
			myAudio.play(function() {
				myAudio.paused = false;
				myAudio.stoped = false;
				progress()
				$('.play').removeClass('fa-play').addClass('fa-pause')
			})
		} else if (myAudio.paused) {
			myAudio.resume();
			myAudio.paused = false;
			$('.play').removeClass('fa-play').addClass('fa-pause')
		} else {
			myAudio.pause();
			myAudio.paused = true;
			$('.play').removeClass('fa-pause').addClass('fa-play')
		}
		e.stopPropagation();
	})

	$('#stop').button(function() {
		$('#player').css('display', 'none');
		$('#player').remove()
		myAudio.stop();
		myAudio.stoped = true;
	})


	function progress() {
		setTimeout(function() {
			if (myAudio.stoped) return;
			if (myAudio.paused) { //暂停
				setTimeout(arguments.callee, 500);
			} else {
				var curTime = myAudio.getPosition();
				var percentage = curTime / $totle_time * 100;
				$progress_bar.css("width", percentage + "%");

				var passedTime = formatTime(curTime);
				$passed_time.text(passedTime);
				setTimeout(arguments.callee, 500);
			}
		}, 1);
	}
}
/*歌曲播放时间的格式化，将秒数格式化为“分:秒”的形式*/
function formatTime(time) {
	time || (time = 0)
	var minutes = parseInt(time / 60);
	var seconds = parseInt(time % 60);
	seconds < 10 && (seconds = "0" + seconds);
	return minutes + ":" + seconds;
};