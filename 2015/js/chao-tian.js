/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var baseSrc = 'img/site/chao-tian/';
  var baseTime = 4000;
  var $container = $('#container');
  
  var units = [
    {
      a: 'right',
      is: [
        {s: '01-01.jpg', t: '人潮滿滿的朝天宮，三月香客期更是絡繹不絕！'},
        {s: '01-02.jpg', t: '夜晚朝天宮'},
        {s: '01-03.jpg', t: '香火鼎盛'},
        {s: '01-04.jpg', t: '正殿井上的媽祖神像'}
      ],
      vs: [
        '<span>北港朝天宮</span>俗稱北港媽祖廟，位於<a title="北港朝天宮" class="fancybox fancybox.iframe" href="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7313.94645518655!2d120.30353547217533!3d23.569405001863995!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346ea285b604f125%3A0x7a7c8b94e816afce!2z5YyX5riv5pyd5aSp5a6u!5e0!3m2!1szh-TW!2stw!4v1428116833046">雲林縣北港鎮中山路178號</a>，是座主祀媽祖的廟宇，並已被列為中華民國<b>國家二級古蹟</b>。',
        '<br />',
        '<br />',
        '<span>朝天宮</span>也為台灣最具影響力以及分靈眾多的媽祖廟之一， 清康熙三十三年(西元1694年)，<b>樹璧和尚</b>自湄洲嶼朝天閣奉請媽祖來台，航途中遇暴風雨漂流至笨港(今北港)，樹璧和尚認為此為神意，遂將媽祖奉祀於笨港街，建天妃廟，後改名天后宮，再改今朝天宮。',
        '<br />',
        '<br />',
        '<span>據說</span>樹壁和尚將媽祖神像請至北港後，曾在一處<b>古井</b>上休息，也暫時將媽祖神像安置於古井上，不過後來當樹壁和尚要動身離開時，媽祖神像卻再也搬不動。後來經過請示，得知媽祖欲在此地建廟，而造就了今日的朝天宮。傳說今朝天宮正殿媽祖正下方，即為當年古井所在。',
      ]
    },
    {
      a: 'left',
      is: [
        {s: '02-01.jpg', t: '北海龍王-敖吉'},
        {s: '02-02.png', t: '屋簷旁上的憨番扛廟角'},
        {s: '02-03.jpg', t: '屋頂上的剪黏藝術'},
        {s: '02-04.jpg', t: '藻井'},
        {s: '02-05.png', t: '三元及第的螃蟹'},
        {s: '02-06.jpg', t: '代表多子多孫的南瓜與錢鼠'}
      ],
      vs: [
        '<br />',
        '<span>朝天宮</span>不只是宗教文化的重鎮，更是座建築藝術的代表，從廟程外的圍牆上就可以看到民國初年所雕刻的四海龍王，其神韻各有特色更是台灣罕見之作。',
        '<br />',
        '<br />',
        '<span>仰望</span>屋頂更可以發現精彩藝術作品，在屋簷兩角可以看到逗趣的憨番扛廟角，而屋頂上有著利用碎陶瓷瓦片剪黏出來的民間傳說故事。',
        '<br />',
        '<br />',
        '<span>天花板</span>的八卦造型稱作<a href="http://www.matsu.org.tw/TourView.aspx?pt=2" target="_blank">藻井</a>，那是利用斗拱、榫卯的傳統工藝技巧所拼接出來的華麗藝術；梁上的兩旁更可以看到代表<a href="http://www.matsu.org.tw/TourView.aspx?pt=2" target="_blank">三元及第</a>的螃蟹，以及<a href="http://www.matsu.org.tw/TourView.aspx?pt=2" target="_blank">多子多孫</a>的南瓜、錢鼠。',
      ]
    },
    {
      a: 'right',
      is: [
        {s: '03-01.png', t: '象徵萬年香火的牆'},
        {s: '03-02.png', t: '觀音殿的龍柱'},
        {s: '03-03.jpg', t: '乾隆乙未年的龍柱'},
        {s: '03-04.jpg', t: '石階上的孝子釘'},
        {s: '03-05.jpg', t: '經國先生第11次造訪朝天宮孝子釘'},
      ],
      vs: [
        '<br />',
        '<span>觀音殿</span>前有著一面象徵香火萬年不斷意涵的牆，而殿內的三對龍柱更是全台最早的<a href="http://www.matsu.org.tw/BuildingView.aspx?pt=8" target="_blank">龍柱</a>！中間石階則有著一個孝子祈求媽祖能保佑尋回雙親徒手釘入鐵釘的<a href="http://www.matsu.org.tw/TourView.aspx?pt=8" target="_blank">孝子釘</a>故事，聖父母殿旁，更在民國初就有設置免費的<a href="http://www.matsu.org.tw/SocialServices.aspx" target="_blank">民眾診療所</a>，凡是貧病民眾一律免費施醫。',
        '<br />',
        '<br />',
        '<span>凌虛殿</span>即稱三界公殿，此殿最具特色就屬中門兩旁的格扇窗，窗上可見<a href="http://zh.wikipedia.org/wiki/螭" target="_blank">螭</a>虎團構成「<a href="http://www.matsu.org.tw/BuildingView.aspx?pt=9" target="_blank">功參造化</a>」與「<a href="http://www.matsu.org.tw/BuildingView.aspx?pt=9" target="_blank">德配乾坤</a>」八字對句！當中最妙的是每個字均為二隻螭虎所組成，雌雄成雙，似乎意味著陰陽相輔相成之道。以螭虎團字除了筆劃無誤，龍本身的頭、頸、身、腳枝尾巴亦俱全。而且每隻螭虎皆仰頭向上，雌雄相對呼應。其彫琢技巧如行雲流水，達到了出神入化之境界了。',
      ]
    },
    {
      a: 'left',
      is: [
        {s: '04-01.jpg', t: '文昌殿前的石陛'},
        {s: '04-02.jpg', t: '道光庚子年的落款'},
        {s: '04-03.jpg', t: '代表獨佔鰲頭的斗拱'},
        {s: '04-04.jpg', t: '顏思齊紀念碑的北港圓環'}
      ],
      vs: [
        '<br />',
        '<span>文昌殿</span>階梯上有著台灣最美的<a href="http://www.matsu.org.tw/BuildingView.aspx?pt=7" target="_blank">石陛</a>，這塊石陛其雕刻整體構圖嚴謹、形象突出，且上清楚可見可見落款於道光二十年(西元1840年)，其石質為泉州白石，色白質優，上面彫紋歷久不滅。',
        '<br />',
        '<br />',
        '<span>文化古鎮</span>當然不僅限於朝天宮的文物，舉凡北港圓環的顏思齊紀念碑、三級古蹟義民廟、知名景點甕牆、美食小吃，這些都是北港的在地文化、特色。',
      ]
    },
    {
      a: 'right',
      is: [
        {s: '05-01.jpg', t: '國家三級古蹟 義民廟'},
        {s: '05-02.jpg', t: '知名景點甕牆'},
        {s: '05-03.jpg', t: '入妙安坐，炮越吃越旺，進喔！！'},
      ],
      vs: [
        '<br />',
        '<br />',
        '<span>其實</span>來到這古鎮，可以看到的不止是香客人潮、也不止是香紙鞭炮，如果細心品嘗這些人文藝術，其實可以看到先民開墾台灣的痕跡。',
        '<br />',
        '<br />',
        '<br />',
        '<span>如果</span>要把每片磚瓦的故事講過一輪，我想那不是三言兩語的，想知道更多北港之美，歡迎各位親自到北港來玩吧！',
      ]
    },
  ];

  $container.append (units.map (function (t) {
    return $('<div />').addClass ('unit').addClass (t.a).append ($('<div />').addClass ('imgs').append (t.is.map (function (t) {return $('<img />').attr ('src', baseSrc + t.s).attr ('title', t.t).attr ('alt', t.t);}))).append (t.vs.map (function (t) {return t;}));
  }));

  $container.find ('.fancybox').fancybox ({
    padding : 0,
    helpers : {overlay: {locked: false}, title : {type : 'over'}, thumbs: {width: 50, height: 50}},
    beforeLoad: function () { this.title = $(this.element).attr ('title'); }
  });

  $container.find ('.imgs').map (function () {
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