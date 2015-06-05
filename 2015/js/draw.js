/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function() {
  var $map = $('#map');
  var $length = $('.length');
  var map = null;
  var markers = [];
  var Polyline = null;
  var timer = null;

  function calculateLength (points) {
    var size = Math.pow (10, 2);
    if (google.maps.geometry.spherical)
      $length.html (Math.round (google.maps.geometry.spherical.computeLength (points) / 1000 * size) / size);
  }
  function length () {
    clearTimeout (timer);
    timer = setTimeout (calculateLength.bind (this, markers.map (function (t) {
      return t.getPosition ();
    })), 1800);
  }
  function initMarker (marker, index) {
    google.maps.event.addListener (marker, 'dragend', function () {
      map.panTo (marker.getPosition ());

      Polyline.setPath (markers.map (function (t) {
        return t.getPosition ();
      }));

      length ();
    });

    google.maps.event.addListener (marker, 'dblclick', function () {
      console.error (marker.getPosition ().lat);
      var latLng = new google.maps.LatLng (marker.getPosition ().lat () - 0.0001, marker.getPosition ().lng () - 0.0001);

      initMarker (new google.maps.Marker ({
        map: map,
        draggable: true,
        center: latLng,
        position: latLng
      }), markers.indexOf (marker) + 1);
    });

    google.maps.event.addListener (marker, 'rightclick', function () {
      markers.splice (markers.indexOf (marker), 1);
      marker.setMap (null);

      Polyline.setPath (markers.map (function (t) {
        return t.getPosition ();
      }));

      length ();

    });

    if (index)
      markers.splice (index, 0, marker);
    else
      markers.push (marker);

    Polyline.setPath (markers.map (function (t) {
      return t.getPosition ();
    }));

    length ();

    return marker;
  }

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
      initMarker (new google.maps.Marker ({
        map: map,
        draggable: true,
        center: e.latLng,
        position: e.latLng,
      }), 0);

      map.panTo (e.latLng);
    });
  }

  google.maps.event.addDomListener (window, 'load', initialize);

  $('#log').click (function () {
    var str = 'var points = [\n  ' + markers.map (function (t) {
      return 'new google.maps.LatLng (' + t.getPosition ().lat () + ', ' + t.getPosition ().lng () + ')';
    }).join (', ') + '\n];';


    $('.console-log textarea').text (str).focus ();
    $('.console-log').addClass ('show');
  });

  $('#input').click (function () {
    var input = $(this).prev ().val ()
                .match (/[0-9.]+\s*,\s*[0-9.]+/g);

    if (input && input.length) {
      markers = markers.map (function (t) {t.setMap (null);}).filter (function (t) {return t;});

      input = input.map (function (t) {
        return t.split (/\s*,\s*/);
      }).map (function (t) {
        return initMarker (new google.maps.Marker ({
          map: map,
          draggable: true,
          center: new google.maps.LatLng (t[0], t[1]),
          position: new google.maps.LatLng (t[0], t[1]),
        }));
      }).pop ();

      map.panTo (input.getPosition ());
    }
  });
  $('.console-log .close').click (function () {
    $('.console-log').removeClass ('show');
  });

  $('.console-log textarea').focus (function () {
   $(this).select ();
  });
});