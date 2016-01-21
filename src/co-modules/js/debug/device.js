;
(function($L, global) {
	$L.debug.device = function() {
		var key = arguments[0][1];
		if(key == "imei"){
			return '865743028006921'
		}else if(key == "imsi"){
			return ' '
		}else if(key == "model"){
			return 'Che1-CL20'
		}else if(key == "vendor"){
			return 'HUAWEI'
		}else if(key == "uuid"){
			return '48a9511b-d23a-43c4-a868-0ed2ad80e75b'
		}
	}
}(app, this))