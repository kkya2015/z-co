;
(function($L, global) {
	$L.debug.os = function() {
		var key = arguments[0][1];
		if (key == "language") {
			return 'zh'
		} else if (key == "version") {
			if ($.os.android || $.os.ios) {
				return $.os.version
			} else {
				return '4.4.4'
			}

		} else if (key == "name") {
			if ($.os.android) {
				return 'Android'
			} else if ($.os.ios) {
				return 'iOS'
			} else {
				return 'iOS'
			}
		} else if (key == "vendor") {
			if ($.os.android) {
				return 'HUAWEI'
			} else if ($.os.ios) {
				return 'IPHONE'
			} else {
				return 'IPHONE'
			}

		}
	}
}(app, this))