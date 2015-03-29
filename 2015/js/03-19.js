/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var $imgs = $('.imgs');
  var time = 4000;

  $imgs.map (function () {
    var $that = $(this);
    var timer = null;

    $that.addClass ('show');
    $that.attr ('data-title', $(this).find ('img').eq (0).attr ('title')).imgLiquid ();

    var change = function () {
      clearTimeout (timer);
      $that.removeClass ('show');

      setTimeout (function () {
        var $img = $that.find ('img').eq (0);
        $that.append ($img.clone ());
        $img.remove ();
        $that.attr ('data-title', $that.find ('img').eq (0).attr ('title')).imgLiquid ();
        $that.addClass ('show');
      }, 200);

      timer = setTimeout (change, time + Math.floor (Math.random () * (2000)));
    };

    timer = setTimeout (change, time + Math.floor (Math.random () * (2000)));
  });
});