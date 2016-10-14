'use strict';

var Logs = require('./logger');
var fs   = require('fs');
/**
 * Callable methods
 * --------------------
 * - emergency
 * - alert
 * - critical
 * - error
 * - warning
 * - notice
 * - info
 * - debug
 */
var logger = new Logs({

	/**
	 * Options
	 * ---------
	 * nl: Boolean
	 * prefix: String
	 * extension: String
	 * stdout: Boolean
	 * stderr: Boolean
	 * wfile:  Boolean
	 * encoding: String
	 * path: String
	 * filename: String
	 */

	path: __dirname + '/storage',

});


logger.info('Hello {name} !', { name: 'Thomas Bazire' });
