/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var $map = $('#map');
  
  var $subItems = $('#sub_items');
  var $container = $('#container');
  var $pagination = $('#pagination');
  
  var map = null;
  
  function initialize () {
    var datas = [
    {
      t: '旅遊文章',
      vs: [
        {p: false, t: '[雲記] 發揚在地工藝‧北港工藝坊', h: 'http://piecece.pixnet.net/blog/post/109294934', d: '走在充滿老屋的北港歷史街區，在甕牆後方，往門縫內看去，可以看到一個可愛的玩偶。', s: 'img/site/food/01-01.jpg', l: new google.maps.LatLng (23.566748052020262, 120.30353240668774)},
        {p: false, t: '[雲記] 木工與藝術的遇見‧北港春生活博物館', h: 'http://piecece.pixnet.net/blog/post/108923950', d: '這天，和朋友相約來北港走跳。從網路上得知，北港這兒有個「北港春生活博物館」，在好奇心驅使下，來到這兒一探究竟。', s: 'img/site/food/01-02.jpg', l: new google.maps.LatLng (23.59144749901999, 120.29296986758709)},
        {p: false, t: '[雲記] 北港振興戲院．日興堂餅鋪看布袋戲', h: 'http://woxko.pixnet.net/blog/post/40952869', d: '對於布袋戲完全陌生的我，跟著「親親小旅行，讓我們看雲去」的雲林北港行程，前往振興戲院欣賞「黃世志電視木偶劇團」的布袋戲。說是欣賞，但對布袋戲我來說是認識一個新的領域。', s: 'img/site/food/01-02.jpg', l: new google.maps.LatLng (23.565054749811168, 120.3041285276413)}
      ]
    },
    {
      t: '美食文章',
      vs: [
        {p: true, t: '[食記] 北港 小籠湯包', h: 'https://www.ptt.cc/bbs/Yunlin/M.1296565841.A.4BC.html'},
        {p: true, t: '[食記] 雲林北港 福安鴨肉飯', h: 'http://douglas82328.pixnet.net/blog/post/109564667'},
        {p: true, t: '[食記] 雲林北港。老受鴨肉飯', h: 'http://windko0813.pixnet.net/blog/post/107795083'},
        {p: true, t: '[食記] 雲林北港 北港圓仔湯', h: 'http://sam76227.pixnet.net/blog/post/106376858'},
        {p: true, t: '[食記] 北港小吃一條龍~', h: 'http://anise.pixnet.net/blog/post/29995793'},
        {p: false, t: '[食記] 北港的阿等土豆油飯(便宜好吃)', h: 'http://alisa0415.pixnet.net/blog/post/42004303'},
        {p: false, t: '[食記] 北港橋頭香菇肉羹', h: 'http://alisa0415.pixnet.net/blog/post/42004306'},
        {p: true, t: '[食記] 北港的阿不倒(+2015北港燈會)', h: 'http://alisa0415.pixnet.net/blog/post/42097768'},
        {p: false, t: '[食記] 北港武德宮之樂咖啡-財神爺廟裡喝咖啡', h: 'http://alisa0415.pixnet.net/blog/post/42026104'},
        {p: true, t: '[食記] 北港的一郎', h: 'http://alisa0415.pixnet.net/blog/post/40724839'},
        {p: false, t: '[食記] 雲林北港．九久醇義麵坊', h: 'http://blog.yam.com/larle/article/87603574'},
        {p: false, t: '[食記] 雲林北港．秋月生炒鱔魚', h: 'http://blog.yam.com/larle/article/85381339'},
        {p: true, t: '[食記] 北港鎮 煎盤粿(美味銅板美食)', h: 'http://babbitwang.pixnet.net/blog/post/108226570'},
        {p: true, t: '[食記] 北港鎮 廟邊假魚肚(30元,超特別美食)', h: 'http://babbitwang.pixnet.net/blog/post/108226990'},
        {p: false, t: '[食記] 北港 阿豐麵線糊油飯', h: 'http://woxko.pixnet.net/blog/post/40952866'},
        {p: true, t: '[食記] 北港圓環邊紅燒青蛙', h: 'http://thudadai.pixnet.net/blog/post/52867036'},
        {p: true, t: '[食記] 北港圓環邊的香菇魯肉飯', h: 'https://www.ptt.cc/bbs/Yunlin/M.1236278986.A.440.html'}
      ]
    },
    {
      t: '住宿文章',
      vs: [
        {p: false, t: '[心得] 雲林北港 笨港客棧(1200元/雙人房)', h: 'http://babbitwang.pixnet.net/blog/post/108226279'},
        {p: false, t: '[雲記] 北港 金山商務旅館 住宿心得', h: 'http://thudadai.pixnet.net/blog/post/59263852'}
      ]
    },
    {
      t: '其他文章',
      vs: [
        {p: false, t: '[問題] 北港名產買哪家', h: 'https://www.ptt.cc/bbs/Yunlin/M.1426173181.A.775.html'},
        {p: false, t: '[食記] 北港鴨肉飯 (老受.福安比較)', h: 'http://yaoching2003043.pixnet.net/blog/post/29569910'}
      ]
    }
  ];
    //   {
    //     t: '旅遊文章',
    //     vs: [
    //       {p: false, t: '[雲記] 發揚在地工藝‧北港工藝坊', h: 'http://piecece.pixnet.net/blog/post/109294934', d: 'asdasdqw五ㄑㄨㄛㄊㄨㄛdasdsadad', s: 'img/site/chao-tian/01-02.jpg', l: new google.maps.LatLng (23.569396231491233, 120.3030703338623)},
    //       {p: false, t: '[遊記] 按著地圖尋寶趣‧北港歷史街區', h: 'http://piecece.pixnet.net/blog/post/109144865', d: 'asdasdqw五ㄑㄨㄛㄊㄨㄛdasdsadad', s: 'img/site/chao-tian/01-02.jpg', l: new google.maps.LatLng (23.566175588286335, 120.30432415347104)},
    //       {p: false, t: '[雲記] 木工與藝術的遇見‧北港春生活博物館', h: 'http://piecece.pixnet.net/blog/post/108923950', d: 'asdasdqw五ㄑㄨㄛㄊㄨㄛdasdsadad', s: 'img/site/chao-tian/01-02.jpg', l: new google.maps.LatLng (23.565304227961857, 120.30415106327541)},
    //       {p: false, t: '[雲記] 北港振興戲院．日興堂餅鋪看布袋戲', h: 'http://woxko.pixnet.net/blog/post/40952869', d: 'asdasdqw五ㄑㄨㄛㄊㄨㄛdasdsadad', s: 'img/site/chao-tian/01-02.jpg', l: new google.maps.LatLng (23.565260159465005, 120.30415231666575)}
    //     ]
    //   },
    //   {
    //     t: '美食文章',
    //     vs: [
    //       {p: true, t: '[食記] 北港 小籠湯包', h: 'https://www.ptt.cc/bbs/Yunlin/M.1296565841.A.4BC.html', d: 'asdasdqw五ㄑㄨㄛㄊㄨㄛdasdsadad', s: 'img/site/chao-tian/01-02.jpg', l: new google.maps.LatLng (23.564545403870195, 120.30401981046202)},
    //       {p: true, t: '[食記] 雲林北港 福安鴨肉飯', h: 'http://douglas82328.pixnet.net/blog/post/109564667', d: 'asdasdqw五ㄑㄨㄛㄊㄨㄛdasdsadad', s: 'img/site/chao-tian/01-02.jpg', l: new google.maps.LatLng (23.564368817913188, 120.30492581427097)},
    //       {p: true, t: '[食記] 雲林北港。老受鴨肉飯', h: 'http://windko0813.pixnet.net/blog/post/107795083', d: 'asdasdqw五ㄑㄨㄛㄊㄨㄛdasdsadad', s: 'img/site/chao-tian/01-02.jpg', l: new google.maps.LatLng (23.565146944685694, 120.3050485253334)},
    //       {p: true, t: '[食記] 雲林北港 北港圓仔湯', h: 'http://sam76227.pixnet.net/blog/post/106376858', d: 'asdasdqw五ㄑㄨㄛㄊㄨㄛdasdsadad', s: 'img/site/chao-tian/01-02.jpg', l: new google.maps.LatLng (23.5652243883303, 120.3045603632927)},
    //     ]
    //   },
    // ];
    var references = [
      "以上參考<a href='https://www.ptt.cc/bbs/Yunlin/index.html' target='_blank' title='Ptt 雲林版文章'>PTT雲林版文章</a>若文章如有不妥或違法等問題，歡迎<a href='mailto:comdan66@gmail.com?subject=關於北港美食推薦..&body=Hi OA,%0d%0a%0d%0a    關於北港美食推薦..'>來信</a>告知。",
      '2015.03.26'
    ];
    var $menu = $('<div />').addClass ('m').insertAfter ($map);
    var infos = [];
    var zoom = 16;
    var latLng = new google.maps.LatLng (23.569396231491233, 120.3030703338623);

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

    $menu.append (datas.map (function (t) {
      return $('<div />').addClass ('t').text (t.t).add ($('<div />').addClass ('is').append (t.vs.map (function (t) {
        var marker = new google.maps.Marker ({
          draggable: false,
          position: t.l,
        });
        
        var infoWindow = new InfoBubble ({
          margin: 0, padding: 0, content: '', arrowStyle: 0,
          borderWidth: 1, shadowStyle: 1, borderRadius: 2, minWidth: 'auto',
          maxWidth: 'auto', minHeight: 'auto', maxHeight: 'auto',
          borderColor: 'rgba(39, 40, 34, .7)', backgroundClassName: ''
        });

        var $obj = $('<div />').addClass ('info_bubble').append (
                      $('<div />').addClass ('img').append (
                      $('<a />').attr ('href', t.h).attr ('title', t.t).attr ('target', '_blank').append ($('<img />').attr ('src', t.s).attr ('alt', t.t).attr ('alt', t.t))
                        ).append (
                      $('<a />').attr ('href', t.h).attr ('title', t.t).attr ('target', '_blank').append ($('<div />').addClass ('title').text (t.t))
                      ))
        .append (
          $('<div />').addClass ('desc').append (t.d)
          )
        .append (
          $('<div />').addClass ('link').append ($('<a />').attr ('href', t.h).attr ('title', t.t).attr ('target', '_blank').append ('繼續閱讀'))
        ).append (
                      $('<div />').addClass ('delete').html ('&#10006;').click (function () { infoWindow.close (); }));
        
        infoWindow.setContent ($obj.get (0));
        infos.push (infoWindow);

        google.maps.event.addListener (marker, 'click', function (e) {
          infos.forEach (function (u) { u.close (); });
          infoWindow.open (map, marker);
        });

        marker.setMap (map);
        return $('<div />').addClass ('i').append (t.p ? $('<span />').addClass ('icon-fire') : null).append (t.t).click (function () {
          infos.forEach (function (u) { u.close (); });
          infoWindow.open (map, marker);
        });
      })));
    }));

    $('#container').append ($('<div />').addClass ('mobile').append (datas.map (function (t) {
      return $('<h3 />').addClass ('t').text (t.t).add ($('<ol />').addClass ('vs').append (t.vs.map (function (t) {
        return $('<li />').append ($('<a />').attr ('href', t.h).attr ('title', t.t).attr ('target', '_blank').text (t.t)).append (t.p ? $('<i />').addClass ('icon-fire') : null);
      })));
    })).append (references.map (function (t) {
      return $('<div />').addClass ('r').append (t);
    })));

    $('#loading').fadeOut (function () {
      $(this).hide (function () {
        $(this).remove ();
      });
    });
  }
  $(window).resize (function () {
    if ($(window).width () >= 769) {
      var h = ($subItems.is (':visible') ? parseFloat ($subItems.height ()) + parseFloat ($subItems.css ('padding-top')) + parseFloat ($subItems.css ('padding-bottom')) : 0) + parseFloat ($container.css ('margin-top')) + parseFloat ($pagination.css ('margin-top')) + parseFloat ($pagination.css ('padding-top')) + parseFloat ($pagination.find ('.oa-jelly').height ());
      $container.css ({height: 'calc(100% - ' + h + 'px)'});
    } else {
      $container.css ({height: 'auto'});
    }
  }).resize ();


  google.maps.event.addDomListener (window, 'load', initialize);
});