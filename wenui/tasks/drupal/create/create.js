// var gulp = require('gulp'),
//     g    = require('gulp-load-plugins')();

// gulp.task('create', function () {
//   if (fs.existsSync('../core')){ gulp.run('create:drupal8') }
//   else{ gulp.run('create:drupal7') }
// });

// gulp.task('create:drupal8:settingsLocal', function () {
//   var ex = '../sites/example.settings.local.php',
//       fd = '../sites/settings.local.php';
//   if (!fs.existsSync(fd)){
//     var co = fs.readFileSync(ex, 'utf-8');
//     fse.copySync(ex, fd);
//     fs.writeFileSync(
//       fd, co.replace(/# \$settings\[\'cache\'\]/g, "$settings['cache']"), 'utf-8'
//     );
//   }
// });

// // Create Dev Mode Services
// gulp.task('create:drupal8:services', function () {
//   var ex = '../sites/'+ _config.folder +'/default.services.yml',
//       fd = '../sites/'+ _config.folder +'/services.yml';
//   if (!fs.existsSync(fd)){
//     var co = fs.readFileSync(ex, 'utf-8');
//     fse.copySync(ex, fd);
//     fs.writeFileSync(
//       fd,
//       co.replace('debug: false', "debug: true")
//         .replace('auto_reload: null', "auto_reload: true")
//         .replace('cache: true', "cache: false"),
//       'utf-8'
//     );
//   }
// });

// // Create Dev Mode Settings.
// gulp.task('create:drupal8:settings', function () {
//   var ex = '../sites/'+ _config.folder +'/default.settings.php',
//       db = '../sites/'+ _config.folder +'/settings.php';
//   if (!fs.existsSync(db)){
//     fse.copySync(ex,db);
//     fs.appendFileSync(db, _settings.db8(_config.settings));
//     return gulp.src('.').pipe(g.exec('chmod -R 777 ' + db));
//   };
// });

// // Create files.
// gulp.task('create:drupal:files', function () {
//   var files = '../sites/'+ _config.folder +'/files';
//   if (!fs.existsSync(files)){
//     return gulp.src('.')
//       .pipe(g.exec(' mkdir ' + files + ' && chmod -R 777 ' + files))
//       .pipe(g.exec(
//         'mkdir translations' +
//         ' && chmod -R 777 translations' +
//         ' && mv translations ' + files
//       ))
//   }else{
//     return gulp.src('.')
//       .pipe(g.exec('chmod -R 777 ' + files))
//       .pipe(g.exec(
//         'chmod -R 777 ' + files +
//         ' && chmod -R 777'+ files +'/translations'
//       ))
//   };
// });

// // Create Commands.
// gulp.task('create:drupal8', [
//     'create:drupal8:settingsLocal',
//     'create:drupal8:services',
//     'create:drupal8:settings',
//     'create:drupal:files'
//   ],
//   function(){ console.log(' ^_^ Drupal8 Theme Dev Mode Create Finsh ^_^ ') }
// );

// gulp.task('create:drupal7', [], function(){
//   console.log('Talk WENROO ^_^')
// });

// // Create done
// gulp.task('create:done', function () {
//   var files = '../sites/'+ _config.folder +'/files';
//   return gulp.src('.')
//     .pipe(g.exec(
//       'chmod -R 755 ' + files +
//       ' && chmod -R 755 ' + files + '/translations'
//     ))
// });
