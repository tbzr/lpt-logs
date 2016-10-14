'use strict';

var fs = require('fs');
var async = require('async');

const EMERGENCY = 8;
const ALERT     = 7;
const CRITICAL  = 6;
const ERROR     = 5;
const WARNING   = 4;
const NOTICE    = 3;
const INFO      = 2;
const DEBUG     = 1;

const EVENTS    = [
	{
		type: DEBUG,
		str: 'Debug'
	},
	{
		type: INFO,
		str: 'Info'
	},
	{
		type: NOTICE,
		str: 'Notice'
	},
	{
		type: WARNING,
		str: 'Warning'
	},
	{
		type: ERROR,
		str: 'Error'
	},
	{
		type: CRITICAL,
		str: 'Critical'
	},
	{
		type: ALERT,
		str: 'Alert'
	},
	{
		type: EMERGENCY,
		str: 'Emergency'
	}
];

const DEFAULT_PATH = '/var/log';

function fmtDate (d) {
	d = d.toString();
	return d.length == 1 ? '0' + d : d;
};

function fmtFilename (path) {

	var d, p, f, x;

	d = new Date();
	p = path || DEFAULT_PATH;
	f = fmtDate(d.getFullYear()) + fmtDate(d.getMonth() + 1) + fmtDate(d.getDate());
	x = p + '/' + f;
	return {path: p, filename: f, full: x };
};

function sprintf (str, ctx, token) {
	var regx;

	ctx  = ctx || {};
	for (var i in ctx) {

		token = typeof token !== 'undefined'
			? '/\%' + i + '/'
			: '/\{' + i + '\}/';

		if (typeof i === 'string') {
			regx = eval(token);
			str = str.replace(regx, ctx[i]);
		}
	}
	return str;
};


class Logger {

	constructor (options) {
		var f;

		this.options     = options || {};
		this.date        = new Date();

		this.level_limit = this.options.level || DEBUG;

		this.options.nl  = typeof this.options.nl !== 'undefined' ? this.options.nl : true;
		this._wfile      = typeof this.options.wfile !== 'undefined' ? this.options.wfile : true;
		this._stdout     = typeof this.options.stdout !== 'undefined' ? this.options.stdout : true;
		this._stderr     = this.options.stderr    || false;

		this._prefix     = this.options.prefix    || 'lpt_';
		this._extension  = this.options.extension || '.log';

		this._encoding   = this.options.encoding  || 'utf8';

		f = fmtFilename(this.options.path);

		this._path       = f.path;
		this._filename   = this._prefix;
		this._filename   += this.options.filename || f.filename;
		this._file       = this._path + '/' + this._filename + this._extension;
		this._pattern    = this.options.pattern || "[%c][%d] %e";
	}

	_write (event) {
		
		if (this.options.nl) {
			event += "\n";
		}

		if (this._stdout) {
			process.stdout.write(event);
		}
		
		if (this._stderr) {
			process.stderr.write(event);
		}
	
	}

	_writeFile (event) {
		var self;

		self = this;
		fs.access(this._file, fs.F_OK, function (err) {
			var options;

			options = {
				encoding: self._encoding,
				mode: 0o666,
				flag: err ? 'w+' : 'a'
			};

			fs.writeFile(self._file, event + "\n", options, function (err) {
				if (err) throw err;
				return self._write(event);
			});

		});

	}

	_createEvent (event) {
		var d, date, str, e;

		d = new Date();
		date = fmtDate(d.getFullYear())
			+ '-' + fmtDate(d.getMonth() + 1)
			+ '-' + fmtDate(d.getDate())
			+ ' ' + fmtDate(d.getHours())
			+ ':' + fmtDate(d.getMinutes())
			+ ':' + fmtDate(d.getSeconds());

		e = {
			'c': EVENTS[this._level - 1].str,
			'd': date,
			'e': event
		};

		return sprintf(this._pattern, e, '%');
	}


	_log (level, message, context) {
		var event;

		this._level   = level;
		this._message = message; 
		this._context = context || {};

		event = this._createEvent(sprintf(this._message, this._context));

		if (this._wfile) {
			this._writeFile(event);		
		}
		return this;
	}

	_clone () {
		return Object.assign({ __proto__: this.__proto__ }, this);
	}

	/**
	 * Public Methods 
	 * ------------------------------------------------------------------------
	 *
	 */

	/**
	 * State methods
	 * -----------------
	 */
	emergency (message, context) {
		return this._log(EMERGENCY, message, context);
	}

	alert (message, context) {
		return this._log(ALERT, message, context);
	}

	critical (message, context) {
		return this._log(CRITICAL, message, context);
	}

	error (message, context) {
		return this._log(ERROR, message, context);
	}

	warning (message, context) {
		return this._log(WARNING, message, context);
	}

	notice (message, context) {
		return this._log(NOTICE, message, context);
	}

	info (message, context) {
		return this._log(INFO, message, context);
	}

	debug (message, context) {
		return this._log(DEBUG, message, context);
	}

	/**
	 * Setters
	 * ----------
	 */
	stdout (sw) {

		if (typeof sw === 'undefined') {
			var clone = this._clone();
			clone._stdout = true;
			return clone;
		}
		this._stdout = sw ? true : false;
		return this;
	}

	stderr (sw) {

		if (typeof sw === 'undefined') {
			var clone = this._clone();
			clone._stderr = true;
			return clone;
		}
		this._stderr = sw ? true : false;
		return this;
	}

	/**
	 * Getters
	 * ------------
	 */

	getFile () {
		return this._file;
	}

	getPath () {
		return this._path;
	}

	getFilename () {
		return this._filename + this._extension;
	}

	getExtenstion () {
		return this._extension;
	}

	getPrefix () {
		return this._prefix;
	}
};

module.exports = Logger;
