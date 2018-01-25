require('bootstrap/js/transition');
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

import   _ from 'underscore';
import   wenuiMessage from 'drupal/wenui.drupal.messages';
import   wenuiFooter from 'drupal/wenui.drupal.messages';

var Drupal = window.Drupal || {};

if(_.isEmpty(Drupal)){

  $ = jQuery = require('jquery');

}else{
  (function ($) {

    Drupal.behaviors.siteScript = {
      attach (context) {

        // Message alert button
        this.librarys.messages;

        // Default Set with drupal.js
        // this.librarys.footer($);

      },
      librarys:{
        'messages' : wenuiMessage,
        'footer' : wenuiFooter
      }
    }

  }(jQuery));

}