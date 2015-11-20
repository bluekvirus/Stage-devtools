/**
 * Sample {{type}} script.
 *
 * @author {{author}}
 * @created {{date}}
 */
;(function(app){

	app.widget('{{{title}}}', function(){

		var UI = app.view({

			template: '@{{{template}}}',
			
			initialize: function(){},
			//onReconfigure: function(){},

		});

		return UI;
	});

})(Application);