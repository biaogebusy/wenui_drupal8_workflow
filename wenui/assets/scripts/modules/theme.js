var _ = require('underscore');
require('../../../bower_components/select2/dist/js/i18n/zh-CN.js');

// Animejs
var anime = require('animejs');



module.exports = {
  init:function($){

    $(window).load(function() {
    });

  },

  uiSelect:function(el, $){
    $(el).each(function(index, selectE) {
      if($(this).is('.select2')){
        $(this).select2();
        if($(this).is('.outside-label')){
          $(this).parent().addClass('outside-label');
        }
      }
    });
  },
  htmlTpl:{
    TabItem: _.template(
      '<li style="width:<%=width%>%" class="<%=classes%>"><a href="#progress-panel-<%=id%>" data-toggle="tab"><%=name%></a><b class="l"></b><b class="r"></b></li>'
    ),
  }
}
