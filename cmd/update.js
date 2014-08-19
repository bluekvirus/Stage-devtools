/**
 * Update bower.json(merge deps), themes/default and tools (+package.json(merge deps)) from the latest starter-kit.
 * bower update, npm update. (will NOT refresh themes)
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
	.parse(process.argv);

//0. clean up
var tmpFolder = path.join(env.cwd, 'tmp');
shell.rm('-rf', tmpFolder);

//1. grab starter-kit again (into tmpFolder/kit)
download([env.repo, env.kit].join('/'), tmpFolder, true, function(tmpFolder){
	var implFolder = path.join(env.cwd, env.implementation),
	toolsFolder = path.join(env.cwd, env.tools);

	//update themes/default
	console.log('updating default theme ...'.yellow);
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'implementation', 'themes', 'default'), path.join(implFolder, 'themes'));
	//merge/update bower.json (TBI)

	//update tools (build/run.js, shared/*, themeprep/run.js, devserver/run.js, devserver/bot/*, devserver/util/*)
	console.log('updating tools ...'.yellow);
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'build', 'run.js'), path.join(toolsFolder, 'build'));
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'shared', '*'), path.join(toolsFolder, 'shared'));
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'themeprep', 'run.js'), path.join(toolsFolder, 'themeprep'));
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'devserver', 'run.js'), path.join(toolsFolder, 'devserver'));
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'devserver', 'bot', '*'), path.join(toolsFolder, 'devserver', 'bot'));
	shell.cp('-Rf', path.join(tmpFolder, 'kit', 'tools', 'devserver', 'util', '*'), path.join(toolsFolder, 'devserver', 'util'));
	//merge/update package.json (TBI)

	//bower update, npm update (TBI)
	
	//--edge
	//2. grab edge build .gz (into tmpFolder/framework) 
	if(program.edge){
		download([env.repo, env.edge].join('/'), tmpFolder, true, function(tmpFolder){
			//update tmpFolder/framework/js into implFolder/bower_components/stage/js
			console.log('updating framework to edge version ...'.yellow);
			shell.cp('-Rf', path.join(tmpFolder, 'framework', '*'), path.join(implFolder, 'bower_components', 'stage', 'dist'));
		});
	}
});