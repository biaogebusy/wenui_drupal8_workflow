const fs = require('fs'),
      gulp = require('gulp'),
      rp   = require('gulp-replace');

const pg = JSON.parse(fs.readFileSync('package.json'));

// Create wenui LESS.
gulp.task('drupal:wenui:less',['drupal:wenui:less:theme'], function () {

  const tf = pg.drupal.theme.path + '/' + pg.drupal.theme.name + '/assets/less/',
        dtfs = './wenui/assets/less/';

  const lessFiles = [
          dtfs + 'index.less',
          dtfs + 'let.less',
          dtfs + 'desktop.less'
        ];

  if (!fs.existsSync(tf)){

    gulp.src(lessFiles)
      .pipe(rp(/theme/g, pg.drupal.theme.name)) // theme name
      .pipe(gulp.dest(tf));

    gulp.src(dtfs + 'drupal/**')
      .pipe(gulp.dest(tf + 'drupal/'));

    const fd = pg.drupal.theme.path + '/'+ pg.drupal.theme.name + '/' + pg.drupal.theme.name + '.libraries.yml';
    if (fs.existsSync(fd)){
      var co = fs.readFileSync(fd, 'utf-8');
      fs.writeFileSync(
        fd,
        co.replace('#     build/init.css: {}', "     build/init.css: {}"),
        'utf-8'
      );
    }
  }else{

    console.log('Less has been Added!');

  }

});