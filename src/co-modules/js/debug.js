;
(function($L, global) {
	$L.debug = function() {
		var div = document.createElement('div');
		div.innerHTML = '<a href="./"></a>';
		var pageDir = div.firstChild.href;
		div = null;
		$L.debug.uuid = 0;
		$L.debug.xhr = {}
		window.addEventListener('message', function(e) {
			var origin = e.origin;
			// if (origin != 'http://localhost:3000') {
			var res = JSON.parse(e.data)
			var type = res.type;
			if (type == 'init') {
				$L.debug.isReady = true;
			} else if (type == 'ajax') {
				var token = res.token;
				var success = $L.debug.xhr[token].success;
				var error = $L.debug.xhr[token].error;
				var data = res.data;
				var dataType = $L.debug.xhr[token].dataType;
				if (dataType == 'json') {
					if ($L.isFunction(success)) {
						if (data) {
							data = JSON.parse(data)
						} else {
							data = {}
						}
						success.call(global, {}, data)
					}
				} else {
					if ($L.isFunction(success)) {
						success.call(global, {}, data)
					}
				}
				delete $L.debug.xhr[token]
			}
			// }
		}, false);

		$L.debug.getQueryString = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return (r[2]);
			return null;
		}
		$L.debug.getPageDir = function() {
			return pageDir;
		}
		$L.debug.postMessage = function(js) {
			window.parent.postMessage(js, '*');
			// window.parent.postMessage(js, 'http://localhost:3000');
		}

		$L.executeNativeJS = function() {
			var res;
			if (arguments[0][0] == 'window') {
				var res = $L.debug.window.apply($L.debug, Array.prototype.slice.call(arguments))
			} else if (arguments[0][0] == 'httpManager') {
				var res = $L.debug.http.apply($L.debug, Array.prototype.slice.call(arguments))
			} else if (arguments[0][0] == 'storage') {
				var res = $L.debug.storage.apply($L.debug, Array.prototype.slice.call(arguments))
			}
			if (typeof res !== 'undefined') return res;
		}

		$L.executeConstantJS = function() {
			if (arguments[0][0] == 'device') {
				return $L.debug.device.apply($L.debug, Array.prototype.slice.call(arguments))
			} else if (arguments[0][0] == 'os') {
				return $L.debug.os.apply($L.debug, Array.prototype.slice.call(arguments))
			} else if (arguments[0][0] == 'app') {
				return $L.debug.app.apply($L.debug, Array.prototype.slice.call(arguments))
			}
		}
		if (window.$) {
			$L.debug.dom()
		}

	}
}(app, this))