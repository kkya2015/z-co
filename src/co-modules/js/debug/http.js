;
(function($L, global) {
	var serialize = function(params, obj, scope) {
		var type, array = $L.isArray(obj),
			hash = $L.isPlainObject(obj)
		$L.each(obj, function(key, value) {
			type = $L.type(value)
			if (scope) key = scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
				// handle data in serializeArray() format
			if (!scope && array) params.add(value.name, value.value)
				// recurse into nested objects
			else if (type == "array" || (type == "object"))
				serialize(params, value, key)
			else params.add(key, value)
		})
	}
	var escape = encodeURIComponent
	var appendQuery = function(url, query) {
		if (query == '') return url
		return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	}

	var param = function(obj) {
		var params = []
		params.add = function(key, value) {
			if ($L.isFunction(value)) value = value()
			if (value == null) value = ""
			this.push(escape(key) + '=' + escape(value))
		}
		serialize(params, obj)
		return params.join('&').replace(/%20/g, '+')
	}

	var serializeData = function(settings) {
		if (settings.body && $L.type(settings.body) != "string")
			settings.body = param(settings.body)
		if (settings.body && (!settings.method || settings.method.toUpperCase() == 'GET'))
			settings.url = appendQuery(settings.url, settings.body), settings.body = undefined
	}


	$L.debug.http = function() {
		var args = Array.prototype.slice.call(arguments, 1);
		var key = arguments[0][1];
		if (key == "sendRequest") {
			var settings = args[0];
			var body = settings.body;
			if (body && $L.type(body) == "string") {
				settings.body = JSON.parse(body)
			}
			serializeData(settings)
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