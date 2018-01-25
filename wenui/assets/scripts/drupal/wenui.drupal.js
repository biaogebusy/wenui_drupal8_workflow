// require('bootstrap/js/transition');
// require('bootstrap/js/alert');
// require('bootstrap/js/tab');
// require('bootstrap/js/modal');
// require('bootstrap/js/dropdown');
// require('bootstrap/js/collapse');

// App       = window.App    || {};
// import wenui from 'wenui';


// ----- 上面部分按需使用 ----- //
// ----- ==  ReadMe  == ----- //
// ----- 下面部分自行修改 ----- //

import _     from 'underscore';
var Drupal    = window.Drupal || {};

if(_.isEmpty(Drupal)){

  $ = jQuery = require('jquery');

}else{
	var wenui = require('./wenui.drupal');
  (function ($) {

    Drupal.behaviors.siteScript = {
      attach (context) {

      }
    }

  }(jQuery));

}


