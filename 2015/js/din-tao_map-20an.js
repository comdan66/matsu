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
      ga ('send', 'event', 'din-tao_map-20an', 'close_info_window');
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
        ga ('send', 'event', 'din-tao_map-20an', 'click_marker', t.title);
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
      new google.maps.LatLng (23.567594387628766, 120.30456505715847), new google.maps.LatLng (23.567177242656555, 120.3044938909054), new google.maps.LatLng (23.567129485622374, 120.30449447374349), new google.maps.LatLng (23.566459113795833, 120.30437770993717), new google.maps.LatLng (23.566440859124423, 120.30436957559596), new google.maps.LatLng (23.566197651036756, 120.30433193695558), new google.maps.LatLng (23.566176323375803, 120.30433453145042), new google.maps.LatLng (23.565282221686637, 120.30415339462775), new google.maps.LatLng (23.56455320856034, 120.30401855707169), new google.maps.LatLng (23.564647433244243, 120.30358328094485), new google.maps.LatLng (23.5646494626261, 120.30353625457292), new google.maps.LatLng (23.56500988161549, 120.30183792114258), new google.maps.LatLng (23.566543996431655, 120.30211552977562), new google.maps.LatLng (23.566431703906833, 120.30283293297293), new google.maps.LatLng (23.566372515737058, 120.3032735735178), new google.maps.LatLng (23.566944301346144, 120.30336736311915), new google.maps.LatLng (23.56765584969732, 120.3035156428814), new google.maps.LatLng (23.567680617703015, 120.30351220240595), new google.maps.LatLng (23.56778325924684, 120.30353164842131), new google.maps.LatLng (23.567812944090047, 120.30354363064771), new google.maps.LatLng (23.568106980400117, 120.30358672142029), new google.maps.LatLng (23.568837942522357, 120.30384814908507), new google.maps.LatLng (23.56931777312747, 120.30407890677452), new google.maps.LatLng (23.56954105928993, 120.3041230755091), new google.maps.LatLng (23.569740626028807, 120.3042110055685), new google.maps.LatLng (23.570464202526566, 120.3045187013388), new google.maps.LatLng (23.570860804744644, 120.3046668056727), new google.maps.LatLng (23.571481192239975, 120.30489698052406), new google.maps.LatLng (23.571655739273744, 120.30443631112576), new google.maps.LatLng (23.571908340380133, 120.30450470745564), new google.maps.LatLng (23.57194908395867, 120.30450327863696), new google.maps.LatLng (23.571991671294317, 120.30449045042997), new google.maps.LatLng (23.572016435181002, 120.30447158725269), new google.maps.LatLng (23.57203259464362, 120.30444400689612), new google.maps.LatLng (23.57212590882681, 120.30408963561058), new google.maps.LatLng (23.57246350336232, 120.30416599085333), new google.maps.LatLng (23.57278081508801, 120.30426916818624), new google.maps.LatLng (23.572982043310432, 120.30431494116783), new google.maps.LatLng (23.57308793283711, 120.30440001358988), new google.maps.LatLng (23.573208572467934, 120.30440931360727), new google.maps.LatLng (23.573317534609686, 120.30442934246071), new google.maps.LatLng (23.573419121455412, 120.30447351119528), new google.maps.LatLng (23.573396560287012, 120.30439899218095), new google.maps.LatLng (23.573596637487917, 120.30435249209404), new google.maps.LatLng (23.57372034922479, 120.3043041246176), new google.maps.LatLng (23.573861883905543, 120.304226252842), new google.maps.LatLng (23.573975761735444, 120.3041497221709), new google.maps.LatLng (23.574033711638656, 120.30410336635123), new google.maps.LatLng (23.57409719278585, 120.3040288473369), new google.maps.LatLng (23.57413827083919, 120.30396750738623), new google.maps.LatLng (23.574468483604896, 120.30416187982564), new google.maps.LatLng (23.574920998067178, 120.30438709766872), new google.maps.LatLng (23.575243218663136, 120.30455934188376), new google.maps.LatLng (23.575287985813038, 120.30459925532341), new google.maps.LatLng (23.57531643407597, 120.30466018786433), new google.maps.LatLng (23.575327673942365, 120.30474526028638), new google.maps.LatLng (23.57531740333702, 120.30481558055885), new google.maps.LatLng (23.575304674399753, 120.30493283948908), new google.maps.LatLng (23.57529809131883, 120.30504875731481), new google.maps.LatLng (23.57531240412434, 120.30513382973686), new google.maps.LatLng (23.575331019009802, 120.30518202178496), new google.maps.LatLng (23.575371144335378, 120.3052483187439), new google.maps.LatLng (23.575413361057002, 120.30530333518982), new google.maps.LatLng (23.575474382150666, 120.30538304319384), new google.maps.LatLng (23.575497298976785, 120.30541916530137), new google.maps.LatLng (23.575512226192636, 120.30545864017017), new google.maps.LatLng (23.575520392974518, 120.30551353774081), new google.maps.LatLng (23.576015923716476, 120.30582659792913), new google.maps.LatLng (23.576141475073936, 120.30590429427639), new google.maps.LatLng (23.576218474367764, 120.30593505196589), new google.maps.LatLng (23.57637045230941, 120.30597184462567), new google.maps.LatLng (23.577020488997363, 120.30609726905823), new google.maps.LatLng (23.577093185071618, 120.30610992183688), new google.maps.LatLng (23.57764279118506, 120.30609307031636), new google.maps.LatLng (23.57828335108909, 120.30603732676514), new google.maps.LatLng (23.57958079061717, 120.30590817332268), new google.maps.LatLng (23.579758399703174, 120.30480913817883), new google.maps.LatLng (23.57977393775272, 120.30463269522193), new google.maps.LatLng (23.57976120585305, 120.30450050871377), new google.maps.LatLng (23.579342339286473, 120.30314683914185), new google.maps.LatLng (23.579166747608365, 120.30251710286143), new google.maps.LatLng (23.57869765813369, 120.30100509524345), new google.maps.LatLng (23.57859950183793, 120.30099092593196), new google.maps.LatLng (23.577204861881754, 120.301508679986), new google.maps.LatLng (23.577186600519703, 120.30152468552592), new google.maps.LatLng (23.576854114772377, 120.30165141990187), new google.maps.LatLng (23.576656835249338, 120.30172115733626), new google.maps.LatLng (23.576241380028073, 120.30188410153391), new google.maps.LatLng (23.576600732431476, 120.30299730598927), new google.maps.LatLng (23.576061922188046, 120.3027725832701), new google.maps.LatLng (23.575605111198538, 120.30257754027843), new google.maps.LatLng (23.57541599651639, 120.30248022248747), new google.maps.LatLng (23.575086756226334, 120.30282479863172), new google.maps.LatLng (23.57473547289503, 120.30323803424835), new google.maps.LatLng (23.57453204430513, 120.30255742371082), new google.maps.LatLng (23.574509482474753, 120.30254057219031), new google.maps.LatLng (23.574270585302056, 120.30262028019433), new google.maps.LatLng (23.57376021687857, 120.30279914221774), new google.maps.LatLng (23.5730109293012, 120.30307039618492), new google.maps.LatLng (23.57272821507578, 120.30212759971619), new google.maps.LatLng (23.57309100600595, 120.30199071934226), new google.maps.LatLng (23.573476791849085, 120.30185736715794), new google.maps.LatLng (23.573098816425492, 120.30059538781643), new google.maps.LatLng (23.573865214240254, 120.30032314360142), new google.maps.LatLng (23.574135198073023, 120.30124908854964), new google.maps.LatLng (23.57452159630259, 120.30251584947109), new google.maps.LatLng (23.57454451402065, 120.30253118445876), new google.maps.LatLng (23.575310110864798, 120.30221812427044), new google.maps.LatLng (23.57501405804375, 120.30130541493895), new google.maps.LatLng (23.574630118740078, 120.3000473711968), new google.maps.LatLng (23.57441465787572, 120.29932133853436), new google.maps.LatLng (23.575345142189114, 120.29898539185524), new google.maps.LatLng (23.575586851018265, 120.29971285333636), new google.maps.LatLng (23.575812840202527, 120.30041836202145), new google.maps.LatLng (23.575975881391965, 120.30097483267787), new google.maps.LatLng (23.576237255152254, 120.30187060277467), new google.maps.LatLng (23.576653502053233, 120.30170622975834), new google.maps.LatLng (23.576853938602547, 120.30163541436195), new google.maps.LatLng (23.577183527642802, 120.30151127448084), new google.maps.LatLng (23.57690960240137, 120.30062069337373), new google.maps.LatLng (23.57682496684297, 120.30033629150398), new google.maps.LatLng (23.576523385072658, 120.29936926743994), new google.maps.LatLng (23.57631741135536, 120.29865145683289), new google.maps.LatLng (23.577099154793043, 120.2984120696783), new google.maps.LatLng (23.576837520991813, 120.29758384993079), new google.maps.LatLng (23.57669230462253, 120.29709778726101), new google.maps.LatLng (23.576642085489187, 120.29694280197623), new google.maps.LatLng (23.576594939268432, 120.29682000319963), new google.maps.LatLng (23.57646666862345, 120.29653224856861), new google.maps.LatLng (23.576149721784187, 120.29596219143878), new google.maps.LatLng (23.5760982736945, 120.29587560248387), new google.maps.LatLng (23.576034533997866, 120.29578968408123), new google.maps.LatLng (23.575405986045965, 120.29510021209717), new google.maps.LatLng (23.57493047423387, 120.29454289546015), new google.maps.LatLng (23.574660493209734, 120.29423788189888), new google.maps.LatLng (23.574633014600586, 120.29423712363246), new google.maps.LatLng (23.57457910871922, 120.294275927949), new google.maps.LatLng (23.574521515326392, 120.29429528625019), new google.maps.LatLng (23.574433192514565, 120.29430458626757), new google.maps.LatLng (23.574211843378645, 120.29433846473694), new google.maps.LatLng (23.57411553092056, 120.29433100094798), new google.maps.LatLng (23.573479250222228, 120.29424659907818), new google.maps.LatLng (23.573390312909385, 120.29422170093062), new google.maps.LatLng (23.573498917206003, 120.29379598796368), new google.maps.LatLng (23.573386010738417, 120.29377846589091), new google.maps.LatLng (23.572886166359353, 120.29366724193096), new google.maps.LatLng (23.573083451547852, 120.29250785708427), new google.maps.LatLng (23.573416740737464, 120.29258957674506), new google.maps.LatLng (23.57377952924102, 120.29270013015275), new google.maps.LatLng (23.57447980428406, 120.29288806021214), new google.maps.LatLng (23.57418295765207, 120.29379531741142), new google.maps.LatLng (23.574635295109182, 120.29421441257), new google.maps.LatLng (23.574663129421936, 120.29421365430358), new google.maps.LatLng (23.5748845586652, 120.29393528740411), new google.maps.LatLng (23.575214850198794, 120.29358007013798), new google.maps.LatLng (23.575556121941787, 120.29395280947688), new google.maps.LatLng (23.576020568877848, 120.29446855187416), new google.maps.LatLng (23.576223557385998, 120.29467767646315), new google.maps.LatLng (23.576409951778363, 120.29487204890256), new google.maps.LatLng (23.576633220480836, 120.29512006552227), new google.maps.LatLng (23.576708375377226, 120.29520513794432), new google.maps.LatLng (23.576827779769093, 120.2953679944278), new google.maps.LatLng (23.576901090674124, 120.29549128832832), new google.maps.LatLng (23.576994062196057, 120.29566548764706), new google.maps.LatLng (23.576248139859963, 120.29613478651049), new google.maps.LatLng (23.575527059091378, 120.29656134545803), new google.maps.LatLng (23.575728819572888, 120.29693207314017), new google.maps.LatLng (23.57584638185506, 120.2971753958941), new google.maps.LatLng (23.575938131510252, 120.29742810637958), new google.maps.LatLng (23.576060610095336, 120.29785516045104), new google.maps.LatLng (23.57572372572924, 120.29799096286297), new google.maps.LatLng (23.575376048445452, 120.29810218682292), new google.maps.LatLng (23.57510975609353, 120.29820285737514), new google.maps.LatLng (23.575340225512576, 120.29897063970566), new google.maps.LatLng (23.574409303900996, 120.29930716922286), new google.maps.LatLng (23.574394731800293, 120.29932116310601), new google.maps.LatLng (23.57364641949034, 120.29958754777908), new google.maps.LatLng (23.573186703490972, 120.29801979660988), new google.maps.LatLng (23.573878120660765, 120.29761210083961), new google.maps.LatLng (23.573828517186072, 120.29751478304865), new google.maps.LatLng (23.573731590146657, 120.29738594930177), new google.maps.LatLng (23.573209443491344, 120.29681481420994), new google.maps.LatLng (23.57300188931888, 120.29740883579257), new google.maps.LatLng (23.572741121608047, 120.29827125370502), new google.maps.LatLng (23.572554463372665, 120.29889008572104), new google.maps.LatLng (23.5724095977048, 120.29930708150869), new google.maps.LatLng (23.572157253403812, 120.30009984970093), new google.maps.LatLng (23.571966292580584, 120.30079713633063), new google.maps.LatLng (23.571704037859188, 120.30146894197469), new google.maps.LatLng (23.571592360419444, 120.30171092362411), new google.maps.LatLng (23.571433973160616, 120.30206756970892), new google.maps.LatLng (23.57120462076069, 120.30256815254688), new google.maps.LatLng (23.570823565768485, 120.30356056988239), new google.maps.LatLng (23.57003643425521, 120.30322185328009), new google.maps.LatLng (23.56926860409709, 120.30284978449345), new google.maps.LatLng (23.569653965879418, 120.3018157929182), new google.maps.LatLng (23.569113106917374, 120.30158177018166), new google.maps.LatLng (23.56899159541896, 120.30153004994395), new google.maps.LatLng (23.568819070857387, 120.30144010822778), new google.maps.LatLng (23.568839535453147, 120.30136693031795), new google.maps.LatLng (23.568835233148064, 120.30128713459976), new google.maps.LatLng (23.568796694682767, 120.30122066221247), new google.maps.LatLng (23.56873020201016, 120.30117876827717), new google.maps.LatLng (23.5686726105061, 120.30116594007018), new google.maps.LatLng (23.56860070043971, 120.30119410326483), new google.maps.LatLng (23.56854741129212, 120.30124028365617), new google.maps.LatLng (23.568519388719587, 120.30130751430988), new google.maps.LatLng (23.567955352088486, 120.30121958425048), new google.maps.LatLng (23.567659288287157, 120.30117121677404), new google.maps.LatLng (23.567233538756685, 120.30113558979042), new google.maps.LatLng (23.567183937831853, 120.30113885483752), new google.maps.LatLng (23.566723467026367, 120.30108958482742), new google.maps.LatLng (23.56655075731467, 120.30207060277462), new google.maps.LatLng (23.566925862493022, 120.30214159359934), new google.maps.LatLng (23.567512643033037, 120.3022375702858), new google.maps.LatLng (23.567559537532343, 120.30240847339633), new google.maps.LatLng (23.567595368804835, 120.30251366238599), new google.maps.LatLng (23.567612761419262, 120.30262086303242), new google.maps.LatLng (23.56762831015615, 120.30273208699236), new google.maps.LatLng (23.56763126487337, 120.30298791825771), new google.maps.LatLng (23.567721182663103, 120.30299520661833), new google.maps.LatLng (23.567767710588253, 120.3035156428814), new google.maps.LatLng (23.567765435211072, 120.30354438891413), new google.maps.LatLng (23.567679205275816, 120.30352838337421), new google.maps.LatLng (23.567657876723747, 120.30358529260161), new google.maps.LatLng (23.567640850532563, 120.30360666255956), new google.maps.LatLng (23.56760600035086, 120.30361864478596), new google.maps.LatLng (23.567514605048, 120.30362794480334), new google.maps.LatLng (23.567460087043745, 120.30362852764142), new google.maps.LatLng (23.567409871410273, 120.30363581600204), new google.maps.LatLng (23.567285416441422, 120.30368185212615), new google.maps.LatLng (23.567298754677207, 120.30362896621227), new google.maps.LatLng (23.56710656124277, 120.30363290181162), new google.maps.LatLng (23.56697644468391, 120.3036133680821), new google.maps.LatLng (23.566849401216825, 120.30357774109848), new google.maps.LatLng (23.56679734194117, 120.30356290123473), new google.maps.LatLng (23.566750814307614, 120.3035259331466), new google.maps.LatLng (23.566694452692726, 120.3034842711927), new google.maps.LatLng (23.566654685978712, 120.30346607856768), new google.maps.LatLng (23.566610375995253, 120.30345931649208), new google.maps.LatLng (23.566584561724518, 120.30348546802998), new google.maps.LatLng (23.566568765462595, 120.303565176034), new google.maps.LatLng (23.566420026097532, 120.30437922647002), new google.maps.LatLng (23.566196117799723, 120.3043457865715), new google.maps.LatLng (23.566079338547123, 120.30502505600452), new google.maps.LatLng (23.565970733749438, 120.30498875846865), new google.maps.LatLng (23.565847377849387, 120.30494910817151), new google.maps.LatLng (23.56579962134409, 120.304932256651), new google.maps.LatLng (23.56539845244821, 120.3048543848754), new google.maps.LatLng (23.565180749456804, 120.30482657253742), new google.maps.LatLng (23.565276817106984, 120.30417470803263), new google.maps.LatLng (23.56535653412638, 120.3037691116333), new google.maps.LatLng (23.564635569632436, 120.30355721712112), new google.maps.LatLng (23.564538642808117, 120.30401712825301), new google.maps.LatLng (23.564541901547525, 120.3040378276587), new google.maps.LatLng (23.56436820327727, 120.30492581427097), new google.maps.LatLng (23.56514159868775, 120.30504776706698), new google.maps.LatLng (23.565517938223994, 120.3051449094296), new google.maps.LatLng (23.5660399433367, 120.30523601682194), new google.maps.LatLng (23.566472825226633, 120.30533651194582), new google.maps.LatLng (23.56656397394314, 120.30534715306771), new google.maps.LatLng (23.56670183403574, 120.30538059296623), new google.maps.LatLng (23.566988984716772, 120.30543275177479), new google.maps.LatLng (23.56715818968353, 120.30450461974146), new google.maps.LatLng (23.567591929145415, 120.3045804798603)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/din-tao/an-start.jpg',
        title: '歲次乙未年 二十下午繞境起馬',
        items: [
          {item: '農曆二十下午繞境起馬'},
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/din-tao/an-end.jpg',
        title: '歲次乙未年 二十下午繞境落馬',
        items: [
          {item: '農曆二十下午繞境落馬'},
        ]
      },
      {
        latLng: new google.maps.LatLng (23.57869765813369, 120.30099838972092),
        icon: 'img/icon/spotlight-ad.png',
        src: 'img/site/din-tao/20an-01.jpg',
        title: '富成菸酒 炮讚',
        items: [
          {item: '地點：公園路、文人路交叉路口'},
          {item: '時間：約下午２點正式開始'},
        ]
      },
      {
        latLng: new google.maps.LatLng (23.57541520480969, 120.30248366296291),
        icon: 'img/icon/spotlight-ad.png',
        src: 'img/site/din-tao/20an-02.jpg',
        title: '世界迎媽祖',
        items: [
          {item: '地點：北港鎮公所'},
          {item: '時間：約下午２點正式開始'},
        ]
      },
      {
        latLng: new google.maps.LatLng (23.579331891666722, 120.30312739312649),
        icon: 'img/icon/spotlight-ad.png',
        src: 'img/site/din-tao/20an-03.jpg',
        title: '北港保安會',
        items: [
          {item: '地點：北辰路、文人路交叉路口'},
          {item: '時間：約下午２點正式開始'},
        ]
      },
      {
        latLng: new google.maps.LatLng (23.569534731254187, 120.30412584543228),
        icon: 'img/icon/spotlight-ad.png',
        src: 'img/site/din-tao/20an-04.jpg',
        title: '好住民宿前十字路口',
        items: [
          {item: '地點：公民路、博愛路交叉路口(好住民宿)'}
        ]
      },
      {
        latLng: new google.maps.LatLng (23.56488203790543, 120.30238509178162),
        icon: 'img/icon/spotlight-ad.png',
        src: 'img/site/din-tao/20an-05.jpg',
        title: '民生路橋下',
        items: [
          {item: '地點：民生路橋下'}
        ]
      },
      {
        latLng: new google.maps.LatLng (23.571552486126855, 120.30180841684341),
        icon: 'img/icon/spotlight-ad.png',
        src: 'img/site/din-tao/20an-06.jpg',
        title: '彰化囝仔炮場',
        items: [
          {item: '地點：大同路、新民路交叉路口'},
          {item: '時間：約下午６點正式開始'},
        ]
      },
      {
        latLng: new google.maps.LatLng (23.568682876607042, 120.30134841799736),
        icon: 'img/icon/spotlight-ad.png',
        src: 'img/site/din-tao/20an-07.jpg',
        title: '嘉北會炮場',
        items: [
          {item: '地點：文化路、民主路交叉路口(北港圓環)'}
        ]
      },
      {
        latLng: new google.maps.LatLng (23.564547676844693, 120.30401788651943),
        icon: 'img/icon/spotlight-ad.png',
        src: 'img/site/din-tao/20an-08.jpg',
        title: '麻吉家族炮場',
        items: [
          {item: '地點：北港中山路尾(聖保羅麵包店門口)'},
          {item: '時間：約下午２點正式開始(20下午出廟)'},
        ]
      }
    ];

    setMapData ('20an', lineSymbols, points, markers, 1 / 4, 'rgba(0, 130, 0, 1)');

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