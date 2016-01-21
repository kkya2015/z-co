/**
 * Released on: 2016-1-13
 */
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
/*===============================================================================
************   ui native app   ************
===============================================================================*/
;
(function($L, global) {
	/*
	 * 获取系统名称
	 */
	$L.getPlatformName = function() {
		return $L.executeConstantJS(['app', 'platformName']);
	}

	/*
	 * 获取系统版本
	 */
	$L.getPlatformVersion = function() {
		return $L.executeConstantJS(['app', 'platformVersion']);
	}

	/*
	 * 获取设备模型名称
	 */
	$L.getDeviceModel = function() {
		return $L.executeConstantJS(['app', 'deviceModel']);
	}

	/*
	 * 获取设备名称
	 */
	$L.getDeviceName = function() {
		return $L.executeConstantJS(['app', 'deviceName']);
	}

	/*
	 * 使用系统浏览器下载文件(android)
	 */
	$L.downloadFile = function(url) {
		$L.executeNativeJS(['app', 'downloadFile'], url);
	}

	/*
	 * 退出app(android)
	 */
	$L.exit = function() {
		$L.executeNativeJS(['app', 'exit']);
	}

	/*
	 * 设置当前页面状态栏文字颜色 0 表示黑色。1 表示白色(iOS)
	 */
	$L.statusBarFontColor = function(color) {
		if(!color) color = 0;
		$L.executeNativeJS(['app', 'setStatusBarStyle'], color);
	}

	/*
	 * 安装一个app
	 */
	$L.installApp = function(path) {
		$L.executeNativeJS(['app', 'installApp'], path);
	}

	/*
	 * 获取引擎版本号
	 */
	$L.getEngineVersion = function() {
		return $L.executeNativeJS(['app', 'getEngineVersion']);
	}

	/*
	 * 获取app配置信息，此app配置信息来自application.xml。
	 */
	$L.getApplicationInfo = function() {
		return $L.executeNativeJS(['app', 'getApplicationInfo']);
	}

	/*
	 * 启动一个app
	 */
	$L.openApp = function(params, success, error) {
		$L.executeNativeJS(['app', 'openApp'], params, function(ret, retVals) {
			if (ret == 1) {
				if ($L.isFunction(success)) {
					success.call(global, retVals);
				}
			} else if (ret == 0) {
				if ($L.isFunction(error)) {
					error.call(global);
				}
			}
		});
	}

	/*
	 * 判断设备上是否已安装指定app
	 */
	$L.isAppInstalled = function(appSource, callback) {
		$L.executeNativeJS(['app', 'isAppInstalled'], appSource, function(isInstalled) {
			$L.isFunction(callback) && callback.call(global, isInstalled);
		});
	}

	/*
	 * 判断app是否全屏显示
	 */
	$L.isFullScreen = function() {
		return $L.executeNativeJS(['app', 'isFullScreen']);
	}

	/*
	 * 设置app状态栏背景颜色；Android要求版本4.4以上。默认黑色
	 */
	$L.setStatusBarBackgroundColor = function(color) {
		$L.executeNativeJS(['app', 'setStatusBarBackgroundColor'], color);
	}

	/*
	 * 清空cache目录
	 */
	$L.cleanCache = function() {
		$L.executeNativeJS(['app', 'cleanCache']);
	}

}(app, this));
/*===============================================================================
************   ui native eventListener   ************
===============================================================================*/
;
(function($L, global) {
	/*
	 * 打开指定component
	 * @param String componentName 必选 component名字
	 * @param String defaultPage 必选 如果传空(''),使用component.xml中配置的url。window的名字默认为root
	 * @param String animation  可选 type默认值为rd.window.ANIMATIONTYPEPUSH, direction默认值为rd.window.ANIMATIONSUBTYPEFROMRIGHT，time默认值为300ms，curve默认值为rd.window.ANIMATIONCURVE_EASEINEASEOUT
	 */
	$L.openComponent = function(componentName, animation) {
		$L.executeNativeJS(['window', 'openComponent'], componentName, '', animation)

	}

	/*
	 * 关闭当前component
	 * @param String animation  可选 type默认值为rd.window.ANIMATIONTYPEPUSH, direction默认值为rd.window.ANIMATIONSUBTYPEFROMRIGHT，time默认值为300ms，curve默认值为rd.window.ANIMATIONCURVE_EASEINEASEOUT
	 */
	$L.closeCurrentComponent = function(animation) {
		$L.executeNativeJS(['component', 'closeComponent'], '', animation)
	}

	/*
	 * 关闭指定component
	 * @param String componentName 必选 关闭指定名称的component
	 * @param String animation  可选 type默认值为rd.window.ANIMATIONTYPEPUSH, direction默认值为rd.window.ANIMATIONSUBTYPEFROMRIGHT，time默认值为300ms，curve默认值为rd.window.ANIMATIONCURVE_EASEINEASEOUT
	 */
	$L.closeComponent = function(componentName, animation) {
		if (typeof componentName === 'undefined') {
			throw new Error("请传入有效的componentName！");
		}
		$L.executeNativeJS(['component', 'closeComponent'], componentName, animation)
	}

	/*
	 * 获取主component的componentInfo
	 */
	$L.getMainComponentInfo = function() {
		return $L.executeNativeJS(['component', 'getMainComponentInfo'])
	}

	/*
	 * 通过名字获取模块信息
	 */
	$L.getComponentInfoByName = function(componentName) {
		return $L.executeNativeJS(['component', 'getComponentInfoByName'], componentName)
	}

	/*
	 * 获取当前模块信息
	 */
	$L.getCurrentComponentInfo = function() {
		return $L.executeNativeJS(['component', 'getCurrentComponentInfo'])
	}

}(app, this));
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
/*===============================================================================
************   ui native view   ************
===============================================================================*/
;
(function($L, global) {
  var view = function() {
    // var viewBounces = $L.getViewBounces(); // 页面是否弹动--  仅IOS有效果
    // var viewBgcolor = $L.getViewBgcolor(); // 页面背景色  -- 如果字段为空，颜色为白色
    // var viewVScrollBar = $L.getViewVScrollBar(); //  是否显示水平滚动条
    // var viewHScrollBar = $L.getViewHScrollBar(); //  是否显示垂直滚动条
    // var viewZoom = $L.getViewZoom(); //  页面是否支持缩放
    // var viewKeyboard = $L.getViewKeyboard(); //  键盘弹出后，输入框是否会自动定位，android暂时不支持
    // var viewDragDismiss = $L.getViewDragDismiss(); //  是否支持滑动消失键盘，android暂时不支持
    var viewAnimationType = $L.getViewAnimationType(); // 返回动画效果
    var viewAnimationDirection = $L.getViewAnimationDirection(); // 返回动画方向
    var viewAnimationDuration = $L.getViewAnimationDuration(); // 返回动画时间
    var viewAnimationCurve = $L.getViewAnimationCurve(); // 返回动画曲线
    var headerInitialized = false; //是否已经添加了下拉刷新 
    var FooterInitialized = false; //是否已经添加了上拉加载 

    this.enableBounces = function() {
      var viewBounces = true;
      $L.executeNativeJS(['window', 'setAttr'], {
        bounces: viewBounces
      })
    }
    this.disableBounces = function() {
      var viewBounces = false;
      $L.executeNativeJS(['window', 'setAttr'], {
        bounces: viewBounces
      })
    }
    this.setBgcolor = function(bgcolor) {
      $L.executeNativeJS(['window', 'setAttr'], {
        bgColor: bgcolor
      })
    }
    this.enableVScrollBar = function() {
      var viewVScrollBar = true;
      $L.executeNativeJS(['window', 'setAttr'], {
        vScrollBarEnabled: viewVScrollBar
      })
    }
    this.disableVScrollBar = function() {
      var viewVScrollBar = false;
      $L.executeNativeJS(['window', 'setAttr'], {
        vScrollBarEnabled: viewVScrollBar
      })
    }
    this.enableHScrollBar = function() {
      var viewHScrollBar = true;
      $L.executeNativeJS(['window', 'setAttr'], {
        hScrollBarEnabled: viewHScrollBar
      })
    }
    this.disableHScrollBar = function() {
        var viewHScrollBar = false;
        $L.executeNativeJS(['window', 'setAttr'], {
          hScrollBarEnabled: viewHScrollBar
        })
      }
      // this.enableZoom = function() {
      //   var viewZoom = true;
      //   $L.executeNativeJS(['window', 'setAttr'], {
      //     scaleEnabled: viewZoom
      //   })
      // }
      // this.disableZoom = function() {
      //   var viewZoom = false;
      //   $L.executeNativeJS(['window', 'setAttr'], {
      //     scaleEnabled: viewZoom
      //   })
      // }
    this.enableKeyboard = function() {
      var viewKeyboard = true;
      $L.executeNativeJS(['window', 'setAttr'], {
        keyboard: viewKeyboard
      })
    }
    this.disableKeyboard = function() {
      var viewKeyboard = false;
      $L.executeNativeJS(['window', 'setAttr'], {
        keyboard: viewKeyboard
      })
    }
    this.enableDragDismiss = function() {
      var viewDragDismiss = true;
      $L.executeNativeJS(['window', 'setAttr'], {
        dragDismiss: viewDragDismiss
      })
    }
    this.disableDragDismiss = function() {
      var viewDragDismiss = false;
      $L.executeNativeJS(['window', 'setAttr'], {
        dragDismiss: viewDragDismiss
      })
    }
    this.enableSlideBack = function() {
      var viewSlideBack = true;
      $L.executeNativeJS(['window', 'setAttr'], {
        slideBack: viewSlideBack
      })
    }
    this.disableSlideBack = function() {
      var viewSlideBack = false;
      $L.executeNativeJS(['window', 'setAttr'], {
        slideBack: viewSlideBack
      })
    }
    this.setAnimationType = function(animationType) {
      viewAnimationType = animationType;
    }
    this.setAnimationDirection = function(animationDirection) {
      viewAnimationDirection = animationDirection;
    }
    this.setAnimationDuration = function(animationDuration) {
      viewAnimationDuration = animationDuration;
    }
    this.setAnimationCurve = function(animationCurve) {
      viewAnimationCurve = animationCurve;
    }

    /*
     * 返回上一层或返回指定名字的窗口
     * @param String windowname 要返回的windowname  --  不传默认返回上一层 
     */
    this.back = function(windowname) {
      var animation = {
        type: viewAnimationType,
        direction: viewAnimationDirection,
        time: viewAnimationDuration,
        curve: viewAnimationCurve
      }

      if (typeof windowname === 'undefined') {
        $L.executeNativeJS(['window', 'closeSelf'], animation)
      } else {
        $L.executeNativeJS(['window', 'backToWindow'], windowname, animation)
      }
    };

    /*
     * 获取当前窗口的宽度
     */
    this.getWidth = function() {
      return $L.executeNativeJS(['window', 'getWidth']);
    };

    /*
     * 获取当前窗口的高度
     */
    this.getHeight = function() {
      return $L.executeNativeJS(['window', 'getHeight']);
    }

    /*
     * 添加当前页面忽略抽屉手势窗口区域   --- 该方法只用于安卓,主要用于与JS滑动事件冲突时使用
     * @param Number x 区域坐标x值.
     * @param Number y  区域坐标y值.
     * @param Number width 区域宽度.
     * @param Number height 区域高度.
     */
    this.addSlideIgnore = function(x, y, width, height) {
      width = width || this.getWidth();
      height = height || this.getHeight();
      if ($L.android()) {
        height = height * window.devicePixelRatio;
        y = y || y * window.devicePixelRatio;
      }
      var IgnoreParams = {
        x: x || 0,
        y: y || 0,
        width: width,
        height: height
      };
      $L.executeNativeJS(['window', 'addIgnoreArea'], IgnoreParams)
    }


    /*
     * 给当前页面添加下拉刷新
     * @param Object opts 下拉刷新配置项
          {
            contentdown: '下拉可以刷新',
            contentover: '释放立即刷新',
            contentrefresh: '正在刷新...',
            callback:function(){}
          }
      @returns 
     */
    this.addHeaderRefresh = function(opts) {
      headerInitialized = true;
      var refrefshDown = {
        contentdown: '下拉可以刷新',
        contentover: '释放立即刷新',
        contentrefresh: '正在刷新...'
      }
      var settings = {
        statusLabel: {
          pullText: opts.contentdown || refrefshDown.contentdown,
          releaseText: opts.contentover || refrefshDown.contentover,
          refreshingText: opts.contentrefresh || refrefshDown.contentrefresh
        }
      };
      var callback = opts.callback;
      var refresher = {
        setContentFontSize: function(size) {
          if (headerInitialized) {
            settings.statusLabel.font = size;
            $L.executeNativeJS(['window', 'addHeaderRefreshing'], function() {
              $L.isFunction(callback) && callback.call();
            }, settings);
          }
        },
        setContentFontColor: function(color) {
          if (headerInitialized) {
            settings.statusLabel.color = color;
            $L.executeNativeJS(['window', 'addHeaderRefreshing'], function() {
              $L.isFunction(callback) && callback.call();
            }, settings);
          }
        },
        setTimeFontSize: function(size) {
          if (headerInitialized) {
            settings.timeLabel = settings.timeLabel || {}
            settings.timeLabel.font = size;
            $L.executeNativeJS(['window', 'addHeaderRefreshing'], function() {
              $L.isFunction(callback) && callback.call();
            }, settings);
          }
        },
        setTimeFontColor: function(color) {
          if (headerInitialized) {
            settings.timeLabel = settings.timeLabel || {}
            settings.timeLabel.color = color;
            $L.executeNativeJS(['window', 'addHeaderRefreshing'], function() {
              $L.isFunction(callback) && callback.call();
            }, settings);
          }
        },
        setImagePath: function(path) {
          if (headerInitialized) {
            settings.image = path;
            $L.executeNativeJS(['window', 'addHeaderRefreshing'], function() {
              $L.isFunction(callback) && callback.call();
            }, settings);
          }
        },
        completeRefresh: function() {
          if (headerInitialized) {
            $L.executeNativeJS(['window', 'endHeaderRefresh']);
          }
        }
      }
      $L.executeNativeJS(['window', 'addHeaderRefreshing'], function() {
        $L.isFunction(callback) && callback.call();
      }, settings);
      return refresher;
    }


    /*
     * 给当前页面添加上拉加载
     * @param Object opts 上拉加载配置项
          {
            contentdown: '上拉显示更多',
            contentover: '释放立即刷新',
            contentrefresh: '正在加载...',
            callback:function(){}
          }
      @returns 
     */
    this.addFooterRefresh = function(opts) {
      FooterInitialized = true;
      var refrefshUp = {
        contentdown: '上拉显示更多',
        contentover: '释放立即刷新',
        contentrefresh: '正在加载...'
      }
      var settings = {
        statusLabel: {
          pullText: opts.contentdown || refrefshUp.contentdown,
          releaseText: opts.contentover || refrefshUp.contentover,
          refreshingText: opts.contentrefresh || refrefshUp.contentrefresh
        }
      };
      var callback = opts.callback;
      var refresher = {
        setContentFontSize: function(size) {
          if (FooterInitialized) {
            settings.statusLabel.font = size;
            $L.executeNativeJS(['window', 'addFooterRefreshing'], function() {
              $L.isFunction(callback) && callback.call();
            }, settings);
          }
        },
        setContentFontColor: function(color) {
          if (FooterInitialized) {
            settings.statusLabel.color = color;
            $L.executeNativeJS(['window', 'addFooterRefreshing'], function() {
              $L.isFunction(callback) && callback.call();
            }, settings);
          }
        },
        setImagePath: function(path) {
          if (FooterInitialized) {
            settings.image = path;
            $L.executeNativeJS(['window', 'addFooterRefreshing'], function() {
              $L.isFunction(callback) && callback.call();
            }, settings);
          }
        },
        completeRefresh: function() {
          if (FooterInitialized) {
            $L.executeNativeJS(['window', 'endFooterRefresh']);
          }
        }
      }
      $L.executeNativeJS(['window', 'addFooterRefreshing'], function() {
        $L.isFunction(callback) && callback.call();
      }, settings);
      return refresher;
    }

    /*
     * 删除上拉加载
     */
    this.removeFooterRefresh = function() {
      headerInitialized = false;
      $L.executeNativeJS(['window', 'removeFooterRefreshing']);
    }

    /*
     * 删除下拉刷新
     */
    this.removeHeaderRefresh = function() {
      FooterInitialized = false;
      $L.executeNativeJS(['window', 'removeHeaderRefreshing']);
    }

    /*
     * 设置当前页面的位置、长宽
     */
    this.setFrameSize = function(x, y, width, height) {
      width = width || this.getWidth();
      height = height || this.getHeight();
      if ($L.android()) {
        y = y * window.devicePixelRatio;
        height = height * window.devicePixelRatio;
      }
      var rect = {
        x: x || 0,
        y: y || 0,
        width: width,
        height: height
      };
      $L.executeNativeJS(['window', 'setPopoverRect'], rect)
    }

  }

  var currentView = new view();

  /*
   * 获取当前页面对象
   *
   */
  $L.currentView = function() {
    return currentView;
  }

}(app, this));
/*===============================================================================
************   ui native accelerometer   ************
===============================================================================*/
;
(function($L, global) {
	$L.accelerometer = {
		/*
		 * 获取当前设备的加速度信息
		 * @param success:  必选  获取设备加速度信息成功回调函数
		 * @param error: 必选 获取设备加速度信息失败回调函数
		 */
		getCurrentAcceleration: function(success, error) {
			$L.executeNativeJS(['accelerometer', 'getCurrentAcceleration'], function(acceleration) {
				if ($L.isFunction(success)) {
					success.call(global, acceleration);
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(global, err);
				}
			});
		},
		/*
		 * 监听设备加速度变化信息
		 * @param success: 必选 成功回调函数 当获取设备的加速度信息成功时回调，并返回加速度信息。
		 * @param error:  必选 失败回调函数 当获取设备加速度信息失败回调函数，并返回错误信息。
		 * @param options: 加速度信息参数 监听设备加速度信息的参数，更新数据的频率。
		 */
		watchAcceleration: function(success, error, options) {
			if (typeof options === 'undefined') {
				options = {
					frequency: 500
				}
			}
			$L.executeNativeJS(['accelerometer', 'watchAcceleration'], function(acceleration) {
				if ($L.isFunction(success)) {
					success.call(global, acceleration);
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(global, err);
				}
			}, options);
		},

		/*
		 * 关闭监听设备加速度信息
		 */
		clearWatch: function() {
			$L.executeNativeJS(['accelerometer', 'clearWatch']);
		}
	}

}(app, this));
/*===============================================================================
************   ui native actionSheet   ************
===============================================================================*/
;(function($L, global) {
	$L.actionSheet = {
		/*
		 * 显示弹出框。
		 * @param options: 配置参数
			 {
			   property String title  可选 默认值：无 标题
			   property String cancelTitle 可选 默认值：取消 取消按钮标题
			   property String destrutiveTitle 可选 默认值：无 红色警示按钮标题，一般用于做一些删除之类操作
			   property Array buttons 可选 默认值：无 按钮标题
			}
		 * @param success:   必选 选择弹出框上按钮的回调
		 */
		show: function(options, success) {
			$L.executeNativeJS(['actionSheet', 'show'], options, function(index) {
				if ($L.isFunction(success)) {
					success.call(global,index);
				}
			});
		}
	}

}(app, this));
/*===============================================================================
************   ui native audio   ************
===============================================================================*/
;
(function($L, global) {

  var recorder;
  var player;
  var recorderIsRecord = false;
  var recorderIsOver = false;


  $L.audio = {
    /*
     * 获取当前设备的录音对象
     *
     */
    getRecorder: function(opts) {
      !recorder && (recorder = $L.executeNativeJS(['audio', 'getRecorder']))
      opts = opts || {}
      var options = {
        filename: opts.filename || '',
        samplerate: opts.samplerate || 8000,
        format: opts.format || 'aac',
        duration: opts.duration
      }
      return {
        /*
         * 录音
         *
         */
        record: function(success, error) {
          if (recorderIsRecord) {
            throw new Error('当前正在录音，请等待录音完成后再进行新的录音操作！');
          }
          $L.executeObjFunJS([recorder, 'record'], options, function(recordFile) {
            if ($L.isFunction(success)) {
              success.call(global, recordFile);
            }
          }, function(err) {
            if ($L.isFunction(error)) {
              error.call(global, err);
            }
          })
          recorderIsRecord = true;
          recorderIsOver = false;
        },
        /*
         * 录音时,获取当前录音时长.
         *
         */
        getCurrentTime: function() {
          if (!recorderIsRecord) {
            throw new Error('先执行录音操作后，才可获取当前录音时间！');
          }
          var currentTime = $L.executeObjFunJS([recorder, 'getCurrentTime']);
          if (currentTime) {
            return currentTime
          } else {
            return 0
          }
        },
        /*
         * 获取录音时长上限,如果没有设置录音时长上限,则返回-1.
         *
         */
        getDuration: function() {
          var duration = options.duration
          if (duration) {
            return duration
          } else {
            return -1
          }
        },
        /*
         * 如果此回调被添加,则每秒回调一次.通过回调函数返回格式为"mm:ss"的字符串.内容为当前录音时长.
         *
         */
        addCalculateTimeCallback: function(timeCallback) {
          $L.executeObjFunJS([recorder, 'addCalculateTimeCallback'], function(time) {
            if ($L.isFunction(timeCallback)) {
              timeCallback.call(global, time);
            }
          });
        },
        /*
         * 如果此回调被添加,则每秒回调一次.通过回调函数返回格式为"mm:ss"的字符串.内容为录音时长倒计时.
         *
         */
        addCountDownCallback: function(timeCallback) {
          $L.executeObjFunJS([recorder, 'addCountDownCallback'], function(time) {
            if ($L.isFunction(timeCallback)) {
              timeCallback.call(global, time);
            }
          });
        },
        /*
         * 录音时,当音量分贝值有变化时,则通过回调函数返回当前分贝值.此方法添加的回调函数调用频率很高.
         *
         */
        addAveragePowerCallback: function(callback) {
          $L.executeObjFunJS([recorder, 'addAveragePowerCallback'], function(averagePower) {
            if ($L.isFunction(callback)) {
              callback.call(global, averagePower);
            }
          });
        },
        /*
         * 录音完毕之后,播放刚刚录制的声音文件.若想播放其他录音文件,请使用AudioPlayer.
         *
         */
        playJustRecord: function() {
          if (!recorderIsOver) {
            throw new Error('先执行录音操作后，并录音完成后，才可执行播放录音操作！');
          }
          $L.executeObjFunJS([recorder, 'playJustRecord']);
        },
        /*
         * 结束录音操作，通知设备完成录音操作。
         *
         */
        stop: function() {
          if (!recorderIsRecord) {
            throw new Error('先执行录音操作后，才可执行录音结束操作！');
          }
          $L.executeObjFunJS([recorder, 'stop'])
          recorderIsRecord = false;
          recorderIsOver = true;
        }

      }
    },
    /*
     * 创建音频播放对象
     *
     */
    createPlayer: function(path) {
      if (typeof path === undefined) {
        throw new Error("请传入有效的音频路径！");
      }!player && (player = $L.executeNativeJS(['audio', 'createPlayer'], path))
      return {
        play: function(success, error) {
          $L.executeObjFunJS([player, 'play'], function() {
            if ($L.isFunction(success)) {
              success.call();
            }
          }, function(err) {
            if ($L.isFunction(error)) {
              error.call(global, err);
            }
          })
        },
        pause: function() {
          $L.executeObjFunJS([player, 'pause'])
        },
        resume: function() {
          $L.executeObjFunJS([player, 'resume'])
        },
        stop: function() {
          $L.executeObjFunJS([player, 'stop'])
        },
        seekTo: function(position) {
          if (typeof path === undefined) {
            throw new Error("请传入有效的播放时间戳！");
          }
          $L.executeObjFunJS([player, 'seekTo'], position)
        },
        getDuration: function() {
          return $L.executeObjFunJS([player, 'getDuration'])
        },
        getPosition: function() {
          return $L.executeObjFunJS([player, 'getPosition'])
        },
        setRoute: function(route) {
          if (typeof route === undefined) {
            throw new Error("请传入有效的音频输出线路！");
          }
          if (route == 1) {
            route = $L.executeConstantJS(['audio', 'ROUTE_EARPIECE'])
          } else {
            route = $L.executeConstantJS(['audio', 'ROUTE_SPEAKER'])
          }
          $L.executeObjFunJS([player, 'setRoute'], route)
        },
        isPlaying: function() {
          return $L.executeObjFunJS([player, 'isPlaying'])
        },
        addFinishCallback: function(callback) {
          return $L.executeObjFunJS([player, 'addFinishCallback'], function() {
            if ($L.isFunction(callback)) {
              callback.call(global);
            }
          })
        }
      }
    }
  }

}(app, this));
/*===============================================================================
************   ui native audio   ************
===============================================================================*/
;(function($L, global) {

  var filename;
  var resolution;
  var index;
  var camera = {
    captureImage: function(success, error) {
      var options = {
        filename: filename,
        resolution: resolution,
        index: index
      }
      $L.executeNativeJS(['camera', 'captureImage'], function(capturedFile) {
        if ($L.isFunction(success)) {
          success.call(global, capturedFile);
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(global, err);
        }
      }, options)

    },
    captureVideo: function(success, error) {
      var options = {
        filename: filename,
        resolution: resolution,
        index: index
      }
      $L.executeNativeJS(['camera', 'captureVideo'], function(capturedFile) {
        if ($L.isFunction(success)) {
          success.call(global, capturedFile);
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(global, err);
        }
      }, options)

    }

  }

  $L.camera = {
    getCamera: function(fname, rlution, cameraType) {
      if (typeof fname === 'undefined') {
        throw new Error("请传入有效的文件保存的路径！");
      }
      filename = fname
      if (rlution == 0) {
        resolution = $L.executeConstantJS(['camera', 'ResolutionTypeHigh'])
      } else if (rlution == 1) {
        resolution = $L.executeConstantJS(['camera', 'ResolutionTypeMedium'])
      } else if (rlution == 2) {
        resolution = $L.executeConstantJS(['camera', 'ResolutionTypeLow'])
      } else if (rlution == 3) {
        resolution = $L.executeConstantJS(['camera', 'ResolutionTypeIFrame640x480'])
      } else if (rlution == 4) {
        resolution = $L.executeConstantJS(['camera', 'ResolutionTypeIFrame1280x720'])
      } else if (rlution == 5) {
        resolution = $L.executeConstantJS(['camera', 'ResolutionTypeIFrame960x540'])
      }
      if (cameraType = 1) {
        index = cameraType
      } else {
        index = 0
      }
      return camera;
    }
  }

}(app, this));
/*===============================================================================
************   ui native contacts   ************
===============================================================================*/
;(function($L, global) {

  var AddressBook = function(type) {
    if (type == 1) {
      type = $L.executeConstantJS(['contacts', 'ADDRESSBOOK_SIM'])
    } else {
      type = $L.executeConstantJS(['contacts', 'ADDRESSBOOK_PHONE'])
    }
    this.create = function(success, error) {
      $L.executeNativeJS(['contacts', 'getAddressBook'], type, function(addressbook) {
        if ($L.isFunction(success)) {
          success.call(global, addressbook.create());
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(global, err);
        }
      });
    };
    this.find = function(findOptions, success, error) {

      $L.executeNativeJS(['contacts', 'getAddressBook'], type, function(addressbook) {
          addressbook.find(function(res) {
              if ($L.isFunction(success)) {
                res = res || []
                success.call(global, res);
              }
            },
            function(err) {
              if ($L.isFunction(error)) {
                error.call(global, err);
              }
            },
            findOptions
          );
        },
        function(err) {
          if ($L.isFunction(error)) {
            error.call(global, err);
          }
        }
      );
    }

  }

  $L.contacts = {
    getAddressBook: function(type) {
      if (type != 1) {
        type = 0
      }
      return new AddressBook(type)
    }
  }

}(app, this));
/*===============================================================================
************   ui native database   ************
===============================================================================*/
;(function($L, global) {


	var dataBaseObj = function(databaseName) {
		var dataBase = $L.executeNativeJS(['dataBase', 'open'], databaseName);

		/*
		 * 执行某一个Sql语句。
		 * @param sql : 必选 要执行的Sql语句,例如：'CREATE TABLE IF NOT EXISTS t_students (id integer PRIMARY KEY AUTOINCREMENT,name text,age integer,number DOUBLE,buer BOOL)'
		 * @return flag : 成功：1 , 失败：0
		 */
		this.executeSql = function(sql) {
			if (typeof sql === undefined) {
				throw new Error("请传入有效的sql语句！");
			}
			return $L.executeObjFunJS([dataBase, 'executeSql'], sql);
		}

		/*
		 * 关闭数据库。
		 */
		this.close = function() {
			return $L.executeObjFunJS([dataBase, 'close']);
		}

		/*
		 * 删除数据库。
		 */
		this.deleteDataBase = function() {
			return $L.executeObjFunJS([dataBase, 'deleteDataBase']);
		}

		/*
		 * 查找所有符合条件的数据。
		 * @param sql :要执行的Sql语句,例如：'select * from t_students'
		 */
		this.selectAll = function(sql) {
			if (typeof sql === undefined) {
				throw new Error("请传入有效的sql语句！");
			}
			return $L.executeObjFunJS([dataBase, 'selectAll'], sql);
		}

		/*
		 * 开始事务。
		 */
		this.beginTransaction = function() {
			$L.executeObjFunJS([dataBase, 'beginTransaction']);
		}

		/*
		 * 提交事务。
		 */
		this.commit = function() {
			$L.executeObjFunJS([dataBase, 'commit']);
		}

		/*
		 * 事务回滚。
		 */
		this.rollback = function() {
			$L.executeObjFunJS([dataBase, 'rollback']);
		}
	}


	$L.dataBase = {
		/*
		 * 打开一个dataBase，获得一个dataBase对象，若存在此对象，则直接返回；若不存在，则创建一个新的dataBase。
		 * @param databaseName : (String) : 必选 支持名字(在默认路径创建数据库)和协议路径(请参照以下的协议路径)
		 	res : 程序资源路径，相当于app目录
			data : 用户自定义数据路径，相当于数据目录
			cache : 缓存路径
			cpts : components路径，相当于component所在的上级目录
			cpt : 当前component所在的路径
		 * @return DataBase : 数据库对象
		 */
		open: function(databaseName) {
			return new dataBaseObj(databaseName);
		}
	}

}(app, this));
/*===============================================================================
************   ui native device   ************
===============================================================================*/
;(function($L, global) {

	$L.device = {
		/*
		 * 獲取设备的国际移动设备身份码
		 */
		getImei: function() {
			return $L.executeConstantJS(['device', 'imei']);
		},
		/*
		 * 獲取设备的国际移动用户识别码
		 */
		getImsi: function() {
			return $L.executeConstantJS(['device', 'imsi']);
		},
		/*
		 * 獲取设备的型号
		 */
		getModel: function() {
			return $L.executeConstantJS(['device', 'model']);
		},
		/*
		 * 獲取设备的生产厂商
		 */
		getVendor: function() {
			return $L.executeConstantJS(['device', 'vendor']);
		},
		/*
		 * 獲取设备的唯一标识
		 */
		getUuid: function() {
			return $L.executeConstantJS(['device', 'uuid']);
		},
		/*
		 * 拨打电话
		 * @param number: ( String ) 必选 要拨打的电话号码
		 * @param confirm: ( Boolean ) 可选 是否弹出确认对话框，默认false
		 */
		dial: function(number, confirm) {
			if (typeof number === undefined) {
				throw new Error("请传入有效的手机号码！");
			}
			if (!confirm) {
				confirm = false;
			}
			$L.executeNativeJS(['device', 'dial'], number, confirm);
		},
		/*
		 * 发出蜂鸣声
		 * @param times: ( Number ) 可选 蜂鸣声重复的次数，默认发出一次蜂鸣声，ios不支持
		 */
		beep: function(times) {
			if (!times) times = 1
			$L.executeNativeJS(['device', 'beep'], times);
		},
		/*
		 * 设备振动
		 * @param milliseconds: ( Number ) 必选 设备振动持续的时间，单位为ms，默认为500ms。ios不支持
		 */
		vibrate: function(milliseconds) {
			if (!milliseconds) milliseconds = 500
			$L.executeNativeJS(['device', 'vibrate'], milliseconds);
		},
		/*
		 * 设置应用保持唤醒（屏幕常亮）状态
		 */
		setWakeUp: function() {
			$L.executeNativeJS(['device', 'setWakelock'], true);
		},
		/*
		 * 关闭程序保持唤醒状态。
		 */
		setWakeOff: function() {
			$L.executeNativeJS(['device', 'setWakelock'], false);
		},
		/*
		 * 获取程序是否一直保持唤醒（屏幕常亮）状态
		 */
		isWakelock: function() {
			return $L.executeNativeJS(['device', 'isWakelock']);
		},
		/*
		 * 设置设备的系统音量
		 * @param volume: ( Number ) 必选 设备的系统音量值 取值范围为0到1，0表示静音，1表示最大音量值。设置设备音量后对所有程序生效，退出程序系统仍然保持最后设定的音量值。
		 */
		setVolume: function(volume) {
			$L.executeNativeJS(['device', 'setVolume'], volume);
		},
		/*
		 * 获取设备的系统音量
		 */
		getVolume: function() {
			return $L.executeNativeJS(['device', 'getVolume']);
		}
	}

}(app, this));
/*===============================================================================
************   ui native downloader   ************
===============================================================================*/
;(function($L, global) {

	var downloader = function(url, option, download) {
		if (!download) download = $L.executeNativeJS(['downloader', 'createDownload'], url, option);
		this.getId = function() {
			if (download) return download.id;
		}
		this.getUrl = function() {
			if (download) return download.url;
		}
		this.getPath = function() {
			if (download) return download.filePath;
		}
		this.getState = function() {
			if (download) return download.state;
		}
		this.getOptions = function() {
			if (download) {
				return download.option;
			} else {
				return {
					method: undefined,
					filePath: undefined,
					timeout: undefined,
					retry: undefined
				}
			}
		}
		this.getDownloadedSize = function() {
			if (download) return download.downloadedSize;
		}
		this.getTotalSize = function() {
			if (download) return download.totalSize;
		}
		this.start = function() {
			$L.executeObjFunJS([download, 'start'])
		}
		this.pause = function() {
			$L.executeObjFunJS([download, 'pause'])
		}
		this.resume = function() {
			$L.executeObjFunJS([download, 'resume'])
		}
		this.abort = function() {
			$L.executeObjFunJS([download, 'abort'])
		}
		this.addEventListener = function(listener) {
			$L.executeObjFunJS([download, 'addEventListener'],function(dl,status){
				if ($L.isFunction(listener)) {
					listener.call(global, this,status);
				}
			})
		}
		this.removeEventListener = function() {
			$L.executeObjFunJS([download, 'removeEventListener'])
		}
		this.addCompletedListener = function(listener) {
			$L.executeObjFunJS([download, 'addCompletedListener'],function(dl,status){
				if ($L.isFunction(listener)) {
					listener.call(global, this,status);
				}
			})
		}
		this.removeCompletedListener = function() {
			$L.executeObjFunJS([download, 'removeCompletedListener'])
		}
	}


	$L.downloader = {
		/*
		 * 新建下载任务
		 * @return downloader
		 */
		createDownload: function(url, option) {
			return new downloader(url, option);
		},

		/*
		 * 清除指定状态的下载任务。
		 * @param state: ( 下载任务状态 ) 必选 要清除下载任务的状态。
		 */
		clear: function(state) {
			if(!state) state = -1;
			$L.executeNativeJS(['downloader', 'clear'], state);
		},

		/*
		 * 枚举指定任务状态的下载任务
		 * @param state: ( 下载任务状态 ) 要清除下载任务的状态。
		 * @return downloads
		 */
		enumerate: function(state) {
			if(!state) state = -1;
			var downloads = $L.executeNativeJS(['downloader', 'enumerate'], state);
			if(downloads && $L.isArray(downloads)){
				return downloads;
			}else{
				return [];
			}
		},

		/*
		 * 通过id获取任务，如果当任务下载时，程序出现异常（断网、进程被杀），再次下载时可通过此方法获取以前未下载完的任务执行start继续下载，这样可节约系统资源。
		 * @param state: ( 下载任务状态 ) 必选 要获取下载任务的id。
		 * @return download
		 */
		getDownLoaderById: function(id) {
			if(!id) throw new Error("请传入有效的下载任务ID！");
			var download = $L.executeNativeJS(['downloader', 'enumerateById'], id);
			return  download;
		},

		/*
		 * 清除单个下载任务
		 * @param id: ( Number ) 必选 要清除下载任务的id。
		 */
		remove: function(id) {
			$L.executeNativeJS(['downloader', 'remove'],id);
		},

		/*
		 * 设置并发任务最大数
		 */
		setMaxRunningSize: function(num) {
			$L.executeNativeJS(['downloader', 'setMaxRunningSize'],num);
		},

		/*
		 * 设置总下载速度
		 */
		setSpeed: function(speed) {
			$L.executeNativeJS(['downloader', 'setSpeed'],speed);
		},

		/*
		 * 开始所有下载任务。
		 */
		startAll: function() {
			$L.executeNativeJS(['downloader', 'startAll']);
		},

		
	}

}(app, this));
/*===============================================================================
************   ui native eventListener   ************
===============================================================================*/
;
(function($L, global) {
	$L.event = {
		/*
		 * 为当前页添加一个事件监听。
		 * @param eventName: ( String ) 必选 事件名称
		 * @param callback: 必选 事件回调\
		 */
		addEvent: function(eventName, callback) {
			if ('network_state_changed' == eventName) {
				this.addNetWorkChangeEvent(callback);
			} else if ('battery_state_changed' == eventName) {
				this.addBatteryChangeEvent(callback);
			} else {
				$L.executeNativeJS(['eventListener', 'addEventListener'], eventName, function(evt) {
					if ($L.isFunction(callback)) {
						callback.call(global, evt);
					}
				});
			}
		},

		/*
		 * 移除当前页面指定事件监听，如果当前页面移除掉，事件监听将自动移除
		 * @param eventName: ( String ) 必选 事件名称
		 */
		removeEvent: function(eventName) {
			$L.executeNativeJS(['eventListener', 'removeEventListener'], eventName);
		},

		/*
		 * 移除当前页面指定事件监听，如果当前页面移除掉，事件监听将自动移除
		 * @param eventName: ( String ) 必选 事件名称
		 * @param evt: ( Json对象 ) 可选 addevent Callback回调函数的参数
		 */
		sendEvent: function(eventName, evt) {
			$L.executeNativeJS(['eventListener', 'sendEvent'], eventName, evt);
		},

		/*
		 * 添加网络状态变化事件监听
		 * @param callback: 必选 事件回调
		 */
		addNetworkChangeEvent: function(callback) {
			$L.executeNativeJS(['eventListener', 'addEventListener'], 'network_state_changed', function(evt) {
				if ($L.isFunction(callback)) {
					callback.call(global, evt.state);
				}
			});
		},

		/*
		 * 删除网络状态变化事件监听
		 * @param callback: 必选 事件回调
		 */
		removeNetworkChangeEvent: function(callback) {
			$L.executeNativeJS(['eventListener', 'removeEventListener'], 'network_state_changed');
		},

		/*
		 * 添加电池状态变化事件监听
		 * @param callback: 必选 事件回调
		 */
		addBatteryChangeEvent: function(callback) {
			$L.executeNativeJS(['eventListener', 'addEventListener'], 'battery_state_changed', function(evt) {
				if ($L.isFunction(callback)) {
					callback.call(global, evt.state);
				}
			});
		},

		/*
		 * 删除电池状态变化事件监听
		 * @param callback: 必选 事件回调
		 */
		removeBatteryChangeEvent: function(callback) {
			$L.executeNativeJS(['eventListener', 'addEventListener'], 'battery_state_changed');
		}
	}

}(app, this));
/*===============================================================================
************   ui native gallery   ************
===============================================================================*/
;(function($L, global) {
  $L.gallery = {
    pick: function(success, error, opts) {
      var option = {
        filter: 'image',
        multiple: true
      }
      if ($L.isPlainObject(error)) {
        opts = error;
      }
      if (opts) {
        if (!opts.multiple) option.multiple = false
        if (opts.filter == 'video') option.filter = 'video'
        if (opts.filter == 'none') option.filter = 'none'
      }
      $L.executeNativeJS(['gallery', 'pick'], function(paths) {
        if ($L.isFunction(success)) {
          success.call(global, paths);
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(global, err);
        }
      }, option)
    },
    save: function(path, success, error) {
      $L.executeNativeJS(['gallery', 'save'], path, function(info) {
        if ($L.isFunction(success)) {
          success.call(global, info);
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(global, err);
        }
      })
    }
  }

}(app, this));
/*===============================================================================
************   ui native geolocation   ************
===============================================================================*/
;(function($L, global) {
	$L.geolocation = {
		/*
		 * 获取当前设备位置信息
		 * @param success:  获取设备位置信息成功回调函数
		 * @param error: 获取设备位置信息失败回调函数
		 * @param options: 获取设备位置信息的参数
		 */
		getCurrentPosition: function(success, error, options) {
			if ($L.isPlainObject(error)) {
				options = error;
			}
			$L.executeNativeJS(['geolocation', 'getCurrentPosition'], function(position) {
				if ($L.isFunction(success)) {
					success.call(global, position);
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(global, err);
				}
			}, options);
		},

		/*
		 * 监听设备位置变化信息
		 * @param success:  获取设备位置信息成功回调函数
		 * @param error: 获取设备位置信息失败回调函数
		 * @param options: 获取设备位置信息的参数
		 */
		watchPosition: function(success, error, options) {
			if ($L.isPlainObject(error)) {
				options = error;
			}
			$L.executeNativeJS(['geolocation', 'watchPosition'], function(position) {
				if ($L.isFunction(success)) {
					success.call(global, position);
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(global, err);
				}
			}, options);
		},

		/*
		 * 关闭监听设备位置信息
		 */
		clearWatch: function() {
			$L.executeNativeJS(['geolocation', 'clearWatch']);
		}
	}

}(app, this));
/*===============================================================================
************   ui native httpManager   ************
===============================================================================*/
;(function($L, global) {
	var XMLHttpRequest = function() {
		var isOpened = false;
		var isAbort = false;
		var settings = {};
		var self = this;
		settings.offline = 'undefined';
		settings.expires = 0;
		settings.bodyType = 'text';
		this.open = function(url, method, timeout) {
			if (typeof url === 'undefined') {
				throw new Error("请传入有效的请求地址！");
			}
			settings.method = method || 'GET';
			settings.url = url;
			settings.timeout = timeout || 30000;
			isOpened = true;
		};
		this.send = function(body, dataType) {
			isAbort = false;
			if (!isOpened) {
				throw new Error("执行send方法失败，请确保请求对象为OPENDE状态！");
			}
			if (body && $L.isPlainObject(body)) {
				if (body.json && $L.isPlainObject(body.json)) body.json = JSON.stringify(body.json)
				settings.body = body
			}

			settings.dataType = dataType || 'json';
			$L.executeNativeJS(['httpManager', 'sendRequest'], settings, function(response, data) {
				if (self.onSuccess && $L.isFunction(self.onSuccess) && !isAbort) {
					self.onSuccess.call(global, data, response);
				}

			}, function(code, response, Message) {
				if (self.onError && $L.isFunction(self.onError) && !isAbort) {
					self.onError.call(global, Message, code, response);
				}
			});

		};
		this.postForm = function(data, dataType, files) {
			isAbort = false;
			if (!isOpened) {
				throw new Error("执行postForm方法失败，请确保请求对象为OPENDE状态！");
			}
			var form = {};
			if (data) {
				if (typeof data === 'string') data = JSON.parse(data)
				form.values = data;
			}
			if (files) form.files = files;
			settings.form = form;
			settings.dataType = dataType || 'json';
			$L.executeNativeJS(['httpManager', 'sendRequest'], settings, function(response, data) {
				if (self.onSuccess && $L.isFunction(self.onSuccess) && !isAbort) {
					self.onSuccess.call(global, data, response);
				}

			}, function(code, response, message) {
				if (self.onError && $L.isFunction(self.onError) && !isAbort) {
					self.onError.call(global, message, code, response);
				}
			});

		};
		this.abort = function() {
			isAbort = true;
		};
		this.setHeader = function(headerName, headerValue) {
			if (!isOpened) {
				throw new Error("执行setHeader方法失败，请确保请求对象为OPENDE状态！");
			}
			if (settings.HTTPHeader) {
				if (headerName && headerValue) settings.HTTPHeader[headerName.toLowerCase()] = headerValue;
			} else {
				settings.HTTPHeader = {};
				if (headerName && headerValue) settings.HTTPHeader[headerName.toLowerCase()] = headerValue;
			}
		};
		this.setOffline = function(type) {
			if (!isOpened) {
				throw new Error("执行setOffline方法失败，请确保请求对象为OPENDE状态！");
			}
			if (type == 'true') {
				settings.offline = 'true';
			} else if (type == 'false') {
				settings.offline = 'false';
			} else if (type == 'none') {
				settings.offline = 'undefined';
			}
		};
		this.setExpires = function(ms) {

			if (!isOpened) {
				throw new Error("执行setExpires方法失败，请确保请求对象为OPENDE状态！");
			}
			if (ms) settings.expires = ms;
		};
		this.setCertificate = function(path, password) {
			if (!isOpened) {
				throw new Error("执行setCertificate方法失败，请确保请求对象为OPENDE状态！");
			}
			if (settings.certificate) {
				if (path) settings.certificate['path'] = path;
				if (password) settings.certificate['password'] = password;
			} else {
				settings.certificate = {};
				if (path) settings.certificate['path'] = path;
				if (password) settings.certificate['password'] = password;
			}
		};
	}



	$L.http = {

		/*
		 * 获取网络请求对象
		 */
		XMLHttpRequest: function() {
			return new XMLHttpRequest();
		},
		/*
		 * 执行ajax请求
		 */
		ajax: function(url, settings) {
			var xhr = new XMLHttpRequest();
			if (settings) {
				xhr.open(url, settings.type, settings.timeout);
				if (settings.headers)
					for (name in settings.headers) xhr.setHeader(name, settings.headers[name])
				xhr.setOffline(settings.offline);
				xhr.setExpires(settings.expires);
				if (settings.certificate) xhr.setCertificate(settings.certificate['path'], settings.certificate['password']);

				if (settings.success && typeof(settings.success) === "function") {
					xhr.onSuccess = function(data, response) {
						settings.success.call(global, data, response);
					}
				}
				if (settings.error && typeof(settings.error) === "function") {
					xhr.onError = function(message, code, response) {
						settings.error.call(global, message, code, response);
					}
				}

				xhr.send(settings.data, settings.dataType);
			} else {
				xhr.open(url);
				xhr.send();
			}
			return xhr;
		},
		/*
		 * 执行get请求
		 */
		get: function(url, data, dataType, success) {
			if (typeof(data) === "function") {
				return this.ajax(url, {
					success: data
				})
			} else if (typeof(dataType) === "function") {
				return this.ajax(url, {
					data: data,
					success: dataType
				})
			} else {
				return this.ajax(url, {
					data: data,
					dataType: dataType,
					success: success
				})
			}
		},
		/*
		 * 执行getJSON请求
		 */
		getJSON: function(url, data, success) {
			if (typeof(data) === "function") {
				return this.ajax(url, {
					success: data
				})
			} else {
				return this.ajax(url, {
					data: data,
					success: success
				})
			}
		},
		/*
		 * 执行fileUpload请求
		 */
		fileUpload: function(url, files, data, dataType, success) {
			var xhr = new XMLHttpRequest();
			xhr.open(url, 'POST');

			if (typeof(data) === "function") {
				success = data;
				data = undefined;
				dataType = undefined;
			} else if (typeof(dataType) === "function") {
				success = dataType;
				dataType = undefined;
			}

			if (success && typeof(success) === "function") {
				xhr.onSuccess = function(data, response) {
					success.call(global, data, response);
				}
			}
			xhr.postForm(data, dataType, files);
			return xhr;
		}
	}

}(app, this));
/*===============================================================================
************   ui native log   ************
===============================================================================*/
;(function($L, global) {
	$L.log = {
		/*
		 * 将Information发送到IDE控制台。
		 * @param info: 发送的信息
		 */
		info: function(info) {
			$L.executeNativeJS(['log', 'i'], info);
		},

		/*
		 * 将warning发送到IDE控制台。
		 * @param info: 发送的信息
		 */
		warning: function(info) {
			$L.executeNativeJS(['log', 'w'], info);
		},

		/*
		 * 将error发送到IDE控制台。
		 * @param info: 发送的信息
		 */
		error: function(info) {
			$L.executeNativeJS(['log', 'e'], info);
		}
	}

}(app, this));
/*===============================================================================
************   ui native message   ************
===============================================================================*/
;(function($L, global) {

	var message = function(type) {
		var recipients = [];
		this.setRecipients = function(rp) {
			recipients = rp;
		}
		this.send = function(msg, success, error) {
			if (typeof msg === 'undefined') {
				throw new Error("请传入有效消息内容！");
			} else if (typeof recipients === 'undefined') {
				throw new Error("请設置有效的收件人信息！");
			} else if (!$L.isArray(recipients)) {
				throw new Error("收件人信息必須是數組對象！");
			}
			var mo = $L.executeNativeJS(['message', 'createMessage'], type);
			if (mo) {
				mo.to = recipients;
				mo.body = msg;
			}


			$L.executeNativeJS(['message', 'sendMessage'], mo, function() {
				if ($L.isFunction(success)) {
					success.call();
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(global, err);
				}
			});
		}
	}


	$L.message = {
		/*
		 * 创建消息对象
		 * @return message
		 */
		createMessage: function(type) {
			if (typeof type === 'undefined') {
				type = 1
			}
			return new message(type);
		}
	}

}(app, this));
/*===============================================================================
************   ui native networkinfo   ************
===============================================================================*/
;(function($L, global) {
  $L.networkinfo = {
// 网络连接状态未知 0
// 未连接网络 1
// 有线网络 2
// 无线WIFI网络 3
// 蜂窝移动2G网络 4
// 蜂窝移动3G网络 5
// 蜂窝移动4G网络 6
    getCurrentType: function(option, success, error) {
      return $L.executeNativeJS(['networkinfo', 'getCurrentType']);
    }
  }

}(app, this));
/*===============================================================================
************   ui native os   ************
===============================================================================*/
;(function($L, global) {
	$L.os = {
		/*
		 * 獲取系统语言信息
		 */
		getLanguage: function() {
			return $L.executeConstantJS(['os', 'language']);
		},
		/*
		 * 獲取系统版本信息
		 */
		getVersion: function() {
			return $L.executeConstantJS(['os', 'version']);
		},
		/*
		 * 獲取系统的名称
		 */
		getName: function() {
			return $L.executeConstantJS(['os', 'name']);
		},
		/*
		 * 獲取系统的供应商信息
		 */
		getVendor: function() {
			return $L.executeConstantJS(['os', 'vendor']);
		}
	}

}(app, this));
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
/*===============================================================================
************   ui native progress   ************
===============================================================================*/
;(function($L, global) {
	var fade = 0, //值为 0 进度提示框以渐隐渐显动画呈现
		zoom = 1; //值为 1 进度提示框以缩放动画呈现
	$L.progress = {
		/*
		 * 显示进度框。
		 * @param options:  ( JSON对象 ) 必选  进度条配置项
		 * @param animationtype: 可选项，设置弹出框显示时的动画类型
		 */
		showProgress: function(options, animationtype) {
			if (animationtype == fade || animationtype == zoom) {
				$L.executeNativeJS(['progress', 'showProgress'], animationtype, options);
			} else {
				$L.executeNativeJS(['progress', 'showProgress'], options);
			}
		},

		/*
		 * 隐藏进度提示框。
		 */
		hideProgress: function() {
			$L.executeNativeJS(['progress', 'hideProgress']);
		},

		/*
		 * 显示进度提示框，但是设置的时间一到就会消失。
		 * @param time: 显示的时间，时间过后自动消失，单位是秒
		 * @param options: ( JSON对象 ) 必选  进度条配置项
		 	注：options中的images如果没有值，不会显示progress的默认白色动画轮子
		 */
		showToast: function(time, options) {
			$L.executeNativeJS(['progress', 'showToast'], time, options);
		}
	}

}(app, this));
/*===============================================================================
************   ui native properties   ************
===============================================================================*/
;(function($L, global) {


	var properties = function(domain, fileName) {
		var propertie = $L.executeNativeJS(['properties', 'openProperties'], domain, fileName);

		/*
		 * 设置属性值
		 * @param key: ( String ) 必选 键值
		 * @param value: ( String ) 必选 属性值
		 */
		this.put = function(key, value) {
			$L.executeObjFunJS([propertie, 'putProperty'], key, value);
		}

		/*
		 * 获取属性值
		 * @param key: ( String ) 必选 键值
		 */
		this.get = function(key) {
			return $L.executeObjFunJS([propertie, 'getProperty'], key);
		}

		/*
		 * 删除属性值
		 * @param key: ( String ) 必选 键值
		 */
		this.delete = function(key) {
			$L.executeObjFunJS([propertie, 'deleteProperty'], key);
		}

		/*
		 * 清除所有属性
		 */
		this.clean = function() {
			$L.executeObjFunJS([propertie, 'clean']);
		}

		/*
		 * 保存操作
		 */
		this.save = function() {
			return $L.executeObjFunJS([propertie, 'save']);
		}
	}


	$L.properties = {
		/*
		 * 如果property文件不存在，新建相应的property，如果存在，直接读取
		 * @param domain : ( String ) 必选 一级文件夹。
		 * @param fileName :  ( String ) 必选 文件名。
		 * @return Property  : 新建的property对象
		 */
		open: function(domain, fileName) {
			return new properties(domain, fileName);
		}
	}

}(app, this));
/*===============================================================================
************   ui native screen   ************
===============================================================================*/
;(function($L, global) {
		$L.screen = {
			/*
			 * 獲取设备屏幕宽度分辨率
			 */
			getResolutionWidth: function() {
				return $L.executeConstantJS(['screen', 'resolutionWidth']);
			},
			/*
			 * 獲取设备屏幕高度分辨率
			 */
			getResolutionHeight: function() {
				return $L.executeConstantJS(['screen', 'resolutionHeight']);
			},
			/*
			 * 獲取逻辑分辨率与实际分辨率的比例
			 */
			getScale: function() {
				return $L.executeConstantJS(['screen', 'scale']);
			},
			/*
			 * 獲取设备屏幕水平方向的密度
			 */
			getDpiX: function() {
				return $L.executeConstantJS(['screen', 'dpiX']);
			},
			/*
			 * 獲取设备屏幕垂直方向的密度
			 */
			getDpiY: function() {
				return $L.executeConstantJS(['screen', 'dpiY']);
			},
			/*
			 * 调用此方法调节设备屏幕亮度。
			 * @param brightness: ( Number ) 必选 屏幕的亮度值 取值范围为0到1，0表示最低亮度值，1表示最高亮度值。设置屏幕亮度仅对当前程序在前台运行时有效，退出程序后屏幕亮度由系统设置的值决定。
			 */
			setBrightness: function(brightness) {
				$L.executeNativeJS(['screen', 'setBrightness'], brightness)
			},
			/*
			 * 获取屏幕亮度值
			 */
			getBrightness: function() {
				return $L.executeNativeJS(['screen', 'getBrightness']);
			},
			/*
			 * 锁定屏幕方向,iOS不支持.
			 */
			lockOrientation: function() {
				$L.executeNativeJS(['screen', 'lockOrientation']);
			},
			/*
			 * 解除锁定屏幕方向,iOS不支持.
			 */
			unLockOrientation: function() {
				$L.executeNativeJS(['screen', 'unlockOrientation']);
			}
	}

}(app, this));
/*===============================================================================
************   ui native socketManager   ************
===============================================================================*/
;(function($L, global) {


	var socketManager = function(options, callback) {
		var socket = $L.executeNativeJS(['require'], 'socketManager');
		$L.executeObjFunJS([socket, 'createSocket'], options, function(state,info){
			if ($L.isFunction(callback)) {
					callback.call(global,state,info);
				}
			});

		/*
		 * 关闭socket，断开与服务器的连接
		 */
		this.close = function(key, value) {
			$L.executeObjFunJS([socket, 'closeSocket']);
		}

		/*
		 * 向服务器发送消息
		 * @param data: ( String ) 必选 要发送的内容
		 * @param tag: ( Number ) 可选 消息的标识，仅用于tcp类型，默认为0
		 */
		this.write = function(data, tag) {
			$L.executeObjFunJS([socket, 'write'], data, tag);
		}
	}


	$L.socket = {
		/*
		 * 创建一个tcp或udp socket连接，连接到指定服务器，参数可设置socket服务器ip地址，端口号，连接超时时间
		 * @param options : 必选 socket设置参数
		 * @param callback : 状态回调
		 * @return socket 
		 */
		create: function(options, callback) {
			return new socketManager(options, callback);
		}
	}

}(app, this));
/*===============================================================================
************   ui native storage   ************
===============================================================================*/
;(function($L, global) {
	$L.storage = {
		/*
		 * 获取应用存储区中保存的键值对的个数
		 */
		getLength: function() {
			return $L.executeNativeJS(['storage', 'getLength']);
		},
		/*
		 * 通过键(key)检索获取应用存储的值
		 * @param key : (String) 必选 存储的键值
		 */
		get: function(key) {
			return $L.executeNativeJS(['storage', 'getItem'], key);
		},
		/*
		 * 修改或添加键值(key-value)对数据到应用数据存储中
		 * @param key : (String) 必选 存储的键值
		 * @param value : (String) 必选 存储的内容
		 */
		set: function(key, value) {
			$L.executeNativeJS(['storage', 'setItem'], key, value);
		},
		/*
		 * 通过key值删除键值对存储的数据
		 * @param key : (String) 必选 存储的键值
		 */
		remove: function(key) {
			$L.executeNativeJS(['storage', 'removeItem'], key);
		},
		/*
		 * 清除应用所有的键值对存储数据
		 */
		clear: function() {
			$L.executeNativeJS(['storage', 'clear']);
		},
		/*
		 * 获取键值对中指定索引值的key值
		 * @param index: (Number) 必选 存储键值的索引
		 */
		key: function(index) {
			return $L.executeNativeJS(['storage', 'key'], index)
		}
	}

}(app, this));
/*===============================================================================
************   ui native zip   ************
===============================================================================*/
;(function($L, global) {
	$L.zip = {
		/*
		 * 用于压缩Zip文件
		 * @param src: ( String ) 必选 要压缩的源文件路径，支持文件路径或目录，必须为协议路径。例如："res://...."
		 * @param zipfile: ( String ) 必选 压缩后保存的Zip文件路径,仅支持data协议路径："data://...."
		 * @param success:  必选 压缩Zip文件操作成功回调，在压缩操作成功时调用
		 * @param error: 必选 压缩Zip文件操作失败回调，在压缩操作失败时调用
		 */
		compress: function(src, zipfile, success, error) {
			$L.executeNativeJS(['zip', 'compress'], src, zipfile, function() {
				if ($L.isFunction(success)) {
					success.call();
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(global, err);
				}
			});
		},
		/*
		 * 用于解压缩Zip文件。
		 * @param zipfile: ( String ) 必选 需解压Zip文件路径。
		 * @param target: ( String ) 必选 解压Zip文件的目标路径，必须是路径。
		 * @param success: 必选 解压Zip文件操作成功回调，在解压操作成功时调用。
		 * @param error:  必选 解压Zip文件操作失败回调，在解压操作失败时调用。
		 */
		decompress: function(zipfile, target, success, error) {
			$L.executeNativeJS(['zip', 'decompress'], zipfile, target, function() {
				if ($L.isFunction(success)) {
					success.call();
				}
			}, function(err) {
				if ($L.isFunction(error)) {
					error.call(global, err);
				}
			});
		}
	}

}(app, this));
;
(function($L, global) {
	$L.debug = function() {
		var uuid = 0;
		var xhr = {}
		window.addEventListener('message', function(e) {
			var origin = e.origin;
			// if (origin != 'http://localhost:3000') {
			var res = JSON.parse(e.data)
			var type = res.type;
			if (type == 'init') {
				$L.debug.isReady = true;
			} else if (type == 'ajax') {
				var token = res.token;
				var success = xhr[token].success;
				var error = xhr[token].error;
				var data = res.data;
				var dataType = xhr[token].dataType;
				if (dataType == 'json') {
					if ($L.isFunction(success)) {
						data = JSON.parse(data)
						success.call(global, {}, data)
					}
				} else {
					if ($L.isFunction(success)) {
						success.call(global, {}, data)
					}
				}
			}
			// }
		}, false);

		var GetQueryString = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return (r[2]);
			return null;
		}
		var getPageDir = function() {
			var div = document.createElement('div');
			div.innerHTML = '<a href="./"></a>';
			var pageDir = div.firstChild.href;
			div = null;
			return pageDir;
		}
		var postMessage = function(js) {
			window.parent.postMessage(js, '*');
			// window.parent.postMessage(js, 'http://localhost:3000');
		}

		$L.executeNativeJS = function() {
			var args = Array.prototype.slice.call(arguments, 1);
			if (arguments[0][0] == 'window' && arguments[0][1] == 'openWindow') {
				var windowname = args[0]
				var url = getPageDir() + args[2]
				var js = "openWindow('" + windowname + "','" + url + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'closeSelf') {
				var pageId = GetQueryString('pageId');
				var js = "closeWindow('" + windowname + "','" + pageId + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'openPopover') {
				var popname = args[0]
				var url = getPageDir() + args[2]
				var rect = JSON.stringify(args[3])
				var windowname = GetQueryString('pageId');
				var js = "openPopover('" + popname + "','" + url + "','" + rect + "','" + windowname + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'closePopover') {
				var popname = args[0]
				var pageId = GetQueryString('pageId');
				var js = "closePopover('" + popname + "','" + pageId + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'bringPopoverToFront') {
				var popname = args[0]
				var js = "openPopover('" + popname + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'setSlideLayout') {
				var url = getPageDir()
				var params = args[0]
				var type = params.type
				if (type == 'left') {
					params.leftPane.url = url + params.leftPane.url
				} else {
					params.rightPane.url = url + params.rightPane.url
				}
				var params = JSON.stringify(args[0])
				var js = "setSlideLayout('" + params + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'openSlidePane') {
				var params = JSON.stringify(args[0])
				var js = "openSlidePane('" + params + "')"
				postMessage(js);
			} else if (arguments[0][0] == 'window' && arguments[0][1] == 'closeSlidePane') {
				var js = "closeSlidePane()"
				postMessage(js);
			} else if (arguments[0][0] == 'httpManager' && arguments[0][1] == 'sendRequest') {
				var settings = args[0];
				var data = settings.body;
				if (data) {
					if ($L.isString(data)) {
						data = JSON.parse(data)
					}
					if (data.json && $L.isString(data.json)) data.json = JSON.parse(data.json)
					settings.body = data
				}
				settings = JSON.stringify(settings)
				var pageId = GetQueryString('pageId');
				var token = uuid++;
				xhr[token] = {
					success: args[1],
					error: args[2],
					dataType: args[0].dataType
				}
				var js = "sendRequest('" + settings + "','" + pageId + "','" + token + "')"
				postMessage(js);
			} 
		}

		$L.executeConstantJS = function(){
			if (arguments[0][0] == 'device') {
				return $L.debug.device.apply($L.debug,Array.prototype.slice.call(arguments))
			}else if (arguments[0][0] == 'os') {
				return $L.debug.os.apply($L.debug,Array.prototype.slice.call(arguments))
			}
		}
		if (window.$) {
			var on = $.fn.on;

			$.fn.on = function(event, selector, data, callback, one) {
				if (event == 'tap') {
					event = 'click';
				}
				// else if (event == 'touchstart') {
				// 	event = 'mousedown';
				// } else if (event == 'touchmove') {
				// 	event = 'mousemove';
				// } else if (event == 'touchend') {
				// 	event = 'mouseup';
				// }
				return on.call(this, event, selector, data, callback, one);
			}

			var off = $.fn.off;
			$.fn.off = function(event, selector, callback) {
				if (event == 'tap') {
					event = 'click';
				}
				// else if (event == 'touchstart') {
				// 	event = 'mousedown';
				// } else if (event == 'touchmove') {
				// 	event = 'mousemove';
				// } else if (event == 'touchend') {
				// 	event = 'mouseup';
				// }
				return off.call(this, event, selector, callback);
			}

			var trigger = $.fn.trigger;
			$.fn.trigger = function(event, args) {
				if (event == 'tap') {
					event = 'click';
				}
				// else if (event == 'touchstart') {
				// 	event = 'mousedown';
				// } else if (event == 'touchmove') {
				// 	event = 'mousemove';
				// } else if (event == 'touchend') {
				// 	event = 'mouseup';
				// }
				return trigger.call(this, event, args);
			}

			var one = $.fn.one;
			$.fn.one = function(event, selector, data, callback) {
				if (event == 'tap') {
					event = 'click';
				}
				// else if (event == 'touchstart') {
				// 	event = 'mousedown';
				// } else if (event == 'touchmove') {
				// 	event = 'mousemove';
				// } else if (event == 'touchend') {
				// 	event = 'mouseup';
				// }
				return one.call(this, event, selector, data, callback);
			}

		}

	}
}(app, this))
;
(function($L, global) {
	$L.debug.device = function() {
		var key = arguments[0][1];
		if(key == "imei"){
			return '865743028006921'
		}else if(key == "imsi"){
			return ' '
		}else if(key == "model"){
			return 'Che1-CL20'
		}else if(key == "vendor"){
			return 'HUAWEI'
		}else if(key == "uuid"){
			return '48a9511b-d23a-43c4-a868-0ed2ad80e75b'
		}
	}
}(app, this))
;
(function($L, global) {
	$L.debug.os = function() {
		var key = arguments[0][1];
		if(key == "language"){
			return 'zh'
		}else if(key == "version"){
			return '4.4.4'
		}else if(key == "name"){
			return 'Android'
		}else if(key == "vendor"){
			return 'HUAWEI'
		}
	}
}(app, this))