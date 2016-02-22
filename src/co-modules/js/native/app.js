/*===============================================================================
************   ui native app   ************
===============================================================================*/
;
(function($L, global) {


    $L.enableSlideBack = function() {
      var viewSlideBack = true;
      $L.executeNativeJS(['window', 'setAttr'], {
        slideBack: viewSlideBack
      })
    }
    
    $L.disableSlideBack = function() {
      var viewSlideBack = false;
      $L.executeNativeJS(['window', 'setAttr'], {
        slideBack: viewSlideBack
      })
    }
	/*
	 * 获取系统名称
	 */
	$L.getPlatformName = function() {
		return $L.executeConstantJS(['app', 'platformName']);
	}

	/*
	 * 获取系统版本
	 */
	$L.getPlatformVersion = function() {
		return $L.executeConstantJS(['app', 'platformVersion']);
	}

	/*
	 * 获取设备模型名称
	 */
	$L.getDeviceModel = function() {
		return $L.executeConstantJS(['app', 'deviceModel']);
	}

	/*
	 * 获取设备名称
	 */
	$L.getDeviceName = function() {
		return $L.executeConstantJS(['app', 'deviceName']);
	}

	/*
	 * 使用系统浏览器下载文件(android)
	 */
	$L.downloadFile = function(url) {
		$L.executeNativeJS(['app', 'downloadFile'], url);
	}

	/*
	 * 退出app(android)
	 */
	$L.exit = function() {
		$L.executeNativeJS(['app', 'exit']);
	}

	/*
	 * 设置当前页面状态栏文字颜色 0 表示黑色。1 表示白色(iOS)
	 */
	$L.statusBarFontColor = function(color) {
		if(!color) color = 0;
		$L.executeNativeJS(['app', 'setStatusBarStyle'], color);
	}

	/*
	 * 安装一个app
	 */
	$L.installApp = function(path) {
		$L.executeNativeJS(['app', 'installApp'], path);
	}

	/*
	 * 获取引擎版本号
	 */
	$L.getEngineVersion = function() {
		return $L.executeNativeJS(['app', 'getEngineVersion']);
	}

	/*
	 * 获取app配置信息，此app配置信息来自application.xml。
	 */
	$L.getApplicationInfo = function() {
		return $L.executeNativeJS(['app', 'getApplicationInfo']);
	}

	/*
	 * 启动一个app
	 */
	$L.openApp = function(params, success, error) {
		$L.executeNativeJS(['app', 'openApp'], params, function(ret, retVals) {
			if (ret == 1) {
				if ($L.isFunction(success)) {
					success.call(global, retVals);
				}
			} else if (ret == 0) {
				if ($L.isFunction(error)) {
					error.call(global);
				}
			}
		});
	}

	/*
	 * 判断设备上是否已安装指定app
	 */
	$L.isAppInstalled = function(appSource, callback) {
		$L.executeNativeJS(['app', 'isAppInstalled'], appSource, function(isInstalled) {
			$L.isFunction(callback) && callback.call(global, isInstalled);
		});
	}

	/*
	 * 判断app是否全屏显示
	 */
	$L.isFullScreen = function() {
		return $L.executeNativeJS(['app', 'isFullScreen']);
	}

	/*
	 * 设置app状态栏背景颜色；Android要求版本4.4以上。默认黑色
	 */
	$L.setStatusBarBackgroundColor = function(color) {
		$L.executeNativeJS(['app', 'setStatusBarBackgroundColor'], color);
	}

	/*
	 * 清空cache目录
	 */
	$L.cleanCache = function() {
		$L.executeNativeJS(['app', 'cleanCache']);
	}

}(app, this));