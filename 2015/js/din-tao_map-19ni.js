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
      ga ('send', 'event', 'din-tao_map-19ni', 'close_info_window');
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
        ga ('send', 'event', 'din-tao_map-19ni', 'click_marker', t.title);
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
    var latLng = new google.maps.LatLng (23.5677996231491233, 120.3040703338623);
    if ($(window).width () < 560) {
      zoom = 16;
      latLng = new google.maps.LatLng (23.5669996231491233, 120.3035703338623);
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
      new google.maps.LatLng (23.56759807535368, 120.30456371605396), new google.maps.LatLng (23.567156776869346, 120.30448794364929), new google.maps.LatLng (23.566699496652923, 120.3044081479311), new google.maps.LatLng (23.566196117799723, 120.3043270111084), new google.maps.LatLng (23.565780014409786, 120.30424453318119), new google.maps.LatLng (23.565285236876154, 120.30414529144764), new google.maps.LatLng (23.564548291479774, 120.30400983989239), new google.maps.LatLng (23.56482118917279, 120.3027431666851), new google.maps.LatLng (23.5650584376074, 120.30282497406006), new google.maps.LatLng (23.56523053464935, 120.30291616916656), new google.maps.LatLng (23.5654886797895, 120.30299931764603), new google.maps.LatLng (23.565488679789524, 120.30308581888676), new google.maps.LatLng (23.5659385886784, 120.30321054160595), new google.maps.LatLng (23.56636206708534, 120.30334733426571), new google.maps.LatLng (23.566433363751084, 120.30283100903034), new google.maps.LatLng (23.566555059694586, 120.30207060277462), new google.maps.LatLng (23.566721008526745, 120.30109696090221), new google.maps.LatLng (23.567186278764133, 120.30113786458969), new google.maps.LatLng (23.567232375461483, 120.30113652348518), new google.maps.LatLng (23.56723667781906, 120.3013376891613), new google.maps.LatLng (23.567253887248004, 120.30142553150654), new google.maps.LatLng (23.5672993692994, 120.30149795114994), new google.maps.LatLng (23.56735591453052, 120.3015636652708), new google.maps.LatLng (23.567410615872276, 120.301643460989), new google.maps.LatLng (23.567442576196203, 120.30173599720001), new google.maps.LatLng (23.567466546434055, 120.30186608433723), new google.maps.LatLng (23.56748191196885, 120.30200622975826), new google.maps.LatLng (23.56749604825926, 120.30214570462704), new google.maps.LatLng (23.567508955305694, 120.30223958194256), new google.maps.LatLng (23.56755197878468, 120.30238576233387), new google.maps.LatLng (23.567596231491247, 120.30251383781433), new google.maps.LatLng (23.56762081632175, 120.30267141759396), new google.maps.LatLng (23.567628191770023, 120.30280485749245), new google.maps.LatLng (23.567630650252678, 120.30292689800262), new google.maps.LatLng (23.56763741107976, 120.30299060046673), new google.maps.LatLng (23.56779782696568, 120.3030026704073), new google.maps.LatLng (23.567942262557438, 120.30302681028843), new google.maps.LatLng (23.568016631459745, 120.30304960906506), new google.maps.LatLng (23.568222528614246, 120.3031025826931), new google.maps.LatLng (23.568374339145336, 120.30318707227707), new google.maps.LatLng (23.568501564839856, 120.3032547980547), new google.maps.LatLng (23.568645999657758, 120.30335739254951), new google.maps.LatLng (23.56869455430549, 120.30336812138557), new google.maps.LatLng (23.56873634816518, 120.30336275696754), new google.maps.LatLng (23.568762162013027, 120.3033372759819), new google.maps.LatLng (23.568982808743588, 120.30270896852016), new google.maps.LatLng (23.569270447936063, 120.30284777283669), new google.maps.LatLng (23.56965089282344, 120.30182853341103), new google.maps.LatLng (23.56963921521, 120.3018057346344), new google.maps.LatLng (23.56899448641541, 120.3015274554491), new google.maps.LatLng (23.568820550459666, 120.30144162476063), new google.maps.LatLng (23.568845135061057, 120.30135177075863), new google.maps.LatLng (23.568819935844587, 120.30124314129353), new google.maps.LatLng (23.56873081662567, 120.30117809772491), new google.maps.LatLng (23.56882300892003, 120.30080057680607), new google.maps.LatLng (23.569133389168655, 120.29968209564686), new google.maps.LatLng (23.569761522793886, 120.30008777976036), new google.maps.LatLng (23.57019789565739, 120.30037343502045), new google.maps.LatLng (23.569995689257244, 120.30091926455498), new google.maps.LatLng (23.57009156831861, 120.30096016824245), new google.maps.LatLng (23.570345401649565, 120.3010681271553), new google.maps.LatLng (23.57050950187117, 120.30114524066448), new google.maps.LatLng (23.570701259173703, 120.30126057565212), new google.maps.LatLng (23.570982748552947, 120.30145436525345), new google.maps.LatLng (23.571553100729165, 120.30180640518665), new google.maps.LatLng (23.571208308384243, 120.30255943536758), new google.maps.LatLng (23.571020854055707, 120.30304290354252), new google.maps.LatLng (23.57082479497996, 120.30356124043465), new google.maps.LatLng (23.57004854567153, 120.30322529375553), new google.maps.LatLng (23.570028878171012, 120.30323266983032), new google.maps.LatLng (23.569541491983248, 120.3041211515665), new google.maps.LatLng (23.56932084619126, 120.30408225953579), new google.maps.LatLng (23.568839603526126, 120.303850248456), new google.maps.LatLng (23.568121116623253, 120.3035894036293), new google.maps.LatLng (23.568104521926383, 120.30360348522663), new google.maps.LatLng (23.567987744370466, 120.30434846878052), new google.maps.LatLng (23.568012943746588, 120.30436590313911), new google.maps.LatLng (23.568226830939405, 120.30440278351307), new google.maps.LatLng (23.56836081756667, 120.3044530749321), new google.maps.LatLng (23.568456697821546, 120.30453085899353), new google.maps.LatLng (23.568465917073144, 120.30457779765129), new google.maps.LatLng (23.568475750940788, 120.30468843877316), new google.maps.LatLng (23.56846284398934, 120.30481986701488), new google.maps.LatLng (23.568606664233698, 120.30490837991238), new google.maps.LatLng (23.568751713551393, 120.30500024557114), new google.maps.LatLng (23.568902294241415, 120.30510820448399), new google.maps.LatLng (23.56914813989489, 120.30472062528133), new google.maps.LatLng (23.56937247365214, 120.3043645620346), new google.maps.LatLng (23.569500927603613, 120.30448861420155), new google.maps.LatLng (23.569679164935856, 120.30462205410004), new google.maps.LatLng (23.569911487716126, 120.30476622283459), new google.maps.LatLng (23.570306066734535, 120.30493319034576), new google.maps.LatLng (23.569971719480968, 120.30586324632168), new google.maps.LatLng (23.569929926014407, 120.3058860450983), new google.maps.LatLng (23.568706846618536, 120.30621461570263), new google.maps.LatLng (23.56861219577841, 120.30621863901615), new google.maps.LatLng (23.568545202610107, 120.30619315803051), new google.maps.LatLng (23.568397079978997, 120.30607648193836), new google.maps.LatLng (23.568323325909525, 120.3060107678175), new google.maps.LatLng (23.567680434516678, 120.3055802732706), new google.maps.LatLng (23.567619587080355, 120.30554741621017), new google.maps.LatLng (23.567309203254407, 120.30550718307495), new google.maps.LatLng (23.567184434895886, 120.30583374202251), new google.maps.LatLng (23.567096543813594, 120.30606709420681), new google.maps.LatLng (23.566992672458696, 120.30620321631432), new google.maps.LatLng (23.56654338180591, 120.3065975010395), new google.maps.LatLng (23.566448114780542, 120.30663438141346), new google.maps.LatLng (23.565813204388824, 120.30656933784485), new google.maps.LatLng (23.56589064764063, 120.30599534511566), new google.maps.LatLng (23.565932442392466, 120.30595511198044), new google.maps.LatLng (23.566009885573994, 120.30594103038311), new google.maps.LatLng (23.565995134495303, 120.30586458742619), new google.maps.LatLng (23.56586114545486, 120.3058498352766), new google.maps.LatLng (23.565410007038622, 120.30570968985558), new google.maps.LatLng (23.56542352892103, 120.30562587082386), new google.maps.LatLng (23.5648543793941, 120.30551455914974), new google.maps.LatLng (23.564272934674396, 120.30540861189365), new google.maps.LatLng (23.56454337439904, 120.30402727425098), new google.maps.LatLng (23.56528216371799, 120.30416540801525), new google.maps.LatLng (23.565777555892492, 120.30426196753979), new google.maps.LatLng (23.566194273917585, 120.30434645712376), new google.maps.LatLng (23.566699496652912, 120.30442960560322), new google.maps.LatLng (23.567157391492227, 120.3045067191124), new google.maps.LatLng (23.567596231491247, 120.30458651483059)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/din-tao/ni-start.jpg',
        title: '歲次乙未年 十九晚間繞境起馬',
        items: [
          {item: '農曆三月十九晚間繞境起馬'},
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/din-tao/ni-end.jpg',
        title: '歲次乙未年 十九晚間繞境落馬',
        items: [
          {item: '農曆十九晚間繞境落馬'},
        ]
      },
      {
        latLng: new google.maps.LatLng (23.56838724610545, 120.30243270099163),
        icon: 'img/icon/spotlight-ad.png',
        src: 'img/site/din-tao/19ni-03.jpg',
        title: '頑皮炮場',
        items: [
          {item: '地點：義民路、民主路交叉路口'},
          {item: '時間：下午５點正式開始'},
        ]
      }
    ];

    setMapData ('19ni', lineSymbols, points, markers, 1 / 4, 'rgba(0, 130, 0, 1)');

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