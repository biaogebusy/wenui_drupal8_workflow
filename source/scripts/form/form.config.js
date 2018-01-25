const path       = window.require('path');
const fs         = window.require('fs');

const Vue        = require('vue/dist/vue');
const _          = require('underscore');
const store      = require('store');

const Common     = require('../data/common.js');

module.exports =  Vue.extend({
  props:['show','current','storage'],
  data () {
    return {
      form:    {},
      display: true,
    }
  },
  computed: {
    config:{
      get () {
        return this.setConfig();
      },
      set (val) {
        if(val){
          this.display = true;
        }
      }
    }
  },
  watch:{
    '$root.config' (val){
      if(val){
        this.config = this.setConfig();
      }
    },
    current(_cur){
      this.display = false;
      this.config = this.setConfig(_cur);
    },
  },
  methods: {
    setConfig(_cur) {
      var cur = _cur ? _cur : this.current;
      if(cur){
        let configFile = path.join(cur, Common.CONFIGNAME);
        if(fs.existsSync(configFile)){
          let configData = Common.requireUncached(configFile);
          if(configData.theme && configData.theme.items){
            if(configData.theme.items.path){
              configData.theme.items.path.value = cur;
            }
            if(configData.theme.items.name){
              if(!configData.theme.items.name.value){
                 configData.theme.items.name.value = this.storage['projects'][cur]['name'];
              }
            }
          };
          this.form.url = configFile;
          this.form.data = configData;
          return configData;
        }else{
          console.log('获取不到配置文件');
          this.display = false;
          return false;
        }
      }else{
        return false;
      }
    }
  },
  created () {
    this.form.type = 'file';
    this.setConfig();
  },
  render (ce) {
    let self = this;

    if(this.display){
      return ce('form',
        {
          attrs: { id: 'config-form', class:'forms' }
        },[
          ce('form-group', {
            props: {
             elements: this.config,
             form: this.form
            }
          }),
          ce('div',{
            attrs: {class: 'btn-group'}
          },[
            ce('span',{
              attrs: {
                class: 'btn btn-error'
              },
              on: {
                click(e){
                  let _storage = self.$root.storage;
                  let _current = self.$root.current;
                  let _toolbar = self.$parent.$children[0];

                  _toolbar.runing = false;
                  _toolbar.onTask();

                  if (_storage && _storage['projects'] && _storage['projects'][_current]) {
                    delete _storage['projects'][_current];
                    store.set(Common.NAME, JSON.stringify(_storage));
                    self.$root.current = false;
                  }
                }
              }
            },['移除项目']),
          ])
        ]
      )
    }
  },
  components: {
    'form-group' : require('./form.group'),
    'form-button': require('./form.button')
  }
});




