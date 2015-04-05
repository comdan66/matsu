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

  var _info_bubble = $('#_info_bubble').html ();
  var _items = $('#_items').html ();
  var _item = $('#_item').html ();

  function circlePath (cx, cy, r) { return 'M ' + cx + ' ' + cy + ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0'; }
  function arrowPath (w, h, q) { return 'M -' + (w / 2) + ' ' + (h / 2) + 'l ' + (w / 2) + ' -' + h + ' l ' + (w / 2) + ' ' + h + ' q -' + (w / 2) + ' -' + q + ' -' + w + ' 0'; }
  
  function setInfoWindow (t) {
    var items = t.items ? t.items.map (function (u) { return _.template (_item, u) (u); }).join ('') : [];
    t._items = items.length ? _.template (_items, {items: items}) ({items: items}) : '';

    var obj = $(_.template (_info_bubble, t) (t));
    obj.find ('.delete').click (function () { t.infoWindow.close (); });

    t.infoWindow.setContent (obj.get (0));
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

    var zoom = 16;
    var latLng = new google.maps.LatLng (23.569396231491233, 120.3030703338623);
    if ($(window).width () < 560) {
      zoom = 15;
      latLng = new google.maps.LatLng (23.572396231491233, 120.3010703338623);
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
      new google.maps.LatLng (23.567595616870427, 120.30456438660622), new google.maps.LatLng (23.567158006115104, 120.3044892847538), new google.maps.LatLng (23.56619550317234, 120.30432902276516), new google.maps.LatLng (23.565278475928, 120.30414663255215), new google.maps.LatLng (23.564545832939416, 120.30400849878788), new google.maps.LatLng (23.564313500668582, 120.3039575368166), new google.maps.LatLng (23.564598877281963, 120.30229112675192), new google.maps.LatLng (23.564700720891707, 120.30179969966412), new google.maps.LatLng (23.56478019414147, 120.30176139047148), new google.maps.LatLng (23.56558185980715, 120.3019034598351), new google.maps.LatLng (23.566551986566076, 120.30208066105843), new google.maps.LatLng (23.56676544554124, 120.3021234886885), new google.maps.LatLng (23.567510552439586, 120.30224611203676), new google.maps.LatLng (23.56785246469091, 120.30230436236866), new google.maps.LatLng (23.568236664824976, 120.30238710343838), new google.maps.LatLng (23.568390501961773, 120.3024393188), new google.maps.LatLng (23.568410966950612, 120.30243856053357), new google.maps.LatLng (23.568983971362616, 120.30270870537765), new google.maps.LatLng (23.569270447936063, 120.30284777283669), new google.maps.LatLng (23.57003827926599, 120.30322118272784), new google.maps.LatLng (23.57047298875638, 120.30341019074922), new google.maps.LatLng (23.57082233655705, 120.30355855822563), new google.maps.LatLng (23.571027795479, 120.30302672257426), new google.maps.LatLng (23.571199450709702, 120.30257803540235), new google.maps.LatLng (23.571225444556717, 120.30254106731422), new google.maps.LatLng (23.57156058368375, 120.301811418748), new google.maps.LatLng (23.571609932063797, 120.30168794941915), new google.maps.LatLng (23.57171520914022, 120.30146523835674), new google.maps.LatLng (23.571975365425892, 120.30080532722491), new google.maps.LatLng (23.572061375850566, 120.30083477497101), new google.maps.LatLng (23.572154974831577, 120.30085010995867), new google.maps.LatLng (23.572253490466913, 120.30086209218507), new google.maps.LatLng (23.57234032858005, 120.30086133391865), new google.maps.LatLng (23.5723803528241, 120.30100710690022), new google.maps.LatLng (23.572465346962677, 120.3012772517443), new google.maps.LatLng (23.572587216834503, 120.3016774837256), new google.maps.LatLng (23.572723836825045, 120.30210856111057), new google.maps.LatLng (23.572840789489998, 120.30250342867384), new google.maps.LatLng (23.572972492258423, 120.30293785882009), new google.maps.LatLng (23.57305932934858, 120.30324019017235), new google.maps.LatLng (23.57312401482091, 120.30344322323799), new google.maps.LatLng (23.574136248804148, 120.30396424233913), new google.maps.LatLng (23.573763370258003, 120.3028000759125), new google.maps.LatLng (23.573474690247405, 120.30185249786382), new google.maps.LatLng (23.573265292509348, 120.30114765973099), new google.maps.LatLng (23.573100760043886, 120.300595707512), new google.maps.LatLng (23.572936842093405, 120.30006454241288), new google.maps.LatLng (23.572876947418063, 120.29986180365086), new google.maps.LatLng (23.573649492452837, 120.29959693551064), new google.maps.LatLng (23.573413052744876, 120.29879419674876), new google.maps.LatLng (23.573188547274935, 120.29801845550537), new google.maps.LatLng (23.57343026171554, 120.29787621071341), new google.maps.LatLng (23.573872947083743, 120.2976172898293), new google.maps.LatLng (23.574091919899683, 120.29746163399227), new google.maps.LatLng (23.57437480946533, 120.29727043888579), new google.maps.LatLng (23.57471396233396, 120.29705621302128), new google.maps.LatLng (23.574876391138115, 120.29739609529975), new google.maps.LatLng (23.574901152283953, 120.29746105115419), new google.maps.LatLng (23.575019945109744, 120.29788341135986), new google.maps.LatLng (23.5751565607165, 120.29835941574584), new google.maps.LatLng (23.57534357202084, 120.29898160052312), new google.maps.LatLng (23.575585895436564, 120.29970839145199), new google.maps.LatLng (23.575756312072446, 120.30024876885432), new google.maps.LatLng (23.575869572234453, 120.30060809714814), new google.maps.LatLng (23.5760283112408, 120.30115652117752), new google.maps.LatLng (23.5761354251526, 120.30152188444163), new google.maps.LatLng (23.576238130510887, 120.3018768131733), new google.maps.LatLng (23.57652777418729, 120.30176206102374), new google.maps.LatLng (23.576685282739955, 120.3017036352635), new google.maps.LatLng (23.577187039180902, 120.30151806771755), new google.maps.LatLng (23.576911270212467, 120.3006207810879), new google.maps.LatLng (23.576522066337144, 120.29936894774437), new google.maps.LatLng (23.576314953035297, 120.29865480959415), new google.maps.LatLng (23.575771839758904, 120.29883241822722), new google.maps.LatLng (23.57536639163977, 120.29896912317281), new google.maps.LatLng (23.575319245932572, 120.29898714036949), new google.maps.LatLng (23.574726347721615, 120.29919961771975), new google.maps.LatLng (23.57441370012927, 120.29931285333646), new google.maps.LatLng (23.573814038010262, 120.29952734234348), new google.maps.LatLng (23.57366241225618, 120.29958223991412), new google.maps.LatLng (23.57362632990218, 120.29958617551347), new google.maps.LatLng (23.57308689512307, 120.29977250132583), new google.maps.LatLng (23.572871965696894, 120.29984550380732), new google.maps.LatLng (23.5726570360826, 120.29992051794557), new google.maps.LatLng (23.572425512129293, 120.30000223760635), new google.maps.LatLng (23.572161555600097, 120.30009314417839), new google.maps.LatLng (23.572053565800843, 120.30048532953265), new google.maps.LatLng (23.571971389212088, 120.30077559094434), new google.maps.LatLng (23.571958662498652, 120.30080165476807), new google.maps.LatLng (23.571697636971074, 120.30146139047156), new google.maps.LatLng (23.57159886617527, 120.3016785616876), new google.maps.LatLng (23.571545575961327, 120.30180319669262), new google.maps.LatLng (23.5712107667999, 120.30253395438194), new google.maps.LatLng (23.571192509156173, 120.30254995992186), new google.maps.LatLng (23.570546124655397, 120.30225684087281), new google.maps.LatLng (23.569656966274724, 120.3018155297757), new google.maps.LatLng (23.56881809199929, 120.30143961310387), new google.maps.LatLng (23.568841015055963, 120.30136978795531), new google.maps.LatLng (23.56883671275093, 120.30129133334162), new google.maps.LatLng (23.568800018130506, 120.30122486095433), new google.maps.LatLng (23.568732045856684, 120.30118145048618), new google.maps.LatLng (23.568673225120452, 120.30117197504046), new google.maps.LatLng (23.568600882848745, 120.3011920038939), new google.maps.LatLng (23.568552510631942, 120.301240195942), new google.maps.LatLng (23.568520185701846, 120.30130809714797), new google.maps.LatLng (23.568521597461917, 120.3013817701817), new google.maps.LatLng (23.568546364645222, 120.30145477266319), new google.maps.LatLng (23.568600633382104, 120.3015056469203), new google.maps.LatLng (23.568655401261598, 120.30152602663043), new google.maps.LatLng (23.568394621510684, 120.30242398381233), new google.maps.LatLng (23.568247295949188, 120.30237293412688), new google.maps.LatLng (23.567855351959814, 120.30228567461972), new google.maps.LatLng (23.56751257680543, 120.30222724885948), new google.maps.LatLng (23.56676906633013, 120.30210579118739), new google.maps.LatLng (23.566547370492263, 120.30206211757672), new google.maps.LatLng (23.56595198084382, 120.30195205929294), new google.maps.LatLng (23.564781237969363, 120.3017433732748), new google.maps.LatLng (23.564680623396672, 120.30179625918868), new google.maps.LatLng (23.564580623396658, 120.30229975621705), new google.maps.LatLng (23.56437434963642, 120.3034995496273), new google.maps.LatLng (23.564295247330055, 120.30397153069976), new google.maps.LatLng (23.564545832939416, 120.30402526259422), new google.maps.LatLng (23.565277861296344, 120.30416272580624), new google.maps.LatLng (23.566193659290214, 120.304344445467), new google.maps.LatLng (23.567154318377813, 120.30450470745564), new google.maps.LatLng (23.567591314524595, 120.30458182096481)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/chao-tian/01-02.jpg',
        title: '歲次乙未年 十九晚間遊行出發',
        items: [
          {item: '農曆三月十九晚間遊行出發'},
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/chao-tian/01-02.jpg',
        title: '歲次乙未年 十九晚間遊行休息',
        items: [
          {item: '農曆三月十九晚間遊行休息'},
        ]
      }
    ];

    setMapData ('19ni', lineSymbols, points, markers, 1 / 2, 'rgba(0, 130, 0, 1)');

    $('#loading').fadeOut (function () {
      $(this).hide (function () {
        $(this).remove ();
      });
    });
    
    setTimeout (calculateLength.bind (this, points), 1000);
  }

  $map = $('#map');
  google.maps.event.addDomListener (window, 'load', initialize);
});