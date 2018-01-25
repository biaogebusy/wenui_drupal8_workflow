(function ($) {

	Drupal.behaviors.wencore.highlight = function(dom){
	  $(dom).each(function(i, block) {
	    hljs.highlightBlock(block);
	  });
	}

}(jQuery));