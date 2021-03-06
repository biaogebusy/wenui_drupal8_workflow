var fs = require('fs'),
		gulp  = require('gulp')
		g     = require('gulp-load-plugins')({lazy:false});
var sourcemaps = require('gulp-sourcemaps');
const pg = JSON.parse(fs.readFileSync('./package.json'));

// Less
gulp.task('html:less', function () {
  gulp.src(pg.html.path + '/' + pg.dir.source + '/' + pg.source.index.less)
    .pipe(sourcemaps.init())
    .pipe(g.less())
    .pipe(sourcemaps.write())
    .pipe(g.rename(pg.source.build.css))
    .pipe(gulp.dest(pg.html.path + '/' + pg.dir.app + '/'));
});