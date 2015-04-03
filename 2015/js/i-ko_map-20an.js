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
    var h = ($subItems.is (':visible') ? parseFloat ($subItems.height ()) + parseFloat ($subItems.css ('padding-top')) + parseFloat ($subItems.css ('padding-bottom')) : 0) + parseFloat ($container.css ('margin-top')) + parseFloat ($pagination.css ('margin-top')) + parseFloat ($pagination.css ('padding-top')) + parseFloat ($pagination.find ('.oa-jelly').height ());
    $container.css ({height: 'calc(100% - ' + h + 'px)'});

    var zoom = 16;
    var latLng = new google.maps.LatLng (23.569396231491233, 120.3020703338623);
    if ($(window).width () < 560) {
      zoom = 15;
      latLng = new google.maps.LatLng (23.57096231491233, 120.3010703338623);
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
      new google.maps.LatLng (23.567593773007935, 120.30457511544228), new google.maps.LatLng (23.56715634547892, 120.30449590256217), new google.maps.LatLng (23.56619894311166, 120.30433756451612), new google.maps.LatLng (23.565277797768566, 120.30415508658893), new google.maps.LatLng (23.564540301223488, 120.30401587486267), new google.maps.LatLng (23.564301207944393, 120.30396357178688), new google.maps.LatLng (23.56458658459384, 120.30230722000601), new google.maps.LatLng (23.56468904283818, 120.30179433524609), new google.maps.LatLng (23.564781852603364, 120.3017507493496), new google.maps.LatLng (23.56572777090728, 120.3019217401743), new google.maps.LatLng (23.56654829881179, 120.30206993222237), new google.maps.LatLng (23.56751079916936, 120.3022375702858), new google.maps.LatLng (23.567795368486145, 120.30228652060032), new google.maps.LatLng (23.567997578273925, 120.30232541263103), new google.maps.LatLng (23.568182761370792, 120.30236622860434), new google.maps.LatLng (23.568373475620366, 120.30242447893625), new google.maps.LatLng (23.568555584819435, 120.30251022191055), new google.maps.LatLng (23.56927167716204, 120.30284844338894), new google.maps.LatLng (23.570033180437, 120.30321791768074), new google.maps.LatLng (23.57081803431691, 120.30355922877789), new google.maps.LatLng (23.571208308384243, 120.30255742371082), new google.maps.LatLng (23.571607800322784, 120.30168369412422), new google.maps.LatLng (23.57171922341796, 120.30143147876265), new google.maps.LatLng (23.571969185829488, 120.30079923570156), new google.maps.LatLng (23.572155409605376, 120.30010990798473), new google.maps.LatLng (23.572856665744958, 120.2998685091734), new google.maps.LatLng (23.572891262346847, 120.2998469637871), new google.maps.LatLng (23.573648877860336, 120.29958821833134), new google.maps.LatLng (23.57441465787572, 120.29931262135506), new google.maps.LatLng (23.57418252109286, 120.29855950345996), new google.maps.LatLng (23.574053635337826, 120.2981376383782), new google.maps.LatLng (23.57396162502147, 120.29785122485168), new google.maps.LatLng (23.57387443311216, 120.29761478304863), new google.maps.LatLng (23.574374095001364, 120.29726944863796), new google.maps.LatLng (23.57466251503406, 120.29709032347205), new google.maps.LatLng (23.574908527745087, 120.29694606702333), new google.maps.LatLng (23.575215998338145, 120.2967555424691), new google.maps.LatLng (23.575528288258784, 120.29656067490578), new google.maps.LatLng (23.57624919295719, 120.2961328625679), new google.maps.LatLng (23.576994062196057, 120.29566615819931), new google.maps.LatLng (23.578480100576446, 120.294708609581), new google.maps.LatLng (23.57857799207941, 120.29512694647315), new google.maps.LatLng (23.578623030493297, 120.29533607106214), new google.maps.LatLng (23.57865709658257, 120.29551260173321), new google.maps.LatLng (23.578696603789382, 120.29577604105475), new google.maps.LatLng (23.578790192987046, 120.29630233685975), new google.maps.LatLng (23.57892074644088, 120.29701732099056), new google.maps.LatLng (23.57899651285281, 120.29745108058455), new google.maps.LatLng (23.579053842148763, 120.29769373278623), new google.maps.LatLng (23.579087817830768, 120.29786932976253), new google.maps.LatLng (23.579110033192105, 120.29808819293976), new google.maps.LatLng (23.57998596259476, 120.29831408133509), new google.maps.LatLng (23.581108589638035, 120.29860720038414), new google.maps.LatLng (23.582274400179443, 120.29891699552536), new google.maps.LatLng (23.58324477438364, 120.29917515814304), new google.maps.LatLng (23.58359155004889, 120.29929509928229), new google.maps.LatLng (23.58463890319448, 120.29956591467862), new google.maps.LatLng (23.585326128511507, 120.29974352331169), new google.maps.LatLng (23.585404959088265, 120.29977025768767), new google.maps.LatLng (23.585977092214094, 120.29992448470603), new google.maps.LatLng (23.58651576177891, 120.30008323016182), new google.maps.LatLng (23.586719955124806, 120.3001374571802), new google.maps.LatLng (23.586980684776794, 120.3002044246914), new google.maps.LatLng (23.58706811645977, 120.30023786458992), new google.maps.LatLng (23.587827375624364, 120.30045256018639), new google.maps.LatLng (23.587834135411434, 120.3004378080368), new google.maps.LatLng (23.58755575480104, 120.30035600066185), new google.maps.LatLng (23.58707334991666, 120.30022121965885), new google.maps.LatLng (23.586983796927694, 120.30018827488425), new google.maps.LatLng (23.586727091548365, 120.30012046139245), new google.maps.LatLng (23.586518933918516, 120.30006404728897), new google.maps.LatLng (23.585983844039063, 120.29990772089968), new google.maps.LatLng (23.585408807458084, 120.29975206506265), new google.maps.LatLng (23.5851189151072, 120.29967352273479), new google.maps.LatLng (23.584642201996942, 120.29954804174918), new google.maps.LatLng (23.583593961040783, 120.29927570982), new google.maps.LatLng (23.58325091985922, 120.29915772378445), new google.maps.LatLng (23.58227948788528, 120.29890282621386), new google.maps.LatLng (23.58160365087302, 120.2987230304957), new google.maps.LatLng (23.581114021965266, 120.29859419674881), new google.maps.LatLng (23.580350297628755, 120.29839294335852), new google.maps.LatLng (23.579981733938002, 120.29829763722432), new google.maps.LatLng (23.579118444077665, 120.29807358505741), new google.maps.LatLng (23.57908176311023, 120.29807344079018), new google.maps.LatLng (23.578892650787903, 120.2980170266867), new google.maps.LatLng (23.578773599165594, 120.29798944633012), new google.maps.LatLng (23.57864269600855, 120.29798475246434), new google.maps.LatLng (23.578522415210603, 120.29799271137722), new google.maps.LatLng (23.578394759550942, 120.29801609299193), new google.maps.LatLng (23.577861227248544, 120.29818139970303), new google.maps.LatLng (23.578038399489586, 120.29885387589934), new google.maps.LatLng (23.578411883302028, 120.30010521411896), new google.maps.LatLng (23.577884755993267, 120.30030293931964), new google.maps.LatLng (23.57772698610584, 120.30034911971097), new google.maps.LatLng (23.57768238644857, 120.30035063624382), new google.maps.LatLng (23.57794726740915, 120.30123442411423), new google.maps.LatLng (23.577187653756837, 120.30151940882206), new google.maps.LatLng (23.57691170887412, 120.30062019824982), new google.maps.LatLng (23.575974651391764, 120.30097617378237), new google.maps.LatLng (23.575016692009804, 120.30130465667253), new google.maps.LatLng (23.574246790949896, 120.30161168189056), new google.maps.LatLng (23.57347679184906, 120.30185669660568), new google.maps.LatLng (23.573101453552255, 120.30059597065451), new google.maps.LatLng (23.572872030649116, 120.29984638094902), new google.maps.LatLng (23.572138815418246, 120.30009984970093), new google.maps.LatLng (23.572087983411468, 120.3001078086138), new google.maps.LatLng (23.57204022442389, 120.30009967427259), new google.maps.LatLng (23.57128820686919, 120.2999060600996)
    ];

    var markers = [
      {
        latLng: points[0],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/chao-tian/01-02.jpg',
        title: '歲次乙未年 二十下午遊行出發',
        items: [
          {item: '農曆三月二十下午遊行出發'},
        ]
      },
      {
        latLng: points[points.length - 1],
        icon: 'img/icon/spotlight-poi_hdpi.png',
        src: 'img/site/chao-tian/01-02.jpg',
        title: '歲次乙未年 二十下午遊行出發',
        items: [
          {item: '農曆三月二十下午遊行出發'},
        ]
      }
    ];

    setMapData ('20an', lineSymbols, points, markers, 1 / 2, 'rgba(0, 130, 0, 1)');

    $('#loading').fadeOut (function () {
      $(this).hide (function () {
        $(this).remove ();
      });
    });
  }

  $map = $('<div />').appendTo ($('<div />').addClass ('map').append (Array.prototype.map.call ('1234', function (t) {return $('<i />');})).appendTo ($container));
  google.maps.event.addDomListener (window, 'load', initialize);
});