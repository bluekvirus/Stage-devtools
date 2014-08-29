;(function(app, $){

	/*===============preparations======================*/

	/*===============the util/worker functions================*/

	/*===============the plugin================*/
	$.fn['your plugin name'] = function(options){

		return this.each(function(index, el){
			//do stuffz in here...
			var $el = $(el);
			
		});

	};

})(Application, jQuery);