/**
 * Sample {{type}} script.
 *
 * @author {{author}}
 * @created {{date}}
 */
;(function(app){

	app.editor('{{{title}}}', function(){

		var UI = app.view({

			template: '@{{{template}}}',
			//...

		});

		return UI;
	});

})(Application);