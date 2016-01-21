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