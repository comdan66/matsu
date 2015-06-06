/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var map = null;
  var $map = null;
  var $subItems = $('#sub_items');
  var $container = $('#container');
  var $pagination = $('#pagination');
  var keys = [];

  function circlePath (cx, cy, r) { return 'M ' + cx + ' ' + cy + ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0'; }
  function arrowPath (w, h, q) { return 'M -' + (w / 2) + ' ' + (h / 2) + 'l ' + (w / 2) + ' -' + h + ' l ' + (w / 2) + ' ' + h + ' q -' + (w / 2) + ' -' + q + ' -' + w + ' 0'; }
  
  function setInfoWindow (t) {
    var $obj = $('<div />').addClass ('info_bubble').append ($('<div />').addClass ('title').text (t.title)).append ($('<div />').addClass ('delete').html ('&#10006;').click (function () {
      t.infoWindow.close ();
      ga ('send', 'event', 'din-tao_map-19an', 'close_info_window');
    }));
    t.infoWindow.setContent ($obj.get (0));
    t.infoWindow.open (map, t.marker);
  }

  function calculateLength (points) {
    var size = Math.pow (10, 2);
    $container.find ('.map .d').addClass ('show').find ('span').text (Math.round (google.maps.geometry.spherical.computeLength (points) / 1000 * size) / size);
  }
  
  function setMapData (key, lineSymbols, points, markers, speed, lineColor) {
    keys.push (key);

    window['markers_' + key] = markers.map (function (t, i) {
      t.marker = new google.maps.Marker ({
          draggable: false,
          position: t.latLng,
          animation: google.maps.Animation.DROP,
          icon: t.icon
        });

      t.infoWindow = new InfoBubble ({
                      margin: 0, padding: 0, content: '', arrowStyle: 0,
                      borderWidth: 1, shadowStyle: 1, borderRadius: 2, minWidth: 'auto',
                      maxWidth: 'auto', minHeight: 'auto', maxHeight: 'auto',
                      borderColor: 'rgba(39, 40, 34, .7)', backgroundClassName: ''
                    });

      google.maps.event.addListener (t.marker, 'click', function (e) {
        window['markers_' + key].forEach (function (u) { u.infoWindow.close (); });
        setInfoWindow (t);
        ga ('send', 'event', 'din-tao_map-19an', 'click_marker', t.title);
      });
      return t;
    });


    window['line_' + key] = new google.maps.Polyline ({
      path: points,
      strokeColor: lineColor,
      icons: lineSymbols.map (function (t) { return {icon: t, offset: '0%'};})
    });

    window['line_' + key].setMap (map);

    window['markers_' + key].forEach (function (t) {
      t.marker.setMap (map);
      t.infoWindow.close ();
    });

    if (map) {
      var count = 0;

      window['interval_' + key] = setInterval (function() {
        var icons = window['line_' + key].get ('icons').map (function (t) {
          t.offset = (count * speed) + '%';
          return t;
        });

        window['line_' + key].set ('icons', icons);
        count = (count + 1) % (100 / speed);
      }, 100);
    }
  }

  function initialize () {
    var h = ($subItems.is (':visible') ? parseFloat ($subItems.height ()) + parseFloat ($subItems.css ('padding-top')) + parseFloat ($subItems.css ('padding-bottom')) : 0) + parseFloat ($container.css ('margin-top')) + parseFloat ($pagination.css ('margin-top')) + parseFloat ($pagination.css ('padding-top')) + parseFloat ($pagination.find ('.oa-jelly').height ());
    $container.css ({height: 'calc(100% - ' + h + 'px)'});

    var zoom = 14;
    var latLng = new google.maps.LatLng (23.569396231491233, 120.3010703338623);
    if ($(window).width () < 560) {
      zoom = 14;
      latLng = new google.maps.LatLng (23.569396231491233, 120.3030703338623);
    }

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
    var lineSymbols = [
        {
          path: arrowPath (9, 14, 6),
          strokeColor: 'rgba(50, 60, 140, 1)',
          strokeWeight: 1,
          fillColor: 'rgba(68, 77, 145, .85)',
          fillOpacity: 1
        },
        {
          path: arrowPath (4.2, 6.9, 2.5),
          strokeColor: 'rgba(255, 255, 255, 1)',
          strokeWeight: 1,
          fillColor: 'rgba(255, 255, 255, 1)',
          fillOpacity: 1
        },
        {
          path: arrowPath (4.2, 6.9, 2.5),
          strokeColor: 'rgba(255, 255, 255, 1)',
          strokeWeight: 1,
          fillColor: 'rgba(223, 93, 84, 1)',
          fillOpacity: 1
        }
      ];

    var points = [
      new google.maps.LatLng (23.565540923387104, 120.29894515872002),new google.maps.LatLng (23.565529245367188, 120.29889084398746),new google.maps.LatLng (23.56571301979692, 120.29856562614441),new google.maps.LatLng (23.566824877773534, 120.298583060503),new google.maps.LatLng (23.56737988478422, 120.2986890077591),new google.maps.LatLng (23.568043674686503, 120.29902696609497),new google.maps.LatLng (23.568877079901586, 120.29931664466858),new google.maps.LatLng (23.569490462164204, 120.29942393302917),new google.maps.LatLng (23.57210992923563, 120.30011594295502),new google.maps.LatLng (23.574391264840138, 120.29932469129562),new google.maps.LatLng (23.576318605256443, 120.29865548014641),new google.maps.LatLng (23.578442611808413, 120.29801309108734),new google.maps.LatLng (23.58358399960302, 120.29927305877209),new google.maps.LatLng (23.587322811179256, 120.3043357282877),new google.maps.LatLng (23.58728466721655, 120.30508607625961),new google.maps.LatLng (23.581700958083882, 120.30566476285458),new google.maps.LatLng (23.578633062429578, 120.30602786689997),new google.maps.LatLng (23.577030280655027, 120.30608067288995),new google.maps.LatLng (23.575953556311237, 120.30582812614739),new google.maps.LatLng (23.575274003249582, 120.30556535348296),new google.maps.LatLng (23.57505628713048, 120.30540928244591),new google.maps.LatLng (23.574544640559285, 120.30506897717714),new google.maps.LatLng (23.57393834686409, 120.304661616683),new google.maps.LatLng (23.573330208682243, 120.3044393286109),new google.maps.LatLng (23.57322234997628, 120.30441284179688),new google.maps.LatLng (23.573054871335433, 120.30440077185631),new google.maps.LatLng (23.572566573969922, 120.30451074242592),new google.maps.LatLng (23.571938761459293, 120.30479706823826),new google.maps.LatLng (23.571812462645138, 120.30489698052406),new google.maps.LatLng (23.57169077122203, 120.30507735908031),new google.maps.LatLng (23.571407439502583, 120.30565571039915),new google.maps.LatLng (23.5712657735991, 120.30590733513236),new google.maps.LatLng (23.571205235364623, 120.30595779418945),new google.maps.LatLng (23.57104543154217, 120.30601277947426),new google.maps.LatLng (23.570197269557912, 120.30617907643318),new google.maps.LatLng (23.569988298621045, 120.30621260404587),new google.maps.LatLng (23.56996279152654, 120.30587296932936),new google.maps.LatLng (23.56955914558509, 120.30556635931134),new google.maps.LatLng (23.56890166452997, 120.30511021614075),new google.maps.LatLng (23.568743711048214, 120.30498817563057),new google.maps.LatLng (23.568450847925916, 120.30482120811939),new google.maps.LatLng (23.56838370182971, 120.30489463359118),new google.maps.LatLng (23.56829727171712, 120.3049367107451),new google.maps.LatLng (23.56818767795335, 120.304947020486),new google.maps.LatLng (23.56795516043826, 120.3049211204052),new google.maps.LatLng (23.567799663878308, 120.30488826334476),new google.maps.LatLng (23.567741583387537, 120.3048637881875),new google.maps.LatLng (23.56769902147852, 120.3048207052052),new google.maps.LatLng (23.567651926460346, 120.30475088395178),new google.maps.LatLng (23.56761958233517, 120.30465960502625),new google.maps.LatLng (23.567615899356014, 120.30458450317383),new google.maps.LatLng (23.56715492972046, 120.30450001358986),new google.maps.LatLng (23.56619488417135, 120.30433505773544),new google.maps.LatLng (23.565280319823, 120.30415937304497),new google.maps.LatLng (23.564548906114855, 120.30401855707169),new google.maps.LatLng (23.565427831337868, 120.29977262020111),new google.maps.LatLng (23.5655274034967, 120.29929049313068),new google.maps.LatLng (23.565542770255096, 120.29912453144789),new google.maps.LatLng (23.5655200299261, 120.29896393418312),
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        title: '5 公里健康馬拉松 起點',
        items: [
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        title: '5 公里健康馬拉松 終點',
        items: [
        ]
      }
    ];

    setMapData ('19an', lineSymbols, points, markers, 1 / 4, 'rgba(0, 130, 0, 1)');

    $('#loading').fadeOut (function () {
      $(this).hide (function () {
        $(this).remove ();
      });
    });

    setTimeout (calculateLength.bind (this, points), 1800);
  }

  $map = $('#map');
  google.maps.event.addDomListener (window, 'load', initialize);
});