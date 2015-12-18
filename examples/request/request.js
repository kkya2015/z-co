/**
 * request.js 0.0.1 
 */
(function(global, undefined) {

	var rq = global.RQ = {
			// The current version of co.js being used
			version: "1.0.1"
		},
		baseURL = 'https://test-api.369cloud.com/',
		xmlTypeRE = /^(?:text|application)\/xml/i,
		jsonType = 'application/json',
		htmlType = 'text/html',
		blankRE = /^\s*$/,
		class2type = {},
		originAnchor = document.createElement('a');

	originAnchor.href = window.location.href;

	"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(name,i) {
             class2type["[object " + name + "]"] = name.toLowerCase()
         })

	var ajaxSettings = {
		// Default type of request
		type: 'GET',
		// Callback that is executed if the request succeeds
		success: empty,
		// Callback that is executed the the server drops error
		error: empty,
		// The context for the callbacks
		context: null,
		// Whether to trigger "global" Ajax events
		global: true,
		dataType: 'json',
		// Transport
		xhr: function() {
			return new window.XMLHttpRequest()
		},
		// MIME types mapping
		// IIS returns Javascript as "application/x-javascript"
		accepts: {
			script: 'text/javascript, application/javascript, application/x-javascript',
			json: jsonType,
			xml: 'application/xml, text/xml',
			html: htmlType,
			text: 'text/plain'
		},
		// Whether the request is to another domain
		crossDomain: false,
		// Default timeout
		timeout: 0,
		// Whether data should be serialized to string
		processData: true,
	}

	function type(obj) {
         return obj == null ? String(obj) :
             class2type[toString.call(obj)] || "object"
     };

	function empty() {}

	function isWindow(obj) {
		return obj != null && obj == obj.window
	};

	function isObject(obj) {
		return type(obj) == "object"
	};

	function isPlainObject(obj) {
		return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	};

	function eachObj(obj, iterator) {
		obj && Object.keys(obj).forEach(function(key) {
			iterator(key, obj[key]);
		});
	};

	function extend(source, target) {
		var proto = source || {};
		eachObj(target, function(key, val) {
			proto[key] = val;
		});
		return proto;
	}

	function mimeToDataType(mime) {
		if (mime) mime = mime.split(';', 2)[0]
		return mime && (mime == htmlType ? 'html' :
			mime == jsonType ? 'json' :
			xmlTypeRE.test(mime) && 'xml') || 'text'
	}

	function serializeData(options) {
		if (options.processData && options.data && $.type(options.data) != "string")
			options.data = $.param(options.data, options.traditional)
		if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
			options.url = appendQuery(options.url, options.data), options.data = undefined
	}

	function appendQuery(url, query) {
		if (query == '') return url
		return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	}

	function ajaxSuccess(data, xhr, settings) {
		var context = settings.context,
			status = 'success'
		settings.success.call(context, data, status, xhr)
	}
	// type: "timeout", "error", "abort", "parsererror"
	function ajaxError(error, type, xhr, settings) {
		var context = settings.context
		settings.error.call(context, xhr, type, error)
	}

	function ajax(options) {
		var settings = extend({}, options || {}),
			urlAnchor;
		for (key in ajaxSettings)
			if (settings[key] === undefined) settings[key] = ajaxSettings[key]

		if (!settings.crossDomain) {
			urlAnchor = document.createElement('a')
			urlAnchor.href = settings.url
			urlAnchor.href = urlAnchor.href
			settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
		}

		if (!settings.url) settings.url = window.location.toString()
		serializeData(settings)

		var dataType = settings.dataType

		settings.url = appendQuery(settings.url, '_=' + Date.now())


		var mime = settings.accepts[dataType],
			headers = {},
			setHeader = function(name, value) {
				headers[name.toLowerCase()] = [name, value]
			},
			protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
			xhr = settings.xhr(),
			nativeSetHeader = xhr.setRequestHeader,
			abortTimeout


		if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
		setHeader('Accept', mime || '*/*')
		if (mime = settings.mimeType || mime) {
			if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
			xhr.overrideMimeType && xhr.overrideMimeType(mime)
		}
		if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
			setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

		if (settings.headers)
			for (name in settings.headers) setHeader(name, settings.headers[name])
		xhr.setRequestHeader = setHeader

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				xhr.onreadystatechange = empty
				clearTimeout(abortTimeout)
				var result, error = false
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
					dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
					result = xhr.responseText

					try {
						if (dataType == 'xml') result = xhr.responseXML
						else if (dataType == 'json') result = blankRE.test(result) ? null : JSON.parse(result)
					} catch (e) {
						error = e
					}

					if (error) ajaxError(error, 'parsererror', xhr, settings)
					else ajaxSuccess(result, xhr, settings)
				} else {
					ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings)
				}
			}
		}


		var async = 'async' in settings ? settings.async : true
		xhr.open(settings.type, settings.url, async, settings.username, settings.password)

		for (name in headers) nativeSetHeader.apply(xhr, headers[name])

		if (settings.timeout > 0) abortTimeout = setTimeout(function() {
			xhr.onreadystatechange = empty
			xhr.abort()
			ajaxError(null, 'timeout', xhr, settings)
		}, settings.timeout)

		// avoid sending empty string (#319)
		xhr.send(settings.data ? settings.data : null)
		return xhr
	}



	rq.newTable = function(options) {
		options = options || {}
		var url = baseURL + '1.0/tab'
		var headers = {
			'accept': '*/*',
			"Content-Type": 'application/json;charset=UTF-8',
			'X-369Cloud-App-Id': options.appID,
			'X-369Cloud-App-Key': options.appKey
		}
		var settings = {
			url: url,
			type: 'POST',
			headers: headers,
			data: isPlainObject(options.data)?JSON.stringify(options.data):options.data
		};
		for (key in ajaxSettings)
			if (options[key]) settings[key] = options[key]
		ajax(settings);
	}

})(window);