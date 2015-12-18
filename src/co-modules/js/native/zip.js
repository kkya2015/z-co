/*===============================================================================
************   ui native zip   ************
===============================================================================*/
(function($L, global) {
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
					error.call(null, err);
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
					error.call(null, err);
				}
			});
		}
	}

}(app, this));