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
shell = require('shelljs');

var env = JSON.parse(process.env.stagejs);

if(!env['stagejs-version']){
	console.error('You don\'t have a project here...'.red, 'use \'init\' first.'.yellow);
	process.exit(1);
}

program
	.usage('[options] <type> <name>')
	.version('0.1.0')
	.option('-d, --dry', 'Only output the target file type and path instead of actually creating it.')
	.option('-l, --list', 'List possible types of code you can create using this cmd.')
	.parse(process.argv);

var type = program.args[0], name = program.args[1], base;
var jsTargets = {
	client: {
		types: ['view', 'context', 'editor', 'validator', 'widget', 'plugin'],
		base: path.join(env.cwd, env.implementation, 'js'),
	},
	server: {
		types: ['router', 'middleware'],
		base: path.join(env.cwd, env.tools, 'devserver')
	}
};

var p;
function resolveToJSPath(type, name){
	for(var x in jsTargets){
		if(_.contains(jsTargets[x].types, type)){
			base = jsTargets[x].base;
			break;
		}
	}
	if(!base) return;

	p = name.split('.');
	if(p[p.length-1] === 'js') p.pop();
	if(_.contains(jsTargets[x].types, p[0])){
		base = path.join(base, p.join(path.sep));
	}else {
		base = path.join(base, type + (x === 'client'?'':'s'), p.join(path.sep));
	}
	
	if(/\.js$/.test(base))
		return base;
	return base + '.js';
}

//-l, --list
if(program.list){
	_.each(jsTargets, function(t, side){
		console.log(side, 'side:', t.types);
	});
	return;
}

//guard A
if(!type || !name){
	console.error('Empty code type or name...'.red);
	return;
}

//guard B
var target = resolveToJSPath(type, name);
if(!target) {
	console.error(('There is no template for type: ' + type + '...').red, 'use \'-l, --list\' to see possible types.'.yellow);
	return;
}

console.log('Creating', type.yellow, '=>', target.grey);
//-d, --dry
if(program.dry) return;

fs.ensureDirSync(path.dirname(target));
shell.cp(path.join(env.twd, 'tpl', type + '.js'), target);

//special + html tpl
var htmlRequiredTypes = ['view', 'context', 'editor', 'widget'];
if(_.contains(htmlRequiredTypes, type)){
	var tplHTMLName = p.join(path.sep) + '.html';
	var tplHTMLPath = path.join(env.cwd, env.implementation, 'static', 'template', _.contains(htmlRequiredTypes, p[0])?'':type, tplHTMLName);
	fs.ensureFileSync(tplHTMLPath);
	fs.writeFileSync(tplHTMLPath, '<h1>Stage.js Rocks!</h1>');
}

