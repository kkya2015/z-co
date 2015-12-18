/*===============================================================================
************   ui native log   ************
===============================================================================*/
(function($L, global) {
	$L.log = {
		/*
		 * 将Information发送到IDE控制台。
		 * @param info: 发送的信息
		 */
		info: function(info) {
			$L.executeNativeJS(['log', 'i'], info);
		},

		/*
		 * 将warning发送到IDE控制台。
		 * @param info: 发送的信息
		 */
		warning: function(info) {
			$L.executeNativeJS(['log', 'w'], info);
		},

		/*
		 * 将error发送到IDE控制台。
		 * @param info: 发送的信息
		 */
		error: function(info) {
			$L.executeNativeJS(['log', 'e'], info);
		}
	}

}(app, this));