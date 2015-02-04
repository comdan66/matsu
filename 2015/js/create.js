/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function() {
  var $map = $('#map');
  var map  = null;
  var marker  = null;
  var infowindow = new google.maps.InfoWindow ();

  function initialize () {

    var mapOptions = {
      zoom: 17,
      scaleControl: true,
      navigationControl: false,
      mapTypeControl: false,
      zoomControl: true,
      scrollwheel: true,
      streetViewControl: false,
      center: new google.maps.LatLng (23.568596231491233, 120.3035703338623),
    };

    map = new google.maps.Map ($map.get (0), mapOptions);

    google.maps.event.addListener (map, 'click', function (e) {
      if (!marker) {
        marker = new google.maps.Marker ({
          map: map,
          draggable: true,
          center: e.latLng,
          position: e.latLng,
        });

        map.panTo (new google.maps.LatLng (e.latLng.k, e.latLng.D));

        google.maps.event.addListener (marker, 'dragend', function () {
          map.panTo (marker.getPosition ());

          infowindow.setContent ('<div class="content"><input type="text" value="new google.maps.LatLng (' + marker.getPosition ().k + ', ' + marker.getPosition ().D + ')," /></div>');
          infowindow.open (map, marker);
        });
      } else {
        marker.setPosition (e.latLng);
        map.panTo (new google.maps.LatLng (e.latLng.k, e.latLng.D));
      }

      infowindow.setContent ('<div class="content"><input type="text" value="new google.maps.LatLng (' + e.latLng.k + ', ' + e.latLng.D + ')," /></div>');
      infowindow.open (map, marker);
    });
  }

  google.maps.event.addDomListener (window, 'load', initialize);

  $('body').on ('click', '.gm-style-iw .content input', function () {
     $(this).select();
  });
});