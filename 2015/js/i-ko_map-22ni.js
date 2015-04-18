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
    var $obj = $('<div />').addClass ('info_bubble').append ($('<div />').addClass ('img').append ($('<img />').attr ('src', t.src).attr ('alt', t.title).attr ('alt', t.title)).append ($('<div />').addClass ('title').text (t.title))).append (t.items.length ? $('<div />').addClass ('items').append (t.items.map (function (u) {return $('<div />').addClass ('item').html (u.item);})) : null).append ($('<div />').addClass ('delete').html ('&#10006;').click (function () {
      t.infoWindow.close ();
      ga ('send', 'event', 'i-ko_map-22ni', 'close_info_window');
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
        ga ('send', 'event', 'i-ko_map-22ni', 'click_marker', t.title);
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

    var zoom = 17;
    var latLng = new google.maps.LatLng (23.567596231491233, 120.3035703338623);
    if ($(window).width () < 560) {
      zoom = 16;
      latLng = new google.maps.LatLng (23.566096231491233, 120.3030703338623);
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
      new google.maps.LatLng (23.567606065424005, 120.30456840991974), new google.maps.LatLng (23.567159235360826, 120.30449129641056), new google.maps.LatLng (23.566421685851584, 120.30436523258686), new google.maps.LatLng (23.56619181540805, 120.30433036386967), new google.maps.LatLng (23.565280319823014, 120.30414663255215), new google.maps.LatLng (23.56456611589599, 120.3040125221014), new google.maps.LatLng (23.564541716036636, 120.30403791537287), new google.maps.LatLng (23.56437004718503, 120.30492581427097), new google.maps.LatLng (23.564735755046065, 120.3049848228693), new google.maps.LatLng (23.565146330053413, 120.3050485253334), new google.maps.LatLng (23.56551818205894, 120.30514173209667), new google.maps.LatLng (23.566044919379205, 120.30523627996445), new google.maps.LatLng (23.56645426104234, 120.30533082783222), new google.maps.LatLng (23.566538464799834, 120.30534021556377), new google.maps.LatLng (23.56670441365296, 120.30537843704224), new google.maps.LatLng (23.56699513095323, 120.30543342232704), new google.maps.LatLng (23.567303057032607, 120.30550248920918), new google.maps.LatLng (23.567630650252678, 120.30554875731468), new google.maps.LatLng (23.567928740934306, 120.30574657022953), new google.maps.LatLng (23.56833623287466, 120.30601613223553), new google.maps.LatLng (23.56855626570448, 120.30567616224289), new google.maps.LatLng (23.568719753546006, 120.3054267168045), new google.maps.LatLng (23.56889860655309, 120.30510753393173), new google.maps.LatLng (23.569366942139425, 120.3043719381094), new google.maps.LatLng (23.56954272120668, 120.30412450432777), new google.maps.LatLng (23.570036253484048, 120.30322059988976), new google.maps.LatLng (23.57029315996294, 120.30273176729679), new google.maps.LatLng (23.570543305262138, 120.30225701630116), new google.maps.LatLng (23.57026427337437, 120.30212491750717), new google.maps.LatLng (23.56965458049063, 120.3018144518137), new google.maps.LatLng (23.568998174100997, 120.30153013765812), new google.maps.LatLng (23.568822394304934, 120.3014376014471), new google.maps.LatLng (23.568839603526126, 120.30138328671455), new google.maps.LatLng (23.568840832756123, 120.30132696032524), new google.maps.LatLng (23.56882485276525, 120.30127063393593), new google.maps.LatLng (23.568799653544897, 120.30122973024845), new google.maps.LatLng (23.568764005859098, 120.301194190979), new google.maps.LatLng (23.568736962780644, 120.30118212103844), new google.maps.LatLng (23.568710534312242, 120.30117273330688), new google.maps.LatLng (23.568668125828555, 120.30117005109787), new google.maps.LatLng (23.568631248875086, 120.30117742717266), new google.maps.LatLng (23.56859191344665, 120.30119486153126), new google.maps.LatLng (23.56856179725129, 120.30122101306915), new google.maps.LatLng (23.568539056446138, 120.30125588178635), new google.maps.LatLng (23.568520617952576, 120.30130013823509), new google.maps.LatLng (23.568515086404005, 120.30134506523609), new google.maps.LatLng (23.56852369103503, 120.30139602720737), new google.maps.LatLng (23.568542129528147, 120.30144967138767), new google.maps.LatLng (23.568571631111762, 120.30148185789585), new google.maps.LatLng (23.56860789346587, 120.30150733888149), new google.maps.LatLng (23.56865153120078, 120.30152276158333), new google.maps.LatLng (23.56862141501908, 120.30163675546646), new google.maps.LatLng (23.568579006506628, 120.30177354812622), new google.maps.LatLng (23.568393392276487, 120.30243135988712), new google.maps.LatLng (23.568223143232125, 120.30237704515457), new google.maps.LatLng (23.568011099889944, 120.30233077704906), new google.maps.LatLng (23.567783076087796, 120.30228316783905), new google.maps.LatLng (23.567507111442005, 120.30223488807678), new google.maps.LatLng (23.567202873577028, 120.30218526721), new google.maps.LatLng (23.56692014684857, 120.30213966965675), new google.maps.LatLng (23.566572269212866, 120.3020752966404), new google.maps.LatLng (23.566537850174054, 120.30202567577362), new google.maps.LatLng (23.565676756643615, 120.30186876654625), new google.maps.LatLng (23.56502401817195, 120.30174940824509), new google.maps.LatLng (23.56500496455202, 120.30186206102371), new google.maps.LatLng (23.56486790133368, 120.30250981450081), new google.maps.LatLng (23.56472592089843, 120.30317097902298), new google.maps.LatLng (23.564576564690512, 120.3038777410984), new google.maps.LatLng (23.564549520749935, 120.30399441719055), new google.maps.LatLng (23.56456427199094, 120.30402861535549), new google.maps.LatLng (23.565280319823, 120.30416339635849), new google.maps.LatLng (23.566190586153283, 120.30434645712376), new google.maps.LatLng (23.56642352973053, 120.30438333749771), new google.maps.LatLng (23.567158006115104, 120.30450537800789), new google.maps.LatLng (23.56760360694088, 120.30458517372608)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/i-ko/start.jpg',
        title: '歲次乙未年 廿二晚間遊行出發',
        items: [
          {item: '農曆三月廿二晚間遊行出發'},
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/i-ko/end.jpg',
        title: '歲次乙未年 廿二晚間遊行休息',
        items: [
          {item: '農曆三月廿二晚間遊行休息'},
        ]
      }
    ];

    setMapData ('22ni', lineSymbols, points, markers, 1 / 2, 'rgba(0, 130, 0, 1)');

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