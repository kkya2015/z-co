;
(function($L, global) {
	$L.debug.dom = function() {
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
}(app, this))