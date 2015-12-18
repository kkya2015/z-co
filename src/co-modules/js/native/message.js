/*===============================================================================
************   ui native message   ************
===============================================================================*/
(function($L, global) {

	var message = function(type) {
		var recipients = [];
		this.setRecipients = function(rp) {
			recipients = rp;
		}
		this.send = function(msg, success, error) {
			if (typeof msg === 'undefined') {
				throw new Error("请传入有效消息内容！");
			} else if (typeof recipients === 'undefined') {
				throw new Error("请設置有效的收件人信息！");
			} else if (!$L.isArray(recipients)) {
				throw new Error("收件人信息必須是數組對象！");
			}
			var mo = $L.executeNativeJS(['message', 'createMessage'], type);
			if (mo) {
				mo.to = recipients;
				mo.body = msg;
			}


			$L.executeNativeJS(['message', 'sendMessage'], mo, function() {
				if ($L.isFunction(success)) {
					success.call();
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(null, err);
				}
			});
		}
	}


	$L.message = {
		/*
		 * 创建消息对象
		 * @return message
		 */
		createMessage: function(type) {
			if (typeof type === 'undefined') {
				type = 1
			}
			return new message(type);
		}
	}

}(app, this));