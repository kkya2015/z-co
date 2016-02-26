/*===============================================================================
************   ui native audio   ************
===============================================================================*/
;
(function($L, global) {
  var photoNum = 1;
  var videoNum = 1;
  var camera = function(filePath, resolution, index) {
    this.captureImage = function(success, error) {
      var num = photoNum++;
      var filename = filePath + 'photo_' + num + '.jpg';
      var options = {
        filename: filename,
        resolution: resolution,
        index: index
      }
      $L.executeNativeJS(['camera', 'captureImage'], function(capturedFile) {
        if ($L.isFunction(success)) {
          setTimeout(function() {
            success.call(global, capturedFile);
          }, 1000)
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          setTimeout(function() {
            error.call(global, err);
          }, 1000)
        }
      }, options)

    };
    this.captureVideo = function(success, error) {
      var num = videoNum++;
      var filename = filePath + 'video_' + num + '.mov';
      var options = {
        filename: filename,
        resolution: resolution,
        index: index
      }
      $L.executeNativeJS(['camera', 'captureVideo'], function(capturedFile) {
        if ($L.isFunction(success)) {
          setTimeout(function() {
            success.call(global, capturedFile);
          }, 1000)
        }
      }, function(err) {
        if ($L.isFunction(error)) {
          setTimeout(function() {
            error.call(global, err);
          }, 1000)
        }
      }, options)

    }

  }

  $L.camera = {
    getCamera: function(filePath, rlution, cameraType) {
      if ($L.android()) {
        if (typeof filePath === 'undefined') {
          $L.throwError("请传入有效的文件保存的路径！");
        }
      }

      var resolution;
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
      return new camera(filePath, resolution, cameraType)
    }
  }

}(app, this));