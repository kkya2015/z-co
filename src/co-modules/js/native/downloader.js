/*===============================================================================
************   ui native downloader   ************
===============================================================================*/
(function($L, global) {

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
					listener.call(null, this,status);
				}
			})
		}
		this.removeEventListener = function() {
			$L.executeObjFunJS([download, 'removeEventListener'])
		}
		this.addCompletedListener = function(listener) {
			$L.executeObjFunJS([download, 'addCompletedListener'],function(dl,status){
				if ($L.isFunction(listener)) {
					listener.call(null, this,status);
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
		 * 枚举指定任务状态的下载任务
		 * @param state: ( 下载任务状态 ) 必选 要清除下载任务的状态。
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
		 * 清除指定状态的下载任务。
		 * @param state: ( 下载任务状态 ) 必选 要清除下载任务的状态。
		 */
		clear: function(state) {
			if(!state) state = -1;
			$L.executeNativeJS(['downloader', 'clear'], state);
		},

		/*
		 * 开始所有下载任务。
		 */
		startAll: function() {
			$L.executeNativeJS(['downloader', 'startAll']);
		},

		/*
		 * 清除单个下载任务
		 * @param id: ( Number ) 必选 要清除下载任务的id。
		 */
		remove: function(id) {
			$L.executeNativeJS(['downloader', 'remove'],id);
		}
	}

}(app, this));