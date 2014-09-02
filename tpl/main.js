/**
 * Sample main.js code.
 *
 * @author [author]
 * @created [date]
 */
;(function(app){

	/////////////////setup/////////////////
	app.setup({
		theme: 'project',
		template: '@main.html',
		navRegion: 'content' 

		//Note: Always set navRegion if using app template here, unless you've merged it(the tpl) with index.html;
		
	});

	///////bootstrapping events//////////// - [optional]
	//app:before-template-ready (if you have app template)
	//app:template-ready (if you have app template)
	//-- now you will have app.mainView as the view instance holding the app template.
	//
	//initialize:before

	///////////more initializers/////////// - [optional]
	app.addInitializer(function(){

	});

	app.addInitializer(function(){

	});

	//-- add more initializer if you need
	//
	//initialize:after
	//start (this is also an event)

	/////////////craft app engine////////// - [optional]
	var engine = app.module('Engine');
	_.extend(engine, {

		//your engine apis for managing this app's state. (e.g invoked in Contexts and Views)

	});

	///////////////kick start//////////////
	app.run(/*'deviceready' if you are developing with Cordova*/);

})(Application);