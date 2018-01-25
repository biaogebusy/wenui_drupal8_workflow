(function ($) {

	Drupal.behaviors.wencore.levelMenu = function(_event){
    // this.levelMenu('#header .menu-toggle');
    var $that = $(_event).parent();
    $that.on("mouseover mouseout",function(event){
       if(event.type == "mouseover"){
        $(this).addClass("level-open");
       }
       else if(event.type == "mouseout"){
        $(this).removeClass("level-open");
       };
    });
  }

}(jQuery));