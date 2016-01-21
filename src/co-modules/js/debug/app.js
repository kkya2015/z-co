;
(function($L, global) {
	$L.debug.app = function() {
		var key = arguments[0][1];
		if(key == "platformName"){
			return 'Android'
		}else if(key == "platformVersion"){
			return '4.4.4'
		}else if(key == "deviceModel"){
			return 'Che1-CL20'
		}else if(key == "deviceName"){
			return 'Che1'
		}
	}
}(app, this))