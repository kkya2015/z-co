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