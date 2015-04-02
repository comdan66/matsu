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
    var h = ($subItems.is (':visible') ? parseFloat ($subItems.height ()) + parseFloat ($subItems.css ('padding-top')) + parseFloat ($subItems.css ('padding-bottom')) : 0) + parseFloat ($container.css ('margin-top')) + parseFloat ($pagination.css ('margin-top')) + parseFloat ($pagination.css ('padding-top')) + parseFloat ($pagination.find ('.oa-jelly').height ()) / 4 * 3;
    $container.css ({height: 'calc(100% - ' + h + 'px)'});

    var zoom = 16;
    var latLng = new google.maps.LatLng (23.569396231491233, 120.3010703338623);
    if ($(window).width () < 560) {
      zoom = 16;
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
      new google.maps.LatLng (23.567600533836917, 120.30456438660622), new google.maps.LatLng (23.567177674045556, 120.30449330806732), new google.maps.LatLng (23.56713790713946, 120.30449590256217), new google.maps.LatLng (23.566212896304233, 120.30433966388705), new google.maps.LatLng (23.566175588286335, 120.30432415347104), new google.maps.LatLng (23.565304227961857, 120.30415106327541), new google.maps.LatLng (23.565260159465005, 120.30415231666575), new google.maps.LatLng (23.564545403870195, 120.30401981046202), new google.maps.LatLng (23.564368817913188, 120.30492581427097), new google.maps.LatLng (23.565146944685694, 120.3050485253334), new google.maps.LatLng (23.5652243883303, 120.3045603632927), new google.maps.LatLng (23.566128508771392, 120.30474007129669), new google.maps.LatLng (23.56604184623875, 120.30523493885994), new google.maps.LatLng (23.565515108906183, 120.30514441430569), new google.maps.LatLng (23.56540017294145, 120.30576467514038), new google.maps.LatLng (23.56527128535443, 120.30650621821883), new google.maps.LatLng (23.56574866831077, 120.30656397342682), new google.maps.LatLng (23.56614405910312, 120.30661149492266), new google.maps.LatLng (23.56621043852074, 120.30661015381816), new google.maps.LatLng (23.566138342814067, 120.30631519854069), new google.maps.LatLng (23.56607644975139, 120.30606231262686), new google.maps.LatLng (23.56600681243274, 120.30593432486057), new google.maps.LatLng (23.565995933580393, 120.30583231320384), new google.maps.LatLng (23.566153708504242, 120.30586525797844), new google.maps.LatLng (23.566315539607952, 120.30588662793639), new google.maps.LatLng (23.56647491206455, 120.30589056353574), new google.maps.LatLng (23.566546392756013, 120.30588242919453), new google.maps.LatLng (23.56661221987159, 120.30583441257477), new google.maps.LatLng (23.566631887883705, 120.30574858188629), new google.maps.LatLng (23.566736374148725, 120.30574522912502), new google.maps.LatLng (23.56683797109638, 120.30575855245593), new google.maps.LatLng (23.566994516329636, 120.30579686164856), new google.maps.LatLng (23.567177059422754, 120.30585519969463), new google.maps.LatLng (23.567307359387932, 120.30550517141819), new google.maps.LatLng (23.567629421011357, 120.30554808676243), new google.maps.LatLng (23.567762179007982, 120.30487820506096), new google.maps.LatLng (23.56797668122822, 120.30492514371872), new google.maps.LatLng (23.568112080288966, 120.30494047870638), new google.maps.LatLng (23.56824465485644, 120.30494123697281), new google.maps.LatLng (23.568375136499608, 120.30490158667567), new google.maps.LatLng (23.568459770905513, 120.30481986701488), new google.maps.LatLng (23.568755401243866, 120.30500292778015), new google.maps.LatLng (23.569046910965874, 120.3052127229214), new google.maps.LatLng (23.56947732220845, 120.30550901930337), new google.maps.LatLng (23.569769512732588, 120.30572444200516), new google.maps.LatLng (23.569968646432418, 120.30587464570999), new google.maps.LatLng (23.570237845213327, 120.30585989356041), new google.maps.LatLng (23.570377975867174, 120.30555881559849), new google.maps.LatLng (23.570545330192974, 120.30525295605662), new google.maps.LatLng (23.570592221300434, 120.3051536266089), new google.maps.LatLng (23.57061944494338, 120.30505563826569), new google.maps.LatLng (23.570609068197836, 120.30503779649734), new google.maps.LatLng (23.570529350233524, 120.30501289834979), new google.maps.LatLng (23.570485279509835, 120.30497928302293), new google.maps.LatLng (23.570421541363213, 120.30495773763664), new google.maps.LatLng (23.57030422291008, 120.304931178689), new google.maps.LatLng (23.570469552397928, 120.30452214181423), new google.maps.LatLng (23.569542106594973, 120.30412450432777), new google.maps.LatLng (23.56959127552295, 120.30403465032578), new google.maps.LatLng (23.569742651571033, 120.30402316322329), new google.maps.LatLng (23.570478156900876, 120.30386567115784), new google.maps.LatLng (23.570627687431536, 120.30379919877055), new google.maps.LatLng (23.570761490576327, 120.30371814966202), new google.maps.LatLng (23.570822951162768, 120.30356325209141), new google.maps.LatLng (23.57105852571304, 120.30366978218558), new google.maps.LatLng (23.571428697762318, 120.30384001474386), new google.maps.LatLng (23.57180938963965, 120.30402056872845), new google.maps.LatLng (23.5721468052123, 120.30300334095955), new google.maps.LatLng (23.572394053749196, 120.30309310724738), new google.maps.LatLng (23.572684323429982, 120.30321170728212), new google.maps.LatLng (23.573106806161203, 120.30343249440193), new google.maps.LatLng (23.5741251861799, 120.3039575368166), new google.maps.LatLng (23.574125800770158, 120.30392400920391), new google.maps.LatLng (23.573769337934113, 120.30281960964203), new google.maps.LatLng (23.573743446018955, 120.30280459434994), new google.maps.LatLng (23.57301215849219, 120.30307106673717), new google.maps.LatLng (23.57272655038627, 120.30212550034526), new google.maps.LatLng (23.572337330926867, 120.30086494982243), new google.maps.LatLng (23.573082836952793, 120.30060343444347), new google.maps.LatLng (23.57309530790163, 120.3005758540869), new google.maps.LatLng (23.57287203064915, 120.29985576868057), new google.maps.LatLng (23.57308916211114, 120.29977923800948), new google.maps.LatLng (23.573109622803166, 120.29978116195207), new google.maps.LatLng (23.57362982549168, 120.29960297048092), new google.maps.LatLng (23.57364291056456, 120.29961025884154), new google.maps.LatLng (23.573857839142338, 120.30032448470592), new google.maps.LatLng (23.573119098061223, 120.30058734118938), new google.maps.LatLng (23.57310575599001, 120.30061608722212), new google.maps.LatLng (23.573369852571293, 120.30150063335896), new google.maps.LatLng (23.574136248804148, 120.30124917626381), new google.maps.LatLng (23.57424687499598, 120.30161395668983), new google.maps.LatLng (23.57347679184906, 120.30185669660568), new google.maps.LatLng (23.57375599545476, 120.30277794768813), new google.maps.LatLng (23.57378418767364, 120.30279176614295), new google.maps.LatLng (23.574191225366462, 120.30265019190324), new google.maps.LatLng (23.574506846179922, 120.30254401266575), new google.maps.LatLng (23.575289214982693, 120.30222617089748), new google.maps.LatLng (23.576216620195996, 120.30188351869583), new google.maps.LatLng (23.57663883630399, 120.30172057449818), new google.maps.LatLng (23.576945686950097, 120.3016118573189), new google.maps.LatLng (23.57718458087715, 120.30151806771755), new google.maps.LatLng (23.57690986514245, 120.30062288045883), new google.maps.LatLng (23.57650749256646, 120.30077500810626), new google.maps.LatLng (23.57597447526524, 120.30097626149654), new google.maps.LatLng (23.575016339040445, 120.30130550265312), new google.maps.LatLng (23.5746346805213, 120.300068333745), new google.maps.LatLng (23.574646535553104, 120.30004075338843), new google.maps.LatLng (23.575587288280516, 120.29971562325954), new google.maps.LatLng (23.575981235662773, 120.29956206679344), new google.maps.LatLng (23.576520837179064, 120.29936894774437), new google.maps.LatLng (23.577278610963013, 120.29910139739513), new google.maps.LatLng (23.577302755255012, 120.29911337962153), new google.maps.LatLng (23.577681157301342, 120.30033454298973), new google.maps.LatLng (23.57770451109683, 120.30034996569157), new google.maps.LatLng (23.577780103616885, 120.30033454298973), new google.maps.LatLng (23.577884756474525, 120.30030360987189), new google.maps.LatLng (23.578410039591425, 120.3001045435667), new google.maps.LatLng (23.578038224089045, 120.29885463416576), new google.maps.LatLng (23.57731302718675, 120.29908798635006), new google.maps.LatLng (23.577289234565285, 120.29907582869532), new google.maps.LatLng (23.57710099852207, 120.29841408133507), new google.maps.LatLng (23.57683611585405, 120.2975832670927), new google.maps.LatLng (23.57669230462253, 120.297095105052), new google.maps.LatLng (23.576646387538506, 120.29695151915553), new google.maps.LatLng (23.576591251792877, 120.29680860381131), new google.maps.LatLng (23.576467983369998, 120.29653452336788), new google.maps.LatLng (23.576251651278447, 120.29667735099792), new google.maps.LatLng (23.576239359671636, 120.29672227799892), new google.maps.LatLng (23.576240150890285, 120.29676845839026), new google.maps.LatLng (23.57626701578534, 120.2968791872263), new google.maps.LatLng (23.576316358812427, 120.29704271426203), new google.maps.LatLng (23.576503014385356, 120.29770463705063), new google.maps.LatLng (23.576062974987153, 120.29786020517349), new google.maps.LatLng (23.575722673336976, 120.29799154570105), new google.maps.LatLng (23.575130037418628, 120.2981948107481), new google.maps.LatLng (23.575090703936784, 120.29820419847965), new google.maps.LatLng (23.5750232770021, 120.29822020401957), new google.maps.LatLng (23.574933724972695, 120.29825163226133), new google.maps.LatLng (23.57418295765207, 120.29856160283089), new google.maps.LatLng (23.574411763138087, 120.2993138747454), new google.maps.LatLng (23.574623617938983, 120.30002608895302), new google.maps.LatLng (23.574612118638814, 120.30005349388125), new google.maps.LatLng (23.573871974746385, 120.30031710863113), new google.maps.LatLng (23.573659940524763, 120.29960431158543), new google.maps.LatLng (23.573625701949773, 120.2995861189604), new google.maps.LatLng (23.573106191566108, 120.29976323246956), new google.maps.LatLng (23.573084859767825, 120.29975778033736), new google.maps.LatLng (23.57303551311811, 120.29945947229862), new google.maps.LatLng (23.57300680621546, 120.29928839375975), new google.maps.LatLng (23.572990391240502, 120.29913944344526), new google.maps.LatLng (23.572970903297705, 120.29897775263794), new google.maps.LatLng (23.572960634302913, 120.29893072626601), new google.maps.LatLng (23.57292701067402, 120.29889845204366), new google.maps.LatLng (23.57287433458378, 120.29887422444835), new google.maps.LatLng (23.572591159917017, 120.29878221452236), new google.maps.LatLng (23.572416793548477, 120.29929040541651), new google.maps.LatLng (23.572223374508386, 120.2998864386559), new google.maps.LatLng (23.57196672742804, 120.30079655349255), new google.maps.LatLng (23.57170675121516, 120.30146710574627), new google.maps.LatLng (23.571607185720733, 120.30168168246746), new google.maps.LatLng (23.571534228228774, 120.30185124447348), new google.maps.LatLng (23.571209537592065, 120.30255541205406), new google.maps.LatLng (23.57054207604807, 120.30225701630116), new google.maps.LatLng (23.57003502426525, 120.30322059988976), new google.maps.LatLng (23.56926983332308, 120.30284777283669), new google.maps.LatLng (23.568841447371128, 120.30384488403797), new google.maps.LatLng (23.568459770905488, 120.30453689396381), new google.maps.LatLng (23.568405070000715, 120.3044805675745), new google.maps.LatLng (23.568328857466156, 120.30443631112576), new google.maps.LatLng (23.568246681382895, 120.30441007187369), new google.maps.LatLng (23.568099604978762, 120.30437998473644), new google.maps.LatLng (23.56798897360844, 120.30435852706432), new google.maps.LatLng (23.568108209636982, 120.30358605086803), new google.maps.LatLng (23.568389704573928, 120.30243404209614), new google.maps.LatLng (23.56864661427363, 120.3015435487032), new google.maps.LatLng (23.568669355060155, 120.30152477324009), new google.maps.LatLng (23.568717477496968, 120.30151865055564), new google.maps.LatLng (23.568766214494868, 120.30149643461709), new google.maps.LatLng (23.56879958605873, 120.30146885426052), new google.maps.LatLng (23.568820550459666, 120.30144095420837), new google.maps.LatLng (23.568979121057538, 120.30152074992657), new google.maps.LatLng (23.56965458049063, 120.3018144518137), new google.maps.LatLng (23.56975002685195, 120.30155083706381), new google.maps.LatLng (23.56985715066634, 120.30127515237336), new google.maps.LatLng (23.569995004795135, 120.3009169897557), new google.maps.LatLng (23.57019728104876, 120.30037142336369), new google.maps.LatLng (23.569796122236276, 120.30011049082282), new google.maps.LatLng (23.56912724303222, 120.29967539012432), new google.maps.LatLng (23.56897850644321, 120.30024468898773), new google.maps.LatLng (23.568870516450307, 120.30062547495368), new google.maps.LatLng (23.568806164134365, 120.30086477439409), new google.maps.LatLng (23.568736962780644, 120.30115932226181), new google.maps.LatLng (23.568712378159038, 120.3011754155159), new google.maps.LatLng (23.568670766672305, 120.30117063393595), new google.maps.LatLng (23.568631613668003, 120.30117524008756), new google.maps.LatLng (23.56858877298482, 120.30120063335903), new google.maps.LatLng (23.5685551515656, 120.30123407325755), new google.maps.LatLng (23.568531978643307, 120.30127019536508), new google.maps.LatLng (23.568518774103094, 120.30130885541439), new google.maps.LatLng (23.567667527487064, 120.30117273330688), new google.maps.LatLng (23.567627577149345, 120.30105136334896), new google.maps.LatLng (23.567605019390395, 120.30093795230391), new google.maps.LatLng (23.567582461644754, 120.30082856457238), new google.maps.LatLng (23.56754822611307, 120.30073057622917), new google.maps.LatLng (23.567524935456692, 120.30072413384914), new google.maps.LatLng (23.567490699953797, 120.30073075165751), new google.maps.LatLng (23.56744626392539, 120.30074626207352), new google.maps.LatLng (23.567394819053654, 120.30077500810626), new google.maps.LatLng (23.567361812859737, 120.30079906027322), new google.maps.LatLng (23.56731657872015, 120.30084885656834), new google.maps.LatLng (23.56728726029982, 120.30087693204882), new google.maps.LatLng (23.567264088119142, 120.30089159648423), new google.maps.LatLng (23.567212092916627, 120.30090719461441), new google.maps.LatLng (23.567173986308774, 120.30080929398537), new google.maps.LatLng (23.5670789032948, 120.30050008168223), new google.maps.LatLng (23.567051061691974, 120.30036002397537), new google.maps.LatLng (23.56704141136531, 120.30020034482482), new google.maps.LatLng (23.567044915458112, 120.30011795461178), new google.maps.LatLng (23.5670248165367, 120.30003874173167), new google.maps.LatLng (23.567008652672477, 120.30002139508724), new google.maps.LatLng (23.56695659333869, 120.30000387301448), new google.maps.LatLng (23.56687423372184, 120.29999649693968), new google.maps.LatLng (23.566722237776563, 120.30109159648418), new google.maps.LatLng (23.566558747448695, 120.3020303696394), new google.maps.LatLng (23.565682288311706, 120.30187077820301), new google.maps.LatLng (23.565620825319723, 120.30229389667511), new google.maps.LatLng (23.565534777082583, 120.30280619859695), new google.maps.LatLng (23.565875896548565, 120.30294232070446), new google.maps.LatLng (23.565963358363007, 120.30298447778227), new google.maps.LatLng (23.565983210949504, 120.30301791768079), new google.maps.LatLng (23.565987758955337, 120.30305497348309), new google.maps.LatLng (23.565941047192666, 120.30321322381496), new google.maps.LatLng (23.56549052368152, 120.30308581888676), new google.maps.LatLng (23.56537005601427, 120.30371747910976), new google.maps.LatLng (23.56528769540271, 120.30413456261158), new google.maps.LatLng (23.565300787672687, 120.3041680025101), new google.maps.LatLng (23.56617460583995, 120.304344445467), new google.maps.LatLng (23.56619814599793, 120.30431686511042), new google.maps.LatLng (23.56624897574308, 120.30394949018955), new google.maps.LatLng (23.56637638765634, 120.30327080359461), new google.maps.LatLng (23.566944731805634, 120.30336812138557), new google.maps.LatLng (23.567348539066977, 120.30345059931278), new google.maps.LatLng (23.56728830609916, 120.30367657542229), new google.maps.LatLng (23.567161079229415, 120.30447520315647), new google.maps.LatLng (23.56717416987249, 120.30450730195048), new google.maps.LatLng (23.567596231491233, 120.30458383262157)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/chao-tian/01-02.jpg',
        title: '歲次乙未年 十九下午繞境起馬',
        items: [
          {item: '農曆三月十九下午繞境起馬'},
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/chao-tian/01-02.jpg',
        title: '歲次乙未年 十九下午繞境落馬',
        items: [
          {item: '農曆三月十九下午繞境落馬'},
        ]
      }
    ];

    setMapData ('19an', lineSymbols, points, markers, 1 / 4, 'rgba(0, 130, 0, 1)');

    $('#loading').fadeOut (function () {
      $(this).hide (function () {
        $(this).remove ();
      });
    });
  }

  $map = $('<div />').appendTo ($('<div />').addClass ('map').append (Array.prototype.map.call ('1234', function (t) {return $('<i />');})).appendTo ($container));
  google.maps.event.addDomListener (window, 'load', initialize);
});