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

	//return function(err, req, res, next){} for error handling middleware.
	
	return function(req, res, next){

		//you customized code here, req.app for application server
	
		next(); // or error out

	};

};