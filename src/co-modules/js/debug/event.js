;
(function($L, global) {
	var token = this.uuid++;
	$L.debug.event = function() {
		var key = arguments[0][1];
		if (key == "sendEvent") {
			var eventName = arguments[1]
			var params = arguments[2]
			if (params && $L.isPlainObject(params)) {
				params = JSON.stringify(params)
				var js = "sendEvent," + eventName + "|" + params;
			} else {
				var js = "sendEvent," + eventName;
			}
			this.postMessage(js);
		} else if (key == "addEventListener") {
			var pageId = this.getQueryString('pageId');
			var eventName = arguments[1]
			var callback = arguments[2]
			this.eve[eventName] = callback
			var js = "addEvent," + pageId + "|" + eventName;
			this.postMessage(js);
		} else if (key == "removeEventListener") {
			var pageId = this.getQueryString('pageId');
			var eventName = arguments[1]
			this.eve[eventName] = null
			var js = "removeEvent," + pageId + "|" + eventName;
			this.postMessage(js);
		}
	}
}(app, this))