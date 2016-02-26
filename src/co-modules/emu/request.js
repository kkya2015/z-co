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