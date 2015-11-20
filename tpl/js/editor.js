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
			
			getVal: function(){
				//...
			},

			setVal: function(data){
				//...
			},

			disable: function(flag){},
			isEnabled: function(){},

			//validate: function(){},
			//status: function(){},

		});

		return UI;
	});

})(Application);