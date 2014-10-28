;(function(app){

	app.context('{{{name}}}', {
		
		template: '@{{{template}}}',
        //..., normal Marionette.Layout options
        
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
        onNavigateTo: function(path){ // -- [optional]
            //path == '', undefined means the navigation stopped here.
        },
        onNavigateAway: function(){ // -- [optional]
            //... 
            //if you want to save context status (through localStorage maybe)
        }

	});

})(Application);