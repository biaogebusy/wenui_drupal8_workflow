// var fs = require('fs'),
//     fse = require('fs-extra');

// var gulp = require('gulp'),
//     g    = require('gulp-load-plugins')();

// var pg = JSON.parse(fs.readFileSync('./package.json')),
//     db = require('../../../wenui/config/drupal.settings');

// // Create Database Settings.
// gulp.task('create:database', function () {

//   var ds = './sites/'+ pg.drupal.folder +'/default.settings.php',
//       ns = './sites/'+ pg.drupal.folder +'/settings.php';

//   if (!fs.existsSync(db)){
//     fse.copySync(ds,ns);
//     return gulp
//             .src('.')
//             .pipe(g.exec('cd ../ && drupal database:add --database=' + db.database +' --username=' + db.username + ' --password=' + db.password));
//     // fse.copySync(ex,db);
//     // fs.appendFileSync(db, _settings.db8(_config.settings));
//     // return gulp.src('.').pipe(g.exec('chmod -R 777 ' + db));
//   }else{
//     console.log('Has Databse!');
//   };
// });