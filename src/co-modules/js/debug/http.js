;
(function($L, global) {
	$L.debug.http = function() {
		var args = Array.prototype.slice.call(arguments, 1);
		var key = arguments[0][1];
		if (key == "sendRequest") {
			var settings = args[0];
			var data = settings.body;
			if (data) {
				if ($L.isString(data)) {
					data = JSON.parse(data)
				}
				if (data.json && $L.isString(data.json)) data.json = JSON.parse(data.json)
				settings.body = data
			}
			settings = JSON.stringify(settings)
			var pageId = this.getQueryString('pageId');
			var token = this.uuid++;
			this.xhr[token] = {
				success: args[1],
				error: args[2],
				dataType: args[0].dataType
			}
			var js = "sendRequest('" + settings + "','" + pageId + "','" + token + "')"
			this.postMessage(js);
		}
	}
}(app, this))