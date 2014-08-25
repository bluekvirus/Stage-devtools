/**
 * Update bower.json(merge deps), themes/default and tools (+package.json(merge deps)) from the latest starter-kit.
 * bower install/update, npm install/update. (will NOT refresh themes)
 * Update stage.js/stage.min.js & dependenceis.min.js from edge-build if offered the --edge option.
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

var env = JSON.parse(process.env.stagejs);
var download = require(path.join(env.twd, 'util/download.js'));

if(!env['stagejs-version']){
	console.error('You don\'t have a project here...'.red, 'use \'init\' first.'.yellow);
	process.exit(1);
}

program
	.version('0.1.0')
	.option('-e, --edge', 'Also update Stage.js framework to its edge version')
	.option('-p, --packages', 'Fully update bower and npm packages as well')
	.parse(process.argv);

//0. clean up
var tmpFolder = path.join(env.cwd, 'tmp');
shell.rm('-rf', tmpFolder);

//pre.1-1 define merge & update func (keys arg has defaults)
function mergeUpdateJSON(oldFile, newFile, keys){
	console.log('Merge & update '.yellow, oldFile, ' ...'.yellow);
	var jsonNew = fs.readJSONSync(newFile),
	jsonOld = fs.readJSONSync(oldFile);
	_.each(keys || ['devDependencies', 'dependencies'], function(key){
		_.extend(jsonOld[key], jsonNew[key]);
	});
	jsonOld.updatedOn = new Date();
	fs.writeJSONSync(oldFile, jsonOld);
}
//pre.1-2 done cleanup func
function done () {
	shell.rm('-rf', tmpFolder);
	console.log('Done'.green);
}
//1. grab starter-kit again (into tmpFolder/kit)
download([env.repo, env.kit].join('/'), tmpFolder, true, function(tmpFolder){
	var implFolder = path.join(env.cwd, env.implementation),
	toolsFolder = path.join(env.cwd, env.tools);

	//update themes/default
	console.log('Updating default theme ...'.yellow);
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'implementation', 'themes', 'default'), path.join(implFolder, 'themes'));
	//merge/update bower.json
	mergeUpdateJSON(path.join(implFolder, 'bower.json'), path.join(tmpFolder, 'kit', 'implementation', 'bower.json'));
	
	//update tools (build/run.js, shared/*, themeprep/run.js, devserver/run.js, devserver/bot/*, devserver/util/*)
	console.log('Updating tools ...'.yellow);
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'build', 'run.js'), path.join(toolsFolder, 'build'));
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'shared', '*'), path.join(toolsFolder, 'shared'));
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'themeprep', 'run.js'), path.join(toolsFolder, 'themeprep'));
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'devserver', 'run.js'), path.join(toolsFolder, 'devserver'));
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'devserver', 'bot', '*'), path.join(toolsFolder, 'devserver', 'bot'));
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'devserver', 'util', '*'), path.join(toolsFolder, 'devserver', 'util'));
	//merge/update package.json
	mergeUpdateJSON(path.join(toolsFolder, 'package.json'), path.join(tmpFolder, 'kit', 'tools', 'package.json'));

	//bower update, npm update
	shell.cd(implFolder);
	if(program.packages){
		console.log('Updating all Javascript libraries ...'.yellow);
		shell.exec('bower update');
	}
	else{
		console.log('Installing missing Javascript libraries ...'.yellow);
		shell.exec('bower install');
	}
	shell.cd('..');
	shell.cd(toolsFolder);
	if(program.packages){
		console.log('Updating all Nodejs libraries ...'.yellow);
		shell.exec('npm update');
	}else{
		console.log('Installing missing Nodejs libraries ...'.yellow);
		shell.exec('npm install');
	}

	
	//--edge
	//2. grab edge build .gz (into tmpFolder/framework) 
	if(program.edge){
		download([env.repo, env.edge].join('/'), tmpFolder, true, function(tmpFolder){
			//update tmpFolder/framework/js into implFolder/bower_components/stage/js
			console.log('updating framework to edge version ...'.yellow);
			shell.cp('-Rf', path.join(tmpFolder, 'framework', '*'), path.join(implFolder, 'bower_components', 'stage', 'dist'));
			done();
		});
	}else {
		done();
	}
});