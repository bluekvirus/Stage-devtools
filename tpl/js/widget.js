;(function(app){

	app.widget('{{{name}}}', function(){

		var UI = app.view({

			template: '@{{{template}}}',
			//...

		});

		return UI;
	});

})(Application);