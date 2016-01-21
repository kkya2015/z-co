/**===============================================================================
************   APP   ************
===============================================================================*/
var app = (function(global) {
  var $L = {
    version: '0.0.1'
  }
  var class2type = {},
    toString = class2type.toString,
    types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
  for (var i = 0; i < types.length; i++) {
    name = types[i]
    class2type["[object " + name + "]"] = name.toLowerCase();
  }
  var DIRNAME_RE = /[^?#]*\//
  var plus = !!global['rd'];
  // var dirname = function(path) {
  //   return path.match(DIRNAME_RE)[0]
  // }
  // var getScriptAbsoluteSrc = function(node) {
  //     return node.hasAttribute ? node.src : node.getAttribute("src", 4)
  //   }
  // var doc = document
  // var cwd = dirname(doc.URL)
  // var scripts = doc.scripts
  // var loaderScript = scripts[scripts.length - 1]
  // var loaderDir = dirname(getScriptAbsoluteSrc(loaderScript) || cwd)
  // var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement

  var winError = function(sMsg, sUrl, sLine, columnNumber, error) {
    var str = sMsg;
    app.log.error(str);
    str = "Line: " + sLine;
    app.log.error(str);
    str = "resource: " + sUrl;
    app.log.error(str);
    str = "column: " + columnNumber;
    app.log.error(str);
    return false;
  }


  var GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
  }

  var domReady = function(factory, require) {
    var pageId = GetQueryString('pageId');
    if (!require) require = function() {}
    if ($L.isFunction(factory)) {
      if (!(($L.android || $L.ios) && plus)) {
        if (pageId) {
          $L.debug()
          setTimeout(function() {
            if ($L.debug.isReady) {
              factory.call(global, require);
            } else {
              setTimeout(arguments.callee, 1);
            }
          }, 1);
        } else {
          factory.call(global, require);
        }
      } else {
        setTimeout(function() {
          if (domReady.isReady) {
            factory.call(global, require);
          } else {
            setTimeout(arguments.callee, 1);
          }
        }, 1);
      }

    }
  };


  global.onLoad = function() {
    if (window.onerror) {
      var error = window.onerror
      window.onerror = function() {
        error.call(global, arguments);
        winError.apply(global, Array.prototype.slice.call(arguments))
      }
    } else {
      window.onerror = winError
    }
    domReady.isReady = true;
    $L.init();
  };
  global.domReady = domReady;

  var base = 'rd',
    baseObj = global[base],
    windowType = 0, //加载本地HTML
    popoverType = 0, //加载本地HTML
    windowAnimationType = 11, // 动画效果--推入
    windowAnimationDirection = 41, // 动画方向--右侧
    windowAnimationDuration = 300, // 动画时间
    windowAnimationCurve = 53, // 动画曲线--从慢到快到慢
    viewBounces = false, // 页面是否弹动--  仅IOS有效果
    viewBgcolor = '', // 页面背景色  -- 如果字段为空，颜色为白色
    viewVScrollBar = false, //  是否显示水平滚动条
    viewHScrollBar = true, //  是否显示垂直滚动条
    // viewZoom = false, //  页面是否支持缩放
    viewKeyboard = false, //  键盘弹出后，输入框是否会自动定位，android暂时不支持
    viewDragDismiss = false, //  是否支持滑动消失键盘，android暂时不支持
    viewAnimationType = 11, // 页面关闭动画效果 --推入 
    viewAnimationDirection = 40, // 页面关闭动画方向 -- 左侧
    viewAnimationDuration = 300, // 页面关闭动画时间
    viewAnimationCurve = 53, // 页面关闭动画曲线--从慢到快到慢
    viewSlideBack = true; //是否支持滑动返回，设置window全局，ture表示支持，false表示不支持,Android设备暂时不支持



  var setViewBounces = function(bounces) {
    viewBounces = !!bounces;
    var currentView = $L.currentView();
    if (viewBounces) {
      currentView.enableBounces();
    } else {
      currentView.disableBounces();
    }
  }
  var setViewVScrollBar = function(vScrollBar) {
    viewVScrollBar = !!vScrollBar;
    var currentView = $L.currentView();
    if (viewVScrollBar) {
      currentView.enableVScrollBar();
    } else {
      currentView.disableVScrollBar();
    }
  }
  var setViewHScrollBar = function(hScrollBar) {
      viewHScrollBar = !!hScrollBar;
      var currentView = $L.currentView();
      if (viewHScrollBar) {
        currentView.enableHScrollBar();
      } else {
        currentView.disableHScrollBar();
      }
    }
    // var setViewZoom = function(zoom) {
    //   viewZoom = !!zoom;
    //   var currentView = $L.currentView();
    //   if (viewZoom) {
    //     currentView.enableZoom();
    //   } else {
    //     currentView.disableZoom();
    //   }
    // }
  var setViewKeyboard = function(keyboard) {
    viewKeyboard = !!keyboard;
    var currentView = $L.currentView();
    if (viewKeyboard) {
      currentView.enableKeyboard();
    } else {
      currentView.disableKeyboard();
    }
  }
  var setViewDragDismiss = function(dragDismiss) {
    viewDragDismiss = !!dragDismiss;
    var currentView = $L.currentView();
    if (viewDragDismiss) {
      currentView.enableDragDismiss();
    } else {
      currentView.disableDragDismiss();
    }
  }

  var setViewBgcolor = function(bgcolor) {
    viewBgcolor = bgcolor;
    var currentView = $L.currentView();
    currentView.setBgcolor(viewBgcolor);
  }
  var setViewAnimationType = function(animationType) {
    viewAnimationType = animationType;
    var currentView = $L.currentView();
    currentView.setAnimationType(viewAnimationType);
  }
  var setViewAnimationDirection = function(animationDirection) {
    viewAnimationDirection = animationDirection;
    var currentView = $L.currentView();
    currentView.setAnimationDirection(viewAnimationDirection);
  }
  var setViewAnimationDuration = function(animationDuration) {
    viewAnimationDuration = animationDuration;
    var currentView = $L.currentView();
    currentView.setAnimationDuration(viewAnimationDuration);
  }
  var setViewAnimationCurve = function(animationCurve) {
    viewAnimationCurve = animationCurve;
    var currentView = $L.currentView();
    currentView.setAnimationCurve(viewAnimationCurve);
  }

  var setSlideBack = function(slideBack) {
    viewSlideBack = !!slideBack;
    var currentView = $L.currentView();
    if (viewSlideBack) {
      currentView.enableSlideBack();
    } else {
      currentView.disableSlideBack();
    }
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

  $L.type = type

  $L.isPlainObject = function(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  };

  $L.isFunction = function(value) {
    return type(value) == "function"
  };

  $L.isString = function(value) {
    return type(value) == "string"
  };

  $L.isArray = Array.isArray ||
    function(object) {
      return object instanceof Array
    };

  $L.android = function() {
    return $L.os.getName() == "Android"
  };

  $L.ios = function() {
    return $L.os.getName() == "iOS"
  };

  $L.each = function(elements, callback) {
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

  var resolveFun = function(arr) {
    var fun = baseObj;
    var callObj = baseObj;
    if ($L.isArray(arr)) {
      $L.each(arr, function(index, item) {
        if (fun && item) {
          callObj = fun;
          fun = fun[item];
        }
      })
    }
    return {
      fun: fun,
      callObj: callObj
    }
  }

  /*
   * 执行引擎方法统一入口
   */
  $L.executeNativeJS = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    var callFun = resolveFun(arguments[0]);
    if ($L.isFunction(callFun.fun)) {
      return callFun.fun.apply(callFun.callObj, args);
    }
  }

  /*
   * 执行引擎方法返回对象统一入口
   */
  $L.executeObjFunJS = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    var fun = arguments[0][0]
    var callObj = fun;
    if (fun) {
      fun = fun[arguments[0][1]];
    }

    if ($L.isFunction(fun)) {
      return fun.apply(callObj, args);
    }
  }

  /*
   * 獲取引擎常量值统一入口
   */
  $L.executeConstantJS = function() {
    var constant = resolveFun(arguments[0]);
    if (typeof constant.fun !== 'undefined') {
      return constant.fun;
    }
  }

  /*
   * 獲取对象常量值统一入口
   */
  $L.executeObjConstantJS = function() {
    var constant = arguments[0];
    if (typeof constant !== 'undefined') {
      return constant[arguments[1]];
    }
  }

  $L.init = function() {
    var app_property = app.properties.open('app_property_setting', 'app_property');
    var propertys = app_property.get('propertys');
    if (propertys) {
      var prop = JSON.parse(propertys);
      this.config(prop);
    } else {
      var prop = {}
      prop.windowType = windowType;
      prop.popoverType = popoverType;
      prop.windowAnimationType = windowAnimationType;
      prop.windowAnimationDirection = windowAnimationDirection;
      prop.windowAnimationDuration = windowAnimationDuration;
      prop.windowAnimationCurve = windowAnimationCurve;
      prop.viewBounces = viewBounces;
      prop.viewBgcolor = viewBgcolor;
      prop.viewVScrollBar = viewVScrollBar;
      prop.viewHScrollBar = viewHScrollBar;
      // prop.viewZoom = viewZoom;
      prop.viewKeyboard = viewKeyboard;
      prop.viewDragDismiss = viewDragDismiss;
      prop.viewAnimationType = viewAnimationType;
      prop.viewAnimationDirection = viewAnimationDirection;
      prop.viewAnimationDuration = viewAnimationDuration;
      prop.viewAnimationCurve = viewAnimationCurve;
      prop.viewSlideBack = viewSlideBack;
      this.config(prop);
    }

  }


  $L.config = function(prop) {
    if (!prop) return;

    prop.windowType && (windowType = prop.windowType)
    prop.popoverType && (popoverType = prop.popoverType)

    prop.windowAnimationType && (windowAnimationType = prop.windowAnimationType)
    prop.windowAnimationDirection && (windowAnimationDirection = prop.windowAnimationDirection)
    prop.windowAnimationDuration && (windowAnimationDuration = prop.windowAnimationDuration)
    prop.windowAnimationCurve && (windowAnimationCurve = prop.windowAnimationCurve)

    prop.viewAnimationType && (setViewAnimationType(prop.viewAnimationType))
    prop.viewAnimationDirection && (setViewAnimationDirection(prop.viewAnimationDirection))
    prop.viewAnimationDuration && (setViewAnimationDuration(prop.viewAnimationDuration))
    prop.viewAnimationCurve && (setViewAnimationCurve(prop.viewAnimationCurve))
    prop.viewBgcolor && (setViewBgcolor(prop.viewBgcolor))

    if (typeof prop.viewBounces === 'undefined') {
      setViewBounces(viewBounces)
    } else {
      setViewBounces(prop.viewBounces)
    }

    if (typeof prop.viewVScrollBar === 'undefined') {
      setViewVScrollBar(viewVScrollBar)
    } else {
      setViewVScrollBar(prop.viewVScrollBar)
    }

    if (typeof prop.viewHScrollBar === 'undefined') {
      setViewHScrollBar(viewHScrollBar)
    } else {
      setViewHScrollBar(prop.viewHScrollBar)
    }

    // if (typeof prop.viewZoom === 'undefined') {
    //   setViewZoom(viewZoom)
    // } else {
    //   setViewZoom(prop.viewZoom)
    // }

    if (typeof prop.viewKeyboard === 'undefined') {
      setViewKeyboard(viewKeyboard)
    } else {
      setViewKeyboard(prop.viewKeyboard)
    }

    if (typeof prop.viewDragDismiss === 'undefined') {
      setViewDragDismiss(viewDragDismiss)
    } else {
      setViewDragDismiss(prop.viewDragDismiss)
    }

    if (typeof prop.viewSlideBack === 'undefined') {
      setSlideBack(viewSlideBack)
    } else {
      setSlideBack(prop.viewSlideBack)
    }

    var app_property = app.properties.open('app_property_setting', 'app_property');
    prop = JSON.stringify(prop);
    app_property.put('propertys', prop);
    app_property.save()
  }
  $L.getWindowType = function() {
    return windowType;
  }
  $L.getPopoverType = function() {
    return popoverType;
  }
  $L.getWindowAnimationType = function() {
    return windowAnimationType;
  }
  $L.getWindowAnimationDirection = function() {
    return windowAnimationDirection;
  }
  $L.getWindowAnimationDuration = function() {
    return windowAnimationDuration;
  }
  $L.getWindowAnimationCurve = function() {
    return windowAnimationCurve;
  }
  $L.getViewBounces = function() {
    return viewBounces;
  }
  $L.getViewBgcolor = function() {
    return viewBgcolor;
  }
  $L.getViewVScrollBar = function() {
    return viewVScrollBar;
  }
  $L.getViewHScrollBar = function() {
      return viewHScrollBar;
    }
    // $L.getViewZoom = function() {
    //   return viewZoom;
    // }
  $L.getViewKeyboard = function() {
    return viewKeyboard;
  }
  $L.getViewDragDismiss = function() {
    return viewDragDismiss;
  }
  $L.getViewAnimationType = function() {
    return viewAnimationType;
  }
  $L.getViewAnimationDirection = function() {
    return viewAnimationDirection;
  }
  $L.getViewAnimationDuration = function() {
    return viewAnimationDuration;
  }
  $L.getViewAnimationCurve = function() {
    return viewAnimationCurve;
  }
  $L.getViewAnimationCurve = function() {
    return viewAnimationCurve;
  }


  /*
   * 添加侧滑抽屉效果
   * @param String url 要打开页面的地址
   * @param String type  左侧、右侧 -- 默认值 left
   * @param Number edge 侧滑时, 侧滑window停留时露出的宽度  -- 默认值 50
   */
  $L.addSlideDrawer = function(url, type, edge) {
    var patrn = /^[0-9]{1,20}$/;
    if (typeof url === 'undefined') {
      throw new Error("请传入有效的抽屉页面路径！");
    } else if ($L.isPlainObject(url)) {
      var uri = url['url'];
      if (typeof uri === 'undefined') {
        throw new Error("请传入有效的抽屉页面路径！");
      } else {
        type = url['type'];
        edge = url['edge'];
        url = uri;
      }
    }
    if (!patrn.test(edge)) {
      edge = 50;
    }
    if (type == 'right') {
      var slideLayoutParams = {
        type: 'right',
        leftEdge: edge,
        rightEdge: edge,
        rightPane: {
          name: url,
          url: url
        }
      }
      $L.executeNativeJS(['window', 'setSlideLayout'], slideLayoutParams)
    } else {
      var slideLayoutParams = {
        type: 'left',
        leftEdge: edge,
        rightEdge: edge,
        leftPane: {
          name: url,
          url: url
        }
      }
      $L.executeNativeJS(['window', 'setSlideLayout'], slideLayoutParams)
    }
  }



  /*
   * 开启左侧抽屉.
   */
  $L.openLeftSlideDrawer = function() {
    var SlideParams = {
      type: 'left'
    }
    $L.executeNativeJS(['window', 'openSlidePane'], SlideParams)
  }

  /*
   * 开启右侧抽屉.
   */
  $L.openRightSlideDrawer = function() {
    var SlideParams = {
      type: 'right'
    }
    $L.executeNativeJS(['window', 'openSlidePane'], SlideParams)
  }

  /*
   * 关闭抽屉.
   */
  $L.closeSlideDrawer = function() {
    $L.executeNativeJS(['window', 'closeSlidePane'])
  }

  /*
   * 执行JS语句
   * @param String script 需要执行的JS语句
   * @param String windowName  需要执行JS语句的窗口名称
   * @param String windowName  需要执行JS语句的窗口名称
   * @param String popoverName 需要执行JS语句的pop名称
   */
  $L.evalScriptInComponent = function(componentName, windowName, script, popoverName) {
    if (typeof componentName === 'undefined') {
      throw new Error("请传入有效的componentName！");
    } else if (typeof windowName === 'undefined') {
      throw new Error("请传入有效的windowName！");
    } else if (typeof script === 'undefined') {
      throw new Error("请传入有效的JS语句！");
    }

    if (typeof popoverName === 'undefined') {
      $L.executeNativeJS(['window', 'evaluateScript'], componentName, windowName, '', script)
    } else {
      $L.executeNativeJS(['window', 'evaluateScript'], componentName, windowName, popoverName, script)
    }

  }

  /*
   * 在指定窗口执行JS语句
   * @param String script 需要执行的JS语句
   * @param String windowName  需要执行JS语句的窗口名称，默认为当前窗口
   */
  $L.evalScriptInWindow = function(script, windowName) {
    if (typeof script === 'undefined') {
      throw new Error("请传入有效的JS语句！");
    } else if (typeof windowName === 'undefined') {
      $L.executeNativeJS(['window', 'evaluateScript'], '', '', '', script)
    } else {
      $L.executeNativeJS(['window', 'evaluateScript'], '', windowName, '', script)
    }
  }

  /*
   * 指定pop执行JS语句
   * @param String script 需要执行的JS语句
   * @param String popoverName 需要执行JS语句的pop名称
   * @param String windowName  需要执行JS语句的窗口名称，默认为当前窗口
   */
  $L.evalScriptInPop = function(script, popoverName, windowName) {
    if (typeof script === 'undefined') {
      throw new Error("请传入有效的JS语句！");
    } else if (typeof popoverName === 'undefined') {
      throw new Error("请传入有效的popoverName！");
    } else if (typeof windowName === 'undefined') {
      $L.executeNativeJS(['window', 'evaluateScript'], '', '', popoverName, script)
    } else {
      $L.executeNativeJS(['window', 'evaluateScript'], '', windowName, popoverName, script)
    }
  }

  /*
   * 锁定屏幕翻转
   */
  $L.lockRotate = function() {
    $L.executeNativeJS(['window', 'lockRotate'], true)
  }

  /*
   * 解锁屏幕翻转
   */
  $L.unLockRotate = function() {
    $L.executeNativeJS(['window', 'lockRotate'], false)
  }

  /*
   * 弹出单按钮对话框
   * @param String msg 对话框的消息内容
   * @param String title 窗口的title -- '消息提示'
   * @param String btnCaption 窗口的按钮显示的内容  -- '确定'
   * @param funciton callback 按下窗口的按钮时回调函数  -- function(){}
   */
  $L.alert = function(message, title, btnCaption, callback) {
    if (typeof message === 'undefined') {
      throw new Error("请传入有效消息内容！");
    } else if ($L.isPlainObject(message)) {
      var msg = message['message'];
      if (typeof msg === 'undefined') {
        throw new Error("请传入有效消息内容！");
      } else {
        title = message['title'];
        btnCaption = message['btnCaption'];
        callback = message['callback'];
        message = msg;
      }
    } else {
      if ($L.isFunction(title)) {
        callback = title;
        title = '消息提示';
        btnCaption = '确定';
      } else if ($L.isFunction(btnCaption)) {
        callback = btnCaption;
        btnCaption = '确定';
      }
    }
    var setting = {
        title: title || '消息提示',
        msg: message,
        buttons: [btnCaption || '确定']
      }
      // callback = callback || function(){}
    $L.executeNativeJS(['window', 'alert'], setting, function() {
      $L.isFunction(callback) && callback.call();
    });
  };

  /*
   * 弹出带两个或三个按钮的confirm对话框
   * @param String msg 对话框的消息内容
   * @param String title 窗口的title -- '消息提示'
   * @param String btnCaptions 窗口的按钮显示的内容  -- ['确认','放弃','取消']
   * @param funciton callback 按下窗口的按钮时回调函数
   */
  $L.confirm = function(message, title, btnCaptions, callback) {
    if (typeof message === 'undefined') {
      throw new Error("请传入有效消息内容！");
    } else if ($L.isPlainObject(message)) {
      var msg = message['message'];
      if (typeof msg === 'undefined') {
        throw new Error("请传入有效消息内容！");
      } else {
        title = message['title'];
        btnCaptions = message['btnCaptions'];
        callback = message['callback'];
        message = msg;
      }
    } else {
      if ($L.isFunction(title)) {
        callback = title;
        title = '消息提示';
        btnCaptions = ['确认', '放弃', '取消'];
      } else if ($L.isFunction(btnCaptions)) {
        callback = btnCaptions;
        btnCaptions = ['确认', '放弃', '取消'];
      }
    }
    var setting = {
        title: title || '消息提示',
        msg: message,
        buttons: btnCaptions || ['确认', '放弃', '取消']
      }
      // callback = callback || function(){}
    $L.executeNativeJS(['window', 'confirm'], setting, function(Tips) {
      $L.isFunction(callback) && callback.call(global, Tips.buttonIndex);
    });
  };

  /*
   * 弹出带两个或三个按钮和输入框的对话框
   * @param String msg 对话框的消息内容
   * @param String title 窗口的title -- '消息提示'
   * @param String btnCaptions 窗口的按钮显示的内容  -- ['确认','放弃','取消']
   * @param String inputValue 输入框的默认值 -- ' '
   * @param String inputTpye 输入框的类型 -- 取值范围（text、password、number、email、url） 默认text
   * @param funciton callback 按下窗口的按钮时回调函数
   */
  $L.prompt = function(message, title, btnCaptions, inputValue, inputTpye, callback) {
    if (typeof message === 'undefined') {
      throw new Error("请传入有效消息内容！");
    } else if ($L.isPlainObject(message)) {
      var msg = message['message'];
      if (typeof msg === 'undefined') {
        throw new Error("请传入有效消息内容！");
      } else {
        title = message['title'];
        btnCaptions = message['btnCaptions'];
        inputValue = message['inputValue'];
        inputTpye = message['inputTpye'];
        callback = message['callback'];
        message = msg;
      }
    } else {
      if ($L.isFunction(title)) {
        callback = title;
        title = '消息提示';
        btnCaptions = ['确认', '放弃', '取消'];
        inputValue = '';
        inputTpye = 'text';
      } else if ($L.isFunction(btnCaptions)) {
        callback = btnCaptions;
        btnCaptions = ['确认', '放弃', '取消'];
        inputValue = '';
        inputTpye = 'text';
      } else if ($L.isFunction(inputValue)) {
        callback = inputValue;
        inputValue = '';
        inputTpye = 'text';
      } else if ($L.isFunction(inputTpye)) {
        callback = inputTpye;
        inputTpye = 'text';
      }
    }
    var setting = {
        title: title || '消息提示',
        msg: message,
        text: inputValue || '',
        type: inputTpye || 'text',
        buttons: btnCaptions || ['确认', '放弃', '取消']
      }
      // callback = callback || function(){}
    $L.executeNativeJS(['window', 'prompt'], setting, function(Tips, err) {
      $L.isFunction(callback) && callback.call(global, Tips.buttonIndex, Tips.text, err);
    });
  }
  return $L;
}(this));
window.app = app;
window.A === undefined && (window.A = app);