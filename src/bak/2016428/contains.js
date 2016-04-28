/**
 * Released on: 2016-4-28
 * =====================================================
 * Emu v1.0.1 (http://docs.369cloud.com/engine/jssdk/JS-SDK)
 * =====================================================
 */
var emu = (function(global) {
    var $E = {
        version: '1.0.1'
    }
    var EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

    var class2type = {},
        toString = class2type.toString,
        types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
    for (var i = 0; i < types.length; i++) {
        name = types[i]
        class2type["[object " + name + "]"] = name.toLowerCase();
    }



    $E.uuid = function(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

        var uuid = [],
            i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }
    var type = function(obj) {
        return obj == null ? String(obj) :
            class2type[toString.call(obj)] || "object"
    };

    var isWindow = function(obj) {
        return obj != null && obj == obj.window
    };

    var isObject = function(obj) {
        return type(obj) == "object"
    };

    var likeArray = function(obj) {
        return typeof obj.length == 'number'
    };


    var GetQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }

    $E.body = document.body
    $E.bWidth = $E.body.offsetWidth
    $E.Zindex = 10000
    $E.rootName = 'root';
    $E.root = GetQueryString('pageId');
    if ($E.root) {
        var comp = $E.root.lastIndexOf('component/');
        if(comp == -1){
            alert('请将该页面放入component文件下对应工程目录！')
            reutrn;
        }
        var sprit = $E.root.substr(comp).indexOf('/');
        var lastUrl = $E.root.substr(comp + sprit + 1);
        var lastSprit = lastUrl.indexOf('/')
        var component = $E.root.substr(0, comp + sprit + 1);
        var entry = lastUrl.substr(0, lastSprit + 1);
        $E.rootUrl = lastUrl.substr(lastSprit + 1);
        $E.baseUrl = component + entry;
    } else {
        // $E.rootUrl = 'index.html';
        // $E.rootUrl = 'native.html';
        $E.rootUrl = 'testTab.html';
        $E.baseUrl = '';
    }

    $E.windows = []
    $E.winMap = {}
    $E.type = type

    $E.parseUrl = function(url) {
        if (url.indexOf('///') != -1) {
            url = url.replace('///', '/').substr($E.baseUrl.length)
        }
        url = $E.baseUrl + url;
        return url;
    }


    $E.isPlainObject = function(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    };

    $E.isFunction = function(value) {
        return type(value) == "function"
    };

    $E.isString = function(value) {
        return type(value) == "string"
    };

    $E.isArray = Array.isArray ||
        function(object) {
            return object instanceof Array
        };

    $E.each = function(elements, callback) {
        var i, key
        if (likeArray(elements)) {
            for (i = 0; i < elements.length; i++)
                if (callback.call(elements[i], i, elements[i]) === false) return elements
        } else {
            for (key in elements)
                if (callback.call(elements[key], key, elements[key]) === false) return elements
        }

        return elements
    }

    $E.strEncode = function(str) {
        var out, i, len;
        var c1, c2, c3;

        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += EncodeChars.charAt(c1 >> 2);
                out += EncodeChars.charAt((c1 & 0x3) << 4);
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += EncodeChars.charAt(c1 >> 2);
                out += EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += EncodeChars.charAt((c2 & 0xF) << 2);
                break;
            }
            c3 = str.charCodeAt(i++);
            out += EncodeChars.charAt(c1 >> 2);
            out += EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

    $E.strDecode = function(str) {
        var c1, c2, c3, c4;
        var i, len, out;

        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;

            /* c2 */
            do {
                c2 = DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;

            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;

            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }
    $E.iframeload = function(id) {
        if (!this.readyState || this.readyState == "complete") {
            var pageData = {
                pageId: id
            }
            var msg = {
                type: 'init',
                data: pageData
            }
            msg = JSON.stringify(msg);
            this.contentWindow.postMessage(msg, '*');
        }
    }

    var executeJS = function(funStr) {
        var start = funStr.indexOf('(');
        if (start != -1) {
            var end = funStr.lastIndexOf(')');
            var funName = funStr.substring(0, start)
            if ($E[funName]) {
                var parameter = funStr.substring(start + 1, end).replace(/','/g, '|').replace(/'/g, '')
                var args = parameter.split('|')
                $E[funName].apply($E, args)
            }
        } else {
            var params = funStr.split(',');
            var funName = params[0]
            var args = params.slice(1).join(",").split('|')
            $E[funName].apply($E, args)
        }
    }

    window.addEventListener('message', function(e) {
        executeJS(e.data);
    }, false);
    setTimeout(function() {
        executeJS("openWindow," + $E.rootName + "|" + $E.rootUrl + "|0|true");
    }, 1);
    return $E;

}(this));
window.emu = emu;
window.E === undefined && (window.E = emu);
;
(function($E, global) {
    function deleteWin(index) {
        var len = $E.windows.length;
        var arr = $E.windows.splice(index, len - index);
        for (var i = 0; i < arr.length; i++) {
            var pageId = arr[i];
            if ($E.slidePageId == pageId) return;
            var win = document.getElementById(pageId);
            if (win) {
                win.className = 'page-from-center-to-right';
                win.addEventListener("webkitAnimationEnd", function() {
                    pageId = this.id;
                    var winP = $E.winMap[pageId];
                    if (winP) {
                        var pops = winP['pops'];
                        if (pops) {
                            for (var i = 0; i < pops.length; i++) {
                                var popId = pops[i];
                                var pop = document.getElementById(popId);
                                pop && pop.parentNode.removeChild(pop)
                            }
                        }
                        delete $E.winMap[pageId];
                    }
                    if (this.parentNode) {
                        this.parentNode.removeChild(this);
                    }
                }, false);
            }

        }
    }

    $E.openWindow = function() {
        var windowname = arguments[0],
            url = arguments[1],
            type = arguments[2],
            noTransition = arguments[3],
            pageId = $E.strEncode(windowname),
            win = document.getElementById(pageId);
        if (win) {
            win.style.zIndex = ++$E.Zindex;
            return;
        }
        $E.winMap[pageId] = {};
        $E.winMap[pageId]['pops'] = [];
        $E.windows.push(pageId);
        var view = document.createElement("DIV");
        view.style.borderWidth = "0px";
        view.style.position = "absolute";
        view.style.left = "0px";
        view.style.top = "0px";
        view.style.width = "100%";
        view.style.height = "100%";
        view.style.zIndex = ++$E.Zindex;
        view.id = pageId;
        // view.style.transform: translate3d(100%, 0, 0);
        var iframe = document.createElement("iframe");
        iframe.style.position = "relative";
        iframe.style.borderWidth = "0px";
        iframe.style.left = "0px";
        iframe.style.top = "0px";
        iframe.style.border = "0px";
        iframe.style.padding = "0px";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.id = pageId + 'iframe';
        view.appendChild(iframe);

        if (type == 1) {
            iframe.onload = iframe.onreadystatechange = function() {
                if (!this.readyState || this.readyState == "complete") {
                    var msg = {
                        type: 'htmlMsg',
                        data: url
                    }
                    msg = JSON.stringify(msg);
                    this.contentWindow.postMessage(msg, '*');
                }
            }
            iframe.src = "blank.html?pageId=" + pageId;
        } else {
            iframe.onload = iframe.onreadystatechange = function() {
                $E.iframeload.call(iframe, pageId);
            }
            iframe.src = $E.parseUrl(url) + "?pageId=" + pageId;
        }
        if (noTransition != 'true') {
            view.className = 'page-from-right-to-center';
            view.addEventListener("webkitAnimationEnd", function() {
                view.className = '';
                view.style.width = "99.99%";
                setTimeout(function() {
                    view.style.width = "100%";
                }, 0)

            }, false);
        }
        $E.body.appendChild(view);
    }

    $E.closeWindow = function(windowname, pageId) {
        if (typeof windowname !== 'undefined' && windowname != 'undefined') pageId = $E.strEncode(windowname);
        var index = $E.windows.indexOf(pageId);
        if (index >= 0) {
            deleteWin(index)
        } else {
            $E.closePopover(windowname, pageId)
        }
    }

    $E.backToWindow = function(windowname) {
        if ($E.rootUrl.indexOf(windowname) != -1 || windowname == $E.rootName) {
            var pageId = $E.strEncode($E.rootName);
        } else {
            pageId = $E.strEncode(windowname)
        }
        var index = $E.windows.indexOf(pageId);
        if (index >= 0) {
            index = index + 1;
            deleteWin(index)
        }
    }

    $E.openPopover = function(popname, url, rect, windowname) {
        var pageId = $E.strEncode(popname);
        var win = document.getElementById(pageId);
        if (win) {
            var pName = win.parentName;
            if (pName == windowname) {
                win.style.zIndex = ++$E.Zindex;
                return;
            }
        }
        rect = JSON.parse(rect);
        var x = (rect.x || 0) + "px";
        var y = (rect.y || 0) + "px";
        var width = '100%';
        if (rect.width) {
            width = rect.width + "px";
        } else if (rect.width == 0 && rect.x) {
            width = ($E.body.scrollWidth - rect.x) + "px";
        }
        var height = '100%';
        if (rect.height) {
            height = rect.height + "px";
        } else if (rect.height == 0 && rect.y) {
            height = ($E.body.scrollHeight - rect.y) + "px";
        }

        var createView = function(windowname) {
            var view = document.createElement("DIV");
            view.style.borderWidth = "0px";
            view.style.position = "absolute";
            view.style.left = x;
            view.style.top = y;
            view.style.width = width;
            view.style.height = height;
            view.style.zIndex = ++$E.Zindex;
            view.id = pageId;
            view.parentName = windowname;
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
                $E.iframeload.call(iframe, pageId);
            }
            iframe.src = $E.parseUrl(url) + "?pageId=" + pageId;
            return view;
        }

        if ($E.winMap[windowname]) {
            $E.winMap[windowname]['pops'].push(pageId);
            document.getElementById(windowname).appendChild(createView(windowname));
        } else {
            var pop = document.getElementById(windowname);
            var parentName = pop.parentName;
            if ($E.winMap[parentName]) {
                $E.winMap[parentName]['pops'].push(pageId);
            }
            document.getElementById(parentName).appendChild(createView(parentName));
        }

    }

    $E.closePopover = function(windowname, pageId) {
        if (typeof windowname !== 'undefined' && windowname != 'undefined') pageId = $E.strEncode(windowname);
        var pop = document.getElementById(pageId);
        if (pop) pop.parentNode.removeChild(pop);
    }

    $E.setSlideLayout = function(params) {
        params = JSON.parse(params);
        var type = params.type;
        var edge = 200;
        var name = '';
        var url = '';
        if (type == 'right') {
            name = params.rightPane.name;
            url = params.rightPane.url;
            edge = params.rightEdge;
        } else {
            name = params.leftPane.name;
            url = params.leftPane.url;
            edge = params.leftEdge;
        }

        var pageId = $E.strEncode(name);
        pageId = 'drawer' + pageId;
        var pane = {
            id: pageId,
            edge: edge
        }
        if (type == 'right') {
            $E.winMap['rightPane'] = pane
        } else {
            $E.winMap['leftPane'] = pane
        }
        var win = document.getElementById(pageId);
        if (win) {
            delete $E.winMap[pageId];
            win.parentNode.removeChild(win);
            var index = $E.windows.indexOf(pageId);
            $E.windows.splice(index, index)
        }
        $E.slidePageId = pageId;
        $E.winMap[pageId] = {};
        $E.winMap[pageId]['pops'] = [];
        $E.windows.push(pageId);
        var view = document.createElement("DIV");
        view.style.borderWidth = "0px";
        view.style.position = "absolute";
        view.style.left = "0px";
        view.style.top = "0px";
        view.style.width = edge + 'px';
        view.style.height = "100%";
        view.id = pageId;
        var iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.borderWidth = "0px";
        iframe.style.left = "0px";
        iframe.style.top = "0px";
        iframe.style.border = "0px";
        iframe.style.padding = "0px";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        view.appendChild(iframe);
        iframe.onload = iframe.onreadystatechange = function() {
            $E.iframeload.call(iframe, pageId);
        }
        iframe.src = $E.parseUrl(url) + "?pageId=" + pageId;
        if (type == 'right') {
            view.style.cssText += '-webkit-transition-duration:' + 500 +
                'ms;-webkit-transform: translate(' +
                ($E.bWidth + edge) + 'px, 0) translateZ(0);';
        } else {
            view.style.cssText += '-webkit-transition-duration:' + 500 +
                'ms;-webkit-transform: translate(' +
                -edge + 'px, 0) translateZ(0);';
        }
        $E.body.appendChild(view);
    }

    $E.openSlidePane = function(params) {
        var mask = document.getElementById('drawerMask');
        if (mask) {
            mask.style.display = 'block';
        } else {
            mask = document.createElement("DIV");
            mask.style.borderWidth = "0px";
            mask.style.position = "absolute";
            mask.style.left = "0px";
            mask.style.top = "0px";
            mask.style.width = "100%";
            mask.style.height = "100%";
            mask.style.background = "#888";
            mask.style.opacity = "0.5";
            mask.style.zIndex = ++$E.Zindex;
            mask.id = 'drawerMask';
            $E.body.appendChild(mask);
            mask.addEventListener("click", function() {
                $E.closeSlidePane()
            }, false);
        }
        params = JSON.parse(params);
        var type = params.type;
        var pageId = ''
        var edge = 200;
        if (type == 'right') {
            pageId = $E.winMap['rightPane'].id
            edge = $E.winMap['rightPane'].edge;
        } else {
            pageId = $E.winMap['leftPane'].id
            edge = $E.winMap['leftPane'].edge;
        }
        var pane = document.getElementById(pageId);
        pane.style.zIndex = ++$E.Zindex;
        if (type == 'right') {
            pane.style.cssText += '-webkit-transition-duration:' + 500 +
                'ms;-webkit-transform: translate(' +
                ($E.bWidth - edge) + 'px, 0) translateZ(0);';
        } else {
            pane.style.cssText += '-webkit-transition-duration:' + 500 +
                'ms;-webkit-transform: translate(0, 0) translateZ(0);';
        }
    }

    $E.closeSlidePane = function() {
        if ($E.winMap['rightPane']) {
            var pageId = $E.winMap['rightPane'].id;
            var edge = $E.winMap['rightPane'].edge;
            var pane = document.getElementById(pageId);
            pane.style.cssText += '-webkit-transition-duration:' + 500 +
                'ms;-webkit-transform: translate(' +
                ($E.bWidth + edge) + 'px, 0) translateZ(0);';
        }
        if ($E.winMap['leftPane']) {
            var pageId = $E.winMap['leftPane'].id;
            var edge = $E.winMap['leftPane'].edge;
            var pane = document.getElementById(pageId);
            pane.style.cssText += '-webkit-transition-duration:' + 500 +
                'ms;-webkit-transform: translate(' +
                -edge + 'px, 0) translateZ(0);';
        }
        var mask = document.getElementById('drawerMask');
        if (mask) {
            mask.style.display = 'none';
            mask.parentNode.removeChild(mask);
        }
    }

}(emu, this));
;
(function($E, global) {
    
    $E.sendRequest = function(settings, pageId, token) {
        var xhr = new XMLHttpRequest
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var res = {
                    type: 'ajax',
                    data: xhr.responseText,
                    token: token
                }
                res = JSON.stringify(res)
                document.getElementById(pageId).firstChild.contentWindow.postMessage(res, '*');
            }
        };
        //创建请求
        xhr.open('POST', 'http://127.0.0.1:30007', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8;");
        xhr.send(settings);
    }

}(emu, this));
;
(function($E, global) {

    $E.evaluateScript = function(windowname, popoverName, script, pageId) {
        if (windowname != '') {
            pageId = $E.strEncode(windowname);
        }

        var win = document.getElementById(pageId);
        if (win) {
            if (win.parentName) {
                win = document.getElementById(win.parentName);
            }
            var msg = {
                type: 'evaluateScript',
                data: script
            }
            msg = JSON.stringify(msg);
            if (popoverName != '') {
                var popId = $E.strEncode(popoverName);
                var pop = win.querySelector("#" + popId);
                if (pop) {
                    pop.querySelector("#" + popId + "iframe").contentWindow.postMessage(msg, '*');
                }
            } else {
                win.querySelector("#" + pageId + "iframe").contentWindow.postMessage(msg, '*');
            }
        }
    }

}(emu, this));
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
;
(function($E, global) {
    var event = {};
    $E.addEvent = function(pageId, eventName) {
        event[eventName] || (event[eventName] = {})
        event[eventName]['windows'] || (event[eventName]['windows'] = [])
        event[eventName]['windows'].push(pageId);
    }

    $E.removeEvent = function(pageId, eventName) {
        if (event[eventName] && event[eventName]['windows']) {
            var index = event[eventName]['windows'].indexOf(pageId);
            event[eventName]['windows'].splice(index, 1)
        }
    }

    $E.sendEvent = function(eventName, params) {
        var evt = event[eventName];
        if (evt) {
            var windows = evt['windows'];
            if (windows) {
                $E.each(windows, function(index, el) {
                    var win = document.getElementById(el);
                    if (win) {
                        if (win.parentName) {
                            win = document.getElementById(win.parentName);
                        }
                        var msg = {
                            type: 'event',
                            eventName: eventName,
                            params: params
                        }
                        msg = JSON.stringify(msg);
                        win.querySelector("#" + el + "iframe").contentWindow.postMessage(msg, '*');
                    }
                })
            }
        }
    }

}(emu, this));