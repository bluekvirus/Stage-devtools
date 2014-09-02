/**
 * Start the development server @--port
 *
 * @author Tim.Liu
 * @created 2014.08.22
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
	.option('-a, --autoreload', 'Enable auto-reload through nodemon')
	.option('-P, --port [number]', 'Override which on port the devserver will be running', '')
	.option('-F, --profile [name]', 'Override which profile the devserver will be using', 'default')
	.parse(process.argv);

if(program.args[0]) {
	program.port = program.port || program.args[0];
}

shell.cd(path.join(env.cwd, env.tools, 'devserver'));
if(!program.autoreload) console.log('To enable auto-reload use -a, --autoreload'.yellow);
var result = shell.exec((program.autoreload?'nodemon':'node') + ' run.js ' + program.profile + ' ' + program.port);
if(result!== 0) console.error('Server init error...'.red);
//else console.log('Served'.green); can't be reached since the server will be running.

