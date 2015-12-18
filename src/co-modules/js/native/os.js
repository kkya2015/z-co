/*===============================================================================
************   ui native os   ************
===============================================================================*/
(function($L, global) {
	$L.os = {
		/*
		 * 獲取系统语言信息
		 */
		getLanguage: function() {
			return $L.executeConstantJS(['os', 'language']);
		},
		/*
		 * 獲取系统版本信息
		 */
		getVersion: function() {
			return $L.executeConstantJS(['os', 'version']);
		},
		/*
		 * 獲取系统的名称
		 */
		getName: function() {
			return $L.executeConstantJS(['os', 'name']);
		},
		/*
		 * 獲取系统的供应商信息
		 */
		getVendor: function() {
			return $L.executeConstantJS(['os', 'vendor']);
		}
	}

}(app, this));