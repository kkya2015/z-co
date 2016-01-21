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