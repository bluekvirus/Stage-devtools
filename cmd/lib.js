/**
 * The lib cmd passes control to bower if the 1st cmd argument isn't `use` or `unuse`.
 *
 * by default the lib use cmd will add a lib js from `bower_components/[lib]` into index.html.
 *
 * @author Tim Liu
 * @created 2014.11.06
 */

var program = require('commander'),
_ = require('underscore'),
colors = require('colors'),
path = require('path'),
fs = require('fs-extra'),
shell = require('shelljs');

var env = JSON.parse(process.env.stagejs);

if(!env['stagejs-version']){
	console.error('You don\'t have a project here...'.red, 'use \'init\' first.'.yellow);
	process.exit(1);
}

program
	.usage('[options] use/unuse/refresh [js library name] or [bower commands]')
	.version('0.1.0')
	.option('-i, --index <*.html>', 'The .html that the lib js will be/is used in, default on index.html', 'index.html')
	.parse(process.argv);

var cmd = program.args[0];

if(!_.contains(['use', 'unuse'], cmd)){ //pass along to bower
	console.log('using bower...'.yellow);
	shell.cd(path.join(env.cwd, env.implementation));
	shell.exec('bower ' + process.argv.slice(2).join(' '));
}

var library = program.args[1];
if(!library){
	//list currently used libs
	//TBI
}else {
	switch(cmd){
		case 'use':
			//TBI
		break;

		case 'unuse':
			//TBI
		break;

		default:
		break;
	}
}
