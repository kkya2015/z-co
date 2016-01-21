/*===============================================================================
************   ui native popover   ************
===============================================================================*/
;(function($L, global) {
  var currentView = $L.currentView();
  var popover = function(x, y, width, height) {
      var popoverType = $L.getPopoverType(); //打开窗口类型
      var popovername;
      x = x || 0;
      y = y || 0;
      if ($L.android()) {
        y = y * window.devicePixelRatio;
        height = height * window.devicePixelRatio;
      }
      width = width || 0;
      height = height || 0;
      /*
       * 打开一个指定地址的popover(重复调用的效果同front方法)
       * @param String url 要打开窗口的地址
       * @param String popovername 窗口的标识 --  若不传，默认同URL相同
       */
      this.open = function(url, name) { ///打开新窗口
        if (typeof url === 'undefined') {
          throw new Error("请传入有效的url路径！");
        }
        popovername = this.popovername = name || url;
        var rect = {
          x: x,
          y: y,
          width: width,
          height: height
        };
        $L.executeNativeJS(['window', 'openPopover'], popovername, popoverType, url, rect)
      }
      this.setType = function(type) {
        popoverType = type;
      }
      this.setAnimationType = function(type) {}
      this.hide = function() {
        if (popovername) $L.executeNativeJS(['window', 'setPopoverVisible'], false, popovername)
      }
      this.show = function() {
        if (popovername) $L.executeNativeJS(['window', 'setPopoverVisible'], true, popovername)
      }
      this.front = function() {
        if (popovername) $L.executeNativeJS(['window', 'bringPopoverToFront'], popovername)
      }
      this.behind = function() {
        if (popovername) $L.executeNativeJS(['window', 'sendPopoverToBack'], popovername)
      }
      this.behindOf = function(popovr) {
        if (typeof popovr === 'undefined') {
          throw new Error("请传入有效的popovr对象！");
        }
        var name = popovr.popovername;
        if (typeof name === 'undefined') {
          throw new Error("无法操作未打开的popovr！");
        }
        if (popovername) $L.executeNativeJS(['window', 'bringPopoverBelow'], popovername, name)
      }
      this.frontOf = function(popovr) {
        if (typeof popovr === 'undefined') {
          throw new Error("请传入有效的popovr对象！");
        }
        var name = popovr.popovername;
        if (typeof name === 'undefined') {
          throw new Error("无法操作未打开的popovr！");
        }
        if (popovername) $L.executeNativeJS(['window', 'bringPopoverAbove'], popovername, name)
      }
      this.close = function() {
          if (popovername) $L.executeNativeJS(['window', 'closePopover'], popovername)
        }
        /*
         * 执行JS语句
         * @param String script 需要执行的JS语句
         */
      this.evalScript = function(script) {
        if (typeof script === 'undefined') {
          throw new Error("请传入有效的JS语句！");
        } else if (typeof popovername === 'undefined') {
          throw new Error("无法在未打开的popover中执行JS语句！");
        } else {
          $L.executeNativeJS(['window', 'evaluateScript'], '', popovername, script)
        }
      }
    }
    /*
     * 新建一个popover对象
     *( Number ) x轴开始坐标 仅支持整型
     *( Number ) y轴开始坐标 仅支持整型
     *( Number ) 如果width为0，延伸到屏幕右边 仅支持整型
     *( Number ) 如果height为0，延伸到屏幕下面 仅支持整型
     */
  currentView.createPopover = function(x, y, width, height) {
    return new popover(x, y, width, height);
  }

}(app, this));