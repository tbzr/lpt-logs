'use strict';

var fs = require('fs');

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

function sprintf (str, ctx) {
	var regx;

	ctx  = ctx || {};
	for (var i in ctx) {
		
		if (typeof i === 'string') {
			regx = eval('/\{' + i + '\}/');
			str = str.replace(regx, ctx[i]);
		}
	}
	return str;
};

class Logger {

	/**
	 * Logger states
	 * --------------------
	 * emergency
	 * alert
	 * critical
	 * error
	 * warning
	 * notice
	 * info
	 * debug
	 */

	constructor (options) {
		var f;

		this.options     = options || {};
		this.date        = new Date();

		this.level_limit = this.options.level || DEBUG;

		this.options.nl  = typeof this.options.nl !== 'undefined' ? this.options.nl : true;
		this.wfile       = typeof this.options.wfile !== 'undefined' ? this.options.wfile : true;
		this.stdout      = typeof this.options.stdout !== 'undefined' ? this.options.stdout : true;
		this.stderr      = this.options.stderr    || false;

		this.prefix      = this.options.prefix    || 'lpt_';
		this.extension   = this.options.extension || '.log';

		this.encoding    = this.options.encoding  || 'utf8';

		f = fmtFilename(this.options.path);

		this.path        = f.path;
		this.filename    = this.prefix;
		this.filename    += this.options.filename || f.filename;
		this.file        = this.path + '/' + this.filename + this.extension;
	}

	_write (event) {
		
		if (this.options.nl) {
			event += "\n";
		}

		if (this.stdout) {
			process.stdout.write(event);
		}
		
		if (this.stderr) {
			process.stderr.write(event);
		}
	
	}

	_writeFile (event) {
		var self;

		self = this;
		fs.access(this.file, fs.F_OK, function (err) {
			var options;

			options = {
				encoding: self.encoding,
				mode: 0o666,
				flag: err ? 'w+' : 'a'
			};

			fs.writeFile(self.file, event + "\n", options, function (err) {
				if (err) throw err;
				return self._write(event);
			});

		});

	}

	_createEvent (event) {
		var d, date;

		d = new Date();
		date = fmtDate(d.getFullYear())
			+ '-' + fmtDate(d.getMonth() + 1)
			+ '-' + fmtDate(d.getDate())
			+ ' ' + fmtDate(d.getHours())
			+ ':' + fmtDate(d.getMinutes())
			+ ':' + fmtDate(d.getSeconds());
		return "[" + EVENTS[this.level - 1].str + "][" + date + "] " + event;
	}


	_log (level, message, context) {
		var event;

		this.level   = level;
		this.message = message; 
		this.context = context || {};

		event = this._createEvent(sprintf(this.message, this.context));

		if (this.wfile) {
			this._writeFile(event);		
		}
	}

	/**
	 * Public Methods 
	 * ------------------------------------------------------------------------
	 *
	 */

	stdout () {
		this.stdout = true;
		return this;
	}

	stderr () {
		this.stderr = true;
		return this;
	}

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
}

module.exports = Logger;