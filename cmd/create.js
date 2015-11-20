/**
 *
 * Create what you need in development with ease and our suggested code tpl.
 *
 * Usage
 * -----
 * create <target> <name>
 *
 * Example
 * -------
 * create context abc -> js/context/abc.js
 * create context abc.index -> js/context/abc/index.js
 * create view xyz -> js/views/xyz.js
 * create view abc.xyz -> js/views/abc/xyz.js
 * create view context.abc.xyz ->js/context/abc/xyz.js
 * 
 * Client side:
 * ------------
 * Create view (named)
 * Create context (named view with default type and interfaces/listeners)
 * Create editor (named view with default type and interfaces/listeners)
 * Create validator (editor/data validation function)
 * Create widget (named view with default type and interfaces/listeners)
 * Create plugin ($.fn jQuery plugin)
 * 
 * Server side:
 * ------------
 * Create router
 * Create middleware
 * Create task (TBI)
 * 
 * @author Tim Liu
 * @created 2014.08.28
 */
var program = require('commander'),
_ = require('underscore'),
colors = require('colors'),
path = require('path'),
fs = require('fs-extra'),
os = require('os'),
shell = require('shelljs'),
mustache = require('mustache'),
cheerio = require('cheerio');
_.str = require('underscore.string');

var env = JSON.parse(process.env.stagejs);

if(!env['stagejs-version']){
	console.error('You don\'t have a project here...'.red, 'use \'init\' first.'.yellow);
	process.exit(1);
}

program
	.usage('[options] <type> <name>')
	.version('0.1.0')
	.option('-i, --index <*.html>', 'The .html that the produced js will be attaching to, default on index.html, false to skip', 'index.html')
	.option('-d, --dry', 'Only output the target file type and path instead of actually creating it.')
	.option('-l, --list', 'List possible types of code you can create using this cmd.')
	.option('-v, --verbose', 'Output the metadata gathered during the generating process as well.')
	.parse(process.argv);

var type = program.args[0], name = program.args[1];
if(type === 'main') name = name || 'main';
var jsTargets = {
	client: {
		types: ['main', 'view', 'context', 'editor', 'validator', 'widget', 'plugin'],
		base: path.join(env.cwd, env.implementation),
		folder: 'js'
	},
	server: {
		types: ['router', 'middleware'],
		base: path.join(env.cwd, env.tools),
		folder: 'devserver'
	}
};

function resolveToJSPath(type, name){
	var found = false;
	//figure out which side this script type is on
	for(var x in jsTargets){
		if(_.contains(jsTargets[x].types, type)){
			found = true;
			break;
		}
	}
	if(!found) return;

	//target js name segments array without .js, used again later for outputing related html template.
	var p = nameToPath(name).split('/');

	var jsFullPath;
	if(_.contains(jsTargets[x].types, p[0])){
		jsFullPath = path.join(jsTargets[x].base, jsTargets[x].folder, p.join('/'));
	}else {
		jsFullPath = path.join(jsTargets[x].base, jsTargets[x].folder, (type === 'main'?'':type) + (x === 'client'?'':'s'), p.join('/'));
	}
	
	if(!/\.js$/.test(jsFullPath)) jsFullPath += '.js';
	return {
		base: jsTargets[x].base,
		folder: jsTargets[x].folder,
		side: x,
		path: jsFullPath,
		nameSegments: p
	};
}

function pathToName(path){
	if(!_.isString(path)) throw new Error('DEV::Application::pathToName You must pass in a valid path string.');
	if(_.contains(path, '.')) return path;
	return path.split('/').map(_.str.humanize).map(_.str.classify).join('.');
}

function nameToPath(name){
	if(!_.isString(name)) throw new Error('DEV::Application::nameToPath You must pass in a Reusable view name.');
	if(_.contains(name, '/')) return name;
	return name.split('.').map(_.str.humanize).map(_.str.slugify).join('/');
}

//-l, --list
if(program.list){
	_.each(jsTargets, function(t, side){
		console.log(side.yellow, 'side:'.yellow, t.types.join(', '));
	});
	return;
}

//guard A
if(!type || !name){
	console.error('Empty code type or name...'.red);
	return;
}
name = name.replace(/\.js$/, '');

//guard B
var target = resolveToJSPath(type, name);
if(!target) {
	console.error(('There is no template for type: ' + type + '...').red, 'use \'-l, --list\' to see possible types.'.yellow);
	return;
}

if(program.dry) console.log('==========Dry Run: no actual file changes occur=========='.grey);

//creating the js target using code template
//1.define the mustache tpl data
var metadata = {
	name: name,
	title: pathToName(target.nameSegments.join('/')),
	type: type.toUpperCase(),
	path: {
		relative: target.path.replace(target.base + path.sep, ''),
		full: target.path,
	},
	author: 'Stagejs.CLI',
	date: new Date()
};

if(program.verbose) console.log('Information', metadata);

//2.special + html tpl, create related template file first if needs be
var htmlRequiredTypes = ['main', 'view', 'context', 'editor', 'widget'];
if(_.contains(htmlRequiredTypes, type)){
	var tplHTMLName = path.join(_.contains(htmlRequiredTypes, target.nameSegments[0])?'':(type === 'main'?'':type), target.nameSegments.join('/') + '.html');
	metadata.template = tplHTMLName;
	var tplHTMLPath = path.join(env.cwd, env.implementation, 'static', 'template', tplHTMLName);
	
	if(!fs.existsSync(tplHTMLPath)){
		var tplBlueprintPath = path.join(env.twd, 'tpl', 'html', type + '.html');//type specific tpl
		if(!fs.existsSync(tplBlueprintPath)) tplBlueprintPath = path.join(env.twd, 'tpl', 'html', 'default.html');//use default tpl
		var tpl = fs.readFileSync(tplBlueprintPath, 'utf-8');
		console.log('Creating', 'template'.yellow, '=>', tplHTMLPath.grey);
		if(!program.dry) fs.outputFileSync(tplHTMLPath, mustache.render(tpl, metadata));
	}else
		console.log('create:', 'dest file already exists:'.red, tplHTMLPath);
}

//3.load js tpl of specific type
if(!fs.existsSync(target.path)){
	var tpl = fs.readFileSync(path.join(env.twd, 'tpl', 'js', type + '.js'), 'utf-8');
	console.log('Creating', type.yellow, '=>', target.path.grey);
	if(!program.dry) fs.outputFileSync(target.path, mustache.render(tpl, metadata));
}else
	console.log('create:', 'dest file already exists:'.red, target.path);

//4.include newly created js into -i indicated loader html (e.g the index.html)
if(target.side === 'client'){
	if(!program.index || program.index === 'false') return;

	var indexFile = path.join(target.base, program.index);
	if(!fs.existsSync(indexFile)) {
		console.log('create:', 'can not find:'.red, indexFile);
		return;
	}

	var indexHTML = fs.readFileSync(indexFile, 'utf-8');
	var $ = cheerio.load(indexHTML);
	if($('script[src="' + metadata.path.relative + '"]').length > 0) {
		console.log('create:', 'already in place:'.red, metadata.path.relative, '@', program.index);
		return;
	}
	//to accommodate dynamic view patching in build, last script will always be <script>app.run()</script> 
	$('body > script').last().before('<script src="' + metadata.path.relative + '"></script>\n\t');
	if(!program.dry) fs.outputFileSync(indexFile, $.html());
	console.log('Added to', program.index.yellow, '@', indexFile.grey);
}

