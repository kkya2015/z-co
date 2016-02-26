;
(function($L, global) {
	$L.debug.tabMark = function() {
		debugger;
		var key = arguments[0][1];
		if (key == "show") {
			var dataS = arguments[1];
			var frameRect = arguments[2];
			dataS = JSON.stringify(dataS);
			frameRect = JSON.stringify(frameRect);
			var js = "tabMarkShow('" + dataS + "','" + frameRect + "')"
			this.postMessage(js);
		}
	}
}(app, this))