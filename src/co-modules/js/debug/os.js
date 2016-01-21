;
(function($L, global) {
	$L.debug.os = function() {
		var key = arguments[0][1];
		if(key == "language"){
			return 'zh'
		}else if(key == "version"){
			return '4.4.4'
		}else if(key == "name"){
			return 'Android'
		}else if(key == "vendor"){
			return 'HUAWEI'
		}
	}
}(app, this))