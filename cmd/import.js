/**
 * Import an exported dev project package (*.tar.gz) into your current project.
 *
 * Caution
 * -------
 * The import process will OVERRIDE existing files of your local project with those from the imported package!
 *
 * @author Tim Liu
 * @created 2014.08.29
 */

var program = require('commander'),
_ = require('underscore'),
colors = require('colors'),
path = require('path'),
fs = require('fs-extra'),
shell = require('shelljs'),
targz = require('tar.gz');

var env = JSON.parse(process.env.stagejs);

if(!env['stagejs-version']){
	console.error('You don\'t have a project here...'.red, 'use \'init\' first.'.yellow);
	process.exit(1);
}

program
	.version('0.1.0')
	.option('-o, --override', 'Override existing files during import')
	.parse(process.argv);

var pack = program.args[0] || 'exported.tar.gz';
pack = path.resolve(pack);

if(!fs.existsSync(pack)) {
	console.error('File not found!'.red);
	return;
}

console.log('Merging ...'.yellow);
new targz().extract(pack, env.cwd, function(err){
	if(err) console.error(err);
	else {
		if(!program.override){
			shell.cp('-R', path.join(env.cwd, 'exported'), env.cwd);
			console.log('Use --override if you want to override existing files...'.yellow);
		}
		else {
			shell.cp('-Rf', path.join(env.cwd, 'exported'), env.cwd);
			shell.rm(pack);
		}
		shell.rm('-rf', path.join(env.cwd, 'exported'));
	}
});


