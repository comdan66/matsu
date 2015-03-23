/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var $imgs = $('.imgs');
  var time = 2000;

  $imgs.map (function () {
    var $that = $(this);
    var timer = null;

    $(this).attr ('data-title', $(this).find ('img').eq (0).attr ('title')).imgLiquid ();

    var change = function () {
      clearTimeout (timer);

      var $img = $that.find ('img').eq (0);
      $that.append ($img.clone ());
      $img.remove ();
      $that.attr ('data-title', $that.find ('img').eq (0).attr ('title')).imgLiquid ();


      timer = setTimeout (change, time);
    };

    timer = setTimeout (change, time);
  });

  // var $unitRight = $('.unit .r');

  // var srcs = $unitRight.children ('input').map (function () {
  //   $unitRight.append ($('<img />').attr ('src', $(this).val ())).imgLiquid ();
  //   return $(this).val ();
  // });


  // var timer = null;
  // //, index = 0;

  // var change = function () {
  //   clearTimeout (timer);

  //   var $img = $unitRight.find ('img').eq (0);
  //   $unitRight.append ($img.clone ());
  //   $img.remove ();
  //   $unitRight.imgLiquid ({verticalAlign: 'top'});

  //   timer = setTimeout (change, 2000);
  // };
  // change ();

});