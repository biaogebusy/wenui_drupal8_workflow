var fs   = require('fs'),
    gulp = require('gulp'),
		g    = require('gulp-load-plugins')();

var browserify = require('browserify'),
    stream = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

var pg = JSON.parse(fs.readFileSync('./package.json'));

// Scripts
gulp.task('build:script', ['wenui:clean'], function() {
  // return browserify({
  //     entries: pg.dir.source + '/' + pg.source.index.script,
  //   }).bundle()
  return gulp.src(pg.dir.source + '/' + pg.source.index.script)
     .pipe(browserify()).bundle()
    // .pipe(stream(pg.source.build.css))
    // .pipe(buffer())
    //.pipe(g.sourcemaps.init({loadMaps: true}))
    // .pipe(g.uglify({
    //       drop_debugger: false,
    //       beautify: true,
    //       compress: false
    // }))
    .pipe(g.concat(pg.source.build.script))
    //.pipe(g.sourcemaps.write())
    .pipe(gulp.dest(pg.dir.app));
});