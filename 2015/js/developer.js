/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var baseSrc = 'img/site/developer/';
  var users = [
    {
      n: 'OA Wu',
      t: '網站作者',
      s: '01-01.jpg',
      is: [
        {t: '信箱', v: 'comdan66@gmail.com', h: 'mailto:comdan66@gmail.com?subject=關於北港迎媽祖網頁..&body=Hi OA,%0d%0a%0d%0a    關於北港迎媽祖網頁，我有些相關問題..'},
        {t: '臉書', v: 'https://www.facebook.com/comdan66', h: 'https://www.facebook.com/comdan66'},
        {t: '相簿', v: 'https://www.flickr.com/photos/comdan66', h: 'https://www.flickr.com/photos/comdan66'},
        {t: '網站', v: 'http://www.ioa.tw', h: 'http://www.ioa.tw'},
        {t: '原碼', v: 'https://github.com/comdan66/matsu', h: 'https://github.com/comdan66/matsu'}
      ],
      vs: [
        '烘爐引炮驚奇火花驚震全場，輪廓描繪傳承力量、霓彩妝童延續風華，三聲起馬炮後，三鼓三哨聲的先鋒中壇開路啟；兩聲哨鼓的北港黃袍勇士也在砲火花中吞雲吐霧聞炮起舞；四小將鏘鏘響，門一開，青紅將軍開路展威風！',
        '還是一樣的開場詞！是的，又一年了！這個慶典對於北港人，就像如候鳥的季節，是一個返鄉的時刻；每年十九前一晚，小鎮內車子就漸漸的多了，辦桌的廚棚也滿在街道上。這是一個屬於北港囝仔的春節、北港人的過年！',
        '其實對於地方的熱情不僅僅是信仰，更還是一種習慣、參與感、責任感。還記得從國中時，自己去圖書館翻閱北港鎮地圖，拿著筆一筆一畫的將路關路線圖完成。高中時，拿著人生第一台的數位相機，記錄著每一年的活動，從起馬嗆班到落馬嗆班。如今終於可以用我所學的技能，來為我的故鄉做點什麼！',
        '十幾年過去了！不曾改變的習慣還依然繼續！不曾冷卻的期待也是依然澎湃！如果你不是北港人，但對傳統文化有著興趣與熱誠，推薦你來北港參與一次吧！你會看到的不僅是陣頭鞭炮，而是整個鎮上參與的感動！不多說了，要開始了！這個屬於全北港小鎮的盛會！出發，全鎮遶境去！！'
      ],
      d: '2015.04.02'
    }
  ];

  $('#container').append (users.map (function (t) {
    return $('<div />').addClass ('u').append (
      $('<div />').addClass ('l')
        .append ($('<div />').addClass ('a').append ($('<img />').attr ('src', baseSrc + t.s).attr ('title', t.n).attr ('alt', t.n)))
        .append ($('<div />').addClass ('n').text (t.n).append (t.is.length ? $('<div />') : null))
        .append (t.is.map (function (t) {
          return $('<div />').addClass ('i').append ($('<div />').addClass ('m').text (t.t).add ($('<div />').addClass ('s').append ($('<a />').attr ('target', '_blank').attr ('href', t.h).text (t.v))));
        }))).append ($('<div />').addClass ('r').append ($('<section />').append ($('<h2 />').text (t.t)).append (t.vs.map (function (t) {
          return $('<article />').append (t);
        })).append ($('<div />').text (t.d))));
  }));

  $('.a').imgLiquid ();
  $('.n div').click (function () {
    var $parent = $(this).parent ();
    if ($parent.hasClass ('sh'))
      $parent.siblings ().andSelf().removeClass ('sh');
    else
      $parent.siblings ().andSelf().addClass ('sh');
  });

  $('#loading').fadeOut (function () {
    $(this).hide (function () {
      $(this).remove ();
    });
  });
});