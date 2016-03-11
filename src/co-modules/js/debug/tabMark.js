;
(function($L, global) {
	$L.debug.tabMark = function() {
		var key = arguments[0][1];
		if (key == "show") {
			var dataS = arguments[1];
			var frameRect = arguments[2];
			if (dataS && frameRect) {
				dataS = JSON.stringify(dataS);
				frameRect = JSON.stringify(frameRect);
			} else {
				return;
			}
			var windowname = this.getQueryString('pageId');
			var js = "tabMarkShow('" + dataS + "','" + frameRect + "','" + windowname + "')"
			this.postMessage(js);
		} else if (key == "hide") {
			var windowname = this.getQueryString('pageId');
			var js = "tabMarkHide('" + windowname + "')"
			this.postMessage(js);
		} else if (key == "showContentAtIndex") {
			var index = arguments[1];
			var windowname = this.getQueryString('pageId');
			var js = "tabMarkShowIndex('" + windowname + "','" + index + "')"
			this.postMessage(js);
		} 
	}
}(app, this))