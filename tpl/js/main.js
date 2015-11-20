/**
 * Sample {{type}} script.
 *
 * @author {{author}}
 * @created {{date}}
 */
;(function(app){

	/////////////////setup/////////////////
	app.setup({
		template: '@{{{template}}}',
		navRegion: 'content',

		//Note: Always set navRegion if using app template here, unless you've merged it(the tpl) with index.html;
		
		defaultContext: 'Default',
		viewSrcs: 'js', //set this to a folder path to enable view dynamic loading. 
		//---------------------------------------------------------------------------------------------
		fullScreen: false, //this will put <body> to be full screen sized (window.innerHeight).
		//---------------------------------------------------------------------------------------------
		i18nTransFile: 'i18n.json', //can be {locale}.json
		i18nLocale: '', //if you really want to force the app to certain locale other than browser preference. (Still override-able by ?locale=.. in url)
		//---------------------------------------------------------------------------------------------
		baseAjaxURI: '', //modify this to fit your own backend apis. e.g index.php?q= or '/api'
		timeout: 5 * 60 * 1000 //general communication timeout (ms), e.g when using app.remote()
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

})(Application);