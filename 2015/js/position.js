/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  $('.fancybox').fancybox ({
    beforeLoad: function() {
      if ($(this.element).attr ('title'))
        this.title = $(this.element).attr ('title');
      else if ($(this.element).attr ('alt'))
        this.title = $(this.element).attr ('alt');
      else if ($(this.element).data ('fancybox_title'))
        this.title = $(this.element).data ('fancybox_title');
    },
    padding : 0,
    helpers : {
      overlay: {
        locked: false
      },
      title : {
        type : 'over'
      },
      thumbs: {
        width: 50,
        height: 50
      }
    }
  });

  $('#loading').fadeOut (function () {
    $(this).hide (function () {
      $(this).remove ();
    });
  });
});