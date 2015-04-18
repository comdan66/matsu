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
    var latLng = new google.maps.LatLng (23.568396231491233, 120.3040703338623);
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
      new google.maps.LatLng (23.567596231491233, 120.30456505715847), new google.maps.LatLng (23.567153886987377, 120.30448852648738), new google.maps.LatLng (23.566195255347438, 120.30432884733682), new google.maps.LatLng (23.56528394408744, 120.30414569885738), new google.maps.LatLng (23.564566730530967, 120.30401319265366), new google.maps.LatLng (23.564537413575767, 120.30404730310443), new google.maps.LatLng (23.564275393219845, 120.30540592968464), new google.maps.LatLng (23.56542352892103, 120.30562587082386), new google.maps.LatLng (23.56551695279785, 120.30514508485794), new google.maps.LatLng (23.566043260311886, 120.30523619225028), new google.maps.LatLng (23.566469995927587, 120.30533601682191), new google.maps.LatLng (23.566551925262907, 120.3053453168393), new google.maps.LatLng (23.566699619377935, 120.30538009784232), new google.maps.LatLng (23.566989905980467, 120.30543633651746), new google.maps.LatLng (23.567302318121385, 120.30550263347641), new google.maps.LatLng (23.567629421011357, 120.30554741621017), new google.maps.LatLng (23.568335003639945, 120.30601479113102), new google.maps.LatLng (23.568719321596376, 120.30542729964259), new google.maps.LatLng (23.56889860655309, 120.30511021614075), new google.maps.LatLng (23.569569946356715, 120.30557280948165), new google.maps.LatLng (23.569964958774044, 120.30587196350098), new google.maps.LatLng (23.57023845982174, 120.30586190521717), new google.maps.LatLng (23.570426711090796, 120.30546216835978), new google.maps.LatLng (23.570494498979365, 120.30534540455346), new google.maps.LatLng (23.570549994641933, 120.3052480867625), new google.maps.LatLng (23.570592583496644, 120.30515211007605), new google.maps.LatLng (23.570627506398164, 120.30504919588566), new google.maps.LatLng (23.570552705286985, 120.30501960387232), new google.maps.LatLng (23.570450861464643, 120.3049638603211), new google.maps.LatLng (23.57030422291008, 120.30493251979351), new google.maps.LatLng (23.570167346387933, 120.30487476458552), new google.maps.LatLng (23.56992475696296, 120.30477208237653), new google.maps.LatLng (23.569692615662195, 120.30463050813682), new google.maps.LatLng (23.569538529840962, 120.30451977930079), new google.maps.LatLng (23.569367556751963, 120.30436925590038), new google.maps.LatLng (23.56953964814807, 120.30412316322327), new google.maps.LatLng (23.569321460804026, 120.3040836006403), new google.maps.LatLng (23.56875048432057, 120.30499689280987), new google.maps.LatLng (23.56845239550393, 120.30481651425362), new google.maps.LatLng (23.56841631568573, 120.30486738851073), new google.maps.LatLng (23.568351963493054, 120.30491222779756), new google.maps.LatLng (23.56827654820085, 120.3049409738303), new google.maps.LatLng (23.56821576781727, 120.30494593083858), new google.maps.LatLng (23.56811515319888, 120.3049431609154), new google.maps.LatLng (23.567972744490685, 120.30492563884263), new google.maps.LatLng (23.567836548012245, 120.30489765107632), new google.maps.LatLng (23.567759903576402, 120.30487476458552), new google.maps.LatLng (23.567713990171264, 120.30484047870641), new google.maps.LatLng (23.567682213055413, 120.30480082840927), new google.maps.LatLng (23.567655352920518, 120.30474508485804), new google.maps.LatLng (23.567627878179916, 120.30468062412751), new google.maps.LatLng (23.567609008145407, 120.30461549284473), new google.maps.LatLng (23.56761282625235, 120.30457846820354), new google.maps.LatLng (23.567632062713155, 120.30452071299555), new google.maps.LatLng (23.56766973777209, 120.3044683222056), new google.maps.LatLng (23.567736914562634, 120.3044105669976), new google.maps.LatLng (23.567795486589517, 120.30437292835722), new google.maps.LatLng (23.567879257947457, 120.30435540628446), new google.maps.LatLng (23.567989588227416, 120.30435986816883), new google.maps.LatLng (23.568238508678412, 120.30440613627434), new google.maps.LatLng (23.568350551814913, 120.30444628169539), new google.maps.LatLng (23.568410966952, 120.30448374490743), new google.maps.LatLng (23.568457927055142, 120.3045342117548), new google.maps.LatLng (23.56884101533019, 120.30384814908507), new google.maps.LatLng (23.569115315614198, 120.30319628458028), new google.maps.LatLng (23.569270812791295, 120.30284893851285), new google.maps.LatLng (23.56965273665707, 120.30182383954525), new google.maps.LatLng (23.57025892356163, 120.30212885310652), new google.maps.LatLng (23.570535315370506, 120.30226238071918), new google.maps.LatLng (23.570034409655854, 120.3032199293375), new google.maps.LatLng (23.570818648922682, 120.30355922877789), new google.maps.LatLng (23.57046832318315, 120.30452348291874), new google.maps.LatLng (23.57148119223995, 120.30489765107632), new google.maps.LatLng (23.571826164136343, 120.30397354235652), new google.maps.LatLng (23.572146190612802, 120.30300535261631), new google.maps.LatLng (23.57120725894207, 120.3025566654444), new google.maps.LatLng (23.570563332937905, 120.30226555805211), new google.maps.LatLng (23.570538929643654, 120.30224803597935), new google.maps.LatLng (23.570261922559233, 120.30211316726218), new google.maps.LatLng (23.569658990387584, 120.301811418748), new google.maps.LatLng (23.569637660653417, 120.30180864882482), new google.maps.LatLng (23.568991884298196, 120.3015296113731), new google.maps.LatLng (23.568821165074763, 120.30143894255161), new google.maps.LatLng (23.568840400438607, 120.30137045850756), new google.maps.LatLng (23.568837327363582, 120.30129334499838), new google.maps.LatLng (23.5687975596669, 120.3012194965363), new google.maps.LatLng (23.568728972779144, 120.30117809772491), new google.maps.LatLng (23.568670766659682, 120.30116728117468), new google.maps.LatLng (23.568599471208415, 120.30119075050357), new google.maps.LatLng (23.568547411294002, 120.30123760144716), new google.maps.LatLng (23.568515086404034, 120.30130751430988), new google.maps.LatLng (23.567663839764123, 120.30117407441139), new google.maps.LatLng (23.56761915563998, 120.30101104249957), new google.maps.LatLng (23.567588607815107, 120.30085538666253), new google.maps.LatLng (23.567551978784707, 120.30072949826717), new google.maps.LatLng (23.5675171286471, 120.30072203447821), new google.maps.LatLng (23.567428191836495, 120.30075547437673), new google.maps.LatLng (23.567359537558573, 120.30080232532032), new google.maps.LatLng (23.5673136243183, 120.30085454068194), new google.maps.LatLng (23.567273242698043, 120.30088663947595), new google.maps.LatLng (23.567213322161876, 120.30090652406216), new google.maps.LatLng (23.567128687737995, 120.30066637864115), new google.maps.LatLng (23.56705554757963, 120.30039681663516), new google.maps.LatLng (23.567039751015795, 120.30028541724687), new google.maps.LatLng (23.567041163918894, 120.30017401785858), new google.maps.LatLng (23.567043071587907, 120.30009515583515), new google.maps.LatLng (23.567038338257554, 120.3000615405083), new google.maps.LatLng (23.567023156328265, 120.30003463070398), new google.maps.LatLng (23.567006130538033, 120.30001643807896), new google.maps.LatLng (23.56687282079327, 120.2999945729971), new google.maps.LatLng (23.566723467026367, 120.30109092593193), new google.maps.LatLng (23.56717275706318, 120.30113719403744), new google.maps.LatLng (23.56723255901619, 120.3011350946665), new google.maps.LatLng (23.56723458639532, 120.30127582292562), new google.maps.LatLng (23.56723845763801, 120.30135351927288), new google.maps.LatLng (23.567255116492834, 120.30142955482006), new google.maps.LatLng (23.56729156270237, 120.30149585177901), new google.maps.LatLng (23.5673538229987, 120.30156684260373), new google.maps.LatLng (23.567419156326395, 120.30165593833931), new google.maps.LatLng (23.56743962220612, 120.30171821198473), new google.maps.LatLng (23.567458858824146, 120.30183010649694), new google.maps.LatLng (23.56747748080335, 120.3019440126659), new google.maps.LatLng (23.56748442496073, 120.3020921169998), new google.maps.LatLng (23.567507111442005, 120.3022375702858), new google.maps.LatLng (23.567803541843848, 120.3022871034384), new google.maps.LatLng (23.568077845084474, 120.3023453537703), new google.maps.LatLng (23.56823967253239, 120.30238080532558), new google.maps.LatLng (23.56839031919102, 120.30243337154388), new google.maps.LatLng (23.56822578433004, 120.30310517718794), new google.maps.LatLng (23.56810698040014, 120.30358538031578), new google.maps.LatLng (23.56776420571177, 120.30353701283934), new google.maps.LatLng (23.56735013425947, 120.30344975333219), new google.maps.LatLng (23.56694220805604, 120.30336785824306), new google.maps.LatLng (23.566585909452517, 120.30331077358733), new google.maps.LatLng (23.566373130363626, 120.3032749146223), new google.maps.LatLng (23.56624897574308, 120.30394949018955), new google.maps.LatLng (23.56537005601427, 120.30371814966202), new google.maps.LatLng (23.565490093978088, 120.30308640172484), new google.maps.LatLng (23.565493351969607, 120.30299780111318), new google.maps.LatLng (23.56553533168351, 120.30281129987247), new google.maps.LatLng (23.565622793983938, 120.30227879366885), new google.maps.LatLng (23.56566692256642, 120.30195660889149), new google.maps.LatLng (23.565009266982575, 120.30183993279934), new google.maps.LatLng (23.56455505246552, 120.30398368835449), new google.maps.LatLng (23.564562613640962, 120.30402986874583), new google.maps.LatLng (23.565280690912655, 120.3041638914824), new google.maps.LatLng (23.566200976282413, 120.30434619398125), new google.maps.LatLng (23.567147068670263, 120.30450502715121), new google.maps.LatLng (23.567593773007935, 120.30458249151707)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/din-tao/ni-start.jpg',
        title: '歲次乙未年 二十晚間繞境起馬',
        items: [
          {item: '農曆二十晚間繞境起馬'},
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/din-tao/ni-end.jpg',
        title: '歲次乙未年 二十晚間繞境落馬',
        items: [
          {item: '農曆二十晚間繞境落馬'},
        ]
      }
    ];

    setMapData ('20ni', lineSymbols, points, markers, 1 / 3, 'rgba(0, 130, 0, 1)');

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