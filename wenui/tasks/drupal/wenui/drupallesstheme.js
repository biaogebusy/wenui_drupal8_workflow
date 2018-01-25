// Create Theme files.
var fs = require('fs');

var gulp = require('gulp'),
    rn   = require('gulp-replace-name');

var pg = JSON.parse(fs.readFileSync('./package.json'));

// Create Database Settings.
gulp.task('drupal:wenui:less:theme', function () {

  const tf = pg.drupal.theme.path + '/' + pg.drupal.theme.name + '/assets/less/' + pg.drupal.theme.name,
        dtfs = './wenui/assets/less/';

  if (!fs.existsSync(tf)){
    gulp.src(dtfs + 'theme/*.less')
      .pipe(rn(/theme/g, pg.drupal.theme.name))
      .pipe(gulp.dest(tf + '/'));
  }else{

    console.log('Less has been Added!');

  }

});