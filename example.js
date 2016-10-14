'use strict';

var logs = require('./lib/logger');
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
// var logger = new Logs({

// 	*
// 	 * Options
// 	 * ---------
// 	 * nl: Boolean
// 	 * prefix: String
// 	 * extension: String
// 	 * stdout: Boolean
// 	 * stderr: Boolean
// 	 * wfile:  Boolean
// 	 * encoding: String
// 	 * path: String
// 	 * filename: String
	 

// 	path: __dirname + '/storage',

// });

logs.init({
	path: __dirname + '/storage',
	wfile: true,
});

console.log(logs.config);


logs.stdout().info('Hello {name} !', { name: 'Thomas Bazire' });
