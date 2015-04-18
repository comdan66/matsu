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
      ga ('send', 'event', 'i-ko_map-19an', 'close_info_window');
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
        ga ('send', 'event', 'i-ko_map-19an', 'click_marker', t.title);
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
    var latLng = new google.maps.LatLng (23.569396231491233, 120.3010703338623);
    if ($(window).width () < 560) {
      zoom = 15;
      latLng = new google.maps.LatLng (23.572396231491233, 120.3030703338623);
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
      new google.maps.LatLng (23.5675986899745, 120.30457645654678), new google.maps.LatLng (23.567129916690583, 120.3044938909054), new google.maps.LatLng (23.566197713875166, 120.30433823506837), new google.maps.LatLng (23.565279027051094, 120.30415575714119), new google.maps.LatLng (23.56454644757452, 120.30401788651943), new google.maps.LatLng (23.564303051853095, 120.30396558344364), new google.maps.LatLng (23.564584126052793, 120.3023132549763), new google.maps.LatLng (23.56469211601026, 120.3017869591713), new google.maps.LatLng (23.564774047807916, 120.30175066163542), new google.maps.LatLng (23.565849223703406, 120.30194369297033), new google.maps.LatLng (23.566551986566076, 120.30207060277462), new google.maps.LatLng (23.566928935611838, 120.30214293470385), new google.maps.LatLng (23.56737041860184, 120.30221459608083), new google.maps.LatLng (23.56751380882504, 120.30223596603878), new google.maps.LatLng (23.56778688365147, 120.30228281698237), new google.maps.LatLng (23.567996651965988, 120.30232631516469), new google.maps.LatLng (23.568209007019995, 120.30237302184105), new google.maps.LatLng (23.568391116507264, 120.30243127217295), new google.maps.LatLng (23.568556631028677, 120.30186322669988), new google.maps.LatLng (23.568654604280155, 120.30152544379234), new google.maps.LatLng (23.56871501904588, 120.30152133276465), new google.maps.LatLng (23.568754969052858, 120.30150389840605), new google.maps.LatLng (23.56879755985645, 120.30147229473596), new google.maps.LatLng (23.56881925370217, 120.30144002051361), new google.maps.LatLng (23.568992757344017, 120.30152844569693), new google.maps.LatLng (23.56965703893541, 120.3018157929182), new google.maps.LatLng (23.57054287231388, 120.30225759913924), new google.maps.LatLng (23.57120769378032, 120.30255742371082), new google.maps.LatLng (23.57155512501262, 120.30180564692023), new google.maps.LatLng (23.571702809692173, 120.30146760087018), new google.maps.LatLng (23.57193100678794, 120.30088614435203), new google.maps.LatLng (23.571974208743548, 120.3007653572322), new google.maps.LatLng (23.572158482602767, 120.3001119196415), new google.maps.LatLng (23.57287264524525, 120.29986247420311), new google.maps.LatLng (23.57364905591715, 120.29959617724421), new google.maps.LatLng (23.574415628548874, 120.29932384531503), new google.maps.LatLng (23.574630297931282, 120.30004728348263), new google.maps.LatLng (23.574743559922183, 120.3004233755828), new google.maps.LatLng (23.57485129044743, 120.30078270387662), new google.maps.LatLng (23.57501679190762, 120.30130765857712), new google.maps.LatLng (23.575300892093694, 120.30219800770283), new google.maps.LatLng (23.57529000692184, 120.3022247420788), new google.maps.LatLng (23.574528356774916, 120.3025359660387), new google.maps.LatLng (23.574734858307618, 120.3032373636961), new google.maps.LatLng (23.574582003739323, 120.30341430177691), new google.maps.LatLng (23.574138092574774, 120.30396692454815), new google.maps.LatLng (23.574484899233816, 120.30417068471911), new google.maps.LatLng (23.57491897603183, 120.30438785593515), new google.maps.LatLng (23.575136717135656, 120.30450310320862), new google.maps.LatLng (23.575241374113745, 120.30455800077925), new google.maps.LatLng (23.57528737122822, 120.30459925532341), new google.maps.LatLng (23.57531274656825, 120.30465817620757), new google.maps.LatLng (23.575328288530287, 120.30472380261426), new google.maps.LatLng (23.575320476263233, 120.30480216951378), new google.maps.LatLng (23.575302216061218, 120.30495697937022), new google.maps.LatLng (23.57530054966024, 120.30505479228509), new google.maps.LatLng (23.575309945785932, 120.3051318180801), new google.maps.LatLng (23.575340852365695, 120.30519945614355), new google.maps.LatLng (23.57539880062681, 120.30528385801335), new google.maps.LatLng (23.575472113418126, 120.30538167092823), new google.maps.LatLng (23.575509165674227, 120.30544059181238), new google.maps.LatLng (23.575520298670476, 120.30551254749298), new google.maps.LatLng (23.57601398566861, 120.3058269487858), new google.maps.LatLng (23.576116182955513, 120.30588989298349), new google.maps.LatLng (23.5762128488607, 120.30593272061355), new google.maps.LatLng (23.576347618578108, 120.30596817216883), new google.maps.LatLng (23.577020488997363, 120.30609793961048), new google.maps.LatLng (23.577090112189733, 120.30610925128462), new google.maps.LatLng (23.577643405761226, 120.30609374086862), new google.maps.LatLng (23.578231727133563, 120.30604403228767), new google.maps.LatLng (23.579582019746624, 120.30590884387493), new google.maps.LatLng (23.579757170575377, 120.30480578541756), new google.maps.LatLng (23.579771479498344, 120.304646106267), new google.maps.LatLng (23.579772268005264, 120.30457494001394), new google.maps.LatLng (23.579761994365516, 120.30450511486538), new google.maps.LatLng (23.579335579062025, 120.30312806367874), new google.maps.LatLng (23.57790977848896, 120.30361957848072), new google.maps.LatLng (23.577801789039476, 120.3036201613188), new google.maps.LatLng (23.576602312402013, 120.30299780111318), new google.maps.LatLng (23.576314865630984, 120.30287634344108), new google.maps.LatLng (23.57597272069701, 120.30273409864913), new google.maps.LatLng (23.575702481348934, 120.30262202870858), new google.maps.LatLng (23.575541022999516, 120.30254616858974), new google.maps.LatLng (23.57541643397815, 120.30247762799263), new google.maps.LatLng (23.57531687129653, 120.30223824083805), new google.maps.LatLng (23.57532749657792, 120.30221133103373), new google.maps.LatLng (23.575826715688663, 120.30202885310655), new google.maps.LatLng (23.576238047556753, 120.30187655003078), new google.maps.LatLng (23.57665613818569, 120.30171418867121), new google.maps.LatLng (23.576854208607287, 120.30164771628392), new google.maps.LatLng (23.57718564162585, 120.30151888253704), new google.maps.LatLng (23.57750416749249, 120.3013980954172), new google.maps.LatLng (23.57794683602244, 120.30123238129636), new google.maps.LatLng (23.578600556217662, 120.30099168419838), new google.maps.LatLng (23.57866648995454, 120.30091113021376), new google.maps.LatLng (23.578411618355336, 120.30010570924287), new google.maps.LatLng (23.578047967273683, 120.29888789863594), new google.maps.LatLng (23.57790494720066, 120.29833929917822), new google.maps.LatLng (23.57786307096686, 120.29817938804626), new google.maps.LatLng (23.57763585424523, 120.29824970831874), new google.maps.LatLng (23.577100120343225, 120.29841122369771), new google.maps.LatLng (23.576959031311702, 120.29796481132507), new google.maps.LatLng (23.57683611585405, 120.29758527874947), new google.maps.LatLng (23.576503805147887, 120.29770454933646), new google.maps.LatLng (23.576062713027063, 120.2978593591929), new google.maps.LatLng (23.575723640541977, 120.29799204082497), new google.maps.LatLng (23.575533911356615, 120.29805364391814), new google.maps.LatLng (23.57538105710998, 120.29810317707074), new google.maps.LatLng (23.575110816994766, 120.29820233109012), new google.maps.LatLng (23.575035400437248, 120.29821565442103), new google.maps.LatLng (23.574937244196654, 120.2982497648718), new google.maps.LatLng (23.574829254566286, 120.29829326305412), new google.maps.LatLng (23.57459404526033, 120.2983836998942), new google.maps.LatLng (23.574184186832056, 120.2985629439354), new google.maps.LatLng (23.574410355753276, 120.29930725693703), new google.maps.LatLng (23.573643524562574, 120.29958075454238), new google.maps.LatLng (23.572162784798977, 120.30009113252163), new google.maps.LatLng (23.572137151368015, 120.30010445585253), new google.maps.LatLng (23.572096152958423, 120.30010637979512), new google.maps.LatLng (23.57206621736596, 120.3001056215287), new google.maps.LatLng (23.57173686668935, 120.30001536011696), new google.maps.LatLng (23.57144800369319, 120.29994763433933)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/i-ko/start.jpg',
        title: '歲次乙未年 十九下午遊行起馬',
        items: [
          {item: '農曆三月十九下午遊行起馬'},
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/i-ko/end.jpg',
        title: '歲次乙未年 十九下午遊行休息',
        items: [
          {item: '農曆三月十九下午遊行休息'},
        ]
      }
    ];

    setMapData ('19an', lineSymbols, points, markers, 1 / 2, 'rgba(0, 130, 0, 1)');

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