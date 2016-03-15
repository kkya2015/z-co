;
(function($E, global) {

	$E.tabMarkShow = function(dataS, frameRect, windowName) {
		var pageId = $E.strEncode('tabMark.html' + windowName);
		var win = document.getElementById(pageId);
		if (win) {
			win.style.display = 'block';
			return;
		}
		var parentName = windowName
		var win = document.getElementById(windowName);
		frameRect = JSON.parse(frameRect)
		if (win && win.parentName) {
			parentName = win.parentName;
		}

		var url = 'tabMark.html';
		var data = JSON.parse(dataS);

		data.baseUrl = $E.baseUrl;
		data.pageId = pageId;
		data.parentName = parentName;
		data.viewHeight = frameRect.height;
		var first = data.dataSource[0]
		var view = document.createElement("DIV");
		view.style.borderWidth = "0px";
		view.style.position = "absolute";
		view.style.left = frameRect.x + "px";
		view.style.top = frameRect.y + "px";
		// if (frameRect.width == 0) {
		// 	view.style.width = "100%";
		// } else {
		view.style.width = frameRect.width + 'px';
		// }

		// if (frameRect.height == 0) {
		// 	view.style.height = "100%";
		// } else {
		view.style.height = frameRect.height + 'px';
		// }


		view.style.zIndex = ++$E.Zindex;
		view.id = pageId;
		// view.style.transform: translate3d(100%, 0, 0);
		var iframe = document.createElement("iframe");
		iframe.style.position = "absolute";
		iframe.style.borderWidth = "0px";
		iframe.style.left = "0px";
		iframe.style.top = "0px";
		iframe.style.border = "0px";
		iframe.style.padding = "0px";
		iframe.style.width = "100%";
		iframe.style.height = "100%";
		iframe.id = pageId + 'iframe';
		view.appendChild(iframe);
		iframe.onload = iframe.onreadystatechange = function() {
			var msg = {
				type: 'init',
				data: data
			}
			msg = JSON.stringify(msg);
			iframe.contentWindow.postMessage(msg, '*');
			// var naviHidden = data.naviHidden
			// if (naviHidden) {
			// 	$E.tabMarkAppend(first.menu, baseUrl + first.url, pageId, parentName, 0)
			// } else {
			// 	$E.tabMarkAppend(first.menu, baseUrl + first.url, pageId, parentName, 34)
			// }

		}
		iframe.src = url + "?pageId=" + pageId;
		if (win) {
			win.appendChild(view);
		} else {
			$E.body.appendChild(view);
		}
	}

	$E.tabMarkAppend = function(windowName, url, viewPageId, parentName, top, height) {
		var pageId = $E.strEncode(windowName);
		var win = document.getElementById(pageId);
		if (win && win.parentName == parentName) {
			win.style.zIndex = ++$E.Zindex;
			return;
		}

		$E.winMap[parentName]['pops'].push(pageId);
		var parentView = document.getElementById(viewPageId);

		var view = document.createElement("DIV");
		view.style.borderWidth = "0px";
		view.style.position = "absolute";
		view.style.left = "0px";
		view.style.top = top + "px";
		view.style.width = "100%";
		view.style.height = height + "px";
		view.style.zIndex = ++$E.Zindex;
		view.id = pageId;
		view.parentName = parentName;

		var iframe = document.createElement("iframe");
		iframe.style.position = "absolute";
		iframe.style.borderWidth = "0px";
		iframe.style.left = "0px";
		iframe.style.top = "0px";
		iframe.style.border = "0px";
		iframe.style.padding = "0px";
		iframe.style.width = "100%";
		iframe.style.height = "100%";
		iframe.id = pageId + 'iframe';
		view.appendChild(iframe);
		iframe.onload = iframe.onreadystatechange = function() {
			$E.iframeload.call(iframe, pageId);
		}
		iframe.src = url + "?pageId=" + pageId;
		parentView.appendChild(view);
	}

	$E.tabMarkHide = function(windowName) {
		var pageId = $E.strEncode('tabMark.html' + windowName);
		var win = document.getElementById(pageId);
		if (win) {
			win.style.display = 'none';
		}
	}

	$E.tabMarkRemove = function(windowName) {
		var pageId = $E.strEncode('tabMark.html' + windowName);
		var win = document.getElementById(pageId);
		if (win) {
			win.parentNode.removeChild(win);
		}
	}

	$E.tabMarkShowIndex = function(windowName, index) {
		var pageId = $E.strEncode('tabMark.html' + windowName);
		var win = document.getElementById(pageId);
		if (win) {
			var msg = {
				type: "executeF",
				data: "showIndex|" + index
			}
			msg = JSON.stringify(msg);
			setTimeout(function() {
				win.querySelector("#" + pageId + "iframe").contentWindow.postMessage(msg, '*');
			}, 1000)
		}
	}

}(emu, this));