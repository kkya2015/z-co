var touchesStart,
    touchesEnd,
    dataS,
    parentName,
    list,
    cssPrefix = $.fx.cssPrefix,
    translateZ = ' translateZ(0)',
    bWidth = $(document.body).width(),
    baseDist = 0;
var _nav = $('.ui-navigator');
_nav.$list = _nav.find('ul').first();
_nav.$bar = _nav.find('.bar');

window.addEventListener('message', function(e) {
    _nav.css('display', 'block');
    var msg = JSON.parse(e.data);
    var type = msg.type;
    var data = msg.data
    if (type == 'init') {
        dataS = data;
        parentName = dataS.parentName
        init()
    } else if (type == 'executeF') {
        if (data) {
            var args = data.split('|');
            var funName = args[0];
            if (window[funName]) {
                window[funName].call(window, args[1])
            }
        }
    }

}, false);


function init() {
    var dataSource = dataS.dataSource;
    $.each(dataSource, function(index, item) {
        var inedx = index + 1;
        var title = item.menu
        var url = dataS.baseUrl + item.url;
        var htmlStr = '<li data-url="' + url + '" data-name="' + title + '" data-index="' + inedx + '">' +
            '<a>' + title + '</li>';
        _nav.$list.append(htmlStr);
    })

    list = _nav.$list.children('li');
    var defaultIndex = dataS.defaultIndex
    if (!defaultIndex) defaultIndex = 1
    showIndex(defaultIndex)
    var naviHidden = dataS.naviHidden
    if (naviHidden) {
        _nav.$list.css('display', 'none')
        return;
    }



    var vernierColor = dataS.vernierColor
    if (vernierColor) {
        _nav.$bar.css('backgroundColor', vernierColor)
    }
    var naviBgColor = dataS.naviBgColor
    if (naviBgColor) {
        _nav.css('backgroundColor', naviBgColor)
    }
    _nav.$list.on('click',
        'li:not(.ui-state-disable)>a',
        function(e) {
            var to = $(this).parent().data('index');
            showIndex(to)
        });

}

function showIndex(to) {
    to = to - 1
    if (to < 0) to = 0
    var li = list.removeClass('ui-state-active')
        .eq(to)
        .addClass('ui-state-active');
    _nav.$bar.css({
        left: li.offset().left - _nav.$list.offset().left,
        width: li.width() - 20
    });

    var titleColor = dataS.titleColor
    if (titleColor) {
        list.find('a').css('color', titleColor)
    }
    var titleFont = dataS.titleFont
    if (titleFont) {
        list.css('fontSize', titleFont)
    }
    var titleHighlightFont = dataS.titleHighlightFont
    if (titleHighlightFont) {
        li.css('fontSize', titleHighlightFont)
    }

    var titleHighlightColor = dataS.titleHighlightColor
    if (titleHighlightColor) {
        li.find('a').css('color', titleHighlightColor)
    }

    var url = li.data('url');
    var windowName = li.data('name');
    var naviHidden = dataS.naviHidden
    if (naviHidden) {
        var js = "tabMarkAppend('" + windowName + "','" + url + "','" + dataS.pageId + "','" + parentName + "','" + 0 + "')"
        window.parent.postMessage(js, '*');
    } else {
        var js = "tabMarkAppend('" + windowName + "','" + url + "','" + dataS.pageId + "','" + parentName + "','" + 34 + "')"
        window.parent.postMessage(js, '*');
    }

}

var touchHandler = function(e) {
    switch (e.type) {
        case 'mousedown':
            mousedown.call(this, e);
            break;
        case 'mousemove':
            mousemove.call(this, e);
            break;
        case 'mouseup':
            mouseup.call(this, e);
            break;
    }
    e.stopPropagation()
};

_nav.on('mousedown', touchHandler)

function mousedown(e) {
    touchesStart = {
        x: e.clientX,
        y: e.clientY,
        time: +new Date()
    };

    _nav.on('mousemove' + ' mouseup' + ' mouseout', touchHandler);
}

function mousemove(e) {
    var width = _nav.$list.width(),
        style = _nav.$list[0].style,
        abs = Math.abs(bWidth - width);
    touchesEnd = {
        x: e.clientX,
        y: e.clientY
    };
    if (Math.abs(angle(touchesStart, touchesEnd)) > 30) return;
    var dist = touchesEnd.x - touchesStart.x
    dist = dist / 10;
    dist = baseDist + dist
    if (dist > 0) {
        dist = 0;
    } else if (dist < 0 && dist < (0 - abs)) {
        dist = 0 - abs;
    }
    baseDist = dist;
    style.cssText += cssPrefix + 'transition-duration:' + 0 +
        'ms;' + cssPrefix + 'transform: translate(' +
        dist + 'px, 0)' + translateZ + ';';

}

function mouseup(e) {
    _nav.off('mousemove' + ' mouseup' + ' mouseout', touchHandler);
}



var angle = function(start, end) {
    var diff_x = end.x - start.x,
        diff_y = end.y - start.y;
    //返回角度,不是弧度
    return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
}