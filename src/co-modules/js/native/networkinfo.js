/*===============================================================================
************   ui native networkinfo   ************
===============================================================================*/
(function($L, global) {
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