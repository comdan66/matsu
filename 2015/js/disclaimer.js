/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var datas = [
    {
      t: '先說',
      vs: [
        '這是一個熱愛北港廟會活動的非營利網站，希望能為地方古蹟、習俗活動帶來一丁點的貢獻！更希望大家參與北港廟會活動的同時，能更加的融入北港當地的文化。網站出發點，其實只是單純想為北港媽祖三月十九繞境活動作宣傳，希望可以讓台灣所有人看得到北港，僅此而已！'
      ]
    },
    {
      t: '希望',
      vs: [
        '熱愛在地文化的朋友們可以一起參與這盛會！北港這個小鎮是有著很多的百年藝陣、內涵傳統、宗教信仰..等，讓我們期許這小鎮特色的是能被記錄與看見！無論文章或攝影，都一起來記錄吧！希望大家一起分享一起加油！'
      ]
    },
    {
      t: '最後',
      vs: [
        '還是要說一下，站內多數資料多數是參考網路上資源以及前輩們對於地方研究敘述的資料！如要引用，請標明出處或告知原作者！另外，若站上的資訊有錯誤或有不妥，歡迎各位<a href="mailto:comdan66@gmail.com?subject=關於北港迓媽祖網頁..&body=Hi OA,%0d%0a%0d%0a    關於北港迓媽祖網頁，我有些相關問題..">來信</a>指導、建議。'
      ]
    }
  ];
  
  var references = [
    '最後更新日期 2014.03.31'
  ];

  $('#container').append (datas.map (function (t) {
    return $('<h3 />').addClass ('t').text (t.t).add ($('<div />').addClass ('vs').append (t.vs.map (function (t) {
      return $('<section />').addClass ('v').append (t);
    })));
  })).append (references.map (function (t) {
    return $('<div />').addClass ('r').html (t);
  }));

  $('#loading').fadeOut (function () {
    $(this).hide (function () {
      $(this).remove ();
    });
  });
});