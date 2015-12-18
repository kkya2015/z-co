/*===============================================================================
************   ui native audio   ************
===============================================================================*/
(function($L, global) {

  var recorder;
  var player;

  $L.audio = {
    /*
     * 获取当前设备的录音对象
     *
     */
    getRecorder: function() {
      !recorder && (recorder = $L.executeNativeJS(['audio', 'getRecorder']))
      var supportedSamplerates = $L.executeObjConstantJS(recorder, 'supportedSamplerates');
      var supportedFormats = $L.executeObjConstantJS(recorder, 'supportedFormats');
      return {
        getSamplerates: function() {
          if (supportedSamplerates && $L.isArray(supportedSamplerates)) {
            return supportedSamplerates
          } else {
            return []
          }

        },
        getFormats: function() {
          if (supportedFormats && $L.isArray(supportedFormats)) {
            return supportedFormats
          } else {
            return []
          }
        },
        record: function(success, error, opts) {
          if ($L.isPlainObject(error)) {
            opts = error;
          }
          opts = opts || {}
          var options = {
            filename: opts.filename,
            samplerate: opts.samplerate,
            format: opts.format
          }
          $L.executeObjFunJS([recorder, 'record'], options, function(recordFile) {
            if ($L.isFunction(success)) {
              success.call(null, recordFile);
            }
          }, function(err) {
            if ($L.isFunction(error)) {
              error.call(null, err);
            }
          })
        },
        stop: function() {
          $L.executeObjFunJS([recorder, 'stop'])
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
              error.call(null, err);
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
          if (typeof path === undefined) {
            throw new Error("请传入有效的音频输出线路！");
          }
          if(route == 1){
            route = $L.executeConstantJS(['auduo', 'ROUTE_EARPIECE'])
          }else{
            route = $L.executeConstantJS(['auduo', 'ROUTE_SPEAKER'])
          }
          $L.executeObjFunJS([player, 'setRoute'], route)
        },
        isPlaying: function() {
          return $L.executeObjFunJS([player, 'isPlaying'])
        }
      }
    }
  }

}(app, this));