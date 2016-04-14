;
(function($L, global) {
	$L.debug.window = function() {
		var args = Array.prototype.slice.call(arguments, 1);
		var key = arguments[0][1];
		if (key == 'openWindow') {
			var windowname = args[0]
			var type = args[1]
			var url = args[2]
			var js = "openWindow," + windowname + "|" + url + "|" + type;
			this.postMessage(js);
		} else if (key == 'closeSelf') {
			var pageId = this.getQueryString('pageId');
			var js = "closeWindow('" + windowname + "','" + pageId + "')"
			this.postMessage(js);
		} else if (key == 'closeWindow') {
			var windowname = args[0]
			var js = "closeWindow('" + windowname + "','" + pageId + "')"
			this.postMessage(js);
		} else if (key == 'backToWindow') {
			var windowname = args[0]
			var js = "backToWindow('" + windowname + "')"
			this.postMessage(js);
		} else if (key == 'openPopover') {
			var popname = args[0]
			var url = args[2]
			var rect = JSON.stringify(args[3])
			var windowname = this.getQueryString('pageId');
			var js = "openPopover('" + popname + "','" + url + "','" + rect + "','" + windowname + "')"
			this.postMessage(js);
		} else if (key == 'closePopover') {
			var popname = args[0]
			var pageId = this.getQueryString('pageId');
			var js = "closePopover('" + popname + "','" + pageId + "')"
			this.postMessage(js);
		} else if (key == 'bringPopoverToFront') {
			var popname = args[0]
			var windowname = this.getQueryString('pageId');
			var js = "openPopover('" + popname + "','" + url + "','" + rect + "','" + windowname + "')"
			this.postMessage(js);
		} else if (key == 'setSlideLayout') {
			var params = args[0]
			var type = params.type
			if (type == 'left') {
				params.leftPane.url = params.leftPane.url
			} else {
				params.rightPane.url = params.rightPane.url
			}
			var params = JSON.stringify(args[0])
			var js = "setSlideLayout('" + params + "')"
			this.postMessage(js);
		} else if (key == 'openSlidePane') {
			var params = JSON.stringify(args[0])
			var js = "openSlidePane('" + params + "')"
			this.postMessage(js);
		} else if (key == 'closeSlidePane') {
			var js = "closeSlidePane()"
			this.postMessage(js);
		} else if (key == 'getWidth') {
			var winWidth;
			if (window.innerWidth)
				winWidth = window.innerWidth;
			else if ((document.body) && (document.body.clientWidth))
				winWidth = document.body.clientWidth;
			return winWidth
		} else if (key == 'getHeight') {
			var winHeight;
			// 获取窗口高度
			if (window.innerHeight)
				winHeight = window.innerHeight;
			else if ((document.body) && (document.body.clientHeight))
				winHeight = document.body.clientHeight;
			return winHeight
		} else if (key == 'alert') {
			alert(args[0].msg)
		} else if (key == 'confirm') {
			alert(args[0].msg)
		} else if (key == 'evaluateScript') {
			var windowname = args[1]
			var popoverName = args[2]
			var script = args[3]
			var pageId = this.getQueryString('pageId');
			var js = "evaluateScript('" + windowname + "','" + popoverName + "','" + script + "','" + pageId + "')"
			this.postMessage(js);
		}
	}
}(app, this))