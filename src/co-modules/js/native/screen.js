/*===============================================================================
************   ui native screen   ************
===============================================================================*/
;(function($L, global) {
		$L.screen = {
			/*
			 * 獲取设备屏幕宽度分辨率
			 */
			getResolutionWidth: function() {
				return $L.executeConstantJS(['screen', 'resolutionWidth']);
			},
			/*
			 * 獲取设备屏幕高度分辨率
			 */
			getResolutionHeight: function() {
				return $L.executeConstantJS(['screen', 'resolutionHeight']);
			},
			/*
			 * 獲取逻辑分辨率与实际分辨率的比例
			 */
			getScale: function() {
				return $L.executeConstantJS(['screen', 'scale']);
			},
			/*
			 * 獲取设备屏幕水平方向的密度
			 */
			getDpiX: function() {
				return $L.executeConstantJS(['screen', 'dpiX']);
			},
			/*
			 * 獲取设备屏幕垂直方向的密度
			 */
			getDpiY: function() {
				return $L.executeConstantJS(['screen', 'dpiY']);
			},
			/*
			 * 调用此方法调节设备屏幕亮度。
			 * @param brightness: ( Number ) 必选 屏幕的亮度值 取值范围为0到1，0表示最低亮度值，1表示最高亮度值。设置屏幕亮度仅对当前程序在前台运行时有效，退出程序后屏幕亮度由系统设置的值决定。
			 */
			setBrightness: function(brightness) {
				$L.executeNativeJS(['screen', 'setBrightness'], brightness)
			},
			/*
			 * 获取屏幕亮度值
			 */
			getBrightness: function() {
				return $L.executeNativeJS(['screen', 'getBrightness']);
			},
			/*
			 * 锁定屏幕方向,iOS不支持.
			 */
			lockOrientation: function() {
				$L.executeNativeJS(['screen', 'lockOrientation']);
			},
			/*
			 * 解除锁定屏幕方向,iOS不支持.
			 */
			unLockOrientation: function() {
				$L.executeNativeJS(['screen', 'unlockOrientation']);
			}
	}

}(app, this));