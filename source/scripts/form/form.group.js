var Vue = require('vue/dist/vue'),
    _          = require('underscore'),
    formGroup  = require('./form.group'),
    formItem   = require('./form.item');

module.exports =  Vue.extend({
  name: 'form-group',
  props: ['elements','_key','form'],
  deep: true,
  data () {
    return {
      values: this.elements
    }
  },
  // computed: {
  //   _key(){
  //     return this.group_key || _.findKey(this.elements)
  //   }
  // },
  watch:{
    elements: function(_cur){
      this.values = _cur;
    },
  },
  render: function (ce) {
    var self = this;
    return ce('div',{ attrs: { class: 'form-content'} },[
      _.map(this.values, function(item, key){

        let newKey = self._key ? (self._key + '-' + key) : key;

        if(item.items){

          let _label = item.label || key.replace(/_/g, " ");

          return ce('div',{
            attrs: {
              class: 'form-group from-group-' + key
            }
          },[
            ce('h4', { attrs: { class: 'form-title'}}, _label),
            ce('form-group', {
              props: {
                elements: item.items,
                _key: newKey,
                form: self.form
              }
            })
          ])

        }else{

          return ce('form-item', {
            props: {
              element: item,
              _key: newKey,
              form: self.form
            }
          });

        }
      })
    ])
  },
  components: {
    'form-group': formGroup,
    'form-item' : formItem
  }
});