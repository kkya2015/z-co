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
	
function regTarget(url, title) {
	$(document).find('.ui-nav-action-back').button(function(evt) {
		app.currentView().back();
	})
	if (url) {
		$('.ui-nav-bar-right').button(function() {
			setDocTarget(url, title)
			var win = app.createWindow();
			win.open('doc.html')
		})
	}

}
	
/* 关闭当前页面
 * 
 */
function $close(){
	if (window.app) {
		window.app.currentView().back();
	} else if (window.rd) {
		window.rd.window.closeSelf();
	} else {
		window.history.back()
	}
}

/* 跳转到文档页面
 * @param String popName	  需要打开的html名字
 * @param String titleName	 打开页面的标题
 */	
function $goDoc(htmlName,titleName){
	setDocTarget('doc/'+htmlName+'.html', titleName)
    var win = app.createWindow();
    win.open('doc.html')
}
/* 在指定window页面的控制台打印提示信息
 * @param String windowName	  window的名字
 * @param String meg	            提示信息
 */
function setLogMeg(windowName,meg){
	rd.window.evaluateScript('',windowName,'','winSetMeg("'+meg+'")');
}
/* 在指定window页面的控制台打印提示信息
 * @param String meg	            提示信息
 */
function winSetMeg(meg){
	$("#log2").html(meg);
}
