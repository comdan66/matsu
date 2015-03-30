/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function() {
  var $map = $('#map');
  var map = null;
  var markers = [];
  var Polyline = null;

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

    Polyline = new google.maps.Polyline ({
      strokeColor: 'rgba(39, 40, 34, 1)',
      icons: [{
        offset: '100%'
      }]
    });

    Polyline.setMap (map);

    google.maps.event.addListener (map, 'click', function (e) {
        var marker = new google.maps.Marker ({
          map: map,
          draggable: true,
          center: e.latLng,
          position: e.latLng,
        });

        google.maps.event.addListener (marker, 'dragend', function () {
          map.panTo (marker.getPosition ());

          Polyline.setPath (markers.map (function (t) {
            return t.getPosition ();
          }));
        });


        google.maps.event.addListener (marker, 'dblclick', function () {
          // console.error (markers.indexOf (marker));;
          markers.splice (markers.indexOf (marker), 1);
          marker.setMap (null);

          Polyline.setPath (markers.map (function (t) {
            return t.getPosition ();
          }));
        });

        map.panTo (e.latLng);
        markers.push (marker);

        Polyline.setPath (markers.map (function (t) {
          return t.getPosition ();
        }));
    // Polyline.setPath (x);
    // console.error (marker.getPosition ());


    });
  }

  google.maps.event.addDomListener (window, 'load', initialize);

  $('button').click (function () {
    var str = 'var points = [\n  ' + markers.map (function (t) {
      return 'new google.maps.LatLng (' + t.getPosition ().k + ', ' + t.getPosition ().D + ')';
    }).join (', ') + '\n];';
    console.info (str);
  });
});