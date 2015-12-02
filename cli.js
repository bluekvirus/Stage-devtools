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
 * @updated 2015.12.01
 */

//libs
var path = require('path'),
fs = require('fs-extra'),
_ = require('underscore'),
os = require('os'),
colors = require('colors'),
shell = require('shelljs'),
should = require('should');

//0. pre-req checking
//programs/cli helpers to check
var cmdsToCheck = [
	{cmd: 'bower', required: true, description: 'Bower front-end package manager', link: 'http://bower.io/'}, 
	{cmd: 'nodemon', required: true, description: 'Nodejs process with auto-reload', link: 'http://nodemon.io/'},
	{cmd: 'git', required: true, description: 'Git source code manager', link: 'https://git-scm.com/'},
	{cmd: 'gm', required: true, description: 'GraphicsMagick image processor', link: 'http://www.graphicsmagick.org/'}, 
	
	{cmd: 'redis-server', required: false, description: 'Redis key-value store', link: 'http://redis.io/'},
	{cmd: 'rabbitmq-server', required: false, description: 'RabbitMQ message broker', link: 'https://www.rabbitmq.com/'},
	{cmd: 'postgres', required: false, description: 'PostgreSQL database', link: 'http://www.postgresql.org/'},
	{cmd: 'mongod', required: false, description: 'MongoDB NoSQL database', link: 'https://www.mongodb.org/'},
];

function checkPrereq(){
	var result = {error: 0, msg: ''};
	_.each(cmdsToCheck, function(d){
		var msg = 'locate ' + d.cmd.yellow + ' (' + d.description.grey + ') ... ',
		error;
			try{
				should(shell.which(d.cmd)).be.ok;
			}catch(e){
				error = true;
				msg += '[' + 'X'.red + '] ';
			}finally {
				if(!error) msg += '[' + 'OK'.green + ']';
				else {
					if(d.required){
						msg += 'required'.red + os.EOL + os.EOL + '\t Read install steps on ' + d.link.yellow + '\t' + os.EOL;
						result.error++;
					}else
						msg += 'optional'.grey;
				}
				result.msg += msg + os.EOL;
			}
	});
	return result;
}

//as a module, not main, export the checking function.
if(require.main !== module){
	module.exports = checkPrereq;
	return;
}

//as main, keep running to load the sub-cmd.

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
var cmd = args.shift() || '-h',
cmdFile = path.join(env.twd, 'cmd', cmd + '.js');

if(cmd === '-V' || cmd === '--version'){
	console.log(packageInfo.version.yellow);
	process.exit(0);
}

function printHelp(){
	console.log(); //+newline
	console.log('\tExamples:\t', 'stagejs ' + '<cmd>'.yellow + ' [options]');
	console.log('\tRead help:\t', 'stagejs ' + '<cmd>'.yellow + ' -h, --help');
	console.log('\tVersion:\t', 'stagejs -V, --version');
	console.log('');
	var ac = fs.readdirSync(path.join(env.twd, 'cmd'));
	var pattern = /\.js$/;
	ac = _.map(ac, function(c){
		if(pattern.test(c))
			return  path.basename(c, '.js');
	});
	console.log('\tAvailable', 'cmd'.yellow+':\t', _.compact(ac).join(', '));
	console.log(); //+newline
}

if(cmd === '-h' || cmd === '--help'){
	printHelp();
	process.exit(0);
}

if(!fs.existsSync(cmdFile)) {
	console.error('Invalid Command:'.red, cmd);
	printHelp();
	process.exit(1);
}

//3. run the cmd
	
	//TBI report the cmd usage

process.env.stagejs = JSON.stringify(env);
args.unshift(cmdFile);
console.log(); //+newline os.EOL

var cmdproc = require('child_process').spawn('node', args, {
	//cwd: env.cwd,
	stdio: 'inherit'
});

cmdproc.on('close', function(code){
	console.log(); //+newline
});

//export the pre-req checking function
module.exports = checkPrereq;