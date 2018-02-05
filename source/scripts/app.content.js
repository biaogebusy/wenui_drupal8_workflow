"use strict";

const path       = appRequire('path');
const fs         = appRequire('fs');
const electron   = appRequire('electron');

const ipc              = electron.ipcRenderer;
const {remote, dialog} = electron.remote;

const Vue        = appRequire('vue/dist/vue');
const _          = appRequire('underscore');

const Common     = require('./data/common.js');


// Component
module.exports =  Vue.extend({
  props:['current','storage'],
  data(){
    return{
      configShow: false,
      projects:   {}
    }
  },
  created () {
  },
  methods: {
    configDisplay(ce){
      let self = this;
      if(this.configShow){
        return ce('div', {
          attrs: {class: 'panel panel-form panel-form-config'}
        },[
          ce('h2',{
            attrs: {class: 'panel-title'}
          },[
            '当前主题设置',
            ce('span',{
              attrs: {class: 'btn btn-panel-close'},
              on: {
                click(e){
                  self.configShow = false;
                }
              }
            },['Close'])
          ]),
          ce('div', {
            attrs: {class: 'panel panel-body panel-row'}
          },[
            ce('form-config', {
              props: {
                current: this.current,
                storage: this.storage
              }
            })
          ])
        ])
      }
    }
  },
  render (ce) {
    var self = this;

    return ce('div', {
      attrs: {class: 'main'}
    },[
      ce('transition', {
        props:{
          mode:"in-out"
        }
      },[this.configDisplay(ce)]),
      ce('app-toolbar', {
        props: {
          current: this.current,
          storage: this.storage
        }
      }),
    ]);
  },
  components: {
    'form-config' :  require('./form/form.config'),
    'app-toolbar' :  require('./app.toolbar')
  }
});