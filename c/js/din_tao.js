/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function() {
  var $map = $('#map');
  var map  = null;
  var lineSymbol = null;
  var _info_bubble = $('#_info_bubble').html ();
  var _items = $('#_items').html ();
  var _item = $('#_item').html ();
  var keys = new Array ();
  var $loading = $('#loading');

  function setInfoWindow (t) {
    var items = t.items ? t.items.map (function (u) { return _.template (_item, u) (u); }).join ('') : [];
    t._items = items.length ? _.template (_items, {items: items}) ({items: items}) : '';

    var obj = $(_.template (_info_bubble, t) (t));
    obj.find ('.delete').click (function () { t.infoWindow.close (); });

    t.infoWindow.setContent (obj.get (0));
    t.infoWindow.open (map, t.marker);
  }

  function setMapData (key, points, markers, speed, lineColor) {
    keys.push (key);

    window['markers_' + key] = markers.map (function (t, i) {
      t.marker = new google.maps.Marker ({
          draggable: false,
          position: t.latLng
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
      google.maps.event.addListener (t.marker, 'mouseover', function (e) {
        window['markers_' + key].forEach (function (u) { u.infoWindow.close (); });
        setInfoWindow (t);
      });
      return t;
    });

    window['line_' + key] = new google.maps.Polyline ({
      path: points,
      strokeColor: lineColor,
      icons: [{
        icon: lineSymbol,
        offset: '100%'
      }]
    });

    window['func_' + key] = function (map) {
      window['line_' + key].setMap (map);

      window['markers_' + key].forEach (function (t) {
        t.marker.setMap (map);
        t.infoWindow.close ();
      });

      clearInterval (window['interval_' + key]);

      if (map) {
        var count = 0;
        window['interval_' + key] = setInterval (function() {
          var icons = window['line_' + key].get ('icons');
          icons[0].offset = (count * speed) + '%';
          window['line_' + key].set('icons', icons);
          count = (count + 1) % (100 / speed);
        }, 100);
      }
    };
  }

  function turnOn (key) {
    keys.forEach (function (k) {
      window['func_' + k] (k == key ? map : null);
    });
  }

  function initialize () {
    $('#container').css ({height: 'calc(100% - ' + $('.buttons').height () + 'px - 5px)'});

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

    lineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeColor: 'rgba(163, 28, 34, .8)'
    };

    var points = [
      new google.maps.LatLng (23.567633723355957, 120.30456237494946), new google.maps.LatLng (23.564535998777593, 120.30400179326534), new google.maps.LatLng (23.56435406665024, 120.30493788421154), new google.maps.LatLng (23.565155549537344, 120.30506327748299), new google.maps.LatLng (23.56523545170437, 120.30458115041256), new google.maps.LatLng (23.566112528450525, 120.304751470685), new google.maps.LatLng (23.566034470701396, 120.3052181750536), new google.maps.LatLng (23.565508347969853, 120.30512563884258), new google.maps.LatLng (23.56524405655022, 120.30653312802315), new google.maps.LatLng (23.566233610064064, 120.30663505196571), new google.maps.LatLng (23.566092245732786, 120.30605837702751), new google.maps.LatLng (23.565990217468727, 120.3058397769928), new google.maps.LatLng (23.566389725279254, 120.30589610338211), new google.maps.LatLng (23.566603615115344, 120.30583307147026), new google.maps.LatLng (23.566636804886258, 120.30574455857277), new google.maps.LatLng (23.56681873385204, 120.3057512640953), new google.maps.LatLng (23.566994516329636, 120.30579686164856), new google.maps.LatLng (23.567187508009624, 120.30585989356041), new google.maps.LatLng (23.567319037208666, 120.30552059412003), new google.maps.LatLng (23.567642328044712, 120.30556350946426), new google.maps.LatLng (23.56777631526824, 120.30488893389702), new google.maps.LatLng (23.568147545210287, 120.30497208237648), new google.maps.LatLng (23.568330701318335, 120.30494660139084), new google.maps.LatLng (23.56845854167194, 120.30483797192574), new google.maps.LatLng (23.568983423357942, 120.30519470572472), new google.maps.LatLng (23.569569764119226, 120.30559837818146), new google.maps.LatLng (23.569963114944816, 120.30589208006859), new google.maps.LatLng (23.57024583512304, 120.3058759868145), new google.maps.LatLng (23.57063672549739, 120.30507802963257), new google.maps.LatLng (23.570597390669597, 120.30501767992973), new google.maps.LatLng (23.570326963409606, 120.30491575598717), new google.maps.LatLng (23.570487990617863, 120.30451476573944), new google.maps.LatLng (23.56955562805199, 120.30411913990974), new google.maps.LatLng (23.569598650860552, 120.30404537916183), new google.maps.LatLng (23.57047631307885, 120.30386969447136), new google.maps.LatLng (23.570775011907802, 120.30372217297554), new google.maps.LatLng (23.57082909721983, 120.30358001589775), new google.maps.LatLng (23.57181369184731, 120.30403733253479), new google.maps.LatLng (23.572155409605376, 120.30302748084068), new google.maps.LatLng (23.57311418130137, 120.30346468091011), new google.maps.LatLng (23.574124571589625, 120.303985029459), new google.maps.LatLng (23.574133790443323, 120.30391797423363), new google.maps.LatLng (23.573770567117954, 120.30278004705906), new google.maps.LatLng (23.573020148233113, 120.30305027961731), new google.maps.LatLng (23.572355768884574, 120.30087567865849), new google.maps.LatLng (23.57311663968134, 120.30060544610023), new google.maps.LatLng (23.57288370797512, 120.29986314475536), new google.maps.LatLng (23.57363904438011, 120.29960565268993), new google.maps.LatLng (23.57384493271984, 120.30030839145184), new google.maps.LatLng (23.57308468073814, 120.30058465898037), new google.maps.LatLng (23.573363092039312, 120.30152477324009), new google.maps.LatLng (23.574128259131122, 120.30127130448818), new google.maps.LatLng (23.574227208124245, 120.30159652233124), new google.maps.LatLng (23.57346019782891, 120.30184663832188), new google.maps.LatLng (23.573757660686834, 120.30282229185104), new google.maps.LatLng (23.574543721483483, 120.30254267156124), new google.maps.LatLng (23.575318100465903, 120.30222684144974), new google.maps.LatLng (23.576252880439057, 120.30188821256161), new google.maps.LatLng (23.576671408960404, 120.30172258615494), new google.maps.LatLng (23.577196257819583, 120.30152142047882), new google.maps.LatLng (23.576921542109307, 120.30060142278671), new google.maps.LatLng (23.5759726315204, 120.30096620321274), new google.maps.LatLng (23.575021255729105, 120.30128873884678), new google.maps.LatLng (23.574646972278348, 120.30006095767021), new google.maps.LatLng (23.575590361197595, 120.29973037540913), new google.maps.LatLng (23.575989839804574, 120.29956609010696), new google.maps.LatLng (23.576518378862833, 120.29937967658043), new google.maps.LatLng (23.577285985868862, 120.2991121262312), new google.maps.LatLng (23.57766394923885, 120.30034460127354), new google.maps.LatLng (23.577722948300845, 120.30036203563213), new google.maps.LatLng (23.5778876538753, 120.3003191202879), new google.maps.LatLng (23.578425403845717, 120.30010722577572), new google.maps.LatLng (23.57804068237682, 120.29883317649364), new google.maps.LatLng (23.577300121103914, 120.29907524585724), new google.maps.LatLng (23.577102842251055, 120.2983919531107), new google.maps.LatLng (23.57684287620721, 120.2975557744503), new google.maps.LatLng (23.57664498208882, 120.29691003262997), new google.maps.LatLng (23.576472285425, 120.29652245342731), new google.maps.LatLng (23.576238130510887, 120.29667533934116), new google.maps.LatLng (23.57622768264409, 120.29675513505936), new google.maps.LatLng (23.576275005328217, 120.296960324049), new google.maps.LatLng (23.576487035326863, 120.29769390821457), new google.maps.LatLng (23.576074652029337, 120.29783941805363), new google.maps.LatLng (23.575118974878055, 120.29818341135979), new google.maps.LatLng (23.575077797635476, 120.29819682240486), new google.maps.LatLng (23.57417558257191, 120.29855087399483), new google.maps.LatLng (23.574612555355753, 120.30004218220711), new google.maps.LatLng (23.57387074556347, 120.30030034482479), new google.maps.LatLng (23.573655023785125, 120.29957011342049), new google.maps.LatLng (23.573101274805733, 120.2997612208128), new google.maps.LatLng (23.57296483463205, 120.29893308877945), new google.maps.LatLng (23.57258132635753, 120.29876880347729), new google.maps.LatLng (23.571956279221375, 120.30079253017902), new google.maps.LatLng (23.57169568838617, 120.30146911740303), new google.maps.LatLng (23.571560475956595, 120.30175477266312), new google.maps.LatLng (23.57119970392912, 120.30253864824772), new google.maps.LatLng (23.570533471549297, 120.30224226415157), new google.maps.LatLng (23.570021502857568, 120.30320182442665), new google.maps.LatLng (23.569260614127906, 120.3028316795826), new google.maps.LatLng (23.568830998915818, 120.30384421348572), new google.maps.LatLng (23.568457312438344, 120.3045154362917), new google.maps.LatLng (23.568442561634527, 120.30451208353043), new google.maps.LatLng (23.568381099934115, 120.30444972217083), new google.maps.LatLng (23.56829689735787, 120.30441351234913), new google.maps.LatLng (23.568003109844273, 120.30434980988503), new google.maps.LatLng (23.568000651368592, 120.30432634055614), new google.maps.LatLng (23.568113126584286, 120.30358336865902), new google.maps.LatLng (23.568395236127763, 120.30242465436459), new google.maps.LatLng (23.568658906591153, 120.30153550207615), new google.maps.LatLng (23.568758474320774, 120.30151404440403), new google.maps.LatLng (23.568821165074763, 120.30145302414894), new google.maps.LatLng (23.569011080999825, 120.30154623091221), new google.maps.LatLng (23.56966072660236, 120.30182920396328), new google.maps.LatLng (23.570200968700583, 120.30037209391594), new google.maps.LatLng (23.569144452213475, 120.29967941343784), new google.maps.LatLng (23.56910696078001, 120.29969081282616), new google.maps.LatLng (23.568968057998802, 120.30023999512196), new google.maps.LatLng (23.568725285085957, 120.30116401612759), new google.maps.LatLng (23.56859683037585, 120.30118480324745), new google.maps.LatLng (23.568506481772438, 120.30130013823509), new google.maps.LatLng (23.567672444450878, 120.30117005109787), new google.maps.LatLng (23.567560583478805, 120.30074022710323), new google.maps.LatLng (23.567515716139052, 120.30071541666985), new google.maps.LatLng (23.56736636310318, 120.3007797896862), new google.maps.LatLng (23.567298140054973, 120.30086226761341), new google.maps.LatLng (23.567219468387837, 120.30089110136032), new google.maps.LatLng (23.567086095219484, 120.30050151050091), new google.maps.LatLng (23.567047988575084, 120.30027955770493), new google.maps.LatLng (23.567042456964483, 120.30005022883415), new google.maps.LatLng (23.566982223856304, 120.30000127851963), new google.maps.LatLng (23.566865445302582, 120.29998116195202), new google.maps.LatLng (23.566714862277426, 120.3010956197977), new google.maps.LatLng (23.56654768418607, 120.30202232301235), new google.maps.LatLng (23.565668766455925, 120.30186139047146), new google.maps.LatLng (23.565612835128636, 120.3022912144661), new google.maps.LatLng (23.56552801614727, 120.30281692743301), new google.maps.LatLng (23.56594657884964, 120.30298456549644), new google.maps.LatLng (23.565975466387833, 120.30305430293083), new google.maps.LatLng (23.565928754620785, 120.30319847166538), new google.maps.LatLng (23.565482533482534, 120.30307307839394), new google.maps.LatLng (23.565363909701762, 120.30371747910976), new google.maps.LatLng (23.56526925645271, 120.30416674911976), new google.maps.LatLng (23.566198576309194, 120.3043545037508), new google.maps.LatLng (23.5663792766289, 120.30328027904034), new google.maps.LatLng (23.5669484195488, 120.30337885022163), new google.maps.LatLng (23.567341163603018, 120.30345663428307), new google.maps.LatLng (23.567280316009523, 120.30367188155651), new google.maps.LatLng (23.567139567427667, 120.30450940132141), new google.maps.LatLng (23.567632494114637, 120.30458852648735),
    ];
    var markers = [
      {
        latLng: new google.maps.LatLng (23.567633723355957, 120.30456237494946),
        src: 'http://upload.wikimedia.org/wikipedia/commons/d/d3/Nelumno_nucifera_open_flower_-_botanic_garden_adelaide2.jpg',
        title: 'dasdad',
        items: [
          {item: 'aa'},
          {item: 'sss'},
          {item: 'sss'},
          {item: 'sss'},
          {item: 'sss'},
          {item: 'sss'},
        ]
      },
      {
        latLng: new google.maps.LatLng (23.564535998777593, 120.30400179326534),
        src: 'http://upload.wikimedia.org/wikipedia/commons/d/d3/Nelumno_nucifera_open_flower_-_botanic_garden_adelaide2.jpg',
        title: 'dasdad',
        items: [
          {item: 'aa'},
          {item: 'sss'},
        ]
      }
    ];

    setMapData ('pm19', points, markers, 1/4, 'rgba(15, 36, 141, .5)');

    points = [
      new google.maps.LatLng (23.56763126487333, 120.30456840991974), new google.maps.LatLng (23.56455812564072, 120.30400447547436), new google.maps.LatLng (23.565014184045875, 120.3018520027399), new google.maps.LatLng (23.56653416241937, 120.30212827026844), new google.maps.LatLng (23.566360223205546, 120.30328162014484), new google.maps.LatLng (23.566949034172648, 120.30337683856487), new google.maps.LatLng (23.56776955444828, 120.30354581773281), new google.maps.LatLng (23.568108209636982, 120.30359342694283), new google.maps.LatLng (23.568833457375963, 120.30385427176952), new google.maps.LatLng (23.569314700063604, 120.3040836006403), new google.maps.LatLng (23.569534731254187, 120.30413389205933), new google.maps.LatLng (23.570462791716615, 120.30453018844128), new google.maps.LatLng (23.57148795286885, 120.3049023449421), new google.maps.LatLng (23.57165758307919, 120.30444703996181), new google.maps.LatLng (23.571918788590605, 120.30450738966465), new google.maps.LatLng (23.572032489650912, 120.30445642769337), new google.maps.LatLng (23.572133284022065, 120.30410036444664), new google.maps.LatLng (23.572470084164493, 120.3041747957468), new google.maps.LatLng (23.572981428714794, 120.30432365834713), new google.maps.LatLng (23.57309574345011, 120.30441217124462), new google.maps.LatLng (23.573313924523525, 120.30443631112576), new google.maps.LatLng (23.573402426038683, 120.30446045100689), new google.maps.LatLng (23.573403655225984, 120.30440546572208), new google.maps.LatLng (23.573658711339892, 120.30433841049671), new google.maps.LatLng (23.573997351342427, 120.30413791537285), new google.maps.LatLng (23.574138707164984, 120.30397564172745), new google.maps.LatLng (23.57446321039066, 120.3041660785675), new google.maps.LatLng (23.574970859661608, 120.30442155897617), new google.maps.LatLng (23.575251725303506, 120.30457109212875), new google.maps.LatLng (23.575322402558605, 120.30471593141556), new google.maps.LatLng (23.575291673321928, 120.30500024557114), new google.maps.LatLng (23.57530642335643, 120.30514039099216), new google.maps.LatLng (23.57540414229315, 120.30530534684658), new google.maps.LatLng (23.575490798647866, 120.30542202293873), new google.maps.LatLng (23.57551599658425, 120.30552260577679), new google.maps.LatLng (23.57605068336267, 120.30586257576942), new google.maps.LatLng (23.576216620195996, 120.30594438314438), new google.maps.LatLng (23.577083790383526, 120.30611604452133), new google.maps.LatLng (23.577648584895428, 120.30609928071499), new google.maps.LatLng (23.579586321699608, 120.30591554939747), new google.maps.LatLng (23.579780524001553, 120.30465893447399), new google.maps.LatLng (23.579765159905843, 120.30447386205196), new google.maps.LatLng (23.57934909951058, 120.30314683914185), new google.maps.LatLng (23.579173948137367, 120.30250445008278), new google.maps.LatLng (23.578701345546822, 120.30099906027317), new google.maps.LatLng (23.578592566816308, 120.3009856492281), new google.maps.LatLng (23.576856396912493, 120.30163206160069), new google.maps.LatLng (23.576227068063666, 120.30187346041203), new google.maps.LatLng (23.57659274290842, 120.30298724770546), new google.maps.LatLng (23.575679475761397, 120.30260570347309), new google.maps.LatLng (23.57541090272003, 120.30247762799263), new google.maps.LatLng (23.575101766479737, 120.3027968108654), new google.maps.LatLng (23.57473608748244, 120.30322462320328), new google.maps.LatLng (23.574540648541902, 120.3025621175766), new google.maps.LatLng (23.57449639817536, 120.30253730714321), new google.maps.LatLng (23.57378162977209, 120.30278272926807), new google.maps.LatLng (23.573018304446737, 120.30305832624435), new google.maps.LatLng (23.572737434027516, 120.30213631689548), new google.maps.LatLng (23.57348601074824, 120.30186407268047), new google.maps.LatLng (23.57310987913627, 120.30060075223446), new google.maps.LatLng (23.5738559953677, 120.30033387243748), new google.maps.LatLng (23.574078477311378, 120.30104130506516), new google.maps.LatLng (23.574516065006776, 120.30251048505306), new google.maps.LatLng (23.574554784072518, 120.30253127217293), new google.maps.LatLng (23.575289214982693, 120.30223086476326), new google.maps.LatLng (23.57530396501746, 120.30218929052353), new google.maps.LatLng (23.574422647531318, 120.29932335019112), new google.maps.LatLng (23.575335923420464, 120.29899209737778), new google.maps.LatLng (23.576218463937412, 120.30185803771019), new google.maps.LatLng (23.5762608699828, 120.30187346041203), new google.maps.LatLng (23.577196257819583, 120.30152477324009), new google.maps.LatLng (23.576326015475114, 120.29865950345993), new google.maps.LatLng (23.57711206089564, 120.29842011630535), new google.maps.LatLng (23.576845949094896, 120.29758527874947), new google.maps.LatLng (23.57661855521192, 120.29684834182262), new google.maps.LatLng (23.576460608418184, 120.29651172459126), new google.maps.LatLng (23.57608018325948, 120.29584050178528), new google.maps.LatLng (23.575421350651823, 120.29510624706745), new google.maps.LatLng (23.574667868262665, 120.29423385858536), new google.maps.LatLng (23.574617472059526, 120.2942419052124), new google.maps.LatLng (23.574517294183643, 120.29428951442242), new google.maps.LatLng (23.57420508289002, 120.29432840645313), new google.maps.LatLng (23.573480479408815, 120.29424458742142), new google.maps.LatLng (23.573398738476744, 120.29421843588352), new google.maps.LatLng (23.57350629232416, 120.2937899529934), new google.maps.LatLng (23.57289661449203, 120.29365986585617), new google.maps.LatLng (23.573087753713793, 120.29251791536808), new google.maps.LatLng (23.573458354048768, 120.29260642826557), new google.maps.LatLng (23.574470585454662, 120.29289476573467), new google.maps.LatLng (23.574172509621732, 120.29379263520241), new google.maps.LatLng (23.574202624530432, 120.2938275039196), new google.maps.LatLng (23.574629149230258, 120.29422111809254), new google.maps.LatLng (23.574672170376676, 120.29420837759972), new google.maps.LatLng (23.575213621028453, 120.29359079897404), new google.maps.LatLng (23.576016266808022, 120.29447391629219), new google.maps.LatLng (23.576398535890796, 120.29486954212189), new google.maps.LatLng (23.57675253327713, 120.29528059065342), new google.maps.LatLng (23.57688835493762, 120.29549315571785), new google.maps.LatLng (23.576979312351142, 120.29566548764706), new google.maps.LatLng (23.575511694497898, 120.29655799269676), new google.maps.LatLng (23.575805465213932, 120.29710650444031), new google.maps.LatLng (23.575917933745014, 120.29738210141659), new google.maps.LatLng (23.57605006878143, 120.29785484075546), new google.maps.LatLng (23.575096235208374, 120.29819816350937), new google.maps.LatLng (23.575331006743586, 120.29896929860115), new google.maps.LatLng (23.573653794600204, 120.29957346618176), new google.maps.LatLng (23.573194693221286, 120.29801979660988), new google.maps.LatLng (23.57386398505729, 120.29761008918285), new google.maps.LatLng (23.57381850527932, 120.29750749468803), new google.maps.LatLng (23.57348969830773, 120.29713600873947), new google.maps.LatLng (23.57319960997815, 120.29682219028473), new google.maps.LatLng (23.57273620483398, 120.29827326536179), new google.maps.LatLng (23.572570878199752, 120.29881238937378), new google.maps.LatLng (23.5721468052123, 120.30011862516403), new google.maps.LatLng (23.571950133217058, 120.30082270503044), new google.maps.LatLng (23.571602883506305, 120.30168034136295), new google.maps.LatLng (23.57119970392912, 120.30256479978561), new google.maps.LatLng (23.57081619049967, 120.30354984104633), new google.maps.LatLng (23.569277208678724, 120.30284509062767), new google.maps.LatLng (23.569663185046963, 120.30181311070919), new google.maps.LatLng (23.56882854045562, 120.30143491923809), new google.maps.LatLng (23.56883898891112, 120.30130349099636), new google.maps.LatLng (23.56874802585886, 120.30118681490421), new google.maps.LatLng (23.568641697346287, 120.30116803944111), new google.maps.LatLng (23.56855257800646, 120.30123308300972), new google.maps.LatLng (23.568516930253562, 120.30130214989185), new google.maps.LatLng (23.56765154735343, 120.30116267502308), new google.maps.LatLng (23.567189966500507, 120.30113853514194), new google.maps.LatLng (23.5667197792769, 120.3010842204094), new google.maps.LatLng (23.566543996431655, 120.30207730829716), new google.maps.LatLng (23.567505267578287, 120.3022462874651), new google.maps.LatLng (23.56758701217861, 120.30251450836658), new google.maps.LatLng (23.56762081632175, 120.3027505427599), new google.maps.LatLng (23.567621430942456, 120.30299663543701), new google.maps.LatLng (23.5677185409776, 120.3030040115118), new google.maps.LatLng (23.567753574327064, 120.30352838337421), new google.maps.LatLng (23.567347309823013, 120.30343987047672), new google.maps.LatLng (23.567293837699395, 120.30361957848072), new google.maps.LatLng (23.5670522909387, 120.30361756682396), new google.maps.LatLng (23.566827953218592, 120.30356794595718), new google.maps.LatLng (23.566728384025513, 120.30349619686604), new google.maps.LatLng (23.566605458991706, 120.3034532815218), new google.maps.LatLng (23.566574113089672, 120.30350491404533), new google.maps.LatLng (23.56641492496193, 120.30439272522926), new google.maps.LatLng (23.566196117799723, 120.3043632209301), new google.maps.LatLng (23.566063358220266, 120.30503377318382), new google.maps.LatLng (23.565783087556348, 120.3049398958683), new google.maps.LatLng (23.56517214460681, 120.30482724308968), new google.maps.LatLng (23.56534977318188, 120.30378185212612), new google.maps.LatLng (23.564641101344396, 120.30356794595718), new google.maps.LatLng (23.56462757938144, 120.30357532203197), new google.maps.LatLng (23.56435775446613, 120.30493721365929), new google.maps.LatLng (23.56513403740716, 120.30505388975143), new google.maps.LatLng (23.565515723536738, 120.30515514314175), new google.maps.LatLng (23.566040616982544, 120.30523762106895), new google.maps.LatLng (23.5665464549346, 120.30534692108631), new google.maps.LatLng (23.566992672458696, 120.30543476343155), new google.maps.LatLng (23.567159849983693, 120.30451074242592), new google.maps.LatLng (23.567632494114637, 120.30458852648735),
    ];
    markers = [
      {
        latLng: new google.maps.LatLng (23.56951383445304, 120.2983295917511),
        src: 'http://upload.wikimedia.org/wikipedia/commons/d/d3/Nelumno_nucifera_open_flower_-_botanic_garden_adelaide2.jpg',
        title: 'dasdad',
        items: [
          {item: 'aa'},
          {item: 'sss'},
        ]
      },
      {
        latLng: new google.maps.LatLng (23.56835344215955, 120.3036618232727),
        
      },
    ];
    setMapData ('ni19', points, markers, 1/4, 'rgba(166, 27, 74, .6)');
    
    $loading.fadeOut (function () {
      $(this).hide ();
    });
  }

  google.maps.event.addDomListener (window, 'load', initialize);

  $('.buttons button').OAripple ().OAjelly ().click (function () {
    $(this).addClass ('active').siblings ().removeClass ('active');
  });
  
  $('.buttons .pm19').click (function () {
    turnOn ('pm19');
  });

  $('.buttons .ni19').click (function () {
    turnOn ('ni19');
  });

  setTimeout (function () {
    $('.buttons .ni19').click ();
  }, 500);
});