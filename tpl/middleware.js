/**
 * Sample custom middleware script (requires expressjs 4.0+)
 *
 * Note
 * ----
 * Since middlewares do require a fixed mounting order, please modify middlewares/inject.js after creating this middleware.
 *
 * 
 * @author [author]
 * @created [date]
 */
module.exports = function(server){

	var profile = server.get('profile');

	//call this function to return your middleware;
	return function(options){

		//prepare your middleware according to options

		return function(req, res, next){

			//you customized code here, req.app for application server
	
			next(); // or error out

		};

	};

};