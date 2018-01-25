module.exports = function($){
	var childAll = 0, mainH = 0, windH = $(window).height();
  $.each($('#page')[0].children, function(index, child) {
  	var height = $(child).outerHeight();
  	 		childAll += height; if(child.id == 'main'){ mainH = height; }
  });
  if(childAll < windH){
  	$('#main').css('min-height', windH - childAll + mainH);
  }
  $('#footer').css('visibility', 'visible');
}