'use strict';

var utils = {

	fmtDate: function (d) {
		d = d.toString();
		return d.length == 1 ? '0' + d : d;
	},

	sprintf (str, ctx, token) {
		var regx;

		ctx = ctx || {};
		for (var i in ctx) {

			token = typeof token !== 'undefined'
				? '/\%' + i + '/'
				: '/\{' + i + '\}/';

			if (typeof i === 'string') {
				regx = eval(token);
				str  = str.replace(regx, ctx[i]);
			}
		}
		return str;
	}
};

utils.fmtFilename = function (path) {
	var d, p, f, x;

	d = new Date();
	p = path;
	f = utils.fmtDate(d.getFullYear()) + utils.fmtDate(d.getMonth() + 1) + utils.fmtDate(d.getDate());
	x = p + '/' + f;
	return { path: p, filename: f, full: x };
};

module.exports = utils;