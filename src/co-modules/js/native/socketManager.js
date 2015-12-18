/*===============================================================================
************   ui native socketManager   ************
===============================================================================*/
(function($L, global) {


	var socketManager = function(options, callback) {
		var socket = $L.executeNativeJS(['require'], 'socketManager');
		$L.executeObjFunJS([socket, 'createSocket'], options, function(state,info){
			if ($L.isFunction(callback)) {
					callback.call(null,state,info);
				}
			});

		/*
		 * 关闭socket，断开与服务器的连接
		 */
		this.close = function(key, value) {
			$L.executeObjFunJS([socket, 'closeSocket']);
		}

		/*
		 * 向服务器发送消息
		 * @param data: ( String ) 必选 要发送的内容
		 * @param tag: ( Number ) 可选 消息的标识，仅用于tcp类型，默认为0
		 */
		this.write = function(data, tag) {
			$L.executeObjFunJS([socket, 'write'], data, tag);
		}
	}


	$L.socket = {
		/*
		 * 创建一个tcp或udp socket连接，连接到指定服务器，参数可设置socket服务器ip地址，端口号，连接超时时间
		 * @param options : 必选 socket设置参数
		 * @param callback : 状态回调
		 * @return socket 
		 */
		create: function(options, callback) {
			return new socketManager(options, callback);
		}
	}

}(app, this));