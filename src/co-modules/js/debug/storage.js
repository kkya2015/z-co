;
(function($L, global) {
	$L.debug.storage = function() {
		var args = Array.prototype.slice.call(arguments, 1);
		var key = arguments[0][1];
		if (key == "getLength") {
			return window.localStorage.length;
		} else if (key == "getItem") {
			return window.localStorage.getItem(args[0]);
		} else if (key == "setItem") {
			window.localStorage.setItem(args[0], args[1]);
		} else if (key == "removeItem") {
			window.localStorage.removeItem(args[0]);
		} else if (key == "clear") {
			window.localStorage.clear();
		} else if (key == "key") {
			return window.localStorage.key(args[0]);
		}
	}
}(app, this))