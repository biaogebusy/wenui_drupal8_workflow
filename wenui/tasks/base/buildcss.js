let fs       = require('fs'),
		gulp     = require('gulp'),
		g        = require('gulp-load-plugins')(),
		cleanCSS = require('gulp-clean-css');

let pg = JSON.parse(fs.readFileSync('./package.json'));

// Build
gulp.task('build:css', ['less'], function(){
		if (!fs.existsSync(pg.dir.source + '/less/')){
			gulp.start('drupal:wenui:less');
		  gulp.src(pg.dir.app + '/' + pg.source.build.css)
	    .pipe(cleanCSS())
	    .pipe(gulp.dest(pg.dir.app));
		}else{
			gulp.start('base:clean:css');
		  gulp.src(pg.dir.app + '/' + pg.source.build.css)
	    .pipe(cleanCSS({
	    	//advanced: false,
	    	//sourceMap:false,
	    	compatibility: 'ie8',
	    	keepSpecialComments: '*',
			  //inline: ['all']
			}))
	    .pipe(gulp.dest(pg.dir.app));
		}
});