const fs          = require('fs');
const path        = window.require('path');
const del         = require('del');
const async       = require('async');
const browserify  = require('browserify');
const babelify    = require('babelify');
const buffer      = require('vinyl-buffer');
const source      = require('vinyl-source-stream');

const gulp      = require('gulp');
const g         = require('gulp-load-plugins')();
const less      = require('gulp-less');
const smaps      = require('gulp-sourcemaps');
const install   = require("gulp-install");
const minifyCSS = require('gulp-cssnano');

const _       = require('underscore');
const Common  = require(path.join(__dirname, '../scripts/data/common.js'));


function dev(cmd, log, callback){

  let config = null;
  let pp     = cmd.pp;
  let who    = cmd.who;
  let Bs     = cmd.bs;

  let pc     = path.join(pp, 'theme.config.json');

  let paths = {
    wenui: path.join(__dirname, '../../'),
    bower:{
      src: path.resolve(pp, './bower.json'),
      cmp: path.resolve(pp, './bower_components')
    },
    index:{
      "less": "index.less",
      "script": "index.js"
    },
    src:{
      dir:         path.join(pp, './assets'),
      less:        [
        path.join(pp, './assets/less/*.less'),
        path.join(pp, './assets/less/**/*.less')
      ],
      lessWenui:   path.join(__dirname, '../../wenui/assets/less/**/*.less'),
      sass:        path.join(pp, './assets/sass'),
      script:      path.join(pp, './assets/scripts/**/*.js'),
      scriptWenui: path.join(__dirname, './wenui/assets/scripts'),
    },
    build:{
      cssdir:     path.join(pp, './build'),
      cssname:    'init.css',
      scriptdir:  path.join(pp, './build'),
      scriptname:  'init.js',
    }
  }

  let lessIndex = path.join(paths.src.dir, 'less', paths.index.less);
  let scriptIndex = path.join(paths.src.dir, 'scripts', paths.index.script);

  if (Common.fileExist(pc)) {
      config = Common.requireUncached(pc);
  } else {
      console.log('Task 缺少主题配置文件');
  }

  let wenui     = config.wenui.items.url.value   || false;
  if(wenui){
    paths.wenui = wenui;
  }

  let lesssrc = config.auto.items.less.value      || false;
  if(lesssrc){
    lessIndex = path.join(lesssrc, paths.index.less);
    paths.src.less = [
      lesssrc + '/*.less',
      lesssrc + '/**/*.less'
    ]
  }

  let cssfile   = config.auto.items.cssfile.value || false;
  if(cssfile){
    paths.build.cssdir = cssfile;
  }

  let cssname   = config.auto.items.cssname.value || false;
  if(cssname){
    paths.build.cssname = cssname;
  }

  let jssrc     = config.auto.items.js.value      || false;
    if(jssrc){
    scriptIndex = path.join(jssrc, paths.index.script);
    paths.src.script = [
      jssrc + '/*.js',
      jssrc + '/**/*.js'
    ]
  }

  let jsfile    = config.auto.items.jsfile.value  || false;
  if(jsfile){
    paths.build.scriptdir = jsfile;
  }

  let jsname    = config.auto.items.jsname.value  || false;
  if(jsname){
    paths.build.scriptname = jsname;
  }



  // theme bower Handler
  function bowerHandler (fn, cb) {

    // let deps = _.chain(require(paths.bower.src).dependencies).keys().value();
    // let components = [];

    // console.log(path.resolve(pp));
    // console.log(paths.bower.cmp);

    // bower.commands[fn](deps,{ directory: paths.bower.cmp, cwd: path.resolve(pp) })
    // .on('log', function (o) {
    //  if (o.id !== 'install') {
    //    return;
    //  }
    //  components.push(o.data.endpoint.name);
    // })
    // .on('data', console.log)
    // .on('end', function (installed) {
    //  let undeps = _.difference(components, deps);
    //  _.each(undeps, function (dep) {
    //    del(paths.bower.cmp + "/" + undeps, function (e) {});
    //  });
    //  cb();
    // })

    if (fn !== 'install') {
      return;
    }

    if (Common.fileExist(paths.bower.src)) {
      if (fs.existsSync(paths.bower.cmp)){
        console.log('BOWER依赖文件已存在');
      }else{
        console.log('BOWER依赖不存在，正在安装依赖库...');
        gulp.src(paths.bower.src)
            .pipe(gulp.dest(pp))
            .pipe(install({},function(res){
              console.log('BOWER依赖安装完成结束');
            }));
      }
    }

    cb();

  }



  function compileLess(cb){
    gulp.src(lessIndex)
      .pipe(smaps.init())
      .pipe(less({relativeUrls: false, paths: [paths.wenui]}))
      .on('error', function (error) {
        console.log(error);
        log({"status":error.name, "message": error.message});
      })
      .pipe(smaps.write())
      .pipe(g.rename(paths.build.cssname))
      .pipe(gulp.dest(paths.build.cssdir))
      .on('end', function () {
        log('Less编译完成');
        cb && cb();
      })
  }

  // function compileScript(cb){
  //   return gulp.src(scriptIndex)
  //     .pipe(g.sourcemaps.init())
  //     .pipe(babel({
  //         presets: ["babel-preset-es2015", "babel-preset-stage-2"].map(require.resolve)
  //     }))
  //     .pipe(g.sourcemaps.write())
  //     .pipe(g.rename(paths.build.scriptname))
  //     .pipe(gulp.dest(paths.build.scriptdir))
  //     .on('end', function () {
  //         log('Js编译完成');
  //         cb && cb();
  //     });
  // }

  function compileScript(cb){
    return browserify({
        entries: scriptIndex,
        debug: true,
        paths: ["node_modules", paths.wenui, path.join(pp, './assets/scripts')]
    })
    .transform(babelify.configure({
      presets: [
        path.join(__dirname, '../../node_modules/babel-preset-es2015'),
        path.join(__dirname, '../../node_modules/babel-preset-stage-2')
      ],
      extensions: ['.js']
    }))
    .bundle()
    .on('error', function (error) {
        console.log(error);
        log({"status":error.name, "message": error.message});
    })
    .pipe(source(paths.build.scriptname))
    .pipe(buffer())
    .pipe(smaps.init({loadMaps: true}))
      // .pipe(g.uglify({
      //     drop_debugger: false,
      //     beautify: true,
      //     compress: false
      // }))
      .pipe(smaps.write('./'))
      .pipe(gulp.dest(paths.build.scriptdir))
      .on('end', function () {
        log('Script编译完成');
        cb && cb();
      });
  }



  function watchFun(what, file){
    let _path = file.path;
    let _type = _path.substring(_path.lastIndexOf(".")+1);
    if(_type == 'js'){
      compileScript();
    }
    if(_type == 'less' || _type == 'css'){
      compileLess();
    }
  }

  let buildCss    = path.join(paths.build.cssdir, paths.build.cssname);
  let buildScript = path.join(paths.build.scriptdir, paths.build.scriptname);

  function miniCss(cb) {
    gulp.src(buildCss)
        .pipe(minifyCSS({
            safe: true,
            reduceTransforms: false,
            advanced: false,
            compatibility: 'ie7',
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(paths.build.cssdir))
        .on('end', function () {
          log('Css 压缩完成');
          console.log('Css 压缩完成');
          cb && cb();
        });
  }

  function miniScript(cb) {

    return browserify({
        entries: scriptIndex,
        debug: false,
        paths: ["node_modules", paths.wenui, path.join(pp, './assets/scripts')]
    })
    .transform(babelify.configure({
      presets: [
        path.join(__dirname, '../../node_modules/babel-preset-es2015'),
        path.join(__dirname, '../../node_modules/babel-preset-stage-2')
      ],
      extensions: ['.js']
    }))
    .bundle()
    .pipe(source(paths.build.scriptname))
    .pipe(buffer())
    .pipe(g.uglify())
    .pipe(gulp.dest(paths.build.scriptdir))
    .on('end', function () {
      log('JAVASCRIPT 压缩完成');
      console.log('JAVASCRIPT 压缩完成');
      cb && cb();
    });

  }

  function commands(cb){

    if(who == 'watchcss' || who == 'watchscript' || who == 'watch'){

      var _watchPath = new Array();
      if(who == 'watchcss'){
        compileLess();
        _watchPath = paths.src.less;
      }
      if(who == 'watchscript'){
        compileScript();
        _watchPath = paths.src.script;
      }
      if(who == 'watch'){
        compileLess();
        compileScript();
        _watchPath = _.union(paths.src.less, paths.src.script);
      }

      Bs.watch = gulp.watch(_watchPath)
        .on('change', function (file) {
          var _path = file.path;
          log('[修改] ' + _path.substring(_path.lastIndexOf("/")+1));
          watchFun('changed', file);
        })
        .on('add', function (file) {
          var _path = file.path;
          log('[添加] ' + _path.substring(_path.lastIndexOf("/")+1));
          watchFun('added', file);
        })
        .on('delete', function (file) {
          var _path = file.path;
          log('[删除]' + _path.substring(_path.lastIndexOf("/")+1));
          watchFun('deleted', file);
        });
    }

    if(who == 'buildcss' || who == 'buildscript' || who == 'build'){

      async.series([
        function (next) {
          let _del = [];
          if(who == 'buildcss'){
            _del = buildCss;
          }
          else if(who == 'buildscript'){
            _del = buildScript;
          }
          else if(who == 'build'){
            _del = _.union(buildCss, buildScript);
          }
          del(_del, {force: true}).then(function () {
            next();
          })
        },
        function (next) {
          // 多进程执行
          async.parallel([
            function (cb) {
              bowerHandler('install', cb);
            },
            function (cb) {
              if(who == 'buildcss' || who == 'build'){
                compileLess(cb);
              }else{
                cb();
              }
            },
            function (cb) {
              if(who == 'buildscript' || who == 'build'){
                compileScript(cb);
              }else{
                cb();
              }
            }
          ], function (error) {
            if (error) {
              throw new Error(error);
            }
            next();
          })
        },
        function (next) {
          if(who == 'buildcss' || who == 'build'){
            miniCss(next);
          }else{
            next();
          }
        },
        function (next) {
          if(who == 'buildscript' || who == 'build'){
            miniScript(next);
          }else{
            next();
          }
        }
      ], function (error) {
        if (error) {
          throw new Error(error);
        }

        callback && callback();
      });

    }

    cb();
  }

  async.series([
   //  function (next) {
    //   del(paths.build.dir, {force: true}).then(function () {
    //     next();
    //   })
    // },
    function (next) {
      // 多进程执行
      async.parallel([
        function (cb) {
          bowerHandler('install', cb);
        }
        // function (cb) {
        //   compileLess(cb);
        // },
        // function (cb) {
        //   compileScript(cb);
        // }
      ], function (error) {
        if (error) {
          throw new Error(error);
        }
        next();
      })
    },
    function (next) {
      commands(next);
    }
  ], function (error) {
    if (error) {
      throw new Error(error);
    }

    callback && callback(Bs);
  });


}


module.exports = dev;