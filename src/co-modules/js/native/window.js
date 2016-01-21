/*===============================================================================
************   ui native window   ************
===============================================================================*/
;(function($L, global) {
  var window = function() {
    var windowType = $L.getWindowType(); //打开窗口类型
    var windowAnimationType = $L.getWindowAnimationType(); // 动画效果
    var windowAnimationDirection = $L.getWindowAnimationDirection(); // 动画方向
    var windowAnimationDuration = $L.getWindowAnimationDuration(); // 动画时间
    var windowAnimationCurve = $L.getWindowAnimationCurve(); // 动画曲线
    var windowname;

    /*
     * 打开一个指定地址的窗口
     * @param String url 要打开窗口的地址
     * @param String windowname 窗口的标识 --  若不传，默认同URL相同
     */
    this.open = function(url, name) { ///打开新窗口
      if (typeof url === 'undefined') {
        throw new Error("请传入有效的url路径！");
      }
      windowname = name || url;
      var options = {
        type: windowAnimationType,
        direction: windowAnimationDirection,
        time: windowAnimationDuration,
        curve: windowAnimationCurve
      };
      $L.executeNativeJS(['window', 'openWindow'], windowname, windowType, url, options)
    }
    this.setType = function(type) {
      windowType = type;
    }
    this.setAnimationType = function(type) {
      windowAnimationType = type;
    }
    this.setAnimationDirection = function(direction) {
      windowAnimationDirection = direction;
    }
    this.setAnimationDuration = function(duration) {
      windowAnimationDuration = duration;
    }
    this.setAnimationCurve = function(curve) {
      windowAnimationCurve = curve;
    }

    /*
     * 执行JS语句
     * @param String script 需要执行的JS语句
     */
    this.evalScript = function(script) {
      if (typeof script === 'undefined') {
        throw new Error("请传入有效的JS语句！");
      } else if (typeof windowname === 'undefined') {
        throw new Error("无法在未打开的window窗口中执行JS语句！");
      } else {
        $L.executeNativeJS(['window', 'evaluateScript'], '',windowname, '', script)
      }
    }

    /*
     * 执行JS语句
     * @param String script 需要执行的JS语句
     */
    this.evalScriptInPop = function(script,popoverName) {
      if (typeof script === 'undefined') {
        throw new Error("请传入有效的JS语句！");
      } else if (typeof windowname === 'undefined') {
        throw new Error("无法在未打开的window窗口中执行JS语句！");
      }else if (typeof popoverName === 'undefined') {
        throw new Error("请传入有效的popoverName！");
      } else {
        $L.executeNativeJS(['window', 'evaluateScript'], '',windowname, popoverName, script)
      }
    }
  }

  $L.createWindow = function() {
    return new window();
  }

}(app, this));