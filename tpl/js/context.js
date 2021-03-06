/**
 * Sample {{type}} script.
 *
 * @author {{author}}
 * @created {{date}}
 */
;(function(app){

	app.context('{{{title}}}', {
		
		template: '@{{{template}}}',
        //..., normal View options

        initialize: function(){},

        guard: function(){ // -- [optional]
            //return error to cancel navigation;
            //return '', false, undefined to proceed;
            return;
        },

        //listeners: (after guard) // -- [optional]
        onBeforeNavigateTo: function(){
            //return true to proceed;
            //return false, '', undefined to cancel navigation
            return true;
        },

        onReady: function(){},
        onNavigateTo: function(path){ // -- [optional]
            //path == '', undefined means the navigation stopped here.
        },

        onNavigateAway: function(){ // -- [optional]
            //... 
            //if you want to save context status (through localStorage maybe)
        },

	});

})(Application);