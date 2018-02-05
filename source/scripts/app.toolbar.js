"use strict";

const fs    = appRequire('fs');
const path  = appRequire('path');

const Vue   = appRequire('vue/dist/vue');
const _     = appRequire('underscore');
const store = appRequire('store');

const Common = require('./data/common.js');

const Dev  = require(path.join( __dirname, '../_task/dev.js'));
const Bs   = {};

module.exports =  Vue.extend({
  name:'toolbar',
  props:['current','storage'],
  data(){
    return{
      runing:     false,
      logTitle:   'Ready',
      logContent: ''
    }
  },
  watch:{
    '$root.wenui' (val){
      if(val){
        console.log(val);
      }
    },
    'logContent' (val){
      let _sc = this.$el.querySelector(".toolbar-message");
      Vue.nextTick(function(){
        _sc.scrollTop = _sc.scrollHeight;
      })
    }
  },
  methods: {
    onTask(e,who){
      var self = this;

      if(this.runing){

        this.killAll();

      }else{

        if(
          who == 'watchcss' ||
          who == 'watchscript' ||
          who == 'watch'
        ){
          this.runing = who;
        }
        else if(
          who == 'buildcss' ||
          who == 'buildscript' ||
          who == 'build'
        ){

        }

        let cmd = {
          pp :  self.current || '',
          who:  who,
          bs:   Bs
        }

        Dev(cmd, function (log) {

          function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
          }

          let D = new Date();
          let h = addZero(D.getHours());
          let m = addZero(D.getMinutes());
          let s = addZero(D.getSeconds());
          let _t = '['+ h +':'+ m + ':' + s + '] ';
          let _c = _.clone(self.logContent) + '<br>';

          if(_.isObject(log)){

            self.logTitle = _t + log.status;
            self.logContent = _c + self.logTitle + ': ' + log.message + '<br>';

          }else{

            self.logTitle = '['+ h +':'+ m + ':' + s + '] ' + log;
            self.logContent = _c + self.logTitle + '<br>';

          }

        }, function () {

        });
      }
    },
    killAll(){
      console.log('kill');
      if(Bs){
        _.each(Bs, function (item) {
          if (item) {
            item.end();
          }
        });
        this.logTitle = 'Ready';
        this.runing = false;
      }
    }
  },
  render: function (ce) {
    var self = this;
    let _button = {
      watch: {
        runing: false,
        value: '监听编译'
      },
      watchcss: {
        runing: false,
        value: '监听LESS'
      },
      watchscript: {
        runing: false,
        value: '监听JS'
      }
    }

    if(this.runing){
      _button[this.runing].runing = true;
      _button[this.runing].value = '监听中...';
    }


    return ce('div', {
          attrs: {class: 'toolbar'}
        },[
          ce('div', {
            attrs: {class: 'toolbar-title'}
          },[
            ce('span',{
              attrs: {
                class: 'btn btn-base'
              },
              on: {
                click(e){
                  self.$parent.configShow = true;
                }
              }
            },['项目设置'])
          ]),
          ce('h4',{attrs: {class: 'title inside'}},['监听编译']),
          ce('div',{
            attrs: {class: 'btn-group'}
          },[
            ce('i',{
              attrs: {class: 'btn-group-icon icon'},
              domProps: {innerHTML: '&#xe61e;'}
            }),
            ce('span',{
              class:{
                'btn' : true,
                'btn-info': !_button['watch']['runing'],
                'btn-error': _button['watch']['runing']
              },
              on: {
                click(e){ self.onTask(e,'watch')}
              }
            },[_button['watch']['value']]),
            ce('span',{
              class:{
                'btn' : true,
                'btn-info': !_button['watchcss']['runing'],
                'btn-error': _button['watchcss']['runing']
              },
              on: {
                click(e){ self.onTask(e,'watchcss')}
              }
            },[_button['watchcss']['value']]),
            ce('span',{
              class:{
                'btn' : true,
                'btn-info': !_button['watchscript']['runing'],
                'btn-error': _button['watchscript']['runing']
              },
              on: {
                click(e){ self.onTask(e,'watchscript')}
              }
            },[_button['watchscript']['value']])
          ]),
          ce('h4',{attrs: {class: 'title inside'}},['压缩编译']),
          ce('div',{
            attrs: {class: 'btn-group'}
          },[
            ce('i',{
              attrs: {class: 'btn-group-icon icon'},
              domProps: {innerHTML: '&#xe64b;'}
            }),
            ce('span',{
              attrs: {
                'data-task' : 'build',
                class: 'btn btn-info'
              },
              on: {
                click(e){ self.onTask(e,'build')}
              }
            },['压缩发布']),
            ce('span',{
              attrs: {
                'data-task' : 'build-css',
                class: 'btn btn-info'
              },
              on: {
                click(e){ self.onTask(e,'buildcss')}
              }
            },['压缩LESS']),
            ce('span',{
              attrs: {
                'data-task' : 'build-js',
                class: 'btn btn-info'
              },
              on: {
                click(e){ self.onTask(e,'buildscript')}
              }
            },['压缩JS'])
          ]),
          ce('div',{
            attrs: {
              class: 'toolbar-message',
            }
          },[
            ce('div',{
              attrs: {class: 'toolbar-message-inside'},
              domProps: {innerHTML: this.logContent}
            }),
          ]),
          ce('div',{
            attrs: {
              class: 'toolbar-log'
            }
          },[
            ce('span',{
              attrs: {
                class: 'btn'
              }
            },['@2017-2018']),
            ce('span',{
              attrs: {
                class: 'btn btn-log'
              }
            },[this.logTitle])
          ])
        ]);
  },
  components: {
  }
})