'use strict';

var levels = require('./levels');
var utils  = require('./utils');

var Configuration = {

	debug: false,

	nl: true,

	level: levels.DEBUG,

	wfile:  true,
	stdout: true,
	stderr: false,

	prefix: 'lpt_',
	extension: '.log',

	encoding: 'utf8',

	pattern:  '[%l][%d] %e',
	pattern_token: '%',

	path: '/var/log',

	mode: 0o666,

	set: function (options) {
		options = options || {};

		Configuration.debug  = options.debug || Configuration.debug;
		Configuration.level  = options.level  || Configuration.level;

		Configuration.nl     = typeof options.nl !== 'undefined'
			? options.nl
			: Configuration.nl;
		
		Configuration.wfile  = typeof options.wfile !== 'undefined'
			? options.wfile
			: Configuration.wfile;
		
		Configuration.stdout = typeof options.stdout !== 'undefined'
			? options.stdout
			: Configuration.stdout;

		Configuration.stderr = typeof options.stderr !== 'undefined'
			? options.stderr
			: Configuration.stderr; 
		
		Configuration.prefix = options.prefix || Configuration.prefix;
		Configuration.extension = options.extension || Configuration.extension;
		Configuration.encoding = options.encoding || Configuration.encoding;
		Configuration.pattern = options.pattern || Configuration.pattern;

		Configuration.path = options.path || Configuration.path;
		Configuration.mode = options.mode || Configuration.mode;

		var c = utils.fmtFilename(Configuration.path);
		var file = c.path + '/' + Configuration.prefix + c.filename + Configuration.extension;
		Configuration.file = file;

	},

	get: function () {
		return {
			debug: Configuration.debug,
			nl: Configuration.nl,
			level: Configuration.level,
			wfile: Configuration.wfile,
			stdout: Configuration.stdout,
			stderr: Configuration.stderr,
			prefix: Configuration.prefix,
			extension: Configuration.extension,
			encoding: Configuration.encoding,
			pattern: Configuration.pattern,
			path: Configuration.path,
			mode: Configuration.mode,
			file: Configuration.file
		};
	}

};

var c = utils.fmtFilename(Configuration.path);
var file = c.path + '/' + Configuration.prefix + c.filename + Configuration.extension;

Configuration.file = file;

module.exports = Configuration;