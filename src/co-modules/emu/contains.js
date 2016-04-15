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
        $E.rootUrl = 'native.html';
        // $E.rootUrl = 'testTab.html';
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