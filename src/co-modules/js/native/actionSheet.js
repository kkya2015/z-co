/*===============================================================================
************   ui native actionSheet   ************
===============================================================================*/
(function($L, global) {
	$L.actionSheet = {
		/*
		 * 显示弹出框。
		 * @param options: 配置参数
			 {
			   property String title  可选 默认值：无 标题
			   property String cancelTitle 可选 默认值：取消 取消按钮标题
			   property String destrutiveTitle 可选 默认值：无 红色警示按钮标题，一般用于做一些删除之类操作
			   property Array buttons 可选 默认值：无 按钮标题
			}
		 * @param success:   必选 选择弹出框上按钮的回调
		 */
		show: function(options, success) {
			$L.executeNativeJS(['actionSheet', 'show'], options, function(index) {
				if ($L.isFunction(success)) {
					success.call(null,index);
				}
			});
		}
	}

}(app, this));