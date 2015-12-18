/*===============================================================================
************   ui native storage   ************
===============================================================================*/
(function($L, global) {
	$L.storage = {
		/*
		 * 获取应用存储区中保存的键值对的个数
		 */
		getLength: function() {
			return $L.executeNativeJS(['storage', 'getLength']);
		},
		/*
		 * 通过键(key)检索获取应用存储的值
		 * @param key : (String) 必选 存储的键值
		 */
		get: function(key) {
			return $L.executeNativeJS(['storage', 'getItem'], key);
		},
		/*
		 * 修改或添加键值(key-value)对数据到应用数据存储中
		 * @param key : (String) 必选 存储的键值
		 * @param value : (String) 必选 存储的内容
		 */
		set: function(key, value) {
			$L.executeNativeJS(['storage', 'setItem'], key, value);
		},
		/*
		 * 通过key值删除键值对存储的数据
		 * @param key : (String) 必选 存储的键值
		 */
		remove: function(key) {
			$L.executeNativeJS(['storage', 'removeItem'], key);
		},
		/*
		 * 清除应用所有的键值对存储数据
		 */
		clear: function() {
			$L.executeNativeJS(['storage', 'clear']);
		},
		/*
		 * 获取键值对中指定索引值的key值
		 * @param index: (Number) 必选 存储键值的索引
		 */
		key: function(index) {
			return $L.executeNativeJS(['storage', 'key'], index)
		}
	}

}(app, this));