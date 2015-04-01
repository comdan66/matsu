/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var datas = [
    {
      t: '旅遊文章',
      vs: [
        {p: false, t: '[雲記] 發揚在地工藝‧北港工藝坊', h: 'http://piecece.pixnet.net/blog/post/109294934'},
        {p: false, t: '[遊記] 按著地圖尋寶趣‧北港歷史街區', h: 'http://piecece.pixnet.net/blog/post/109144865'},
        {p: false, t: '[雲記] 木工與藝術的遇見‧北港春生活博物館', h: 'http://piecece.pixnet.net/blog/post/108923950'},
        {p: false, t: '[雲記] 北港振興戲院．日興堂餅鋪看布袋戲', h: 'http://woxko.pixnet.net/blog/post/40952869'}
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
  var references = [
    "以上參考<a href='https://www.ptt.cc/bbs/Yunlin/index.html' target='_blank' title='Ptt 雲林版文章'>PTT雲林版文章</a>若文章如有不妥或違法等問題，歡迎<a href='mailto:comdan66@gmail.com?subject=關於北港美食推薦..&body=Hi OA,%0d%0a%0d%0a    關於北港美食推薦..'>來信</a>告知。",
    '2015.03.26'
  ];

  $('#container').append (datas.map (function (t) {
    return $('<h3 />').addClass ('t').text (t.t).add ($('<ol />').addClass ('vs').append (t.vs.map (function (t) {
      return $('<li />').append ($('<a />').attr ('href', t.h).attr ('title', t.t).attr ('target', '_blank').text (t.t)).append (t.p ? $('<i />').addClass ('icon-fire') : null);
    })));
  })).append (references.map (function (t) {
    return $('<div />').addClass ('r').append (t);
  }));

  $('#loading').fadeOut (function () {
    $(this).hide (function () {
      $(this).remove ();
    });
  });
});