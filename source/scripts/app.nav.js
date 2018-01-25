"use strict";
const path       = window.require('path');

const electron   = window.require('electron');
const {remote, dialog}     = electron.remote;

const Common     = require('./data/common.js');

const Vue        = require('vue/dist/vue');
const _          = require('underscore');
const store      = require('store');
// Component
module.exports =  Vue.extend({
  props:['current','storage'],
  data(){
    return{
      newProject: false,
      delProject: false
    }
  },
  computed: {},
  watch:{
    newProject(_new){
      if(_new){
        let self = this;

        this.$root.current = _new.path;

        this.$root.storage['projects'][_new.path] = {};
        this.$root.storage['projects'][_new.path]['name'] = _new.name;
        this.$root.storage['projects'][_new.path]['path'] = _new.path;

        store.set(Common.NAME, JSON.stringify(self.storage))
        console.log('添加项目');

        this.newProject = false;
      }
    }
  },
  methods: {
    renderProjects (ce){
      let self = this;
      if(this.storage['projects'] && !_.isEmpty(self.storage['projects']) && !this.newProject){
        return ce('ul',{
          attrs: {class: 'list projects-view'}
        },[
          _.map(this.storage['projects'], function(project, key){
            return ce('app-project-teaser',{
              props: {
                'title'  : project.name,
                'info'   : project.path,
                'current': self.current == project.path
              }
            })
          })
        ])
      }
    },
    addProject (pathProject) {
      let self = this;
      let name = path.basename(pathProject);

      if (this.storage && this.storage['workspace']) {
        if (!this.storage['projects']) {
            this.storage['projects'] = {};
        }
        if (this.storage['projects'][pathProject]) {
          dialog.showErrorBox('添加失败', '本项目已存在');
          this.$root.current = this.storage['projects'][name]['path'];
        } else {

          this.newProject = {
            'name': name,
            'path': pathProject
          }

        }
      }
    }
  },
  render (ce) {
    var self = this;

    return ce('div', {
      attrs: {class: 'navbar'}
    },[
      ce('div',{
        attrs: {class: 'panel panel-list'}
      },[
        ce('h2',{
          attrs: {class: 'panel-title'}
        },[
          '项目主题列表',
          ce('span',{
            attrs: {class: 'btn btn-project-add'}
          },[
            ce('input',{
              on:{
                change: function (el) {
                  if(el && el.target && el.target.files.length){
                    self.addProject(el.target.files[0].path);
                    el.target.value = '';
                  } else {
                    alert('请选择需要的主题目录!');
                  }
                }
              },
              attrs: {
                type: 'file',
                multiple:'',
                webkitdirectory:''
              }
            }),
            ce('i',{domProps: {innerHTML: '&#xe60c;'},attrs: {class: 'icon'}})
          ])
        ]),
        ce('div',{
          attrs: {class: 'panel-body'}
        },[
          this.renderProjects(ce)
        ])
      ])
    ]);
  },
  components: {
    'app-project-teaser' :  require('./app.project.teaser')
  }
});