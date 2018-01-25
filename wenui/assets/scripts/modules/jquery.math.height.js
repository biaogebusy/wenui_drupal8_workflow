module.exports = function(col){
  var maxHeight = 0;
  col = jQuery(col);
  col.each(function () {
    if (jQuery(this).height() > maxHeight) {
       maxHeight = $(this).height()
    }
  });
  col.height(maxHeight);
}
