// Create Theme files.
var fs = require('fs');

var gulp = require('gulp'),
    g    = require('gulp-load-plugins')(),
    rp   = require('gulp-replace'),
    rn   = require('gulp-replace-name');

var pg = JSON.parse(fs.readFileSync('./package.json'));

// Create Database Settings.
gulp.task('drupal:theme:files', function () {

  var tf   = pg.drupal.theme.path + '/' + pg.drupal.theme.name,
      dtfs = './wenui/assets/drupal/';

  if (!fs.existsSync(tf)){
    gulp.src(dtfs + 'wenui.*')
      .pipe(rp(/wenui/g, pg.drupal.theme.name))
      .pipe(rn(/wenui/g, pg.drupal.theme.name))
      .pipe(gulp.dest(tf));
  };
});