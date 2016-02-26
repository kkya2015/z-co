/*===============================================================================
************   ui native app   ************
===============================================================================*/
;
(function($L, global) {
	var tabMark = function() {
		var dataS;
		var frameRect;
		var tabM = $L.executeRequireJS('tabMark')
		this.setDataSource = function(dataSources) {
			if (typeof dataSources === 'undefined') {
				$L.throwError("请传入有效的dataSources！");
			}
			dataS = dataSources;
			if ($.os.android && dataSources.btnHeight) {
				dataSources.btnHeight = dataSources.btnHeight * window.devicePixelRatio;
			}
			$L.executeObjFunJS([tabM, 'setDataSource'], dataSources)
			return this;
		};

		this.setFrame = function(x, y, width, height) {
			x = x || 0;
			y = y || 0;
			height = height || 0;
			width = width || 0;
			if ($L.android()) {
				y = y * window.devicePixelRatio;
				height = height * window.devicePixelRatio;
			}
			var rect = {
				x: x,
				y: y,
				width: width,
				height: height
			};
			frameRect = rect;
			$L.executeObjFunJS([tabM, 'setFrame'], rect)
			return this;
		};

		this.show = function() {
			if (typeof dataS === 'undefined') {
				$L.throwError("请先调用setDataSource方法设置数据源！");
			}
			if (typeof frameRect === 'undefined') {
				$L.throwError("请先调用setFrame方法设置尺寸及位置！");
			}
			if (tabM) {
				$L.executeObjFunJS([tabM, 'show'])
			} else {
				tabM = 'tabMark';
				$L.executeObjFunJS([tabM, 'show'], dataS, frameRect)
			}
			return this;
		};

		this.hide = function() {

		};

		this.remove = function() {

		};

		this.addEditCallback = function(editCallback) {

		};

		this.addScrollCallback = function(scrollCallback) {

		};

		this.showContentAtIndex = function(index) {

		};

	}



	$L.require = function(widget) {
		if (widget == 'tabMark') {
			return new tabMark();
		}
	}

}(app, this));