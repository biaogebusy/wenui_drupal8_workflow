'use strict';

var fs = require('fs');
// Gulp
var gulp = require('gulp'),
    g    = require('gulp-load-plugins')(),
    sourcemaps = require('gulp-sourcemaps');

// Source Less
gulp.task('source:less', function () {
  gulp.src('source/less/index.less')
    .pipe(sourcemaps.init())
    .pipe(g.less())
    .pipe(sourcemaps.write())
    .pipe(g.rename('app.css'))
    .pipe(gulp.dest('./app/'));
});

// Watch Source Less
gulp.task('watch:source:less', ['source:less'], function () {

    const lesses = [
      'source/less/**',
    ];
    gulp.watch(lesses, ['source:less']);

    // Watch WENUI Core Change
    gulp.watch([
      './assets/less/*.less',
      './assets/less/**/*.less',
      './assets/less/**/**/*.less',
      './assets/less/**/**/**/*.less'
    ], ['source:less']);

});



// gulp.task('create:config', function (_dest,_cur) {
//   gulp.src(_dest)
//     .pipe(gulp.dest(_cur))
//     .on('end', function () {
//       console.log('创建主题配置文件成功');
//     });
// })



