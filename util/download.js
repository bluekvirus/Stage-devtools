/**
 * Download a file and optionally ungzip into target folder
 *
 * @author Tim.Liu
 * @created 2014.08.19
 */

var targz = require('tar.gz'),
request = require('request'),
shell = require('shelljs'),
path = require('path'),
_ = require('underscore'),
fs = require('fs-extra');

module.exports = function(url, folder, gunzip, cb){

	var kitGzFile = path.join(folder, _.uniqueId('tmp_') + '.dat');
	fs.ensureFileSync(kitGzFile);
	var kitGzFileStream = fs.createWriteStream(kitGzFile);
	request(url).pipe(kitGzFileStream);
	console.log('Downloading'.yellow, url, '...'.yellow);
	kitGzFileStream.on('finish', function(){
		if(gunzip){
			console.log('Extracting ...'.yellow);
			new targz().extract(kitGzFile, folder, function(err){
				if(err) console.error(err);
				else {
					shell.rm(kitGzFile);
					cb(folder);
				}
			});
		}else cb(kitGzFile);
	});

};