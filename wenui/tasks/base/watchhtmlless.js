const fs = require('fs'),
			gulp = require('gulp');

const pg = JSON.parse(fs.readFileSync('package.json'));

// Watch
gulp.task('watch:html:less', ['html:less'], function () {

	const lesses = [
		pg.html.path + '/' + pg.dir.source + '/less/**',
	];
	gulp.watch( lesses, ['less']);

	// Watch WENUI Core Change
	gulp.watch(pg.wenui.less, ['less']);

});