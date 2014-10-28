;(function(app){

	app.editor('{{{name}}}', function(){

		var UI = app.view({

			template: '@{{{template}}}',
			//...

		});

		return UI;
	});

})(Application);