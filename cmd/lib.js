/**
 * The lib cmd passes control to bower if the 1st cmd argument isn't `use` or `unuse`.
 *
 * by default the lib use cmd will add a lib js from `bower_components/[lib]/[js]` into index.html.
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
_.str = require('underscore.string');

var env = JSON.parse(process.env.stagejs);

if(!env['stagejs-version']){
	console.error('You don\'t have a project here...'.red, 'run \'stagejs init\' first.'.yellow);
	process.exit(1);
}

program
	.usage('[options] use/unuse/refresh [js library name] or [bower commands]')
	.version('0.1.0')
	.option('-i, --index <*.html>', 'The .html that the lib js will be/is used in, default on index.html', 'index.html')
	.parse(process.argv);

var cmd = program.args[0];

if(!_.contains(['use', 'unuse'], cmd) && cmd){ //pass along to bower
	console.log('using bower...'.yellow);
	shell.cd(path.join(env.cwd, env.implementation));
	return shell.exec('bower ' + process.argv.slice(2).join(' '));
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

if(!library){
	//list currently used libs
	$('body script[src^="bower_components/"]').each(function(index, el){
		var p = $(this).attr('src').split('/');
		p.shift();//->bower_components
		var lib = p.shift();
		var js = p.join('/');
		console.log(js, 'from'.grey, lib.yellow);
	});
}else {
	var bowerFolder = path.join(env.cwd, env.implementation, 'bower_components');

	switch(cmd){
		case 'use':
			//1. find the lib in the project's bower.json
			var bower = require(path.join(env.cwd, env.implementation, 'bower.json'));
			if(!bower.dependencies[library] && !bower.devDependencies[library]){
				console.log(library.yellow, 'is not installed yet, use: lib install -s', library);
				return;
			}
			//2. check if there is a main in lib's bower.json or .bower.json file
			var metaFile = path.join(bowerFolder, library, '.bower.json');
			var info = fs.existsSync(metaFile)?require(metaFile):{};
			var js = program.args[2] || info.main || (_.str.endsWith('.js', library)?library:(library + '.js'));
			if(_.isArray(js)) return console.log(library.yellow, 'has multiple main files...');

			if (fs.existsSync(path.join(bowerFolder, library, js))){
				js = path.join('bower_components', library, js).split(path.sep).join('/'); //win, linux compatibility with web path
				//2.1 check if js is already in there
				if($('script[src="' + js + '"]').length > 0) {
					console.log('aborted'.red, js, 'already in', program.index);
					return;
				}

				//2.2 adding the js tag into the html
				console.log('added'.yellow, js, 'from'.grey, library, 'to'.grey, program.index);
				var scriptHTML = '<script src="' + js + '"></script>';
				var lastTag = $('body script[src^="bower_components/"]').last();
				if(lastTag.length !== 1){
					lastTag = $('body script').first();
					if(lastTag.length !== 1){
						lastTag = $('body');
						lastTag.append('\n\t' + scriptHTML);
					}
					else{
						lastTag.before(scriptHTML + '\n\t');
					}
				}else
					lastTag.after('\n\t' + scriptHTML);
			}else{
				console.log('Can NOT find required javascript in', library.yellow, 'please verify file path.');
			}
		break;

		case 'unuse':
			//remove all js from a certain library
			var targets = $('body script[src^="bower_components/'+ library +'"]').each(function(){
				var $this = $(this);
				console.log($this.attr('src'), 'removed'.yellow);
				$this.remove();
			});
			if(targets.length === 0) console.log('aborted'.red, 'nothing to remove...');
		break;

		default:
		break;
	}

	//save the html
	fs.outputFileSync(indexFile, $.html().replace(/\t\n/g, '').replace(/\s+\n/, '\n').replace(/\n+/g, '\n'));
}
