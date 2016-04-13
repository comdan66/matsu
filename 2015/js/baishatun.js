/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

window.location.replace ('http://mazu.ioa.tw/maps/dintao/');
$(function () {
  var $subItems = $('#sub_items');
  var $container = $('#container');
  var $pagination = $('#pagination');
  var map = null;
  var $map = $('#map');
  var myMarker = null;

  function circlePath (r) {
    return 'M 0 0 m -' + r + ', 0 '+
           'a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 ' +
           'a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0';
  }
  function myPositionPath (r) {
    return 'M 0 0 m -' + r + ', 0 '+
           'a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 ' +
           'a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0' +
           'M -' + (r + r / 2) + ' 0 L -' + (r / 2) + ' 0' +
           'M 0 -' + (r + r / 2) + ' L 0 -' + (r / 2) +
           'M ' + (r + r / 2) + ' 0 L ' + (r / 2) + ' 0' +
           'M 0 ' + (r + r / 2) + ' L 0 ' + (r / 2);
  }

  function calculateLength (points) {
    var size = Math.pow (10, 2);
    if (google.maps.geometry.spherical)
      $container.find ('.map .d').addClass ('show').find ('span').text (Math.round (google.maps.geometry.spherical.computeLength (points) / 1000 * size) / size);
  }

  function initialize () {
    var h = ($subItems.is (':visible') ? parseFloat ($subItems.height ()) + parseFloat ($subItems.css ('padding-top')) + parseFloat ($subItems.css ('padding-bottom')) : -50) + parseFloat ($container.css ('margin-top')) + parseFloat ($pagination.css ('margin-top')) + parseFloat ($pagination.css ('padding-top')) + parseFloat ($pagination.find ('.oa-jelly').height ());
    $container.css ({height: 'calc(100% - ' + h + 'px)'});
    
    var points = [
      new google.maps.LatLng (24.57144431437989, 120.70921048521996), new google.maps.LatLng (24.570175253042898, 120.7111906260252), new google.maps.LatLng (24.569811193767727, 120.7109866904259), new google.maps.LatLng (24.568968992535435, 120.7117760181427), new google.maps.LatLng (24.563857807445057, 120.70979788899422), new google.maps.LatLng (24.550237562469945, 120.69946324994567), new google.maps.LatLng (24.501680083258847, 120.68665561418538), new google.maps.LatLng (24.491729278345346, 120.6793925995828), new google.maps.LatLng (24.489179421964025, 120.67819140851498), new google.maps.LatLng (24.49083191147292, 120.67448526620865), new google.maps.LatLng (24.478552150573112, 120.6634677418233), new google.maps.LatLng (24.46354484185061, 120.65489834716323), new google.maps.LatLng (24.45953527335248, 120.64843699336052), new google.maps.LatLng (24.451309724159547, 120.6455904113293), new google.maps.LatLng (24.441964466705077, 120.63951663672924), new google.maps.LatLng (24.431867450292433, 120.63124511153705), new google.maps.LatLng (24.424019389428295, 120.62025904655457), new google.maps.LatLng (24.406266079529505, 120.61406506767275), new google.maps.LatLng (24.39170033719508, 120.60267448425293), new google.maps.LatLng (24.38797287476596, 120.59530762176519), new google.maps.LatLng (24.37737492031844, 120.59147357940674), new google.maps.LatLng (24.36982818447626, 120.58590187301638), new google.maps.LatLng (24.35751373267465, 120.5848075317383), new google.maps.LatLng (24.343870953640224, 120.57233333587646), new google.maps.LatLng (24.325121283177246, 120.56714057922363), new google.maps.LatLng (24.31782567259947, 120.56510938873294), new google.maps.LatLng (24.312680676372064, 120.5601170394898), new google.maps.LatLng (24.30108201904032, 120.55430929870613), new google.maps.LatLng (24.2768951108069, 120.54787158966064), new google.maps.LatLng (24.198043261143937, 120.51366806030273), new google.maps.LatLng (24.163865491394553, 120.4876184463501), new google.maps.LatLng (24.145500459582383, 120.46877861022949), new google.maps.LatLng (24.125252792858713, 120.45912265777588), new google.maps.LatLng (24.106294625679357, 120.45650482177734), new google.maps.LatLng (24.08482620489528, 120.44534683227539), new google.maps.LatLng (24.069441923617706, 120.43783463537693), new google.maps.LatLng (24.075468760773816, 120.41779786348343), new google.maps.LatLng (24.064865281004096, 120.41358076035976), new google.maps.LatLng (24.056734067113563, 120.41841745376587), new google.maps.LatLng (24.037417920031288, 120.421322286129), new google.maps.LatLng (24.022300506742692, 120.40679275989532), new google.maps.LatLng (24.006371527431888, 120.37240080535412), new google.maps.LatLng (23.984331329573003, 120.35505294799805), new google.maps.LatLng (23.95725405550403, 120.34254044294357), new google.maps.LatLng (23.95113710779899, 120.33299446105957), new google.maps.LatLng (23.931399363981605, 120.32166212797165), new google.maps.LatLng (23.92282942681212, 120.32205171883106), new google.maps.LatLng (23.91815623621169, 120.31307503581047), new google.maps.LatLng (23.87305715000206, 120.29409304261208), new google.maps.LatLng (23.856295941673668, 120.29613688588142), new google.maps.LatLng (23.788172232292926, 120.27580171823502), new google.maps.LatLng (23.789168689075748, 120.27104884386063), new google.maps.LatLng (23.754278338068122, 120.26162624359131), new google.maps.LatLng (23.747443505408917, 120.26278495788574), new google.maps.LatLng (23.740844016246353, 120.25566101074219), new google.maps.LatLng (23.72084709463705, 120.25334358215332), new google.maps.LatLng (23.703872841281502, 120.24965286254883), new google.maps.LatLng (23.69805707992298, 120.25428771972656), new google.maps.LatLng (23.684066754924675, 120.25385856628418), new google.maps.LatLng (23.664336278370822, 120.26012420654297), new google.maps.LatLng (23.656867791164853, 120.27368545532227), new google.maps.LatLng (23.650971315786894, 120.31299591064453), new google.maps.LatLng (23.578639274078864, 120.29786825180054), new google.maps.LatLng (23.572162170199544, 120.30009314417839), new google.maps.LatLng (23.57120462076069, 120.30253998935223), new google.maps.LatLng (23.569664594750765, 120.30181101133826), new google.maps.LatLng (23.568705617387305, 120.30138663947582), new google.maps.LatLng (23.568391548425215, 120.30242867767811), new google.maps.LatLng (23.565012340147163, 120.30179634690285), new google.maps.LatLng (23.564547062209638, 120.30401922762394), new google.maps.LatLng (23.567818109420084, 120.30461870133877), new google.maps.LatLng (23.56845749550008, 120.30453211238387), new google.maps.LatLng (23.56965765354652, 120.30182719230652), new google.maps.LatLng (23.571196197962653, 120.30256471207144), new google.maps.LatLng (23.57413932175518, 120.30396424233913), new google.maps.LatLng (23.575310288131575, 120.30221803655627), new google.maps.LatLng (23.57861100389562, 120.30098497867584), new google.maps.LatLng (23.583566967874315, 120.29948821833136), new google.maps.LatLng (23.587921398086053, 120.30509948730469), new google.maps.LatLng (23.5892268118454, 120.30786609818938), new google.maps.LatLng (23.590175458894908, 120.30745580792427), new google.maps.LatLng (23.589302395886104, 120.30803708901408), new google.maps.LatLng (23.59730118266522, 120.32599925994873), new google.maps.LatLng (23.63166832785104, 120.33567667007446), new google.maps.LatLng (23.65663193725316, 120.35584688186646), new google.maps.LatLng (23.672392166727878, 120.39518608322146), new google.maps.LatLng (23.679154066198212, 120.39543628692627), new google.maps.LatLng (23.680883353699482, 120.40519952774048), new google.maps.LatLng (23.679743598599696, 120.40934085845947), new google.maps.LatLng (23.682534015870456, 120.41410446166992), new google.maps.LatLng (23.67862348476249, 120.43646335601807), new google.maps.LatLng (23.684558013636053, 120.44487476348877), new google.maps.LatLng (23.683732697945576, 120.44835090637207), new google.maps.LatLng (23.684558013636053, 120.44498205184937), new google.maps.LatLng (23.690354726890316, 120.44339418411255), new google.maps.LatLng (23.69110140345068, 120.43938159942627), new google.maps.LatLng (23.704501556716366, 120.42985439300537), new google.maps.LatLng (23.707527207379716, 120.43238639831543), new google.maps.LatLng (23.712419182420128, 120.42972564697266), new google.maps.LatLng (23.713183609399636, 120.43035520782473), new google.maps.LatLng (23.717075229225436, 120.4241681098938), new google.maps.LatLng (23.72208471420262, 120.4228162765503), new google.maps.LatLng (23.724383119372135, 120.40929794311523), new google.maps.LatLng (23.731295956739554, 120.4093481468201), new google.maps.LatLng (23.743633126867223, 120.41401863098145), new google.maps.LatLng (23.74276890179262, 120.4222583770752), new google.maps.LatLng (23.76828076813426, 120.44172048568726), new google.maps.LatLng (23.788918348435036, 120.44811487197876), new google.maps.LatLng (23.78970372922071, 120.45347929000854), new google.maps.LatLng (23.79248996505959, 120.45541776885989), new google.maps.LatLng (23.793277151871397, 120.45946598052979), new google.maps.LatLng (23.796536341791896, 120.45938014984131), new google.maps.LatLng (23.797675075624724, 120.4665470123291), new google.maps.LatLng (23.802681459413872, 120.4645299911499), new google.maps.LatLng (23.80484101638192, 120.45931577682495), new google.maps.LatLng (23.826729044000682, 120.46371459960938), new google.maps.LatLng (23.846727449167425, 120.45771373977664), new google.maps.LatLng (23.87284866770525, 120.45886516571045), new google.maps.LatLng (23.891674491364345, 120.45930504798889), new google.maps.LatLng (23.891157038555114, 120.46343833208084), new google.maps.LatLng (23.892120823404223, 120.45801758766174), new google.maps.LatLng (23.892086490225058, 120.45943915843964), new google.maps.LatLng (23.937466991551705, 120.48311233520508), new google.maps.LatLng (23.952290927316422, 120.48041595687869), new google.maps.LatLng (23.958881597606492, 120.48018336296082), new google.maps.LatLng (23.958450202905585, 120.48123747110367), new google.maps.LatLng (23.959058076840865, 120.4801619052887), new google.maps.LatLng (23.963509195424848, 120.48008680343628), new google.maps.LatLng (23.963862140983025, 120.47922849655151), new google.maps.LatLng (23.96546999185269, 120.48007607460022), new google.maps.LatLng (23.98922267042893, 120.47839164733887), new google.maps.LatLng (23.993623738152046, 120.47654628753662), new google.maps.LatLng (23.997779619430954, 120.47671794891357), new google.maps.LatLng (24.016322623825516, 120.48849821090698), new google.maps.LatLng (24.02570871597318, 120.49268974533084), new google.maps.LatLng (24.06368726657172, 120.52034139633179), new google.maps.LatLng (24.06538203652082, 120.52508354187012), new google.maps.LatLng (24.067801698168022, 120.52544832229614), new google.maps.LatLng (24.07362045470214, 120.53176760673523), new google.maps.LatLng (24.07863369022617, 120.54032577743533), new google.maps.LatLng (24.078312492020327, 120.54466366767883), new google.maps.LatLng (24.083043537424622, 120.54723858833313), new google.maps.LatLng (24.083063127311767, 120.5454683303833), new google.maps.LatLng (24.084316873862036, 120.55052161216736), new google.maps.LatLng (24.0841209767719, 120.55290341377258), new google.maps.LatLng (24.088499205303975, 120.56540250778198), new google.maps.LatLng (24.097010366950414, 120.5710780620575), new google.maps.LatLng (24.100261892785646, 120.57990789413452), new google.maps.LatLng (24.111886401862783, 120.58424234390259), new google.maps.LatLng (24.116428079700718, 120.58306946029666), new google.maps.LatLng (24.1233140183168, 120.5643081665039), new google.maps.LatLng (24.128873590576, 120.55551780929568), new google.maps.LatLng (24.142482962815432, 120.54828657379153), new google.maps.LatLng (24.15315614018325, 120.54465293884277), new google.maps.LatLng (24.16308238828037, 120.54295778274536), new google.maps.LatLng (24.182560652024364, 120.54551124572754), new google.maps.LatLng (24.197564962782128, 120.5466652661562), new google.maps.LatLng (24.220462553289625, 120.55575996637344), new google.maps.LatLng (24.23461370146345, 120.55887132883072), new google.maps.LatLng (24.246918087992533, 120.56289732456207), new google.maps.LatLng (24.253979549344617, 120.56807734072208), new google.maps.LatLng (24.268696697627814, 120.5753830075264), new google.maps.LatLng (24.268276737825666, 120.57665638625622), new google.maps.LatLng (24.268954052221073, 120.57694338262081), new google.maps.LatLng (24.26882445804921, 120.5777058005333), new google.maps.LatLng (24.270940127500747, 120.57853326201439), new google.maps.LatLng (24.27081725947843, 120.57907775044441), new google.maps.LatLng (24.271541017659867, 120.57883702218533), new google.maps.LatLng (24.27226049277959, 120.57676903903484), new google.maps.LatLng (24.275587018913953, 120.57725317776203), new google.maps.LatLng (24.28114264902557, 120.58140724897385), new google.maps.LatLng (24.294089765280184, 120.58929093182087), new google.maps.LatLng (24.30060041341203, 120.59529908001423), new google.maps.LatLng (24.30375202649812, 120.60069233179092), new google.maps.LatLng (24.32700077437785, 120.60856997966766), new google.maps.LatLng (24.338375500575605, 120.6178779155016), new google.maps.LatLng (24.352608813329237, 120.62894806265831), new google.maps.LatLng (24.360309457080223, 120.63720993697643), new google.maps.LatLng (24.381434034699755, 120.65148197114468), new google.maps.LatLng (24.395650290174608, 120.64829282462597), new google.maps.LatLng (24.40177345027265, 120.64181193709373), new google.maps.LatLng (24.404308853615515, 120.64167782664299), new google.maps.LatLng (24.404462734838923, 120.6422370672226), new google.maps.LatLng (24.403933309366472, 120.64314633607864), new google.maps.LatLng (24.405416549984746, 120.64404085278511), new google.maps.LatLng (24.40615846907629, 120.64246907830238), new google.maps.LatLng (24.428024499747572, 120.64398050308228), new google.maps.LatLng (24.436366443189264, 120.64932346343994), new google.maps.LatLng (24.438317657856736, 120.64941658248904), new google.maps.LatLng (24.44136743743417, 120.65091133117676), new google.maps.LatLng (24.443066948908672, 120.65254211425781), new google.maps.LatLng (24.442852069412854, 120.65325021743774), new google.maps.LatLng (24.44378972270636, 120.65400123596191), new google.maps.LatLng (24.444492958099282, 120.65222024917603), new google.maps.LatLng (24.446211961431334, 120.65303564071655), new google.maps.LatLng (24.447677002583887, 120.65518140792847), new google.maps.LatLng (24.448319284189914, 120.65443767776492), new google.maps.LatLng (24.448356019906893, 120.65549639205938), new google.maps.LatLng (24.458869354849778, 120.6627345085144), new google.maps.LatLng (24.47037319709557, 120.66679000854492), new google.maps.LatLng (24.47474789690073, 120.67251920700073), new google.maps.LatLng (24.47937632000271, 120.67554473876953), new google.maps.LatLng (24.484688055715942, 120.67605972290039), new google.maps.LatLng (24.486562732429373, 120.67829132080078), new google.maps.LatLng (24.488456908651653, 120.67829132080078), new google.maps.LatLng (24.487949194111614, 120.68005084991455), new google.maps.LatLng (24.49017531188927, 120.68103790283203), new google.maps.LatLng (24.49052680056856, 120.6796646118164), new google.maps.LatLng (24.49170208370669, 120.67943528294563), new google.maps.LatLng (24.501668970696887, 120.68668194115162), new google.maps.LatLng (24.55018995913716, 120.69959208369255), new google.maps.LatLng (24.563838291722547, 120.70994809269905), new google.maps.LatLng (24.564786630350014, 120.70822276175022), new google.maps.LatLng (24.56919646317568, 120.71149706840515), new google.maps.LatLng (24.569811180695492, 120.71096934378147), new google.maps.LatLng (24.570169168047627, 120.71117444505694), new google.maps.LatLng (24.571424799838656, 120.70918835699558)
    ];
    map = new google.maps.Map ($map.get (0), {
        zoom: 16,
        scaleControl: true,
        navigationControl: false,
        mapTypeControl: false,
        zoomControl: true,
        scrollwheel: true,
        streetViewControl: false,
        center: points[points.length - 1]
      });
    points.forEach (function (t, i) {
      new google.maps.Marker ({
          map: map,
          draggable: false,
          zIndex: t.id,
          optimized: false,
          position: t,
          icon: i == points.length - 1 ? 'img/icon/mon.png' : {
            path: circlePath (6),
            strokeColor: 'rgba(255, 68, 170, 1)',
            strokeWeight: 1,
            fillColor: 'rgba(255, 68, 170, 1)',
            fillOpacity: 0.5
          }
        });
    });

    new google.maps.Polyline ({
      map: map,
      strokeColor: 'rgba(255, 68, 170, .5)',
      strokeWeight: 5,
      path: points
    });

    $('.map .my').click (function () {
      navigator.geolocation.getCurrentPosition (function (location) {
        if (!myMarker)
          myMarker = new google.maps.Marker ({
              map: map,
              draggable: false,
              optimized: false,
            });

        myMarker.setPosition (new google.maps.LatLng (location.coords.latitude, location.coords.longitude));
        myMarker.setIcon ({
                path: myPositionPath (30),
                strokeColor: 'rgba(174, 129, 255, .8)',
                strokeWeight: 3,
                fillColor: 'rgba(174, 129, 255, .5)',
                fillOpacity: 0.2
              });
        map.setCenter (new google.maps.LatLng (location.coords.latitude, location.coords.longitude));
      });
    }).OAjelly ();

    $('.map .mazu').click (function () {
      map.setCenter (points[points.length - 1]);
    }).OAjelly ();

    setTimeout (calculateLength.bind (this, points), 1800);

    $('#loading').fadeOut (function () { $(this).hide (function () { $(this).remove (); }); });
  }

  google.maps.event.addDomListener (window, 'load', initialize);
});