/*===============================================================================
************   ui native properties   ************
===============================================================================*/
(function($L, global) {


	var properties = function(domain, fileName) {
		var propertie = $L.executeNativeJS(['properties', 'openProperties'], domain, fileName);

		/*
		 * 设置属性值
		 * @param key: ( String ) 必选 键值
		 * @param value: ( String ) 必选 属性值
		 */
		this.put = function(key, value) {
			$L.executeObjFunJS([propertie, 'putProperty'], key, value);
		}

		/*
		 * 获取属性值
		 * @param key: ( String ) 必选 键值
		 */
		this.get = function(key) {
			return $L.executeObjFunJS([propertie, 'getProperty'], key);
		}

		/*
		 * 删除属性值
		 * @param key: ( String ) 必选 键值
		 */
		this.delete = function(key) {
			$L.executeObjFunJS([propertie, 'deleteProperty'], key);
		}

		/*
		 * 清除所有属性
		 */
		this.clean = function() {
			$L.executeObjFunJS([propertie, 'clean']);
		}

		/*
		 * 保存操作
		 */
		this.save = function() {
			return $L.executeObjFunJS([propertie, 'save']);
		}
	}


	$L.properties = {
		/*
		 * 如果property文件不存在，新建相应的property，如果存在，直接读取
		 * @param domain : ( String ) 必选 一级文件夹。
		 * @param fileName :  ( String ) 必选 文件名。
		 * @return Property  : 新建的property对象
		 */
		open: function(domain, fileName) {
			return new properties(domain, fileName);
		}
	}

}(app, this));