/**
 * Released on: 2015-12-21
 */
(function(global) {
	if (window['app']) {
		var uuid = 0;
		var xhr = {}
		window.addEventListener('message', function(e) {
			// alert(e.data);
			var origin = e.origin;
			// if (origin != 'http://localhost:3000') {
			var res = JSON.parse(e.data)
			var type = res.type;
			if (type == 'ajax') {
				var token = res.token;
				var success = xhr[token].success;
				var error = xhr[token].error;
				var data = res.data;
				var dataType = xhr[token].dataType;
				if (dataType == 'json') {
					if (app.isFunction(success)) {
						data = JSON.parse(data)
						success.call(null, {}, data)
					}
				} else {
					if (app.isFunction(success)) {
						success.call(null, {}, data)
					}
				}
			}
			// }
		}, false);

		var GetQueryString = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return (r[2]);
			return null;
		}
		var getPageDir = function() {
			var div = document.createElement('div');
			div.innerHTML = '<a href="./"></a>';
			var pageDir = div.firstChild.href;
			div = null;
			return pageDir;
		}
		var postMessage = function(js) {
			window.parent.postMessage(js, '*');
			// window.parent.postMessage(js, 'http://localhost:3000');
		}

		app.executeNativeJS = function() {
			var args = Array.prototype.slice.call(arguments, 1);
			if (arguments[0][0] == 'window' && arguments[0][1] == 'openWindow') {
				var windowname = args[0]
				var url = getPageDir() + args[2]
				var js = "openWindow('" + windowname + "','" + url + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'closeSelf') {
				var pageId = GetQueryString('pageId');
				var js = "closeWindow('" + windowname + "','" + pageId + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'openPopover') {
				var popname = args[0]
				var url = getPageDir() + args[2]
				var rect = JSON.stringify(args[3])
				var windowname = GetQueryString('pageId');
				var js = "openPopover('" + popname + "','" + url + "','" + rect + "','" + windowname + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'closePopover') {
				var popname = args[0]
				var pageId = GetQueryString('pageId');
				var js = "closePopover('" + popname + "','" + pageId + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'bringPopoverToFront') {
				var popname = args[0]
				var js = "openPopover('" + popname + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'setSlideLayout') {
				var url = getPageDir()
				var params = args[0]
				var type = params.type
				if(type == 'left'){
					params.leftPane.url = url + params.leftPane.url
				}else{
					params.rightPane.url = url + params.rightPane.url
				}
				var params = JSON.stringify(args[0])
				var js = "setSlideLayout('" + params + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'openSlidePane') {
				var params = JSON.stringify(args[0])
				var js = "openSlidePane('" + params + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'closeSlidePane') {
				var js = "closeSlidePane()"
				postMessage(js);
			} else if (arguments[0][0] == 'httpManager' && arguments[0][1] == 'sendRequest') {
				var settings = args[0];
				var data = settings.body;
				if (data) {
					if (data.json && app.isString(data.json)) data.json = JSON.parse(data.json)
				}
				settings = JSON.stringify(settings)
				var pageId = GetQueryString('pageId');
				var token = uuid++;
				xhr[token] = {
					success: args[1],
					error: args[2],
					dataType: args[0].dataType
				}
				var js = "sendRequest('" + settings + "','" + pageId + "','" + token + "')"
				postMessage(js);
			}
		}
	}
	if (window.Dom) {
		var on = $.fn.on;

		$.fn.on = function(event, selector, data, callback, one) {
			if (event == 'tap') {
				event = 'click';
			}
			// else if (event == 'touchstart') {
			// 	event = 'mousedown';
			// } else if (event == 'touchmove') {
			// 	event = 'mousemove';
			// } else if (event == 'touchend') {
			// 	event = 'mouseup';
			// }
			return on.call(this, event, selector, data, callback, one);
		}

		var off = $.fn.off;
		$.fn.off = function(event, selector, callback) {
			if (event == 'tap') {
				event = 'click';
			}
			// else if (event == 'touchstart') {
			// 	event = 'mousedown';
			// } else if (event == 'touchmove') {
			// 	event = 'mousemove';
			// } else if (event == 'touchend') {
			// 	event = 'mouseup';
			// }
			return off.call(this, event, selector, callback);
		}

		var trigger = $.fn.trigger;
		$.fn.trigger = function(event, args) {
			if (event == 'tap') {
				event = 'click';
			}
			// else if (event == 'touchstart') {
			// 	event = 'mousedown';
			// } else if (event == 'touchmove') {
			// 	event = 'mousemove';
			// } else if (event == 'touchend') {
			// 	event = 'mouseup';
			// }
			return trigger.call(this, event, args);
		}

		var one = $.fn.one;
		$.fn.one = function(event, selector, data, callback) {
			if (event == 'tap') {
				event = 'click';
			}
			// else if (event == 'touchstart') {
			// 	event = 'mousedown';
			// } else if (event == 'touchmove') {
			// 	event = 'mousemove';
			// } else if (event == 'touchend') {
			// 	event = 'mouseup';
			// }
			return one.call(this, event, selector, data, callback);
		}

	}
}(this))