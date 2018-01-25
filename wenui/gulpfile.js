'use strict';

var fs = require('fs'),
    fse = require('fs-extra');

// Gulp
var gulp = require('gulp'),
    g    = require('gulp-load-plugins')();

var tasks = require('require-dir');

var pg = JSON.parse(fs.readFileSync('./package.json'));

// Task
tasks('tasks',{recurse: true});

// Create Dev Mode Set
gulp.task('create:drupal8:settingsLocal', function () {
  var ex = 'docroot/sites/example.settings.local.php',
      fd = 'docroot/sites/settings.local.php';
  if (!fs.existsSync(fd)){
    var co = fs.readFileSync(ex, 'utf-8');
    fse.copySync(ex, fd);
    fs.writeFileSync(
      fd, co.replace(/# \$settings\[\'cache\'\]/g, "$settings['cache']"), 'utf-8'
    );
  }
});

// Create Dev Mode Services
gulp.task('create:drupal8:services', function () {
  var ex = 'docroot/sites/default/default.services.yml',
      fd = 'docroot/sites/'+ pg.drupal.folder +'/services.yml';
  if (!fs.existsSync(fd)){
    var co = fs.readFileSync(ex, 'utf-8');
    fse.copySync(ex, fd);
    fs.writeFileSync(
      fd,
      co.replace('debug: false', "debug: true")
        .replace('auto_reload: null', "auto_reload: true")
        .replace('cache: true', "cache: false"),
      'utf-8'
    );
  }
});






