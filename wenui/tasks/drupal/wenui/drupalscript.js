const fs = require('fs'),
      gulp = require('gulp'),
      rp   = require('gulp-replace'),
      g    = require('gulp-load-plugins')();

const pg = JSON.parse(fs.readFileSync('./package.json'));

// Create wenui Javascript.
gulp.task('drupal:wenui:script',[], function () {

  const tf = pg.drupal.theme.path + '/' + pg.drupal.theme.name + '/assets/scripts/',
        dtfs = './wenui/assets/scripts/';

  const scriptFiles = [
          dtfs + 'index.js'
        ];

  if (!fs.existsSync(tf)){
    const fd = pg.drupal.theme.path + '/'+ pg.drupal.theme.name + '/' + pg.drupal.theme.name + '.libraries.yml';

    gulp.src(scriptFiles)
      .pipe(gulp.dest(tf));

    if (fs.existsSync(fd)){
      var co = fs.readFileSync(fd, 'utf-8');
      fs.writeFileSync(
        fd,
        co.replace('#     build/init.js: {}', "     build/init.js: {}"),
        'utf-8'
      );
    }

  }else{

    console.log('Script has been Added!');

  }

});