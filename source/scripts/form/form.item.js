const path       = appRequire('path');
const fs         = appRequire('fs');

const Vue      = appRequire('vue/dist/vue');
const _        = appRequire('underscore');
const store    = appRequire('store');

const Common   = require('../data/common.js');

module.exports = Vue.extend({
  props: ['_key','element','form'],
  data () {
    return {
      changeConfig: String,
      input: this.element.value,
      disabed: this.element.disabled
    }
  },
  computed: {
    label(){
      return this.element.label || this._key.replace(/_/g, " ")
    }
  },
  methods: {
    inputCheck(ce){
      var self = this;
      if(this.element["choose"]){
        return ce('input',{
          on:{
            change: function (el) {
              if(el && el.target && el.target.files.length){
                self.input = el.target.files[0].path;
                el.target.value = '';
              } else {
                alert('您没有选择正确的站点目录!');
              }
            }
          },
          attrs: {
            class: 'input-file',
            type: 'file',
            multiple:'',
            webkitdirectory:''
          }
        })
      }
    }
  },
  render (ce) {
    return ce('div',{
        class: {
          'form-item': true,
          'form-item-choose' : this.element["choose"]
        }
      },[
      ce('label', this.label),
      this.inputCheck(ce),
      ce('form-input',{
        props: {
          _key:     this._key.replace(/_/g, " "),
          element:  this.input,
          disabled: this.disabed
        }
      })
    ])
  },
  watch:{
    input(val){

      let self = this;
      let _configData = this.form.data;
      let _level      = this._key.split('-');

      let _groupName = _level[0];
      let _itemName  = _level[1];

      clearTimeout(self.changeConfig);

      _configData[_groupName]['items'][_itemName].value = val;

      this.changeConfig = setTimeout(function () {
        console.log(self.form.url);
        fs.writeFile(self.form.url, JSON.stringify(_configData, null, 4), function (err) {
          if (err) {
              throw new Error(err);
          }

          if(_groupName == 'wenui'){
            self.$root.wenui = val;
          }
          console.log('更新配置文件成功');
        })
      }, 1500)

    }
  },
  components: {
    'form-input' : require('./form.input')
  }
});