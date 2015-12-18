/*===============================================================================
************   ui native geolocation   ************
===============================================================================*/
(function($L, global) {
	$L.geolocation = {
		/*
		 * 获取当前设备位置信息
		 * @param success:  获取设备位置信息成功回调函数
		 * @param error: 获取设备位置信息失败回调函数
		 * @param options: 获取设备位置信息的参数
		 */
		getCurrentPosition: function(success, error, options) {
			if ($L.isPlainObject(error)) {
				options = error;
			}
			$L.executeNativeJS(['geolocation', 'getCurrentPosition'], function(position) {
				if ($L.isFunction(success)) {
					success.call(null, position);
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(null, err);
				}
			}, options);
		},

		/*
		 * 监听设备位置变化信息
		 * @param success:  获取设备位置信息成功回调函数
		 * @param error: 获取设备位置信息失败回调函数
		 * @param options: 获取设备位置信息的参数
		 */
		watchPosition: function(success, error, options) {
			if ($L.isPlainObject(error)) {
				options = error;
			}
			$L.executeNativeJS(['geolocation', 'watchPosition'], function(position) {
				if ($L.isFunction(success)) {
					success.call(null, position);
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(null, err);
				}
			}, options);
		},

		/*
		 * 关闭监听设备位置信息
		 */
		clearWatch: function() {
			$L.executeNativeJS(['geolocation', 'clearWatch']);
		}
	}

}(app, this));