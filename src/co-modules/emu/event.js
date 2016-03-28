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