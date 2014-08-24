/**
 * Invoking the build process with proper args
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

shell.exec('node ' + path.join(env.cwd, env.tools, 'build', 'run.js') + ' -B '+ path.join('..', '..', env.implementation) + ' ' + process.argv.slice(2).join(' '));