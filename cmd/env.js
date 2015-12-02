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
os = require('os'),
checkPrereq = require('../cli.js');
_.str = require('underscore.string');

var env = JSON.parse(process.env.stagejs);
//console.log(path.resolve('.') === env.cwd); //true

program
	.version('0.1.0')
	//.option('-c, --check', 'Check the required system level dependencies')
	.parse(process.argv);


console.log('=====Environment====='.yellow);
_.each(env, function(v, k){
	console.log(k.yellow, ':', v);
});
console.log('---------------------'.yellow);

//from calling cli.js
console.log(checkPrereq().msg);
console.log('---------------------'.yellow);

//system status check
console.log('cpu(s):', String(os.cpus().length).yellow, '@', os.cpus()[0].model);
var freemem = os.freemem()/1024/1024/1024, totalmem = os.totalmem()/1024/1024/1024;
console.log('memory:', (_.str.numberFormat(freemem, 2)).yellow + 'GB', '/', (_.str.numberFormat(totalmem, 2).yellow + 'GB'), freemem < 0.25?'Warning: Free memory too low...'.red:'');
console.log('operating system:', os.type().yellow);
console.log('---------------------'.yellow);

//stagejs project detection
if(!env['stagejs-version']) 
	console.log('[', 'No project found at the current directory...'.grey, ']');
else
	console.log('[', 'Project detected!'.green, ']');

//console.log('====================='.yellow);



