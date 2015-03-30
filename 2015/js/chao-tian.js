/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var baseSrc = 'img/site/chao-tian/';
  var baseTime = 4000;

  var units = [
    {
      a: 'right',
      is: [
        {s: '01-02.jpg', t: '三月十九廟會盛況'},
        {s: '01-01.jpg', t: '夜間的朝天宮'},
        {s: '01-03.jpg', t: '虔誠信徒誠心祈求'}
      ],
      vs: [
        '<span>北港朝天宮</span>俗稱北港媽祖廟，位於台灣雲林縣北港鎮中山路178號，是一座主要奉祀媽祖的廟宇，並已被列為中華民國<b>國定古蹟</b>。',
        '<br />',
        '<br />',
        '<span>朝天宮</span>也為目前台灣最具影響力分靈眾多的媽祖廟之一， 清康熙三十三年(西元1694年)，<b>樹璧和尚</b>自湄洲嶼朝天閣奉請媽祖來台，航途中遇暴風雨漂流至笨港(今北港)，樹璧和尚認為此為神意，遂將媽祖奉祀於笨港街，建天妃廟，後改名天后宮，再改今朝天宮。',
        '<br />',
        '<br />',
        '<span>據說</span>樹壁和尚將媽祖神像請至北港後，曾在一處<b>古井</b>上休息，也暫時將媽祖神像安置於古井上，不過後來當樹壁和尚要動身離開時，媽祖神像卻再也搬不動。後來經過請示，得知媽祖欲在此地建廟，而造就了今日的朝天宮。傳說今朝天宮正殿媽祖正下方，即為當年古井所在。',
      ]
    },
    {
      a: 'left',
      is: [
        {s: '02-01.jpg', t: '正殿奉祀媽祖'},
        {s: '02-02.jpg', t: '夜晚繞境的虎將軍'},
        {s: '02-03.jpg', t: '現任住持求'}
      ],
      vs: [
        '<br />',
        '<br />',
        '<span>朝天宮</span>建築屋頂為重脊飛簷，內部依序為三川殿，奉祀<b>中壇元帥</b>、<b>虎將軍</b>；正殿奉祀<b>媽祖</b>；中殿中室主祀<b>觀音菩薩</b>，從祀十八羅漢；東為三界公殿奉祀有<b>三官大帝</b>，從祀月下老人；五文昌夫子殿奉祀<b>文昌帝君</b>；後殿中堂是聖父母殿，奉祀媽祖的<b>父母雙親</b>和其兄姊妹；左廂有註生娘娘殿，奉祀<b>註生娘娘</b>；右廂是雙公殿，奉祀<b>土地公</b>和<b>境主公</b>；後殿左室為開山堂，奉祀<b>歷代住持</b>其祿位。',
        '<br />',
        '<br />',
      ]
    },
    {
      a: 'right',
      is: [
        {s: '03-01.jpg', t: '起馬炮聲響，就是慶典開始！'},
        {s: '03-02.jpg', t: '三月北港不夜城！'},
        {s: '03-03.jpg', t: '信徒還願敬炮'},
      ],
      vs: [
        '<br />',
        '<span>臺灣</span>農曆三月期間，各地迎媽祖活動非常頻繁盛況非常，而在北港這個古鎮中更能體會到此股熱誠，對於北港人這更是一場年度盛會。',
        '<br />',
        '<br />',
        '<span>北港</span>每年農曆三月十九當天，家家戶戶大都會用<b>辦桌</b>的方式，邀請遠方親友來共享用美食！同時當廟口繞境隊伍出發後，北港街頭鞭炮聲四起，大家便知道遶境已經開始了！沿路每戶都會準備好香案，水果和金爐恭迎媽祖聖駕。從農曆十九當天至二十三日媽祖聖誕當天，也將會伴隨著<b>真人藝閣</b>遊行，這在別處是很少見的。',
      ]
    },
    {
      a: 'left',
      is: [
        {s: '04-01.jpg', t: '蔣經國先生第 11 次造訪朝天宮，參觀孝子釘。'},
        {s: '04-02.jpg', t: '位於觀音殿的孝子釘'},
        {s: '04-03.jpg', t: '花崗岩的孝子釘'}
      ],
      vs: [
        '<br />',
        '<span>孝子釘</span>是朝天宮的一個廣為人知的故事，在清朝康熙年間，有個被後人稱作「蕭孝子」，跟他的母親一起從唐山來台灣找尋父親，在渡海的過程中母親卻被大浪沖走，到台灣尋找父親與母親。',
        '<br />',
        '<br />',
        '<span>當</span>他到了笨港的媽祖廟，向廟裡的媽祖祈求能早日找到他的父母親，他看到地上有一根粗的鐵釘，於是他便向媽祖請求如果能找到他的父母，就讓這根鐵釘能釘入花崗岩之中，他徒手將鐵釘往地上釘去，鐵釘應聲釘入堅硬的花崗石中。',
        '<br />',
        '<br />',
        '<span>消息</span>很快的傳遍了笨港，許多人紛紛幫他打聽他的父母的下落。終於在麥寮找到了他的母親，隨後在鹿港找到了父親。目前孝子釘就在北港朝天宮觀音殿前面的石階中央。',
      ]
    }
  ];

  $('#container').append (units.map (function (t) {
    return $('<div />').addClass ('unit').addClass (t.a).append ($('<div />').addClass ('imgs').append (t.is.map (function (t) {return $('<img />').attr ('src', baseSrc + t.s).attr ('title', t.t).attr ('alt', t.t);}))).append (t.vs.map (function (t) {return t;}));
  })).find ('.imgs').map (function () {
    var $that = $(this);
    var timer = null;

    $that.addClass ('show');
    $that.attr ('data-title', $(this).find ('img').eq (0).attr ('title')).imgLiquid ();

    var change = function () {
      clearTimeout (timer);
      $that.removeClass ('show');

      setTimeout (function () {
        var $img = $that.find ('img').eq (0);
        $that.append ($img.clone ());
        $img.remove ();
        $that.attr ('data-title', $that.find ('img').eq (0).attr ('title')).imgLiquid ();
        $that.addClass ('show');
      }, 200);

      timer = setTimeout (change, baseTime + Math.floor (Math.random () * (2000)));
    };

    timer = setTimeout (change, baseTime + Math.floor (Math.random () * (2000)));
  });

  $('#loading').fadeOut (function () {
    $(this).hide (function () {
      $(this).remove ();
    });
  });
});