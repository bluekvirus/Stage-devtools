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
shell = require('shelljs');

var targz = require('tar.gz'),
request = require('request');


var env = JSON.parse(process.env.stagejs);

if(env['stagejs-version']){
	console.error('You already have a project here...'.red);
	process.exit(1);
}

//0. clean up
var tmpFolder = path.join(env.cwd, 'tmp');
shell.rm('-rf', tmpFolder);

//1. grab starter-kit and extract to current location
var kitGzFile = path.join(tmpFolder, env.kit);
fs.ensureFileSync(kitGzFile);
var kitGzFileStream = fs.createWriteStream(kitGzFile);
request([env.repo, env.kit].join('/')).pipe(kitGzFileStream);
console.log('Downloading', env.kit, '...');
kitGzFileStream.on('finish', function(){
	console.log('Extracting ...');
	new targz().extract(kitGzFile, tmpFolder, function(err){
		if(err) console.error(err);
		shell.mv(path.join(tmpFolder, 'kit', '*'), env.cwd);
		shell.rm('-rf', tmpFolder);

		//2. run bower install
		console.log('Installing Javascript libraries ...');
		shell.cd(path.join(env.cwd, env.implementation));
		if(!shell.which('bower')) {
			console.log('You must have bower installed...'.red);
			process.exit(1);
			return;
		}
		shell.exec('bower install');

		//3.[optional] run npm install
		console.log('Installing Nodejs libraries ...');
		shell.cd('../tools');
		shell.exec('npm install');

		//4.[optional] create a new theme
		console.log('Creating your project theme ...');
		shell.cd('themeprep');
		shell.exec('node run project');

		console.log('Done', 'You can now start the dev server and begin development.');
	});
});
