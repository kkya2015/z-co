/*===============================================================================
************   ui native eventListener   ************
===============================================================================*/
(function($L, global) {
	$L.event = {
		/*
		 * 为当前页添加一个事件监听。
		 * @param eventName: ( String ) 必选 事件名称
		 * @param callback: 必选 事件回调\
		 */
		addEvent: function(eventName, callback) {
			$L.executeNativeJS(['eventListener', 'addEventListener'], eventName, function(evt) {
				if ($L.isFunction(callback)) {
					callback.call(null, evt);
				}
			});
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
		}
	}

}(app, this));