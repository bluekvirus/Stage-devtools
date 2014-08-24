#!/usr/bin/env node

/**
 * The Stage.js dev cli tool cmd loader
 *
 * Usage
 * -----
 * stagejs <cmd> [args, ...]
 *
 * @author Tim.Liu
 * @created 2014.08.19
 */

//libs
var path = require('path'),
fs = require('fs-extra'),
_ = require('underscore'),
os = require('os'),
colors = require('colors');

//vars
var cwd = path.resolve('.'),
twd = path.resolve(__dirname),
config = '.stagejsrc';

//1. load env
//load defaults
var env = fs.readJSONSync(path.join(twd, config));
_.extend(env, {
	cwd: cwd,
	twd: twd
});
//load package.json
packageInfo = require(path.join(env.twd, 'package.json'));
//load local env overrides
var localEnvFile = path.join(env.cwd, config);
if(fs.existsSync(localEnvFile)){
	_.extend(env, fs.readJSONSync(localEnvFile));
}
//check if we already have a project at the current working dir
var bowerFile = path.join(env.cwd, env.implementation, 'bower.json');
if(fs.existsSync(bowerFile)){
	env['stagejs-version'] = require(bowerFile).devDependencies.stage;
}

//2. check required cmd
//remove node
var args = process.argv.slice(1);
//remove ../cli.js or stagejs
if(args[0] === __filename || /stagejs$/.test(args[0]))
	args.shift();
//grab cmd
var cmd = args.shift(),
cmdFile = path.join(env.twd, 'cmd', cmd + '.js');

if(cmd === '-v' || cmd === '--version'){
	console.log(packageInfo.version.yellow);
	process.exit(0);
}
if(cmd === '-h' || cmd === '--help'){
	console.log(os.EOL); //+newline
	console.log('\tExamples:\t', 'stagejs ' + '<cmd>'.yellow + ' [options]');
	console.log('\tRead help:\t', 'stagejs ' + '<cmd>'.yellow + ' -h, --help');
	console.log('');
	var ac = fs.readdirSync(path.join(env.twd, 'cmd'));
	var pattern = /\.js$/;
	ac = _.map(ac, function(c){
		if(pattern.test(c))
			return  path.basename(c, '.js');
	});
	console.log('\tAvailable', 'cmd'.yellow+':\t', _.compact(ac).join(', '));
	console.log(os.EOL); //+newline
	process.exit(0);
}
if(!cmd || !fs.existsSync(cmdFile)) {
	console.error('Invalid Command:'.red, cmd);
	process.exit(1);
}

//3. run the cmd
	
	//TBI report the cmd usage

process.env.stagejs = JSON.stringify(env);
args.unshift(cmdFile);
console.log(os.EOL); //++newline

var cmdproc = require('child_process').spawn('node', args, {
	//cwd: env.cwd,
	stdio: 'inherit'
});

cmdproc.on('close', function(code){
	console.log(os.EOL); //++newline
});