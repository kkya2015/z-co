/*===============================================================================
************   ui native gallery   ************
===============================================================================*/
(function($L, global) {
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
          success.call(null, paths);
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(null, err);
        }
      }, option)
    },
    save: function(path, success, error) {
      $L.executeNativeJS(['gallery', 'save'], path, function(info) {
        if ($L.isFunction(success)) {
          success.call(null, info);
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(null, err);
        }
      })
    }
  }

}(app, this));