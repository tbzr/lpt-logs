'use strict';

var fs = require('fs');

var Configuration = require('./configuration');
var levels  = require('./levels');
var utils   = require('./utils');
var sprintf = utils.sprintf;

var Logger = {};

Logger.init = function (options) {
	Configuration.set(options);
	Logger.conf = Configuration;

	var c = utils.fmtFilename(Configuration.path);
	var file = c.path + '/' + Configuration.prefix + c.filename + Configuration.extension;

	Logger.level  = Configuration.level;
	return Logger;
};

Logger.emergency = function (event, ctx) {
	return Logger.log(levels.EMERGENCY, event, ctx);
};

Logger.alert = function (event, ctx) {
	return Logger.log(levels.ALERT, event, ctx);
};

Logger.critical = function (event, ctx) {
	return Logger.log(levels.CRITICAL, event, ctx);
};

Logger.error = function (event, ctx) {
	return Logger.log(levels.ERROR, event, ctx);
};

Logger.warning = function (event, ctx) {
	return Logger.log(levels.WARNING, event, ctx);
};

Logger.notice = function (event, ctx) {
	return Logger.log(levels.NOTICE, event, ctx);
};

Logger.info = function (event, ctx) {
	return Logger.log(levels.INFO, event, ctx);
};

Logger.debug = function (event, ctx) {
	return Logger.log(levels.DEBUG, event, ctx);
};

Logger.log = function (level, event, ctx) {
	if (!Logger.conf) { Logger.init(); }

	Logger.level = Logger.codeToLevel(level);

	Logger.createEvent(sprintf(event, ctx));

	if (typeof Configuration.wfile !== 'undefined' && Configuration.wfile === true) {
		Logger.writeFile();
	}

	Logger.write();

	return Logger;
};

Logger.write = function () {

	var event = Logger.event;

	if (Configuration.nl) {
		event += "\n";
	}

	if (Configuration.stdout) {
		process.stdout.write(event);
	}

	if (Configuration.stderr) {
		process.stderr.write(event);
	}

	return Logger;
};

Logger.writeFile = function () {
	
	var flag  = 'a';
	var event = Logger.event;

	if (Configuration.nl) {
		event += "\n";
	}

	try {
		fs.accessSync(Configuration.file, fs.F_OK);
	} catch (e) {
		if (Configuration.debug) {
			console.log(e);
		}

		if (e.code !== 'ENOENT') {
			return Logger;
		}
		flag = 'w+';
	}

	var options = {
		encoding: Configuration.encoding,
		mode:     Configuration.mode,
		flag:     flag
	};

	try {
		fs.writeFileSync(Configuration.file, event, options);
	} catch (e) {
		if (Configuration.debug) {
			console.log(e);
		}
	}

	return Logger;
};

Logger.createEvent = function (event) {
	var d, date, e;

	d = new Date();
	date = utils.fmtDate(d.getFullYear())
			+ '-' + utils.fmtDate(d.getMonth() + 1)
			+ '-' + utils.fmtDate(d.getDate())
			+ ' ' + utils.fmtDate(d.getHours())
			+ ':' + utils.fmtDate(d.getMinutes())
			+ ':' + utils.fmtDate(d.getSeconds());

	e = {
		l: Logger.level,
		d: date,
		e: event
	};

	Logger.event = sprintf(Configuration.pattern, e, Configuration.pattern_token);

	// console.log(Logger.event);
	// console.log(Configuration.pattern);
	// console.log(e);
	// console.log(Configuration.pattern_token);

	return Logger;
};

Logger.codeToLevel = function (code) {
	for (var i in levels) {
		if (levels[i] === code) {
			return i;
		}
	}
	return null;
};

Logger.stdout = function (sw) {

	var opt = { stdout: true };
	if (typeof sw !== 'undefined') {
		opt.stdout = sw ? true : false;
	}
	Configuration.set(opt);
	return Logger;
};

Logger.stderr = function (sw) {

	var opt = { stderr: true };
	if (typeof sw !== 'undefined') {
		opt.stderr = sw ? true : false;
	}
	Configuration.set(opt);
	return Logger;
};

Logger.config = function () {
	return Configuration.get();
};

module.exports = Logger;
