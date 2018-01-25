const Vue   = require('vue/dist/vue');

module.exports =  Vue.extend({
  functional: true,
  render (ce, ct) {
    let _value = ct.props.element;
    return ce('input', {
      class: {
        'form-text': true
      },
      domProps: {
        type: 'text',
        value: _value || '',
        placeholder: (_value ? _value : 'Please Enter ...')
      },
      attrs:{
        name: 'data-' + ct.props._key,
        disabled: ct.props.disabled
      },
      on: {
        input (event) {
          ct.parent.input = event.target.value;
        }
      }
    })
  }
});