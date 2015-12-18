/*===============================================================================
************   ui native progress   ************
===============================================================================*/
(function($L, global) {
	var fade = 0, //值为 0 进度提示框以渐隐渐显动画呈现
		zoom = 1; //值为 1 进度提示框以缩放动画呈现
	$L.progress = {
		/*
		 * 显示进度框。
		 * @param options:  ( JSON对象 ) 必选  进度条配置项
		 * @param animationtype: 可选项，设置弹出框显示时的动画类型
		 */
		showProgress: function(options, animationtype) {
			if (animationtype == fade || animationtype == zoom) {
				$L.executeNativeJS(['progress', 'showProgress'], animationtype, options);
			} else {
				$L.executeNativeJS(['progress', 'showProgress'], options);
			}
		},

		/*
		 * 隐藏进度提示框。
		 */
		hideProgress: function() {
			$L.executeNativeJS(['progress', 'hideProgress']);
		},

		/*
		 * 显示进度提示框，但是设置的时间一到就会消失。
		 * @param time: 显示的时间，时间过后自动消失，单位是秒
		 * @param options: ( JSON对象 ) 必选  进度条配置项
		 	注：options中的images如果没有值，不会显示progress的默认白色动画轮子
		 */
		showToast: function(time, options) {
			$L.executeNativeJS(['progress', 'showToast'], time, options);
		}
	}

}(app, this));