var fs = require('fs');

var gulp = require('gulp'),
    g    = require('gulp-load-plugins')(),
    rn   = require('gulp-replace-name');

var pg = JSON.parse(fs.readFileSync('./package.json'));

// Create
gulp.task('theme:name', function () {

  const tf   = '../themes/'+ pg.drupal.theme.name;

  if (fs.existsSync(tf)){
      gulp.src(tf + '/wenui.*')
      .pipe(gulp.dest(tf));
    }
});