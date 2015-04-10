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
          {p: true, t: '[食記] 北港小吃一條龍~', h: 'http://anise.pixnet.net/blog/post/29995793'},
          {p: true, t: '[食記] 雲林北港 北港圓仔湯', h: 'http://sam76227.pixnet.net/blog/post/106376858', d: '還在北港讀書的時候~最常吃的剉冰就是三代豆花另一間就是北港圓仔湯~圓仔湯有冰的和熱的~我是都吃冰的啦~如果女生月事來~這裡也有熱的紅豆湯~聽說還不錯~最近回到北港~吃北港圓仔湯的次數還比較高~因為這麼多年才漲五元~算是很有良心的店家~', s: 'img/site/food/02-04.jpg', l: new google.maps.LatLng (23.565172759238962, 120.30411645770073)},
          {p: false, t: '[食記] 北港的阿等土豆油飯(便宜好吃)', h: 'http://alisa0415.pixnet.net/blog/post/42004303', d: '↑↑↑猜猜這些總共多少錢???.土豆油飯20+爌肉飯25+蚵仔酥35+特製香腸20+燙青菜20+蘆筍沙拉35=155元.真的便宜到會嚇死人！！！', s: 'img/site/food/02-05.jpg', l: new google.maps.LatLng (23.57071047826772, 120.30380666255951)},
          {p: false, t: '[食記] 北港橋頭香菇肉羹', h: 'http://alisa0415.pixnet.net/blog/post/42004306', d: '這間北港陸橋旁的肉羹麵很神奇.每次經過時幾乎都客滿.有一次還看到門口一長排的排隊人潮.而且都是本地人.我常吃對面的阿婆煎盤粿.一直想找機會吃這家看看.後來吃過兩次感覺都不錯.', s: 'img/site/food/02-06.jpg', l: new google.maps.LatLng (23.56649236785899, 120.30239783227444)},
          {p: true, t: '[食記] 北港的阿不倒(+2015北港燈會)', h: 'http://alisa0415.pixnet.net/blog/post/42097768', d: '網路上蒐尋"阿不倒"，看到好幾個誇張的關鍵字，例如［好吃到讓人流淚］、［沒吃到會讓人流淚］，所以說有吃到和沒吃到都會流淚就是了，大家形容的太over了啦！', s: 'img/site/food/02-07.jpg', l: new google.maps.LatLng (23.566267414555526, 120.30375234782696)},
          {p: false, t: '[食記] 北港武德宮之樂咖啡-財神爺廟裡喝咖啡', h: 'http://alisa0415.pixnet.net/blog/post/42026104', d: '早就聽說過北港財神爺廟裡有一家咖啡店.聽起來就很潮很有趣樣.但一直沒機會去.今天大年初四和某個朋友約好要碰面聊天一下.喜歡文青文創的她提議這家咖啡店.', s:'img/site/food/02-08.jpg', l: new google.maps.LatLng (23.581215522612414, 120.29864743351936)},
          {p: true, t: '[食記] 北港的一郎', h: 'http://alisa0415.pixnet.net/blog/post/40724839', d: '這間一郎也是我家挑嘴的小弟喜歡的店家之一.如果晚上經過北港.常要幫他外帶豬腳和蝦仁飯回去.之前有介紹過兩次了.這次是發現它換新店址了.拍給大家看一下~~', s: 'img/site/food/02-09.jpg', l: new google.maps.LatLng (23.568582694203908, 120.30486680567265)},
          {p: false, t: '[食記] 雲林北港．九久醇義麵坊', h: 'http://blog.yam.com/larle/article/87603574', d: '如非電視節目介紹，大概不會想到往北港巷弄裡尋義大利麵。這家位在公民路與博愛路口的餐廳，其實同時是家民宿。招牌不大，若不仔細很容易錯過。原擔心在媒體播放後會人潮湧現，幸好假日正午仍未滿座。', s: 'img/site/food/02-10.jpg', l: new google.maps.LatLng (23.56949723993212, 120.30414260923862)},
          {p: false, t: '[食記] 雲林北港．秋月生炒鱔魚', h: 'http://blog.yam.com/larle/article/85381339',d: '前陣子老大很愛到雲林縣北港鎮小散。因皆為臨時起意，沒有特別準備什麼食物情報，便採隨機挑選的方式覓食。在途經中山路時剛巧看到這家熱炒小攤，於是坐下用餐。', s: 'img/site/food/02-11.jpg', l: new google.maps.LatLng (23.566081797058768, 120.30429482460022)},
          {p: true, t: '[食記] 北港鎮 煎盤粿(美味銅板美食)', h: 'http://babbitwang.pixnet.net/blog/post/108226570', d: '吃完假魚肚之後，接著就是回到老街上繼續走走尋找下一個目標。下一個目標就是位於老街上的煎盤粿！這次我跟白芷公主兩個人只有點一份綜合煎盤粿品味一下這特色小吃。無論口味或是價格都是非常吸引人的喔！', s: 'img/site/food/02-12.jpg', l: new google.maps.LatLng (23.565915847419063, 120.30430421233177)},
          {p: true, t: '[食記] 北港鎮 廟邊假魚肚(30元,超特別美食)', h: 'http://babbitwang.pixnet.net/blog/post/108226990', d: '七月的三日遊來到第二天，清早我跟白芷公主就到北港朝天宮附近去找早餐吃。朝天宮周邊真的還蠻強的，可以從早吃到晚。前面的文章我們晚餐吃過了阿不倒，現在早上我們要來吃的也是蠻特別又便宜的美食，叫"假魚肚"。', s: 'img/site/food/02-13.jpg', l: new google.maps.LatLng (23.567859903558606, 120.3049298375845)},
          {p: true, t: '[食記] 北港 阿豐麵線糊油飯', h: 'http://woxko.pixnet.net/blog/post/40952866', d: '阿豐麵線糊就在一郎土魠魚羹對面、北港朝天宮後方，是個歷史 40 多年的老店，寫此篇文章時，阿豐麵線糊已經是第二訪了，是非常有特色的北港美食。', s: 'img/site/food/02-14.jpg', l: new google.maps.LatLng (23.568581464971494, 120.30493788421154)},
          {p: true, t: '[食記] 北港圓環邊紅燒青蛙', h: 'http://thudadai.pixnet.net/blog/post/52867036', d: '沿朝天宮旁的民主路走到文化路的圓環，旁邊就是這間在我出發來雲林前就掙扎過是否要嘗試的店，畢竟在台灣其他地方比較少能看到這種店家，感覺都來了沒試一下真的會遺憾。', s: 'img/site/food/02-15.jpg', l: new google.maps.LatLng (23.568563026483893, 120.30151002109051)},
          {p: true, t: '[食記] 北港圓環邊的香菇魯肉飯', h: 'https://www.ptt.cc/bbs/Yunlin/M.1236278986.A.440.html', d: '我吃的那家我已經吃了好幾年了，就算現在到外地讀書每次回去一定必吃！他們的香菇肉飯當然是主打，裡面不是放那種絞肉(有肥有瘦的)而是小塊的肉片，他們家的醬汁也不會很死鹹。', s: 'img/site/food/02-16.jpg', l: new google.maps.LatLng (23.56848066787434, 120.30132226645947)}
        ]
      },
      {
        t: '住宿文章',
        vs: [
          {p: false, t: '[心得] 雲林北港 笨港客棧(1200元/雙人房)', h: 'http://babbitwang.pixnet.net/blog/post/108226279', d: '三日遊的第一天落腳於北港朝天宮附近。這裡有間價格平民的旅社值得推薦一下！笨港客棧原名為國宮旅社，便宜的住宿價格但是缺點就是硬體比較舊，不過房間還算乾淨，住起來還蠻舒適的。', s: 'img/site/food/03-01.jpg', l: new google.maps.LatLng (23.568832842760933, 120.30503377318382)},
          {p: false, t: '[雲記] 北港 金山商務旅館 住宿心得', h: 'http://thudadai.pixnet.net/blog/post/59263852', d: '北港附近的住宿選擇不多，因為這次不想住民宿，當天傍晚才打電話到邦尼熊motel問問看，得知只剩下近3,000元的房間，覺得這間應該沒有必要住到此種價位，所以不考慮。後來打電話問問看歷史悠久的金山商旅(這間和邦尼熊都沒有網路訂房系統)，因為有空房所以就直接過去現場買單check in，住的是假日一晚1,800元的商務雙人套房。', s: 'img/site/food/03-02.jpg', l: new google.maps.LatLng (23.570500897370263, 120.30230395495892)}
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
        if ((t.d !== undefined) && (t.s !== undefined) && (t.l !== undefined)) {
          var marker = new google.maps.Marker ({
            draggable: false,
            position: t.l,
            icon: t.p ? 'img/icon/spotlight-poi_hdpi.png' : 'img/icon/spotlight-ad.png'
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
        }

        return $('<div />').addClass ('i').append (t.p ? $('<span />').addClass ('icon-fire') : null).append (t.t).click (function () {
          if ((t.d !== undefined) && (t.s !== undefined) && (t.l !== undefined)) {
            infos.forEach (function (u) { u.close (); });
            infoWindow.open (map, marker);
          } else {
            window.open (t.h, '_blank');
          }
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