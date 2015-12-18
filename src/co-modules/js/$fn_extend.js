/*===============================================================================
************   $.fn extend   ************
===============================================================================*/
(function($) {
	$.fn.button = function(callback) {
		var self = this;
		self.on('tap', function(evt) {
			var ele = evt.currentTarget;
			if ($.isFunction(callback)) {
				callback.apply(self, [ele, evt]);
			}
		});
		return self;
	};


	['checkbox', 'radio'].forEach(function(eventName) {
		$.fn[eventName] = function(callback) {
			var self = this;
			var els = eventName == 'checkbox' ? self.find('input[type=checkbox]') : self.find('input[type=radio]');
			els.on('change', function(evt) {
				var ele = evt.currentTarget;
				if ($.isFunction(callback)) {
					callback.apply(self, [ele, evt]);
				}
			});
			return self;
		}
	});

	$.fn.select = function(callback) {
		var self = this;
		self.find('select').on("change", function(evt) {
			var sel = evt.currentTarget;
			if ($.isFunction(callback)) {
				callback.apply(self, [sel.options[sel.selectedIndex], evt]);
			}
		});
		return self;
	};
}($));

/*===============================================================================
************   $.fn extend end ************
===============================================================================*/