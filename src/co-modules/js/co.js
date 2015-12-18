/** co.js 1.0.1 * /
	/*===============================================================================
	************   co start   ************
	===============================================================================*/
;
(function(global, loader, undefined) {
	var co = global.co = {
		// The current version of co.js being used
		version: "1.0.1",
		verticalSwipe: true //是否可以纵向滑动
	}
	var readyRE = /complete|loaded|interactive/;

	var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g
	var SLASH_RE = /\\\\/g

	function parseDependencies(code) {
		var ret = []

		code.replace(SLASH_RE, "")
			.replace(REQUIRE_RE, function(m, m1, m2) {
				if (m2) {
					ret.push(m2)
				}
			})

		return ret
	}
	if (($.os.android || $.os.ios)) {
		if (($.os.ios) && (parseFloat($.os.version) >= 7)) {
			$(document.body).addClass('ui-ios7');
		}
	}


	var domReady = function(factory) {
		if ($.isFunction(factory)) {
			var deps = parseDependencies(factory.toString())
			if (!(($.os.android || $.os.ios) && co.plus)) {
				deps.splice(0, 0, "debug")
			}
			loader.use(deps, function() {
				if (($.os.android || $.os.ios) && co.plus) {
					setTimeout(function() {
						if (domReady.isReady) {
							factory.call(null, loader.require);
						} else {
							setTimeout(arguments.callee, 1);
						}
					}, 1);
				} else {
					factory.call(null, loader.require);
				}

				$(document).find('.ui-action-back').button(function(evt) {
					if(app){
						app.currentView().back();
					}else if(rd){
						rd.window.closeSelf();
					}
				})
			})
		}
	};

	co.plus = !!global['rd'];
	global.onLoad = function() {
		domReady.isReady = true;
		co.plus = !!global['rd'];
	};

	$.fn.ready = function(callback) {
		if (readyRE.test(document.readyState) && document.body) domReady(callback);
		else document.addEventListener('DOMContentLoaded', function() {
			domReady(callback)
		}, false)
		return this
	};

	global.domReady = domReady;
})(this, seajs);