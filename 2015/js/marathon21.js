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
      new google.maps.LatLng (23.565540923387104, 120.29894515872002),new google.maps.LatLng (23.565529245367188, 120.29889084398746),new google.maps.LatLng (23.56571301979692, 120.29856562614441),new google.maps.LatLng (23.566824877773534, 120.298583060503),new google.maps.LatLng (23.56737988478422, 120.2986890077591),new google.maps.LatLng (23.568043674686503, 120.29902696609497),new google.maps.LatLng (23.568877079901586, 120.29931664466858),new google.maps.LatLng (23.569490462164204, 120.29942393302917),new google.maps.LatLng (23.57210992923563, 120.30011594295502),new google.maps.LatLng (23.574391264840138, 120.29932469129562),new google.maps.LatLng (23.576318605256443, 120.29865548014641),new google.maps.LatLng (23.578442611808413, 120.29801309108734),new google.maps.LatLng (23.578727759542502, 120.29798626899719),new google.maps.LatLng (23.57906207263708, 120.29806673526764),new google.maps.LatLng (23.58321650519226, 120.29915571212769),new google.maps.LatLng (23.58358399960302, 120.29927305877209),new google.maps.LatLng (23.583577849789464, 120.29937967658043),new google.maps.LatLng (23.583565549915026, 120.29949098825455),new google.maps.LatLng (23.586181022975076, 120.30284240841866),new google.maps.LatLng (23.587813225270914, 120.30497409403324),new google.maps.LatLng (23.588073800364523, 120.30537843704224),new google.maps.LatLng (23.589463802483078, 120.3084146976471),new google.maps.LatLng (23.590568667886053, 120.31097888946533),new google.maps.LatLng (23.592184825454208, 120.31465351581573),new google.maps.LatLng (23.59603657315222, 120.32331705093384),new google.maps.LatLng (23.59606481129504, 120.32346054911613),new google.maps.LatLng (23.59662152165681, 120.32470174133778),new google.maps.LatLng (23.597020924493794, 120.32556474208832),new google.maps.LatLng (23.59721509183564, 120.32589331269264),new google.maps.LatLng (23.597395745397733, 120.32610185444355),new google.maps.LatLng (23.59786090529743, 120.32651994377375),new google.maps.LatLng (23.5984415875393, 120.32695144414902),new google.maps.LatLng (23.598532528109075, 120.32700307667255),new google.maps.LatLng (23.598943610159825, 120.32730029895902),new google.maps.LatLng (23.600761838720718, 120.32869085669518),new google.maps.LatLng (23.603450771718908, 120.33071458339691),new google.maps.LatLng (23.603644933545343, 120.33091574907303),new google.maps.LatLng (23.604134648927914, 120.33125437796116),new google.maps.LatLng (23.604720218409067, 120.33163860440254),new google.maps.LatLng (23.604997336092566, 120.33181361854076),new google.maps.LatLng (23.605672919053266, 120.33211704343557),new google.maps.LatLng (23.605974920034807, 120.33222734928131),new google.maps.LatLng (23.60605448653552, 120.33224008977413),new google.maps.LatLng (23.60732329791597, 120.33251099288464),new google.maps.LatLng (23.6079964105105, 120.33264577388763),new google.maps.LatLng (23.60850301150912, 120.33273562788963),new google.maps.LatLng (23.608726975065622, 120.33281341195107),new google.maps.LatLng (23.60961114637832, 120.33295959234238),new google.maps.LatLng (23.612918500535677, 120.33352822065353),new google.maps.LatLng (23.615897768148983, 120.33409014344215),new google.maps.LatLng (23.616465765090847, 120.33415351063013),new google.maps.LatLng (23.617697304465324, 120.3342517465353),new google.maps.LatLng (23.618503686883404, 120.33428158611059),new google.maps.LatLng (23.61931851280538, 120.33431394025683),new google.maps.LatLng (23.61960374386224, 120.33435434103012),new google.maps.LatLng (23.620297672830667, 120.3345226496458),new google.maps.LatLng (23.62130861851859, 120.33481165766716),new google.maps.LatLng (23.622451965628542, 120.33514693379402),new google.maps.LatLng (23.623073996283647, 120.33524584025145),new google.maps.LatLng (23.62401181113438, 120.33523209393024),new google.maps.LatLng (23.625332365826683, 120.33516068011522),new google.maps.LatLng (23.625980355639015, 120.3351598419249),new google.maps.LatLng (23.626552165790507, 120.33518448472023),new google.maps.LatLng (23.629060487276693, 120.33545270562172),new google.maps.LatLng (23.631522119461806, 120.33577188849449),new google.maps.LatLng (23.63188149667244, 120.33588252961636),new google.maps.LatLng (23.63223595887378, 120.33605486154556),new google.maps.LatLng (23.63449294359673, 120.33754482865334),new google.maps.LatLng (23.63461089055498, 120.33758640289307),new google.maps.LatLng (23.63463300559782, 120.33754751086235),new google.maps.LatLng (23.634551917090803, 120.33745631575584),new google.maps.LatLng (23.632253159775477, 120.33596768975258),new google.maps.LatLng (23.631927570421368, 120.33579804003239),new google.maps.LatLng (23.631551606881185, 120.33567667007446),new google.maps.LatLng (23.62907031503826, 120.33536955714226),new google.maps.LatLng (23.627468438308888, 120.33518515527248),new google.maps.LatLng (23.626555851858186, 120.33509597182274),new google.maps.LatLng (23.625333902266785, 120.33505372703075),new google.maps.LatLng (23.624010278555417, 120.33512782305479),new google.maps.LatLng (23.62307370036881, 120.33514559268951),new google.maps.LatLng (23.62246470840309, 120.33504702150822),new google.maps.LatLng (23.62134670834497, 120.33472046256065),new google.maps.LatLng (23.620348665204382, 120.33443078398705),new google.maps.LatLng (23.619611116388487, 120.33424571156502),new google.maps.LatLng (23.61932066461381, 120.33421268686652),new google.maps.LatLng (23.618487100569638, 120.33417697995901),new google.maps.LatLng (23.617698535678752, 120.33415250480175),new google.maps.LatLng (23.616471611432257, 120.334063321352),new google.maps.LatLng (23.615898977291806, 120.33398201689124),new google.maps.LatLng (23.61456817784951, 120.33374648541212),new google.maps.LatLng (23.612924019728755, 120.33343233168125),new google.maps.LatLng (23.609616047400596, 120.33286169171333),new google.maps.LatLng (23.608738329617285, 120.33270847052336),new google.maps.LatLng (23.608504690461803, 120.33270025625825),new google.maps.LatLng (23.608004389772564, 120.33260084688663),new google.maps.LatLng (23.607331280583445, 120.33246774226427),new google.maps.LatLng (23.606060780493998, 120.33220136538148),new google.maps.LatLng (23.605983441536292, 120.33214596100152),new google.maps.LatLng (23.605699650135197, 120.33203557133675),new google.maps.LatLng (23.60502007147444, 120.33172644674778),new google.maps.LatLng (23.604756474334398, 120.33158127218485),new google.maps.LatLng (23.603701468272273, 120.33084467053413),new google.maps.LatLng (23.603488552563512, 120.33067963086069),new google.maps.LatLng (23.602463928746943, 120.32991092652082),new google.maps.LatLng (23.600783981762206, 120.32864727079868),new google.maps.LatLng (23.598960243748962, 120.32726425677538),new google.maps.LatLng (23.598540563026074, 120.32697214744985),new google.maps.LatLng (23.598467447111386, 120.326893273741),new google.maps.LatLng (23.59790889437235, 120.32644626684487),new google.maps.LatLng (23.597441586811936, 120.32602025661618),new google.maps.LatLng (23.59728397717543, 120.32585307955742),new google.maps.LatLng (23.59708549803887, 120.32551947981119),new google.maps.LatLng (23.59669130630719, 120.32465932890773),new google.maps.LatLng (23.59614963702136, 120.32343439757824),new google.maps.LatLng (23.59606299515603, 120.32331135123968),new google.maps.LatLng (23.595734244873903, 120.32253786921501),new google.maps.LatLng (23.591479453492358, 120.32262369990349),new google.maps.LatLng (23.591017341339466, 120.32262906432152),new google.maps.LatLng (23.590598244577716, 120.32254055142403),new google.maps.LatLng (23.589520368626406, 120.32225087285042),new google.maps.LatLng (23.589224784435398, 120.32218717038631),new google.maps.LatLng (23.588580152897002, 120.32202154397964),new google.maps.LatLng (23.58675256505007, 120.32155886292458),new google.maps.LatLng (23.58630856307491, 120.3214606270194),new google.maps.LatLng (23.58582031469504, 120.321409329772),new google.maps.LatLng (23.58487700258684, 120.32132551074028),new google.maps.LatLng (23.584915715757663, 120.32156623899937),new google.maps.LatLng (23.5850653547038, 120.32222840934992),new google.maps.LatLng (23.58525432407923, 120.32296568155289),new google.maps.LatLng (23.58533420979358, 120.32328888773918),new google.maps.LatLng (23.5850306249098, 120.32319635152817),new google.maps.LatLng (23.585059508214737, 120.32331738620996),new google.maps.LatLng (23.585401806235463, 120.32423101365566),new google.maps.LatLng (23.5852796649014, 120.32425037585199),new google.maps.LatLng (23.58499244404952, 120.32432577107102),new google.maps.LatLng (23.584571253349772, 120.32444408163428),new google.maps.LatLng (23.583922604452365, 120.32463300973177),new google.maps.LatLng (23.583194065134343, 120.32482462003827),new google.maps.LatLng (23.582710116906515, 120.3249491751194),new google.maps.LatLng (23.582259032312244, 120.324990414083),new google.maps.LatLng (23.581841133441962, 120.32499141991138),new google.maps.LatLng (23.581313229043673, 120.32499108463526),new google.maps.LatLng (23.580672244858544, 120.32500147819519),new google.maps.LatLng (23.579928633791884, 120.32501086592674),new google.maps.LatLng (23.579656687172704, 120.32498706132174),new google.maps.LatLng (23.57929332478239, 120.324932243675),new google.maps.LatLng (23.579015156446555, 120.32486527226865),new google.maps.LatLng (23.57857105399874, 120.32469369471073),new google.maps.LatLng (23.578201390958252, 120.3245210275054),new google.maps.LatLng (23.577651043190503, 120.32417669892311),new google.maps.LatLng (23.57722207000442, 120.3238508105278),new google.maps.LatLng (23.576894806801285, 120.32358191907406),new google.maps.LatLng (23.576538043886014, 120.32324329018593),new google.maps.LatLng (23.57597570442846, 120.32250568270683),new google.maps.LatLng (23.57564260014052, 120.32195582985878),new google.maps.LatLng (23.57537218314301, 120.32139457762241),new google.maps.LatLng (23.575270162003584, 120.32118067145348),new google.maps.LatLng (23.575186885890055, 120.3209275379777),new google.maps.LatLng (23.57507779715201, 120.32052420079708),new google.maps.LatLng (23.57501603150255, 120.32024022191763),new google.maps.LatLng (23.57498760701495, 120.32002044841647),new google.maps.LatLng (23.574988682663303, 120.31978458166122),new google.maps.LatLng (23.575020026055192, 120.31950496137142),new google.maps.LatLng (23.57535374570357, 120.3181591629982),new google.maps.LatLng (23.57556700647832, 120.31733840703964),new google.maps.LatLng (23.57586016303616, 120.31626015901566),new google.maps.LatLng (23.576660959148917, 120.3132426738739),new google.maps.LatLng (23.577068270550328, 120.31169772148132),new google.maps.LatLng (23.577255562998783, 120.31099766492844),new google.maps.LatLng (23.57730334693229, 120.31072676181793),new google.maps.LatLng (23.577334613797667, 120.31049408018589),new google.maps.LatLng (23.577352705527225, 120.3101946786046),new google.maps.LatLng (23.577347443401475, 120.30995294451714),new google.maps.LatLng (23.577321323361257, 120.30965689569712),new google.maps.LatLng (23.577255409869107, 120.30937610194087),new google.maps.LatLng (23.577186807761034, 120.3091002535075),new google.maps.LatLng (23.57699160309887, 120.3085695952177),new google.maps.LatLng (23.576710433991497, 120.30791144818068),new google.maps.LatLng (23.57643663982198, 120.30722379684448),new google.maps.LatLng (23.57623997282033, 120.30680134892464),new google.maps.LatLng (23.576082639664723, 120.30651368200779),new google.maps.LatLng (23.575801161228163, 120.30613347887993),new google.maps.LatLng (23.575675172145964, 120.30593298375607),new google.maps.LatLng (23.575479427670633, 120.3057375177741),new google.maps.LatLng (23.575274003249582, 120.30556535348296),new google.maps.LatLng (23.57505628713048, 120.30540928244591),new google.maps.LatLng (23.574544640559285, 120.30506897717714),new google.maps.LatLng (23.57393834686409, 120.304661616683),new google.maps.LatLng (23.573330208682243, 120.3044393286109),new google.maps.LatLng (23.57322234997628, 120.30441284179688),new google.maps.LatLng (23.573054871335433, 120.30440077185631),new google.maps.LatLng (23.572566573969922, 120.30451074242592),new google.maps.LatLng (23.571938761459293, 120.30479706823826),new google.maps.LatLng (23.571812462645138, 120.30489698052406),new google.maps.LatLng (23.57169077122203, 120.30507735908031),new google.maps.LatLng (23.571407439502583, 120.30565571039915),new google.maps.LatLng (23.5712657735991, 120.30590733513236),new google.maps.LatLng (23.571205235364623, 120.30595779418945),new google.maps.LatLng (23.57104543154217, 120.30601277947426),new google.maps.LatLng (23.570197269557912, 120.30617907643318),new google.maps.LatLng (23.569988298621045, 120.30621260404587),new google.maps.LatLng (23.56996279152654, 120.30587296932936),new google.maps.LatLng (23.56955914558509, 120.30556635931134),new google.maps.LatLng (23.56890166452997, 120.30511021614075),new google.maps.LatLng (23.568743711048214, 120.30498817563057),new google.maps.LatLng (23.568450847925916, 120.30482120811939),new google.maps.LatLng (23.56838370182971, 120.30489463359118),new google.maps.LatLng (23.56829727171712, 120.3049367107451),new google.maps.LatLng (23.56818767795335, 120.304947020486),new google.maps.LatLng (23.56795516043826, 120.3049211204052),new google.maps.LatLng (23.567799663878308, 120.30488826334476),new google.maps.LatLng (23.567741583387537, 120.3048637881875),new google.maps.LatLng (23.56769902147852, 120.3048207052052),new google.maps.LatLng (23.567651926460346, 120.30475088395178),new google.maps.LatLng (23.56761958233517, 120.30465960502625),new google.maps.LatLng (23.567615899356014, 120.30458450317383),new google.maps.LatLng (23.56715492972046, 120.30450001358986),new google.maps.LatLng (23.56619488417135, 120.30433505773544),new google.maps.LatLng (23.565280319823, 120.30415937304497),new google.maps.LatLng (23.564548906114855, 120.30401855707169),new google.maps.LatLng (23.565427831337868, 120.29977262020111),new google.maps.LatLng (23.5655274034967, 120.29929049313068),new google.maps.LatLng (23.565542770255096, 120.29912453144789),new google.maps.LatLng (23.5655200299261, 120.29896393418312)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        title: '21 公里半馬拉松 起點',
        items: [
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        title: '21 公里半馬拉松 終點',
        items: [
        ]
      },
      {
        latLng: new google.maps.LatLng (23.634516287274646, 120.33749654889107),
        icon: 'img/icon/spotlight-ad.png',
        title: '21 公里半馬拉松 折返點',
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