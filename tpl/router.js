/**
 * Sample custom router (express.router()) script.
 *
 * Note
 * ----
 * Routers are automatically loaded by the devserver after creation.
 *
 * Example
 * -------
 * /abc => routers/abc.js
 * /abc/efg => routers/abc/efg.js
 * /sample/sample2-abc => routers/sample/sample2Abc.js 
 * /sample/smaple2_abc => routers/sample/sample2Abc.js
 * 
 * 
 * @author [author]
 * @created [date]
 */
module.exports = function(server){

	//Keep this line here! (Do NOT remove it...)
	var router = server.mount(this);
	////////////////////////////////////////////


	//get '/'
	router.get('/', function(req, res, next){
		res.json({stagejs: 'rocks!'});
	});

	//head, post, put, delete...

};