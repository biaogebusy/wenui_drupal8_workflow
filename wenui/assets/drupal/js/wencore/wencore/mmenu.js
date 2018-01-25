(function ($) {

	Drupal.behaviors.wencore.highlight = function(region){
    $(region).mmenu({
    "offCanvas": {
      //右边弹出
      "position": "right"
    },
    // 菜单标题
    navbar : {
      title : Drupal.t('Main Menu')
    },
    // 关闭按钮
    navbars: [{content:['close']}]
  });
	}

}(jQuery));