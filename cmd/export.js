/**
 * Export a part of your dev project into a .tar.gz and ready to be imported by others
 *
 * Prerequisite
 * ------------
 * You will need the config.export.js script under {tools}/build/config.export.js to use this command.
 *
 * @author Tim Liu
 * @created 2014.08.29
 */

var program = require('commander'),
_ = require('underscore'),
colors = require('colors'),
path = require('path'),
fs = require('fs-extra'),
shell = require('shelljs');

var env = JSON.parse(process.env.stagejs);

if(!env['stagejs-version']){
	console.error('You don\'t have a project here...'.red, 'run \'stagejs init\' first.'.yellow);
	process.exit(1);
}

program
	.version('0.1.0')
	.parse(process.argv);

var buildToolBase = path.join(env.cwd, env.tools, 'build');
var exportScript = 'config.export.js';
if(!fs.existsSync(path.join(buildToolBase, exportScript))){
	console.error('Missing'.red, exportScript.yellow, 'under'.red, buildToolBase.yellow);
	return;
}
var tmpFolder = 'exported';
shell.exec('node ' + path.join(buildToolBase, 'run.js') + ' -C export -G ' + tmpFolder + '.tar.gz ' + tmpFolder);
shell.rm('-rf', tmpFolder);

console.log('Exported'.yellow, '=>', path.join(env.cwd, tmpFolder + '.tar.gz').yellow);