/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var $subItems = $('#sub_items');
  var $container = $('#container');
  var $pagination = $('#pagination');

  var map = null;
  var timer = null;
  var latlngs = [];
  var markers = [];
  var polyline = null;
  var $loading = null;
  var myMarker = null;

  function circlePath (r) {
    return 'M 0 0 m -' + r + ', 0 '+
           'a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 ' +
           'a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0';
  }
  function myPositionPath (r) {
    return 'M 0 0 m -' + r + ', 0 '+
           'a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 ' +
           'a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0' +
           'M -' + (r + r / 2) + ' 0 L -' + (r / 2) + ' 0' +
           'M 0 -' + (r + r / 2) + ' L 0 -' + (r / 2) +
           'M ' + (r + r / 2) + ' 0 L ' + (r / 2) + ' 0' +
           'M 0 ' + (r + r / 2) + ' L 0 ' + (r / 2);
  }

  var getUnit = function (will, now) {
    var addLat = will.lat () - now.lat ();
    var addLng = will.lng () - now.lng ();
    var aveAdd = ((Math.abs (addLat) + Math.abs (addLng)) / 2);
    var unit = aveAdd < 10 ? aveAdd < 1 ? aveAdd < 0.1 ? aveAdd < 0.01 ? aveAdd < 0.001 ? aveAdd < 0.0001 ? 3 : 6 : 9 : 12 : 15 : 24 : 21;
    var lat = addLat / unit;
    var lng = addLng / unit;

    if (!((Math.abs (lat) > 0) || (Math.abs (lng) > 0)))
      return null;

    return {
      unit: unit,
      lat: lat,
      lng: lng
    };
  };
  var mapMove = function (unitLat, unitLng, unitCount, unit, callback) {
    if (unit > unitCount) {
      map.setCenter (new google.maps.LatLng (map.getCenter ().lat () + unitLat, map.getCenter ().lng () + unitLng));
      setTimeout (function () {
        mapMove (unitLat, unitLng, unitCount + 1, unit, callback);
      }, 50);
    } else {
      if (callback)
        callback ();
    }
  };

  var mapGo = function (will, callback) {
    var now = map.getCenter ();

    var Unit = getUnit (will, now);
    if (!Unit)
      return false;

    mapMove (Unit.lat, Unit.lng, 0, Unit.unit, callback);
  };

  function calculateLength (points) {
    var size = Math.pow (10, 2);
    if (google.maps.geometry.spherical)
      $container.find ('.map .d').addClass ('show').find ('span').text (Math.round (google.maps.geometry.spherical.computeLength (points) / 1000 * size) / size);
  }

  function initialize () {
    var h = ($subItems.is (':visible') ? parseFloat ($subItems.height ()) + parseFloat ($subItems.css ('padding-top')) + parseFloat ($subItems.css ('padding-bottom')) : -50) + parseFloat ($container.css ('margin-top')) + parseFloat ($pagination.css ('margin-top')) + parseFloat ($pagination.css ('padding-top')) + parseFloat ($pagination.find ('.oa-jelly').height ());
    $container.css ({height: 'calc(100% - ' + h + 'px)'});

    var reload = function () {
      var id = latlngs.length ? latlngs[latlngs.length - 1].id : 0;

      $.when ($.ajax ('http://baishatun.ioa.tw/main/api2/' + id)).done (function (result) {
        if (!result.length)
          return ;

        latlngs = result.map (function (t) {
          return {id: t.id, lat: t.lat, lng: t.lng, time: t.time};
        });

        if (!map) {
          map = new google.maps.Map ($map.get (0), {
              zoom: 16,
              scaleControl: true,
              navigationControl: false,
              mapTypeControl: false,
              zoomControl: true,
              scrollwheel: true,
              streetViewControl: false,
              center: new google.maps.LatLng (latlngs[latlngs.length - 1].lat, latlngs[latlngs.length - 1].lng)
            });
          google.maps.event.addListener (map, 'zoom_changed', function () {
            clearTimeout (timer);
            timer = setTimeout (function () {
              $('img[src="img/icon/mon.png"]').parents ('.gmnoprint').css ({'opacity': 1});
            }, 500);
          });
        }

        if (markers.length)
          markers[markers.length - 1].setIcon ({
            path: circlePath (10),
            strokeColor: 'rgba(249, 39, 114, 1)',
            strokeWeight: 1,
            fillColor: 'rgba(249, 39, 114, .8)',
            fillOpacity: 0.5
          });

        markers = markers.concat (latlngs.map (function (t, i) {
                    if (($loading || (i % 5 === 0)) && (i !== latlngs.length - 1))
                      new MarkerWithLabel ({
                        position: new google.maps.LatLng (t.lat, t.lng),
                        draggable: false,
                        raiseOnDrag: true,
                        map: map,
                        labelContent: '' + $.timeago (t.time),
                        labelAnchor: new google.maps.Point (0, 0),
                        labelClass: "marker_label",
                        icon: {
                          path: 'M 0 0',
                          strokeColor: 'rgba(249, 39, 114, 0)',
                          strokeWeight: 1,
                          fillColor: 'rgba(249, 39, 114, 0)',
                          fillOpacity: 0
                        }
                      });

                    var marker = new google.maps.Marker ({
                        map: map,
                        draggable: false,
                        zIndex: t.id,
                        optimized: false,
                        position: new google.maps.LatLng (t.lat, t.lng),
                        icon: i == latlngs.length - 1 ? 'img/icon/mon.png' : {
                          path: circlePath (6),
                          strokeColor: 'rgba(249, 39, 114, .4)',
                          strokeWeight: 1,
                          fillColor: 'rgba(249, 39, 114, .5)',
                          fillOpacity: 0.5
                        }
                      });

                    google.maps.event.addListener (marker, 'click', function (e) {
                      console.error (t.id);
                    });
                    return marker;
                }));

        if (!polyline)
          polyline = new google.maps.Polyline ({
            map: map,
            strokeColor: 'rgba(249, 39, 114, .35)',
            strokeWeight: 5
          });
        polyline.setPath (markers.map (function (t) { return t.position; }));

        if (!$loading)
          $loading = $('#loading').fadeOut (function () { $(this).hide (function () { $(this).remove (); }); });
        else
          mapGo (new google.maps.LatLng (latlngs[latlngs.length - 1].lat, latlngs[latlngs.length - 1].lng));

        $('.map .my').click (function () {
          navigator.geolocation.getCurrentPosition (function (location) {
            if (!myMarker)
              myMarker = new google.maps.Marker ({
                  map: map,
                  draggable: false,
                  optimized: false,
                });

            myMarker.setPosition (new google.maps.LatLng (location.coords.latitude, location.coords.longitude));
            myMarker.setIcon ({
                    path: myPositionPath (50),
                    strokeColor: 'rgba(174, 129, 255, .8)',
                    strokeWeight: 3,
                    fillColor: 'rgba(174, 129, 255, .5)',
                    fillOpacity: 0.2
                  });
            map.setCenter ((new google.maps.LatLng (location.coords.latitude, location.coords.longitude));
            // mapGo (new google.maps.LatLng (location.coords.latitude, location.coords.longitude));
          });
        }).OAjelly ();

        $('.map .mazu').click (function () {
          mapGo (new google.maps.LatLng (latlngs[latlngs.length - 1].lat, latlngs[latlngs.length - 1].lng));
        }).OAjelly ();

        setTimeout (calculateLength.bind (this, markers.map (function (t) { return t.position; })), 1800);

      });
    };

    reload ();
    setInterval (reload, 60000);
  }

  $map = $('#map');
  google.maps.event.addDomListener (window, 'load', initialize);
});