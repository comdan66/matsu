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
    var $obj = $('<div />').addClass ('info_bubble').append ($('<div />').addClass ('img').append ($('<img />').attr ('src', t.src).attr ('alt', t.title).attr ('alt', t.title)).append ($('<div />').addClass ('title').text (t.title))).append (t.items.length ? $('<div />').addClass ('items').append (t.items.map (function (u) {return $('<div />').addClass ('item').html (u.item);})) : null).append ($('<div />').addClass ('delete').html ('&#10006;').click (function () { t.infoWindow.close (); }));
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
    var latLng = new google.maps.LatLng (23.566996231491233, 120.3036703338623);
    if ($(window).width () < 560) {
      zoom = 16;
      latLng = new google.maps.LatLng (23.566996231491233, 120.3036703338623);
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
      new google.maps.LatLng (23.567601763078514, 120.30456840991974), new google.maps.LatLng (23.567156162246466, 120.30448861420155), new google.maps.LatLng (23.56641861271997, 120.30436523258686), new google.maps.LatLng (23.566193659290214, 120.30433036386967), new google.maps.LatLng (23.5652858515078, 120.30414864420891), new google.maps.LatLng (23.564545832939416, 120.30400849878788), new google.maps.LatLng (23.564647862325344, 120.30355252325535), new google.maps.LatLng (23.564744974558838, 120.30309990048409), new google.maps.LatLng (23.56500865234967, 120.30183926224709), new google.maps.LatLng (23.565676756643615, 120.30195862054825), new google.maps.LatLng (23.566544611057395, 120.30211687088013), new google.maps.LatLng (23.566555674320277, 120.30207194387913), new google.maps.LatLng (23.56673330102448, 120.30210748314857), new google.maps.LatLng (23.567509569926933, 120.3022375702858), new google.maps.LatLng (23.567885717578726, 120.3022999316454), new google.maps.LatLng (23.56823174788228, 120.30237838625908), new google.maps.LatLng (23.56839031919102, 120.30243135988712), new google.maps.LatLng (23.56891397192035, 120.30267477035522), new google.maps.LatLng (23.569269218710087, 120.30284576117992), new google.maps.LatLng (23.569724646147407, 120.30306838452816), new google.maps.LatLng (23.570036253484048, 120.30321925878525), new google.maps.LatLng (23.5708211073456, 120.30356258153915), new google.maps.LatLng (23.571030687732048, 120.3030214458704), new google.maps.LatLng (23.57120707917642, 120.30255809426308), new google.maps.LatLng (23.57148795286885, 120.30195526778698), new google.maps.LatLng (23.57155125692224, 120.30180372297764), new google.maps.LatLng (23.570983363157886, 120.30145905911922), new google.maps.LatLng (23.57061152662469, 120.3012029081583), new google.maps.LatLng (23.570504585013573, 120.30114188790321), new google.maps.LatLng (23.56999446003805, 120.30091524124146), new google.maps.LatLng (23.569657653546535, 120.30181244015694), new google.maps.LatLng (23.569413038071435, 120.30245952308178), new google.maps.LatLng (23.569275364839854, 120.30282832682133), new google.maps.LatLng (23.569260614127906, 120.3028692305088), new google.maps.LatLng (23.569107575393755, 120.30321590602398), new google.maps.LatLng (23.568839603526126, 120.30384354293346), new google.maps.LatLng (23.56882854045562, 120.30386969447136), new google.maps.LatLng (23.568460385522272, 120.30453622341156), new google.maps.LatLng (23.56846837554012, 120.30460059642792), new google.maps.LatLng (23.56847329247395, 120.30466832220554), new google.maps.LatLng (23.56846960477359, 120.30473873019218), new google.maps.LatLng (23.568453624737565, 120.30481316149235), new google.maps.LatLng (23.56875417201303, 120.30500292778015), new google.maps.LatLng (23.568901679626702, 120.30510887503624), new google.maps.LatLng (23.5695697641192, 120.30557490885258), new google.maps.LatLng (23.56996803182267, 120.30587397515774), new google.maps.LatLng (23.56979717020892, 120.3059209138155), new google.maps.LatLng (23.569600494694892, 120.30597388744354), new google.maps.LatLng (23.569248936479784, 120.30606843531132), new google.maps.LatLng (23.568708690465396, 120.30621394515038), new google.maps.LatLng (23.5686650527495, 120.30622132122517), new google.maps.LatLng (23.56861219577841, 120.3062179684639), new google.maps.LatLng (23.568563641100184, 120.30620321631432), new google.maps.LatLng (23.568431498530575, 120.30610330402851), new google.maps.LatLng (23.568334389022574, 120.30601680278778), new google.maps.LatLng (23.567629421011357, 120.30554741621017), new google.maps.LatLng (23.567302442410412, 120.30550383031368), new google.maps.LatLng (23.566988984716772, 120.30543275177479), new google.maps.LatLng (23.566544611057395, 120.30534490942955), new google.maps.LatLng (23.566463480434482, 120.3053368628025), new google.maps.LatLng (23.566040616982544, 120.30523493885994), new google.maps.LatLng (23.56552064058111, 120.30514240264893), new google.maps.LatLng (23.56514387152425, 120.30504785478115), new google.maps.LatLng (23.564368817913188, 120.30492581427097), new google.maps.LatLng (23.564542759763924, 120.30402660369873), new google.maps.LatLng (23.56528216371795, 120.30416339635849), new google.maps.LatLng (23.566193044662832, 120.30434511601925), new google.maps.LatLng (23.5664192273463, 120.30438132584095), new google.maps.LatLng (23.567155547623585, 120.30450336635113), new google.maps.LatLng (23.56759930459529, 120.30458316206932)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/i-ko/start.jpg',
        title: '歲次乙未年 廿三晚間遊行出發',
        items: [
          {item: '農曆三月廿三晚間遊行出發'},
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/i-ko/end.jpg',
        title: '歲次乙未年 廿三晚間遊行休息',
        items: [
          {item: '農曆三月廿三晚間遊行休息'},
        ]
      }
    ];

    setMapData ('23ni', lineSymbols, points, markers, 1 / 2, 'rgba(0, 130, 0, 1)');

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