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