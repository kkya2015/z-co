/*===============================================================================
************   ui native audio   ************
===============================================================================*/
(function($L, global) {

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
          success.call(null, capturedFile);
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(null, err);
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
          success.call(null, capturedFile);
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          error.call(null, err);
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