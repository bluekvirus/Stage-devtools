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
	.version('0.1.0')
	.option('-d, --dry', 'Only output the target file type and path instead of actually creating it.')
	.parse(process.argv);

var type = program.args[0], name = program.args[1], base;
var jsTargets = {
	client: {
		types: ['view', 'context', 'editor', 'validator', 'widget', 'plugin'],
		base: path.join(env.cwd, env.implementation, 'js')
	},
	server: {
		types: ['router', 'middleware'],
		base: path.join(env.cwd, env.tools, 'devserver')
	}
};

function resolveToJSPath(type, name){
	for(var x in jsTargets){
		if(_.contains(jsTargets[x].types, type)){
			base = jsTargets[x].base;
			break;
		}
	}
	if(!base) return;

	var p = name.split('.');
	if(p[p.length-1] === 'js') p.pop();
	if(_.contains(jsTargets[x].types, p[0])){
		base = path.join(base, p.join(path.sep));
	}else {
		base = path.join(base, type, p.join(path.sep));
	}
	
	if(/\.js$/.test(base))
		return base;
	return base + '.js';
}

console.log('Creating', type.yellow, '=>', resolveToJSPath(type, name).grey);
if(program.dry) return;

console.log('TBI');


