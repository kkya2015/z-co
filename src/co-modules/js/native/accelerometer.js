/*===============================================================================
************   ui native accelerometer   ************
===============================================================================*/
;
(function($L, global) {
	$L.accelerometer = {
		/*
		 * 获取当前设备的加速度信息
		 * @param success:  必选  获取设备加速度信息成功回调函数
		 * @param error: 必选 获取设备加速度信息失败回调函数
		 */
		getCurrentAcceleration: function(success, error) {
			$L.executeNativeJS(['accelerometer', 'getCurrentAcceleration'], function(acceleration) {
				if ($L.isFunction(success)) {
					success.call(global, acceleration);
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(global, err);
				}
			});
		},
		/*
		 * 监听设备加速度变化信息
		 * @param success: 必选 成功回调函数 当获取设备的加速度信息成功时回调，并返回加速度信息。
		 * @param error:  必选 失败回调函数 当获取设备加速度信息失败回调函数，并返回错误信息。
		 * @param options: 加速度信息参数 监听设备加速度信息的参数，更新数据的频率。
		 */
		watchAcceleration: function(success, error, options) {
			if (typeof options === 'undefined') {
				options = {
					frequency: 500
				}
			}
			$L.executeNativeJS(['accelerometer', 'watchAcceleration'], function(acceleration) {
				if ($L.isFunction(success)) {
					success.call(global, acceleration);
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(global, err);
				}
			}, options);
		},

		/*
		 * 关闭监听设备加速度信息
		 */
		clearWatch: function() {
			$L.executeNativeJS(['accelerometer', 'clearWatch']);
		}
	}

}(app, this));