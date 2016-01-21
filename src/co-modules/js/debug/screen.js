;
(function($L, global) {
	$L.debug.screen = function() {
		var args = Array.prototype.slice.call(arguments, 1);
		var key = arguments[0][1];
		if (key == "getResolutionWidth") {
			return "720"
		} else if (key == "getResolutionHeight") {
			return "1280"
		} else if (key == "getScale") {
			return "2"
		} else if (key == "getDpiX") {
			return "268.941"
		} else if (key == "getDpiY") {
			return "68.694"
		} else if (key == "getBrightness") {
			return "1"
		}
	}
}(app, this))