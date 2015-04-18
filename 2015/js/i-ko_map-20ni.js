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
      ga ('send', 'event', 'i-ko_map-20ni', 'close_info_window');
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
        ga ('send', 'event', 'i-ko_map-20ni', 'click_marker', t.title);
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

    var zoom = 16;
    var latLng = new google.maps.LatLng (23.569396231491233, 120.3030703338623);
    if ($(window).width () < 560) {
      zoom = 15;
      latLng = new google.maps.LatLng (23.56906231491233, 120.3030703338623);
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
      new google.maps.LatLng (23.567596231491247, 120.30456572771072), new google.maps.LatLng (23.567155547623585, 120.30448861420155), new google.maps.LatLng (23.566193044662832, 120.30432902276516), new google.maps.LatLng (23.565282778349594, 120.3041473031044), new google.maps.LatLng (23.564547676844718, 120.30400916934013), new google.maps.LatLng (23.56500988161549, 120.30183926224709), new google.maps.LatLng (23.56654768418607, 120.30211552977562), new google.maps.LatLng (23.566554629103255, 120.30208057334426), new google.maps.LatLng (23.56678959993468, 120.3021280948401), new google.maps.LatLng (23.567517560002628, 120.3022476285696), new google.maps.LatLng (23.567798624877017, 120.30229380896094), new google.maps.LatLng (23.567927878064324, 120.30231987278466), new google.maps.LatLng (23.568076798823682, 120.30235130102642), new google.maps.LatLng (23.568232480095382, 120.3023867525817), new google.maps.LatLng (23.568394621510684, 120.30244208872318), new google.maps.LatLng (23.568661979670363, 120.3015261143446), new google.maps.LatLng (23.568708872889406, 120.30152736773493), new google.maps.LatLng (23.568751895975353, 120.30151261558535), new google.maps.LatLng (23.568788955248035, 120.30148235301976), new google.maps.LatLng (23.568815633538865, 120.30144698917866), new google.maps.LatLng (23.568993439488317, 120.30153541436198), new google.maps.LatLng (23.56965335126823, 120.30182383954525), new google.maps.LatLng (23.569272291775007, 120.30284710228443), new google.maps.LatLng (23.569103455051092, 120.30321984162333), new google.maps.LatLng (23.56884021814113, 120.3038489073515), new google.maps.LatLng (23.56845915628873, 120.30453689396381), new google.maps.LatLng (23.568474704279133, 120.30467292835715), new google.maps.LatLng (23.568454239354363, 120.30481584370136), new google.maps.LatLng (23.568751896128376, 120.30499747564795), new google.maps.LatLng (23.56889860655309, 120.30510820448399), new google.maps.LatLng (23.569487588378575, 120.30551514198783), new google.maps.LatLng (23.56996803182267, 120.30587531626225), new google.maps.LatLng (23.570306066734535, 120.30492916703224), new google.maps.LatLng (23.570467093968404, 120.30452147126198), new google.maps.LatLng (23.57082172195132, 120.30355721712112), new google.maps.LatLng (23.571208308384257, 120.30255541205406), new google.maps.LatLng (23.571537301544424, 120.30184789171221), new google.maps.LatLng (23.571604112710453, 120.30168034136295), new google.maps.LatLng (23.571706931389677, 120.30146500637534), new google.maps.LatLng (23.57196857122914, 120.30079856514931), new google.maps.LatLng (23.57206708714626, 120.3008380400181), new google.maps.LatLng (23.572158227721005, 120.30085069279676), new google.maps.LatLng (23.57225674335144, 120.30086133391865), new google.maps.LatLng (23.5723391747227, 120.30086159706116), new google.maps.LatLng (23.57310188940079, 120.30059337615967), new google.maps.LatLng (23.57384800567763, 120.30032515525818), new google.maps.LatLng (23.57462730546654, 120.30004888772964), new google.maps.LatLng (23.575590975780997, 120.29971562325954), new google.maps.LatLng (23.57598000649962, 120.2995627373457), new google.maps.LatLng (23.576520837179064, 120.29937028884888), new google.maps.LatLng (23.577295204500583, 120.29909536242485), new google.maps.LatLng (23.577100383945726, 120.29841274023056), new google.maps.LatLng (23.576315743597686, 120.29865203967097), new google.maps.LatLng (23.575767099080846, 120.29883434216981), new google.maps.LatLng (23.575344527604564, 120.2989786863327), new google.maps.LatLng (23.57558254893377, 120.2997021245003), new google.maps.LatLng (23.575754194741826, 120.30023780803685), new google.maps.LatLng (23.575973777569274, 120.30097197504051), new google.maps.LatLng (23.576238130510887, 120.30187614262104), new google.maps.LatLng (23.57531195461895, 120.30221745371819), new google.maps.LatLng (23.574528971363296, 120.3025346249342), new google.maps.LatLng (23.573761348238712, 120.30280016362667), new google.maps.LatLng (23.573019533637623, 120.30306905508041), new google.maps.LatLng (23.572667369978106, 120.30320450663567), new google.maps.LatLng (23.5723803528241, 120.30308783054352), new google.maps.LatLng (23.57213389862165, 120.30300132930279), new google.maps.LatLng (23.57121322521548, 120.30256010591984), new google.maps.LatLng (23.570539003012854, 120.3022550046444), new google.maps.LatLng (23.569672585202213, 120.30182442238333), new google.maps.LatLng (23.569658268157685, 120.30180975794792), new google.maps.LatLng (23.568995715643943, 120.30152074992657), new google.maps.LatLng (23.56882300892003, 120.30143290758133), new google.maps.LatLng (23.568845317357116, 120.3013597296715), new google.maps.LatLng (23.568836712747178, 120.30128261616233), new google.maps.LatLng (23.568801861972315, 120.3012194965363), new google.maps.LatLng (23.56873573354968, 120.30118010938168), new google.maps.LatLng (23.568676298196532, 120.3011699633837), new google.maps.LatLng (23.568608075828738, 120.30118605663779), new google.maps.LatLng (23.568553557445856, 120.30123223702913), new google.maps.LatLng (23.568518159486576, 120.30130684375763), new google.maps.LatLng (23.568517727398692, 120.3013858812094), new google.maps.LatLng (23.56854292667314, 120.30145025422576), new google.maps.LatLng (23.568589205404027, 120.30149844627385), new google.maps.LatLng (23.568649072737248, 120.30152410268784), new google.maps.LatLng (23.5683890899568, 120.30242197215557), new google.maps.LatLng (23.568238691305712, 120.30237159302237), new google.maps.LatLng (23.567935252496756, 120.30230512063508), new google.maps.LatLng (23.567848774129516, 120.30228558690555), new google.maps.LatLng (23.567502194472006, 120.30222751200199), new google.maps.LatLng (23.56679371755134, 120.30211141874793), new google.maps.LatLng (23.566557270720768, 120.30206506292825), new google.maps.LatLng (23.566535328218635, 120.30206698687084), new google.maps.LatLng (23.5650830229129, 120.3018070757389), new google.maps.LatLng (23.564773247727235, 120.30175276100636), new google.maps.LatLng (23.564691501375854, 120.3017956763506), new google.maps.LatLng (23.564578594043695, 120.30235013535025), new google.maps.LatLng (23.56430366648932, 120.30396290123463), new google.maps.LatLng (23.564524506454426, 120.30401310493949), new google.maps.LatLng (23.564545218304346, 120.30402593314648), new google.maps.LatLng (23.56528093445465, 120.30416339635849), new google.maps.LatLng (23.566193044662832, 120.3043457865715), new google.maps.LatLng (23.567157391492252, 120.30450470745564), new google.maps.LatLng (23.567592543766256, 120.30458249151707)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/i-ko/start.jpg',
        title: '歲次乙未年 二十晚間遊行出發',
        items: [
          {item: '農曆三月二十晚間遊行出發'},
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/i-ko/end.jpg',
        title: '歲次乙未年 二十晚間遊行休息',
        items: [
          {item: '農曆三月二十晚間遊行休息'},
        ]
      }
    ];

    setMapData ('20ni', lineSymbols, points, markers, 1 / 2, 'rgba(0, 130, 0, 1)');

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