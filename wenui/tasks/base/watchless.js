const fs = require('fs'),
			gulp = require('gulp');

const pg = JSON.parse(fs.readFileSync('package.json'));

// Watch
gulp.task('watch:less', ['less'], function () {

	if (!fs.existsSync(pg.drupal.theme.path + '/' + pg.drupal.theme.name + '/' + pg.dir.source + '/less/')){

		console.error('See wenui/README.md(WENUI Drupal8 Theme 的创建)')

	}else{

		const lesses = [
			pg.drupal.theme.path + '/' + pg.drupal.theme.name + '/' + pg.dir.source + '/less/**',
		];
		gulp.watch( lesses, ['less']);

		// Watch WENUI Core Change
		gulp.watch(pg.wenui.less, ['less']);

	}
});