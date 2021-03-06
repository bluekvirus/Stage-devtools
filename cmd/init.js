/**
 * Download the Stage.js starter-kit version, extract and prepare bower/[npm]
 *
 * @author Tim.Liu
 * @created 2014.08.19
 */

var program = require('commander'),
_ = require('underscore'),
colors = require('colors'),
path = require('path'),
fs = require('fs-extra'),
shell = require('shelljs'),
checkPrereq = require('../cli.js');

var check = checkPrereq();
if(!!check.error){
	console.error(('You need to fix ' + String(check.error).bold.underline + ' development enviroment error(s) first...').red);
	console.log();
	console.log(check.msg);
	process.exit(1);
}

var env = JSON.parse(process.env.stagejs);
var download = require(path.join(env.twd, 'util/download.js'));

if(env['stagejs-version']){
	console.error('You already have a project here...'.red, 'use \'update\' instead.'.yellow);
	process.exit(1);
}

//0. clean up
var tmpFolder = path.join(env.cwd, 'tmp');
shell.rm('-rf', tmpFolder);

//1. grab starter-kit and extract to current location
download([env.repo, env.kit].join('/'), tmpFolder, true, function(tmpFolder){
	//var error;
	shell.mv(path.join(tmpFolder, 'kit', '*'), env.cwd);
	shell.rm('-rf', tmpFolder);

	//2. run bower install
	console.log('Installing Javascript libraries ...'.yellow);
	shell.cd(path.join(env.cwd, env.implementation));
	if(!shell.which('bower')) {
		console.log('You must have bower installed...'.red);
		process.exit(1);
		return;
	}
	shell.exec('bower install');

	//3.[optional] run npm install
	console.log('Installing Nodejs libraries ...'.yellow);
	shell.cd('..');
	shell.cd(env.tools);
	shell.exec('npm install');

	//4.[optional] create a new theme
	console.log('Creating your project theme ...'.yellow);
	shell.cd('themeprep');
	shell.exec('node run project');

	//5. initialize git
	if(shell.which('git')){
		console.log('initializing git repo ...'.yellow);
		shell.mv(path.join(env.cwd, 'gitignore'), path.join(env.cwd, '.gitignore'));
		shell.cd(env.cwd);
		shell.exec('git init');
	}else {
		shell.rm(path.join(env.cwd, 'gitignore'));
	}
	
	console.log('Done'.green, 'You can now start the dev server and begin development.'.yellow, 'stagejs serve [--port <number>]');
	//console.log('ERROR'.red, error, 'please double check your system enviroment...'.grey);
});
