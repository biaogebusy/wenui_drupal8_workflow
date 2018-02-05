"use strict";

const path             = appRequire('path');
const fs               = appRequire('fs');

const gulp             = appRequire('gulp');
const electron         = appRequire('electron');
const remote           = electron.remote;
const {dialog}         = electron.remote;

const Vue        = appRequire('vue/dist/vue');
const _          = appRequire('underscore');
const store      = appRequire('store');

const Common     = require('./data/common.js');

let appView = new Vue({
  el:'#app',
  data(){
    return{
      current: false,
      config:  false,
      wenui:   false,
      logTitle: '',
      logContent: {},
    }
  },
  computed: {
    storage:{
      get () {
        var _storage = store.get(Common.NAME);
        if(_storage){
          return JSON.parse(_storage)
        }else{
          return {}
        }
      },
      set (val) {}
    }
  },
  watch:{
    current: function(_cur){

      let self = this;

      this.storage.current = _cur;
      // 储存当前项目
      store.set(Common.NAME, JSON.stringify(self.storage));

      if(_cur){

        // 检查当前项目目录
        this.checkConfig(_cur);

      }else{

        this.checkWorkspace();

      }

    }
  },
  created () {

    let self = this;
    // 第一次打开 创建数据
    if (!this.storage || _.isEmpty(this.storage)) {

      this.storage.name = Common.NAME;

      let workspace    = path.join(remote.app.getPath(Common.DEFAULT_PATH), Common.WORKSPACE);

      if (!Common.dirExist(workspace)) {
        console.log('没有工作区');

        fs.mkdir(workspace, function (err) {
          if (err) {
            throw new Error(err);
          }

          self.storage.workspace = workspace;

          console.log('创建工作区成功');
        });

      }else{

        self.storage.workspace = workspace;
        console.log('有工作区');

      }

      store.set(Common.NAME, JSON.stringify(self.storage));
    }else{

      // 检查数据
      console.log('已存在本地数据，检查数据');
      self.checkWorkspace();

    }
  },
  methods: {
    checkWorkspace () {
      let self = this;
      if (this.storage.workspace) {
        if (!Common.dirExist(self.storage.workspace)) {
            console.log('本地工作区不存在');
            this.storage.projects = {}; //清空项目数据
        }

        if (this.storage.projects) {

          let projects = this.storage.projects;

          _.forEach(projects, function (project, key) {
            //delete projects[key];
            if (!Common.dirExist(project.path)) {
              console.log('找不到项目，从项目列表清除');
              delete projects[key];
            }
            if(self.current){
              return;
            }else{
              // console.log('标识当前项目');
              self.current = self.storage.current || projects[key]['path'];
            }
          });
          console.log('初始化项目结束');
          this.storage.projects = projects;
        }
        store.set(Common.NAME, JSON.stringify(this.storage));
      }
    },
    checkConfig(_cur) {
      let self = this;
      let curConfigFile = path.join(_cur, Common.CONFIGNAME);

      //判断当前主题配置文件是否存在
      if (!Common.fileExist(curConfigFile)) {
        console.log('创建主题配置文件');
        gulp.src(Common.CONFIGPATH)
          .pipe(gulp.dest(_cur))
          .on('end', function (error) {
            if(error){
              console.log(error);
              console.log('创建主题配置文件失败');
            };
            self.config = true;
            console.log('创建主题配置文件成功');
          });
      } else {
        self.config = true;
        console.log('发现主题配置文件');
      }
    }
  },
  render: function (ce) {
    return ce(
      'div',{attrs: {class: 'page'}},  //page-toolbar
      [
        ce('app-nav', {
          props: {
            current: this.current,
            storage: this.storage
          }
        }),
        ce('app-content', {
          props: {
            current: this.current,
            storage: this.storage
          }
        }),
        //ce('app-toolbar')
      ]
    )
  },
  components: {
    'app-nav' :  require('./app.nav'),
    'app-content' :  require('./app.content')
  }
});











