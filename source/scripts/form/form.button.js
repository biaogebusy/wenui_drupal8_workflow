const Vue =    require('vue/dist/vue');

module.exports =  Vue.extend({
  props: ['value','type'],
  // data () {
  //   return {
  //     value: this.value
  //   }
  // },
  render (createElement) {
    let self = this;
    return createElement('button', {
      attrs: {
        class: 'form-button form-' + this.type
      },
      domProps: {
        type:'button',
      },
      on: {
        click (event) {
          this.$emit('button', )
        }
      }
    },[self.value])
  },
  // watch:{
  //     value(val) {
  //       console.log(val);
  //       this.visible = val;
  //     },
  //     visible(val) {
  //       this.$emit('input', val);
  //     }
  // },
});