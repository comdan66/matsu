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
        {p: true, t: '[食記] 北港 小籠湯包', h: 'https://www.ptt.cc/bbs/Yunlin/M.1296565841.A.4BC.html', d: '說到心得 說真的這家的話 我個人會推薦 1.湯包 2.酸辣湯!! 但是 我每次去吃都是吃乾麵啦XD 在這裡 推薦給 住北港或者要來北港玩的各位做個參考XDDD', s: 'img/site/food/02-01.jpg', l: new google.maps.LatLng (23.57351612581438, 120.29720105230808)},
        {p: true, t: '[食記] 雲林北港 福安鴨肉飯', h: 'http://douglas82328.pixnet.net/blog/post/109564667', d: '上次一月底去北港吃過老受鴨肉飯時，就一直很想再去嘗嘗北港另外家也是人氣超高的鴨肉飯-【福安鴨肉飯】趁著禮拜四這天沒課，自己一個人機車一騎，咻~~~一下就到北港了', s: 'img/site/food/02-02.jpg', l: new google.maps.LatLng (23.565343626868415, 120.30415400862694)},
        {p: true, t: '[食記] 雲林北港。老受鴨肉飯', h: 'http://windko0813.pixnet.net/blog/post/107795083', d: '北港有名的食物，除了大餅、花生、麻油之外，應該就是鴨肉飯與鴨肉粳了吧！如果沒點名到的北港食物，就sorry啦，因為windko也太久沒去北港晃晃了。小時候其實每年都會來北港幾趟，小時候的北港燈會超有名的！還要來朝天宮拜拜！', s: 'img/site/food/02-03.jpg', l: new google.maps.LatLng (23.566428446740897, 120.30440211296082)},
        {p: true, t: '[食記] 雲林北港 北港圓仔湯', h: 'http://sam76227.pixnet.net/blog/post/106376858', d: '還在北港讀書的時候~最常吃的剉冰就是三代豆花另一間就是北港圓仔湯~圓仔湯有冰的和熱的~我是都吃冰的啦~如果女生月事來~這裡也有熱的紅豆湯~聽說還不錯~最近回到北港~吃北港圓仔湯的次數還比較高~因為這麼多年才漲五元~算是很有良心的店家~', s: 'img/site/food/02-04.jpg', l: new google.maps.LatLng (23.565172759238962, 120.30411645770073)},
        {p: false, t: '[食記] 北港的阿等土豆油飯(便宜好吃)', h: 'http://alisa0415.pixnet.net/blog/post/42004303', d: '↑↑↑猜猜這些總共多少錢???.土豆油飯20+爌肉飯25+蚵仔酥35+特製香腸20+燙青菜20+蘆筍沙拉35=155元.真的便宜到會嚇死人！！！', s: 'img/site/food/02-05.jpg', l: new google.maps.LatLng (23.57071047826772, 120.30380666255951)},
        {p: false, t: '[食記] 北港橋頭香菇肉羹', h: 'http://alisa0415.pixnet.net/blog/post/42004306', d: '這間北港陸橋旁的肉羹麵很神奇.每次經過時幾乎都客滿.有一次還看到門口一長排的排隊人潮.而且都是本地人.我常吃對面的阿婆煎盤粿.一直想找機會吃這家看看.後來吃過兩次感覺都不錯.', s: 'img/site/food/02-06.jpg', l: new google.maps.LatLng (23.56649236785899, 120.30239783227444)},
        {p: true, t: '[食記] 北港的阿不倒(+2015北港燈會)', h: 'http://alisa0415.pixnet.net/blog/post/42097768', d: '網路上蒐尋"阿不倒"，看到好幾個誇張的關鍵字，例如［好吃到讓人流淚］、［沒吃到會讓人流淚］，所以說有吃到和沒吃到都會流淚就是了，大家形容的太over了啦！', s: 'img/site/food/02-07.jpg', l: new google.maps.LatLng (23.566267414555526, 120.30375234782696)},
        {p: false, t: '[食記] 北港武德宮之樂咖啡-財神爺廟裡喝咖啡', h: 'http://alisa0415.pixnet.net/blog/post/42026104', d: '早就聽說過北港財神爺廟裡有一家咖啡店.聽起來就很潮很有趣樣.但一直沒機會去.今天大年初四和某個朋友約好要碰面聊天一下.喜歡文青文創的她提議這家咖啡店.', s:'img/site/food/02-08.jpg', l: new google.maps.LatLng (23.581215522612414, 120.29864743351936)},
        {p: true, t: '[食記] 北港的一郎', h: 'http://alisa0415.pixnet.net/blog/post/40724839', d: '這間一郎也是我家挑嘴的小弟喜歡的店家之一.如果晚上經過北港.常要幫他外帶豬腳和蝦仁飯回去.之前有介紹過兩次了.這次是發現它換新店址了.拍給大家看一下~~', s: 'img/site/food/02-09.jpg', l: new google.maps.LatLng (23.568582694203908, 120.30486680567265)},
      ]
    },
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