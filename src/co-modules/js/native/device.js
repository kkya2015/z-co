/*===============================================================================
************   ui native device   ************
===============================================================================*/
(function($L, global) {

	$L.device = {
		/*
		 * 獲取设备的国际移动设备身份码
		 */
		getImei: function() {
			return $L.executeConstantJS(['device', 'imei']);
		},
		/*
		 * 獲取设备的国际移动用户识别码
		 */
		getImsi: function() {
			return $L.executeConstantJS(['device', 'imsi']);
		},
		/*
		 * 獲取设备的型号
		 */
		getModel: function() {
			return $L.executeConstantJS(['device', 'model']);
		},
		/*
		 * 獲取设备的生产厂商
		 */
		getVendor: function() {
			return $L.executeConstantJS(['device', 'vendor']);
		},
		/*
		 * 獲取设备的唯一标识
		 */
		getUuid: function() {
			return $L.executeConstantJS(['device', 'uuid']);
		},
		/*
		 * 拨打电话
		 * @param number: ( String ) 必选 要拨打的电话号码
		 * @param confirm: ( Boolean ) 可选 是否弹出确认对话框，默认false
		 */
		dial: function(number, confirm) {
			if (typeof number === undefined) {
				throw new Error("请传入有效的手机号码！");
			}
			if (!confirm) {
				confirm = false;
			}
			$L.executeNativeJS(['device', 'dial'], number, confirm);
		},
		/*
		 * 发出蜂鸣声
		 * @param times: ( Number ) 可选 蜂鸣声重复的次数，默认发出一次蜂鸣声，ios不支持
		 */
		beep: function(times) {
			if (!times) times = 1
			$L.executeNativeJS(['device', 'beep'], times);
		},
		/*
		 * 设备振动
		 * @param milliseconds: ( Number ) 必选 设备振动持续的时间，单位为ms，默认为500ms。ios不支持
		 */
		vibrate: function(milliseconds) {
			if (!milliseconds) milliseconds = 500
			$L.executeNativeJS(['device', 'vibrate'], milliseconds);
		},
		/*
		 * 设置应用保持唤醒（屏幕常亮）状态
		 */
		setWakeUp: function() {
			$L.executeNativeJS(['device', 'setWakelock'], true);
		},
		/*
		 * 关闭程序保持唤醒状态。
		 */
		setWakeOff: function() {
			$L.executeNativeJS(['device', 'setWakelock'], false);
		},
		/*
		 * 获取程序是否一直保持唤醒（屏幕常亮）状态
		 */
		isWakelock: function() {
			return $L.executeNativeJS(['device', 'isWakelock']);
		},
		/*
		 * 设置设备的系统音量
		 * @param volume: ( Number ) 必选 设备的系统音量值 取值范围为0到1，0表示静音，1表示最大音量值。设置设备音量后对所有程序生效，退出程序系统仍然保持最后设定的音量值。
		 */
		setVolume: function(volume) {
			$L.executeNativeJS(['device', 'setVolume'], volume);
		},
		/*
		 * 获取设备的系统音量
		 */
		getVolume: function() {
			return $L.executeNativeJS(['device', 'getVolume']);
		}
	}

}(app, this));