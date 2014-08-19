/**
 * Checking devtools's current running environment
 *
 * @author Tim.Liu
 * @created 2014.08.19
 */

var program = require('commander'),
_ = require('underscore'),
colors = require('colors'),
fs = require('fs-extra'),
path = require('path'),
should = require('should'),
shell = require('shelljs');

var env = JSON.parse(process.env.stagejs);
//console.log(path.resolve('.') === env.cwd); //true

program
	.version('0.1.0')
	.option('-c, --check', 'Check the required system level dependencies')
	.parse(process.argv);


console.log('-----Environment-----'.yellow);
_.each(env, function(v, k){
	console.log(k.yellow, ':', v);
});
console.log('---------------------'.yellow);

//if(program.check){
	_.each(['bower', 'npm', 'gm', 'redis-server', 'mongod'], function(d){
		var msg = 'locate ' + d + ' ... ',
		error;
		try{
			should(shell.which(d)).be.ok;
		}catch(e){
			error = true;
			msg += '[' + 'X'.red + ']';
		}finally {
			if(!error) msg += '[' + 'OK'.green + ']';
			console.log(msg);
		}
	});
	console.log('---------------------'.yellow);	
//}

if(!env['stagejs-version']) 
	console.log('[No project found at the current directory]'.grey);



