/*===============================================================================
************   ui native eventListener   ************
===============================================================================*/
;
(function($L, global) {
	$L.event = {
		/*
		 * 为当前页添加一个事件监听。
		 * @param eventName: ( String ) 必选 事件名称
		 * @param callback: 必选 事件回调\
		 */
		addEvent: function(eventName, callback) {
			if ('network_state_changed' == eventName) {
				this.addNetWorkChangeEvent(callback);
			} else if ('battery_state_changed' == eventName) {
				this.addBatteryChangeEvent(callback);
			} else {
				$L.executeNativeJS(['eventListener', 'addEventListener'], eventName, function(evt) {
					if ($L.isFunction(callback)) {
						callback.call(global, evt);
					}
				});
			}
		},

		/*
		 * 移除当前页面指定事件监听，如果当前页面移除掉，事件监听将自动移除
		 * @param eventName: ( String ) 必选 事件名称
		 */
		removeEvent: function(eventName) {
			$L.executeNativeJS(['eventListener', 'removeEventListener'], eventName);
		},

		/*
		 * 移除当前页面指定事件监听，如果当前页面移除掉，事件监听将自动移除
		 * @param eventName: ( String ) 必选 事件名称
		 * @param evt: ( Json对象 ) 可选 addevent Callback回调函数的参数
		 */
		sendEvent: function(eventName, evt) {
			$L.executeNativeJS(['eventListener', 'sendEvent'], eventName, evt);
		},

		/*
		 * 添加网络状态变化事件监听
		 * @param callback: 必选 事件回调
		 */
		addNetworkChangeEvent: function(callback) {
			$L.executeNativeJS(['eventListener', 'addEventListener'], 'network_state_changed', function(evt) {
				if ($L.isFunction(callback)) {
					callback.call(global, evt.state);
				}
			});
		},

		/*
		 * 删除网络状态变化事件监听
		 * @param callback: 必选 事件回调
		 */
		removeNetworkChangeEvent: function(callback) {
			$L.executeNativeJS(['eventListener', 'removeEventListener'], 'network_state_changed');
		},

		/*
		 * 添加电池状态变化事件监听
		 * @param callback: 必选 事件回调
		 */
		addBatteryChangeEvent: function(callback) {
			$L.executeNativeJS(['eventListener', 'addEventListener'], 'battery_state_changed', function(evt) {
				if ($L.isFunction(callback)) {
					callback.call(global, evt.state);
				}
			});
		},

		/*
		 * 删除电池状态变化事件监听
		 * @param callback: 必选 事件回调
		 */
		removeBatteryChangeEvent: function(callback) {
			$L.executeNativeJS(['eventListener', 'addEventListener'], 'battery_state_changed');
		}
	}

}(app, this));