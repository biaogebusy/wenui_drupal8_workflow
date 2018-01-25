const fs = require('fs'),
      gulp = require('gulp'),
      rp   = require('gulp-replace'),
      g    = require('gulp-load-plugins')();

const pg = JSON.parse(fs.readFileSync('./package.json'));

// Create Drupal Theme.
gulp.task('create:drupal8:theme',['drupal:theme:files'], function () {

  const tf = pg.drupal.theme.path + '/' + pg.drupal.theme.name,
        dtfs = './wenui/assets/drupal/';

  if (!fs.existsSync(tf)){

    gulp.src([dtfs + '**', '!' + dtfs + 'wenui.**', '!' + dtfs + 'drupal.config', '!' + dtfs + '*.png'])
      .pipe(rp(/wenui/g, pg.drupal.theme.name))
      .pipe(gulp.dest(tf));

    gulp.src([dtfs + '*.png'])
      .pipe(gulp.dest(tf));

  }else{

    console.log('Theme has been Cteated!');

  }

});