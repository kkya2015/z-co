/*===============================================================================
************   ui plugin tabMark   ************
===============================================================================*/
;
(function($L, global) {
	var tabMark = function() {
		var isShow = false,
			pluginName = 'tabMark',
			dataS,
			frameRect,
			tabM = $L.executeRequireJS('tabMark');
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
			width = width || 0;
			height = height || 0;
			if ($L.android()) {
				x = x * window.devicePixelRatio;
				y = y * window.devicePixelRatio;
				width = width * window.devicePixelRatio;
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
				$L.executeObjFunJS([pluginName, 'show'], dataS, frameRect)
			}
			isShow = true;
			return this;
		};

		this.hide = function() {
			if (isShow) {
				if (tabM) {
					$L.executeObjFunJS([tabM, 'hide'])
				} else {
					$L.executeObjFunJS([pluginName, 'hide'])
				}
			}
			return this;
		};

		this.remove = function() {
			if (isShow) {
				if (tabM) {
					$L.executeObjFunJS([tabM, 'remove'])
				} else {
					$L.executeObjFunJS([pluginName, 'remove'])
				}
			}
			return this;
		};

		this.addEditCallback = function(editCallback) {
			$L.executeObjFunJS([tabM, 'addEditCallback'], function() {
				if ($L.isFunction(editCallback)) {
					editCallback.call();
				}
			})
			return this;
		};

		this.addScrollCallback = function(scrollCallback) {
			$L.executeObjFunJS([tabM, 'addScrollCallback'], function(index) {
				if ($L.isFunction(scrollCallback)) {
					scrollCallback.call(global, index);
				}
			})
			return this;
		};

		this.showContentAtIndex = function(index) {
			if (isShow) {
				var len = dataS.dataSource.length;
				if (index >= 1 && index <= len) {
					if (tabM) {
						$L.executeObjFunJS([tabM, 'showContentAtIndex'], index)
					} else {
						$L.executeObjFunJS([pluginName, 'showContentAtIndex'], index)
					}
				}
			}
			return this;
		};

		this.addIgnoreArea = function(tabName, IgnoreParams) {
			if ($L.android() && IgnoreParams) {
				var x = IgnoreParams.x || 0;
				var y = IgnoreParams.y || 0;
				var width = IgnoreParams.width || 0;
				var height = IgnoreParams.height || 0;
				x = x * window.devicePixelRatio;
				y = y * window.devicePixelRatio;
				width = width * window.devicePixelRatio;
				height = height * window.devicePixelRatio;
				var rect = {
					x: x,
					y: y,
					width: width,
					height: height
				};
				$L.executeObjFunJS([tabM, 'addIgnoreArea'], tabName, rect)
			}
			return this;
		};

	}

	$L.require.tabMark = function() {
		return new tabMark()
	}

}(app, this));