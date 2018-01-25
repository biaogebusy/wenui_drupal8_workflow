(function ($) {

  Drupal.behaviors.siteTheme = {
    attach: function (context) {
    }
  }


/* - Use drupal system ---------------- */
/* - info.yml ------------------------- */
/* - libraries themeName/wencore.code - */

   Drupal.behaviors.wencore = {
    attach: function (context) {

      // wencore/highlight.js
      // this.highlight('pre ,code');

      // wencore/mmenu.js
      // this.mmenu$('#outside');

      // wencore/lmenu.js
      // this.levelMenu('#header .menu-toggle');

    },
  }

/* - !Use frontEnd npm --------------- */
/* - @see assets/scripts/index.js ---- */
/* - Need npm install first ---------- */

}(jQuery));