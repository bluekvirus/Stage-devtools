module.exports = function(server){

	var router = server.mount(this);

	//get '/'
	router.get('/', function(req, res, next){
		res.json({world: true});
	});

	//head, post, put, delete...

};