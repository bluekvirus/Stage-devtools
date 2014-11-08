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
shell = require('shelljs'),
cheerio = require('cheerio');

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

if(!_.contains(['use', 'unuse', 'mirror', 'unmirror'], cmd) && cmd){ //pass along to bower
	console.log('using bower...'.yellow);
	shell.cd(path.join(env.cwd, env.implementation));
	shell.exec('bower ' + process.argv.slice(2).join(' '));
}

var library = program.args[1];
//load up the targeted index .html file
var indexFile = path.join(env.cwd, env.implementation, program.index);
if(!fs.existsSync(indexFile)) {
	console.log('append:', 'can not find:'.red, indexFile);
	return;
}
var indexHTML = fs.readFileSync(indexFile, 'utf-8');
var $ = cheerio.load(indexHTML);
var bowerFolder = path.join(env.cwd, env.implementation, 'bower_components');

if(!library){
	//list currently used libs
	$('script[src^="bower_components/"]').each(function(index, el){
		var p = $(this).attr('src').split('/');
		p.shift();//->bower_components
		var lib = p.shift();
		var js = p.join('/');
		console.log(js, 'of'.grey, lib);
	});
}else {
	var js = program.args[2];
	switch(cmd){
		case 'use':
			//TBI (check bower listing, go fetch main if no args[2], ask for advise if main not found)
		break;

		case 'unuse':
			//TBI remove all that has 'bower_components/[lib name]' or just specific according to args[2]
		break;

		default:
		break;
	}
}
