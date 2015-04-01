/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  $('.avatar').imgLiquid ();
  $('.name .dropdown').click (function () {
    var $parent = $(this).parent ();
    if ($parent.hasClass ('show')) {
      $parent.siblings ().andSelf().removeClass ('show');
    } else {
      $parent.siblings ().andSelf().addClass ('show');
    }

  });

  $('#loading').fadeOut (function () {
    $(this).hide (function () {
      $(this).remove ();
    });
  });
});