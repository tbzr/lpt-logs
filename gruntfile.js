(function () {

	module.exports = function (grunt) {

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			bump: {
				options: {
					part: 'patch'
				},
				files: ['package.json']
			}
		});

		grunt.loadNpmTasks('grunt-bumpx');

		grunt.registerTask('git-tag', "Tags a release in git", function () {
			var child, done, exec, releaseVersion;

			exec = require('child_process').exec;
			done = this.async();
			releaseVersion = grunt.template.process("<%= pkg.version %>");
			return child = exec("git commit -am \"v" + releaseVersion + "\" ; git tag v" + releaseVersion + " && git push --tag origin master", function (err, stdout, stderr) {
				if (err != null) {
					console.log(err);
				}
				return done(err == null);
			});
		});
		grunt.registerTask('release', ['git-tag']);
	};

}).call(this);
