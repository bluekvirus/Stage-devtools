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
 * Warning
 * -------
 * Somehow we suggest you start with the longest uri possible and gradually moving down to the shorter ones.
 * e.g:
 * /abc/efg/xyz
 * /abc/efg
 * /abc
 * /xyz
 * /
 *
 * Or else you might get null response ... (Expressjs Bug?)
 * 
 * @author {{author}}
 * @created {{date}}
 */
module.exports = function(server){

	var profile = server.get('profile');
	var router = server.mount(this);
	//server.secure(router, /*token1, token2, ...*/); -- see util/secure.js
	
	////////////////////////////////////////////


	//get '/'
	router.get('/', /*router.token(t1, t2, ...)*/ function(req, res, next){
		res.json({stagejs: '!', generated: '{{date}}'});
	});

	//post, put, delete (yes, you can also use head and options methods)

};