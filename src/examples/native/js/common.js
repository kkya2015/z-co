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