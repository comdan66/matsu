/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  $rightSlide = $('#right_slide');
  $slideCover = $('#slide_cover');
  $option = $('#option');
  var overflow = $('body').css ('overflow');

  $option.click (function () {
    if ($rightSlide.hasClass ('close')) {
      $rightSlide.removeClass ('close');
      $('body').css ('overflow', 'hidden');
      $option.addClass ('close');
    } else {
      $rightSlide.addClass ('close');
      $('body').css ('overflow', overflow);
      $option.removeClass ('close');
    }

  });
  $slideCover.click (function () {
    if (!$rightSlide.hasClass ('close')) {
      $rightSlide.addClass ('close');
      $('body').css ('overflow', overflow);
      $option.removeClass ('close');
    }
  });

  $('#sub_items .item').OAripple ().OAjelly ();

  $subItem = $('#right_slide .items .sub_item').addClass ('hide');

  $('#right_slide .items .item').click (function () {
    $subItem.addClass ('hide');
    $(this).nextUntil ('.item').removeClass ('hide');
    return false;
  });

});