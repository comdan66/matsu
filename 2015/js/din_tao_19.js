/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function() {
  var $map = $('#map');
  var map  = null;
  var info_bubble = $('#_info_bubble').html ();

  function initialize () {
    var d = Math.min ($(window).width (), $(window).height ());
    var zoom = d < 961 ? d < 641 ? d < 376 ? 15 : 16 : 16 : 16;
    var latLng = d < 961 ? d < 641 ? d < 376 ? new google.maps.LatLng (23.568396231491233, 120.3010703338623) : new google.maps.LatLng (23.569396231491233, 120.3020703338623) : new google.maps.LatLng (23.569396231491233, 120.3010703338623) : new google.maps.LatLng (23.569396231491233, 120.3010703338623);

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

    var lineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeColor: 'rgba(163, 28, 34, .8)'
    };

    var pm_point = [
      new google.maps.LatLng (23.567633723355957, 120.30456237494946), new google.maps.LatLng (23.564535998777593, 120.30400179326534), new google.maps.LatLng (23.56435406665024, 120.30493788421154), new google.maps.LatLng (23.565155549537344, 120.30506327748299), new google.maps.LatLng (23.56523545170437, 120.30458115041256), new google.maps.LatLng (23.566112528450525, 120.304751470685), new google.maps.LatLng (23.566034470701396, 120.3052181750536), new google.maps.LatLng (23.565508347969853, 120.30512563884258), new google.maps.LatLng (23.56524405655022, 120.30653312802315), new google.maps.LatLng (23.566233610064064, 120.30663505196571), new google.maps.LatLng (23.566092245732786, 120.30605837702751), new google.maps.LatLng (23.565990217468727, 120.3058397769928), new google.maps.LatLng (23.566389725279254, 120.30589610338211), new google.maps.LatLng (23.566603615115344, 120.30583307147026), new google.maps.LatLng (23.566636804886258, 120.30574455857277), new google.maps.LatLng (23.56681873385204, 120.3057512640953), new google.maps.LatLng (23.566994516329636, 120.30579686164856), new google.maps.LatLng (23.567187508009624, 120.30585989356041), new google.maps.LatLng (23.567319037208666, 120.30552059412003), new google.maps.LatLng (23.567642328044712, 120.30556350946426), new google.maps.LatLng (23.56777631526824, 120.30488893389702), new google.maps.LatLng (23.568147545210287, 120.30497208237648), new google.maps.LatLng (23.568330701318335, 120.30494660139084), new google.maps.LatLng (23.56845854167194, 120.30483797192574), new google.maps.LatLng (23.568983423357942, 120.30519470572472), new google.maps.LatLng (23.569569764119226, 120.30559837818146), new google.maps.LatLng (23.569963114944816, 120.30589208006859), new google.maps.LatLng (23.57024583512304, 120.3058759868145), new google.maps.LatLng (23.57063672549739, 120.30507802963257), new google.maps.LatLng (23.570597390669597, 120.30501767992973), new google.maps.LatLng (23.570326963409606, 120.30491575598717), new google.maps.LatLng (23.570487990617863, 120.30451476573944), new google.maps.LatLng (23.56955562805199, 120.30411913990974), new google.maps.LatLng (23.569598650860552, 120.30404537916183), new google.maps.LatLng (23.57047631307885, 120.30386969447136), new google.maps.LatLng (23.570775011907802, 120.30372217297554), new google.maps.LatLng (23.57082909721983, 120.30358001589775), new google.maps.LatLng (23.57181369184731, 120.30403733253479), new google.maps.LatLng (23.572155409605376, 120.30302748084068), new google.maps.LatLng (23.57311418130137, 120.30346468091011), new google.maps.LatLng (23.574124571589625, 120.303985029459), new google.maps.LatLng (23.574133790443323, 120.30391797423363), new google.maps.LatLng (23.573770567117954, 120.30278004705906), new google.maps.LatLng (23.573020148233113, 120.30305027961731), new google.maps.LatLng (23.572355768884574, 120.30087567865849), new google.maps.LatLng (23.57311663968134, 120.30060544610023), new google.maps.LatLng (23.57288370797512, 120.29986314475536), new google.maps.LatLng (23.57363904438011, 120.29960565268993), new google.maps.LatLng (23.57384493271984, 120.30030839145184), new google.maps.LatLng (23.57308468073814, 120.30058465898037), new google.maps.LatLng (23.573363092039312, 120.30152477324009), new google.maps.LatLng (23.574128259131122, 120.30127130448818), new google.maps.LatLng (23.574227208124245, 120.30159652233124), new google.maps.LatLng (23.57346019782891, 120.30184663832188), new google.maps.LatLng (23.573757660686834, 120.30282229185104), new google.maps.LatLng (23.574543721483483, 120.30254267156124), new google.maps.LatLng (23.575318100465903, 120.30222684144974), new google.maps.LatLng (23.576252880439057, 120.30188821256161), new google.maps.LatLng (23.576671408960404, 120.30172258615494), new google.maps.LatLng (23.577196257819583, 120.30152142047882), new google.maps.LatLng (23.576921542109307, 120.30060142278671), new google.maps.LatLng (23.5759726315204, 120.30096620321274), new google.maps.LatLng (23.575021255729105, 120.30128873884678), new google.maps.LatLng (23.574646972278348, 120.30006095767021), new google.maps.LatLng (23.575590361197595, 120.29973037540913), new google.maps.LatLng (23.575989839804574, 120.29956609010696), new google.maps.LatLng (23.576518378862833, 120.29937967658043), new google.maps.LatLng (23.577285985868862, 120.2991121262312), new google.maps.LatLng (23.57766394923885, 120.30034460127354), new google.maps.LatLng (23.577722948300845, 120.30036203563213), new google.maps.LatLng (23.5778876538753, 120.3003191202879), new google.maps.LatLng (23.578425403845717, 120.30010722577572), new google.maps.LatLng (23.57804068237682, 120.29883317649364), new google.maps.LatLng (23.577300121103914, 120.29907524585724), new google.maps.LatLng (23.577102842251055, 120.2983919531107), new google.maps.LatLng (23.57684287620721, 120.2975557744503), new google.maps.LatLng (23.57664498208882, 120.29691003262997), new google.maps.LatLng (23.576472285425, 120.29652245342731), new google.maps.LatLng (23.576238130510887, 120.29667533934116), new google.maps.LatLng (23.57622768264409, 120.29675513505936), new google.maps.LatLng (23.576275005328217, 120.296960324049), new google.maps.LatLng (23.576487035326863, 120.29769390821457), new google.maps.LatLng (23.576074652029337, 120.29783941805363), new google.maps.LatLng (23.575118974878055, 120.29818341135979), new google.maps.LatLng (23.575077797635476, 120.29819682240486), new google.maps.LatLng (23.57417558257191, 120.29855087399483), new google.maps.LatLng (23.574612555355753, 120.30004218220711), new google.maps.LatLng (23.57387074556347, 120.30030034482479), new google.maps.LatLng (23.573655023785125, 120.29957011342049), new google.maps.LatLng (23.573101274805733, 120.2997612208128), new google.maps.LatLng (23.57296483463205, 120.29893308877945), new google.maps.LatLng (23.57258132635753, 120.29876880347729), new google.maps.LatLng (23.571956279221375, 120.30079253017902), new google.maps.LatLng (23.57169568838617, 120.30146911740303), new google.maps.LatLng (23.571560475956595, 120.30175477266312), new google.maps.LatLng (23.57119970392912, 120.30253864824772), new google.maps.LatLng (23.570533471549297, 120.30224226415157), new google.maps.LatLng (23.570021502857568, 120.30320182442665), new google.maps.LatLng (23.569260614127906, 120.3028316795826), new google.maps.LatLng (23.568830998915818, 120.30384421348572), new google.maps.LatLng (23.568457312438344, 120.3045154362917), new google.maps.LatLng (23.568442561634527, 120.30451208353043), new google.maps.LatLng (23.568381099934115, 120.30444972217083), new google.maps.LatLng (23.56829689735787, 120.30441351234913), new google.maps.LatLng (23.568003109844273, 120.30434980988503), new google.maps.LatLng (23.568000651368592, 120.30432634055614), new google.maps.LatLng (23.568113126584286, 120.30358336865902), new google.maps.LatLng (23.568395236127763, 120.30242465436459), new google.maps.LatLng (23.568658906591153, 120.30153550207615), new google.maps.LatLng (23.568758474320774, 120.30151404440403), new google.maps.LatLng (23.568821165074763, 120.30145302414894), new google.maps.LatLng (23.569011080999825, 120.30154623091221), new google.maps.LatLng (23.56966072660236, 120.30182920396328), new google.maps.LatLng (23.570200968700583, 120.30037209391594), new google.maps.LatLng (23.569144452213475, 120.29967941343784), new google.maps.LatLng (23.56910696078001, 120.29969081282616), new google.maps.LatLng (23.568968057998802, 120.30023999512196), new google.maps.LatLng (23.568725285085957, 120.30116401612759), new google.maps.LatLng (23.56859683037585, 120.30118480324745), new google.maps.LatLng (23.568506481772438, 120.30130013823509), new google.maps.LatLng (23.567672444450878, 120.30117005109787), new google.maps.LatLng (23.567560583478805, 120.30074022710323), new google.maps.LatLng (23.567515716139052, 120.30071541666985), new google.maps.LatLng (23.56736636310318, 120.3007797896862), new google.maps.LatLng (23.567298140054973, 120.30086226761341), new google.maps.LatLng (23.567219468387837, 120.30089110136032), new google.maps.LatLng (23.567086095219484, 120.30050151050091), new google.maps.LatLng (23.567047988575084, 120.30027955770493), new google.maps.LatLng (23.567042456964483, 120.30005022883415), new google.maps.LatLng (23.566982223856304, 120.30000127851963), new google.maps.LatLng (23.566865445302582, 120.29998116195202), new google.maps.LatLng (23.566714862277426, 120.3010956197977), new google.maps.LatLng (23.56654768418607, 120.30202232301235), new google.maps.LatLng (23.565668766455925, 120.30186139047146), new google.maps.LatLng (23.565612835128636, 120.3022912144661), new google.maps.LatLng (23.56552801614727, 120.30281692743301), new google.maps.LatLng (23.56594657884964, 120.30298456549644), new google.maps.LatLng (23.565975466387833, 120.30305430293083), new google.maps.LatLng (23.565928754620785, 120.30319847166538), new google.maps.LatLng (23.565482533482534, 120.30307307839394), new google.maps.LatLng (23.565363909701762, 120.30371747910976), new google.maps.LatLng (23.56526925645271, 120.30416674911976), new google.maps.LatLng (23.566198576309194, 120.3043545037508), new google.maps.LatLng (23.5663792766289, 120.30328027904034), new google.maps.LatLng (23.5669484195488, 120.30337885022163), new google.maps.LatLng (23.567341163603018, 120.30345663428307), new google.maps.LatLng (23.567280316009523, 120.30367188155651), new google.maps.LatLng (23.567139567427667, 120.30450940132141), new google.maps.LatLng (23.567632494114637, 120.30458852648735),
    ];
    var pm_markers = [
      {
        info: 'dasdad',
        latLng: new google.maps.LatLng (23.567633723355957, 120.30456237494946),
        infoWindow: new InfoBubble ({padding: 0, arrowStyle: 0, margin: 0, borderWidth: 1, shadowStyle: 1, borderRadius: 3, minWidth: 'auto', maxWidth: 'auto', minHeight: 'auto', maxHeight: 'auto', borderColor: 'rgba(39, 40, 34, .7)', content: '', backgroundClassName: ''})
      },
      {
        info: 'ssssssssssx',
        latLng: new google.maps.LatLng (23.564535998777593, 120.30400179326534),
        infoWindow: new InfoBubble ({padding: 0, arrowStyle: 0, margin: 0, borderWidth: 1, shadowStyle: 1, borderRadius: 2, minWidth: 'auto', maxWidth: 'auto', minHeight: 'auto', maxHeight: 'auto', borderColor: '#c8c8c8', content: '', backgroundClassName: ''})
      }
    ];

    var ni_poine = [
      new google.maps.LatLng (23.56951383445304, 120.2983295917511), new google.maps.LatLng (23.56835344215955, 120.3036618232727), new google.maps.LatLng (23.56732088107499, 120.30003547668457), new google.maps.LatLng (23.56951383445304, 120.2983295917511),
    ];
    var ni_markers = [
      {
        info: 'dasdasdad',
        latLng: new google.maps.LatLng (23.56951383445304, 120.2983295917511),
        infoWindow: new InfoBubble ({padding: 0, arrowStyle: 0, borderWidth: 2, shadowStyle: 1, borderRadius: 2, minWidth: 'auto', maxWidth: 'auto', minHeight: 'auto', maxHeight: 'auto', borderColor: '#c8c8c8', content: '', backgroundClassName: 'info_bubble'})
      },
      {
        info: 'dasasddad',
        latLng: new google.maps.LatLng (23.56835344215955, 120.3036618232727),
        infoWindow: new InfoBubble ({padding: 0, arrowStyle: 0, borderWidth: 2, shadowStyle: 1, borderRadius: 2, minWidth: 'auto', maxWidth: 'auto', minHeight: 'auto', maxHeight: 'auto', borderColor: '#c8c8c8', content: '', backgroundClassName: 'info_bubble'})
      },
      {
        info: 'daewqsdad',
        latLng: new google.maps.LatLng (23.56732088107499, 120.30003547668457),
        infoWindow: new InfoBubble ({padding: 0, arrowStyle: 0, borderWidth: 2, shadowStyle: 1, borderRadius: 2, minWidth: 'auto', maxWidth: 'auto', minHeight: 'auto', maxHeight: 'auto', borderColor: '#c8c8c8', content: '', backgroundClassName: 'info_bubble'})
      },
      {
        info: 'dasrefdad',
        latLng: new google.maps.LatLng (23.56951383445304, 120.2983295917511),
        infoWindow: new InfoBubble ({padding: 0, arrowStyle: 0, borderWidth: 2, shadowStyle: 1, borderRadius: 2, minWidth: 'auto', maxWidth: 'auto', minHeight: 'auto', maxHeight: 'auto', borderColor: '#c8c8c8', content: '', backgroundClassName: 'info_bubble'})
      },
    ];


    window.pm_markers = pm_markers.map (function (t, i) {
      t.marker = new google.maps.Marker ({
          draggable: false,
          position: t.latLng
        });

      google.maps.event.addListener (t.marker, 'click', function (e) {
        window.pm_markers.forEach (function (u) { u.infoWindow.close (); });
        t.infoWindow.setContent (_.template (info_bubble, t) (t));
        t.infoWindow.open (map, t.marker);
      });
      google.maps.event.addListener (t.marker, 'mouseover', function (e) {
        window.pm_markers.forEach (function (u) { u.infoWindow.close (); });
        t.infoWindow.setContent (_.template (info_bubble, t) (t));
        t.infoWindow.open (map, t.marker);
      });
      return t;
    });

    window.ni_markers = ni_markers.map (function (t, i) {
      t.marker = new google.maps.Marker ({
          draggable: false,
          position: t.latLng
        });
      google.maps.event.addListener (t.marker, 'click', function (e) {
        window.ni_markers.forEach (function (u) { u.infoWindow.close (); });
        t.infoWindow.setContent (_.template (info_bubble, t) (t));
        t.infoWindow.open (map, t.marker);
      });
      google.maps.event.addListener (t.marker, 'mouseover', function (e) {
        window.ni_markers.forEach (function (u) { u.infoWindow.close (); });
        t.infoWindow.setContent (_.template (info_bubble, t) (t));
        t.infoWindow.open (map, t.marker);
      });
      return t;
    });

    window.pm_line = new google.maps.Polyline ({
      path: pm_point,
      strokeColor: 'rgba(15, 36, 141, .5)',
      icons: [{
        icon: lineSymbol,
        offset: '100%'
      }]
    });

    window.ni_line = new google.maps.Polyline ({
      path: ni_poine,
      icons: [{
        icon: lineSymbol,
        offset: '100%'
      }]
    });

    window.pm = function (map) {
      window.pm_line.setMap (map);

      window.pm_markers.forEach (function (t) {
        t.marker.setMap (map);
        t.infoWindow.close ();
      });

      clearInterval (window.pm_interval);

      if (map) {
        var count = 0;
        window.pm_interval = setInterval (function() {
          var icons = window.pm_line.get ('icons');
          icons[0].offset = (count / 4) + '%';
          window.pm_line.set('icons', icons);
          count = (count + 1) % 400;
        }, 100);
      }
    };

    window.ni = function (map) {
      window.ni_line.setMap (map);

      window.ni_markers.forEach (function (t) {
        t.marker.setMap (map);
        t.infoWindow.close ();
      });

      clearInterval (window.ni_interval);

      if (map) {
        var count = 0;
        window.ni_interval = setInterval (function() {
          var icons = window.ni_line.get ('icons');
          icons[0].offset = (count / 4) + '%';
          window.ni_line.set('icons', icons);
          count = (count + 1) % 400;
        }, 100);
      }
    };
  }

  google.maps.event.addDomListener (window, 'load', initialize);

  $('.buttons button').OAripple ().OAjelly ();
  $('.buttons .pm').click (function () {
    $(this).addClass ('active').siblings ().removeClass ('active');
    window.pm (map);
    window.ni (null);
  });
  $('.buttons .ni').click (function () {
    $(this).addClass ('active').siblings ().removeClass ('active');
    window.pm (null);
    window.ni (map);
  });
  setTimeout (function () {
    $('.buttons .pm').click ();
  }, 500);
});