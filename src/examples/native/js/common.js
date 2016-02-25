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
	path = 'data://';
domReady(function(require) {

	var addressBook = app.contacts.getAddressBook()
	$('#create').button(function(el, evt) {
		create(addressBook)
	})

	$('#video').button(function(el, evt) {
		video(camera)
	})

	$('.ui-nav-bar-right').button(function() {
		setDocTarget('doc/contacts.html', 'Contacts Doc')
		var win = app.createWindow();
		win.open('doc.html')
	})


});

function create(addressBook) {
	addressBook.create(function(contact) {
		contact.name = {
			givenName: "名字",
			familyName: "姓氏"
		};
		contact.save(function() {
			printout('添加联系人成功!');
		}, function(err) {
			printout('添加联系人失败!' + err);
		})

	});


}

function video(camera) {

	camera.captureVideo(function(capturedFile) {
		printout('摄像成功：' + capturedFile)

	});
}