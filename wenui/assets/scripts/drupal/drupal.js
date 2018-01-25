(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.wenui = {
    attach: function (context, settings) {

    	// Math Main Height,Footer to page bottom
    	this.MatchFooter();

    },
    MatchFooter: function(){
    	var childAll = 0, mainH = 0, windH = $(window).height();
		  $.each($('#page')[0].children, function(index, child) {
		  	var height = $(child).outerHeight();
		  	 		childAll += height; if(child.id == 'main'){ mainH = height; }
		  });
		  if(childAll < windH){ $('#main').height(windH - childAll + mainH); }
    }
  };

})(jQuery, Drupal);
