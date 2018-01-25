"use strict";

const Vue        = require('vue/dist/vue');

module.exports =  Vue.extend({
  props: ['title','info','current'],
  methods:{
    infoDisplay(ce){
      if(this.current){
        return ce('div',{attrs: {class: 'list-item-info'}},[this.info])
      }
    }
  },
  render: function(ce){
    let self = this;
    return ce('li',{
      on:{
        click: function (el) {
          self.$root.current = self.info;
        }
      },
      class: {
        'list-item': true,
        'list-item-current': this.current
      }
    },[
      ce('i',{attrs: {class: 'icon list-item-icon icon-file'}}),
      ce('h3',{attrs: {class: 'list-item-title title'}},[this.title]),
      this.infoDisplay(ce)
    ])
  }
});