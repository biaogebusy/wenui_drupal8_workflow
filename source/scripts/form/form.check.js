var Vue        = require('vue/dist/vue'),
    _          = require('underscore'),
    formGroup  = require('./form.group'),
    formItem   = require('./form.item');

module.exports =  Vue.extend({
  props: ['elements','parent'],
  render: function (ce) {
    let self = this;
    return ce('div',{ attrs: { class: 'form-row'}},[
      _.map(this.elements, function(item, key){
         if(_.isObject(item)){
           return ce('form-group', {
             props: {
               title: key.replace(/_/g, " "),
               elements: item,
               parent: self.parent + '["'+ key +'"]'
             }
           });
         }else{
           return ce('form-item', {
             props: {
               label: key.replace(/_/g, " "),
               element: item,
               parent: self.parent + '["'+ key +'"]'
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