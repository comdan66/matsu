/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var datas = {
    l: [
      {
        t: '相關網站',
        vs: [
          {t: '北港朝天宮 官網', h: 'http://www.matsu.org.tw'},
          {t: '台灣厝仔 - 雲林縣北港朝天宮媽祖遶境', h: 'http://www.old-taiwan.as2.net'},
          {t: '北港新站', h: 'http://www.peikang.idv.tw'},
          {t: '北港媽祖婆', h: 'http://589.com.tw/scout/beigangmazu'},
          {t: '北港鎮金垂髫文化發展協會', h: 'https://www.facebook.com/groups/golden.prince'},
          {t: 'PTT雲林版文章', h: 'https://www.ptt.cc/bbs/Yunlin/index.html'}
        ]
      },
      {
        t: 'Facebook 官方網站',
        vs: [
          {t: '北港朝天宮', h: 'https://www.facebook.com/beigangmatsu'},
          {t: '北港迓媽祖', h: 'https://www.facebook.com/pages/北港迓媽祖/115131071836739'},
          {t: '北港媽祖婆', h: 'https://www.facebook.com/beigangmazu'},
          {t: '北港遊客中心', h: 'https://www.facebook.com/PeikangVC'}
        ]
      },
      {
        t: '地方藝陣社團',
        vs: [
          {t: '北港金聲順開路鼓', h: 'https://www.facebook.com/groups/512822725471613'},
          {t: '北港金合順', h: 'https://www.facebook.com/groups/167413863291043'},
          {t: '北港老塗獅', h: 'https://www.facebook.com/pages/北港老塗獅/139696376120605'},
          {t: '北港新龍團', h: 'https://www.facebook.com/pages/北港新龍團/188962611141973'},
          {t: '北港［濟世會］黑面濟公', h: 'https://www.facebook.com/groups/275739189130769'},
          {t: '北港◎誠心宮', h: 'https://www.facebook.com/groups/169550083105622'},
          {t: '北港飛龍團', h: 'https://www.facebook.com/groups/xce7825818'},
          {t: '北港太子聯誼會電音三太子', h: 'https://www.facebook.com/groups/175223302495146'},
          {t: '.北港嘉北會.', h: 'https://www.facebook.com/groups/113238902133948'},
          {t: '北港振玄堂', h: 'https://www.facebook.com/BeiGangZhenXuanTang'},
          {t: '北港 如良 宣靈會', h: 'https://www.facebook.com/pages/北港-如良-宣靈會/189694331115526'},
          {t: '北港聖佛堂  齊天大聖', h: 'https://www.facebook.com/groups/230967150368772'}
        ]
      }
    ],
    r: [
      {
        t: '文章參考',
        vs: [
          {t: '北港朝天宮 Wiki', h: 'http://zh.wikipedia.org/wiki/北港朝天宮'},
          {t: '北港朝天宮 官網', h: 'http://www.matsu.org.tw'},
          {t: '台灣厝仔 - 雲林縣北港朝天宮媽祖遶境', h: 'http://www.old-taiwan.as2.net'},
          {t: '鄭煌霖 - 臺灣三大炮之北港迎媽祖 報告文件', h: 'http://www.shs.edu.tw/works/essay/2011/03/2011032809444385.pdf'},
          {t: '蕃薯藤 - 2014 北港媽祖活動', h: 'http://event6.yam.com/matsu/contest.php'}
        ]
      },
      {
        t: '相簿參考',
        vs: [
          {t: 'Monkeyy Dai - Flickr', h: 'https://www.flickr.com/photos/lifegoseon'},
          {t: 'Kenny Mao - Flickr', h: 'https://www.flickr.com/photos/kenny6606'},
          {t: 'OA - Flickr', h: 'https://www.flickr.com/photos/comdan66'},
          {t: '蕃薯藤 - 2014 北港媽祖活動', h: 'http://event6.yam.com/matsu/contest.php'}
        ]
      },
      {
        t: '朝天宮藝陣社團',
        vs: [
          {t: '北港閭山堂神童團', h: 'https://www.facebook.com/pages/北港閭山堂神童團/265567123578752'},
          {t: '北港朝天宮彌勒團', h: 'https://www.facebook.com/groups/759616660791348'},
          {t: '北港鎮金垂髫文化發展協會', h: 'https://www.facebook.com/groups/golden.prince'},
          {t: '北港朝天宮虎爺會', h: 'https://www.facebook.com/groups/471539299532767'},
          {t: '北港朝天宮金福綏轎班會', h: 'https://www.facebook.com/pages/北港朝天宮金福綏轎班會/440736419392375'},
          {t: '北港金瑞昭註生娘娘會', h: 'https://www.facebook.com/groups/463137277094624'},
          {t: '北港朝天宮莊儀團', h: 'https://www.facebook.com/pages/北港朝天宮莊儀團/114667738576944'},
          {t: '北港朝天宮五媽金豐隆聯誼會', h: 'https://www.facebook.com/groups/1413029438977773'},
          {t: '北港朝天宮六媽金順崇轎班會', h: 'https://www.facebook.com/groups/195171297221045'},
          {t: '北港朝天宮祖媽金順盛', h: 'https://www.facebook.com/groups/488039344658121'}
        ]
      }
    ]
  };

  var references = [
    "以上鏈結如有錯誤或有相關意見歡迎<a href='mailto:comdan66@gmail.com?subject=關於北港迓媽祖網頁的參考資料..&body=Hi OA,%0d%0a%0d%0a    關於北港迓媽祖網頁的參考資料..'>來信</a>告知。",
    '2015.03.31'
  ];

  $('#container').append ($('<div />').addClass ('p').append ($('<div />').addClass ('l').append (datas.l.map (function (t) {
    return $('<h2 />').addClass ('t').text (t.t).add ($('<ul />').addClass ('vs').append (t.vs.map (function (t) {
      return $('<li />').append ($('<div />').text (t.t)).append ($('<a />').text (t.h).attr ('href', t.h).attr ('title', t.t).attr ('target', '_blank'));
    })));
  }))).append ($('<div />').addClass ('r').append (datas.r.map (function (t) {
    return $('<h2 />').addClass ('t').text (t.t).add ($('<ul />').addClass ('vs').append (t.vs.map (function (t) {
      return $('<li />').append ($('<div />').text (t.t)).append ($('<a />').text (t.h).attr ('href', t.h).attr ('title', t.t).attr ('target', '_blank'));
    })));
  })))).append (references.map (function (t) {
    return $('<div />').addClass ('rs').html (t);
  }));

  $('#loading').fadeOut (function () {
    $(this).hide (function () {
      $(this).remove ();
    });
  });
});