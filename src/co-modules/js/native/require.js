/*===============================================================================
************   ui native require   ************
===============================================================================*/
;
(function($L, global) {

	$L.require = function(widget) {
		if (widget == 'tabMark') {
			return $L.require.tabMark();
		}
	}

}(app, this));