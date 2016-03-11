/*===============================================================================
************   ui native downloader   ************
===============================================================================*/
;
(function($L, global) {

	var downloader = function(url, option, download) {
		var self = this;
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
			$L.executeObjFunJS([download, 'addEventListener'], function(dl, status) {
				if ($L.isFunction(listener)) {
					listener.call(global, self, status);
				}
			})
		}
		this.removeEventListener = function() {
			$L.executeObjFunJS([download, 'removeEventListener'])
		}
		this.addCompletedListener = function(listener) {
			$L.executeObjFunJS([download, 'addCompletedListener'], function(dl, status) {
				if ($L.isFunction(listener)) {
					listener.call(global, self, status);
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
			if (!state) state = -1;
			$L.executeNativeJS(['downloader', 'clear'], state);
		},

		/*
		 * 枚举指定任务状态的下载任务
		 * @param state: ( 下载任务状态 ) 要清除下载任务的状态。
		 * @return downloads
		 */
		enumerate: function(state) {
			if (!state) state = -1;
			var downloads = $L.executeNativeJS(['downloader', 'enumerate'], state);
			if (downloads && $L.isArray(downloads)) {
				return downloads;
			} else {
				return [];
			}
		},

		/*
		 * 通过id获取任务，如果当任务下载时，程序出现异常（断网、进程被杀），再次下载时可通过此方法获取以前未下载完的任务执行start继续下载，这样可节约系统资源。
		 * @param state: ( 下载任务状态 ) 必选 要获取下载任务的id。
		 * @return download
		 */
		getDownLoaderById: function(id) {
			if (!id) $L.throwError("请传入有效的下载任务ID！");
			var download = $L.executeNativeJS(['downloader', 'enumerateById'], id);
			return new downloader('', '', download);
		},

		/*
		 * 清除单个下载任务
		 * @param id: ( Number ) 必选 要清除下载任务的id。
		 */
		remove: function(id) {
			$L.executeNativeJS(['downloader', 'remove'], id);
		},

		/*
		 * 设置并发任务最大数
		 */
		setMaxRunningSize: function(num) {
			$L.executeNativeJS(['downloader', 'setMaxRunningSize'], num);
		},

		/*
		 * 设置总下载速度
		 */
		setSpeed: function(speed) {
			$L.executeNativeJS(['downloader', 'setSpeed'], speed);
		},

		/*
		 * 开始所有下载任务。
		 */
		startAll: function() {
			$L.executeNativeJS(['downloader', 'startAll']);
		},


	}

}(app, this));