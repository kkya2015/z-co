var log = $('#log')
function printout(str){
	log.html(str)
}

function setDocTarget(tar,title){
	app.storage.set('docTarget',tar)
	app.storage.set('title',title)
}
function getDocTarget(){
	var res = {
		docTarget:app.storage.get('docTarget'),
		title:app.storage.get('title')
	}
	return res
}