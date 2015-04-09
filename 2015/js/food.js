/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var $map = $('#map');
  
  var $subItems = $('#sub_items');
  var $container = $('#container');
  var $pagination = $('#pagination');
  
  var map = null;
  
  function initialize () {
    var zoom = 16;
    var latLng = new google.maps.LatLng (23.569396231491233, 120.3030703338623);

    var mapOptions = {
      zoom: zoom,
      scaleControl: true,
      navigationControl: false,
      mapTypeControl: false,
      zoomControl: true,
      scrollwheel: true,
      streetViewControl: false,
      center: latLng,
    };

    map = new google.maps.Map ($map.get (0), mapOptions);

    $('#loading').fadeOut (function () {
      $(this).hide (function () {
        $(this).remove ();
      });
    });
  }

  var h = ($subItems.is (':visible') ? parseFloat ($subItems.height ()) + parseFloat ($subItems.css ('padding-top')) + parseFloat ($subItems.css ('padding-bottom')) : 0) + parseFloat ($container.css ('margin-top')) + parseFloat ($pagination.css ('margin-top')) + parseFloat ($pagination.css ('padding-top')) + parseFloat ($pagination.find ('.oa-jelly').height ());
  $container.css ({height: 'calc(100% - ' + h + 'px)'});
  google.maps.event.addDomListener (window, 'load', initialize);
});