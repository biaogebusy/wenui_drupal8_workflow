var   _          = require('underscore'),
      Vue        = require('vue/dist/vue');

var formConfig  = require('./formconfig');

module.exports = new Vue({
  el:'#page',
  render: function (ce) {
    return ce(
      'div',
      { attrs: { id: 'app' } },
      [
        ce('div',{ attrs: { id: 'wall'} },['Theme Config']),
        ce('hr'),
        ce('config-form')
      ]
    )
  },
  beforeCreate (){
    console.log('app initialize');
  },
  components: {
    'config-form': formConfig
  }
});











