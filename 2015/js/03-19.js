/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var baseSrc = 'img/site/03-19/';
  var baseTime = 4000;
  var $container = $('#container');

  var units = [
    {
      a: 'left',
      is: [
        {s: '01-01.jpg', t: ''},
        {s: '01-02.jpg', t: '起馬炮就位，活動即將揭開！'},
        {s: '01-03.jpg', t: ''}
      ],
      vs: [
        '<br />',
        '<span>三月十九？</span>我想一定會有人問，為什麼北港迎媽祖活動會是在農曆三月十九、二十，而不是三月二十三媽祖誕辰當天呢？',
        '<br />',
        '<br />',
        '<span>早期</span>朝天宮會在媽祖生日前夕會回到湄州祖廟謁祖進香，而當回到北港時，時間就是剛好在農曆三月十九，所以也就會在這一天於境內出巡祈福！原本一天的繞境活動也於民國四十四年擴大至兩天！',
        '<br />',
        '<br />',
        '<span>2008年</span>，北港迎媽祖的活動也被指定為「台灣文化資產」， 並與台東炸寒單、鹽水蜂炮並稱為「<b>台灣三大炮</b>」。2011年受中華民國行政院文建會指定為<b>國家重要民俗</b>。'
      ]
    },
    {
      a: 'right',
      is: [
        {s: '02-01.jpg', t: '看到爐主燈就代表陣頭就在後面了！'},
        {s: '02-02.jpg', t: '搖擺將軍 青紅開路展威風！'},
        {s: '02-03.jpg', t: '這個屬於全北港小鎮的盛會！全鎮遶境去！'}
      ],
      vs: [
        '<span>唱班</span>代表整個繞境活動的開始，借由<a href="https://www.youtube.com/embed/v_ecOgzU-SU" class="fancybox fancybox.iframe" title="北港農曆三月十九 媽祖祈福遶境 出廟嗆班">唱班</a>儀式來為轎班弟兄們打氣以及祈求接下來的兩天兩夜的繞境順利平安！',
        '<br />',
        '<br />',
        '<span>碰、碰、碰</span>三聲通天巨響的起馬炮響玩，隊伍就出發了，可以看到<a href="https://www.facebook.com/groups/golden.prince" target="_blank">先鋒太子爺金垂髫</a>的小朋友們扛著小小神轎走第一！嗶嗶、咚咚聲的<a href="https://www.youtube.com/embed/LXLjNcxuA34" class="fancybox fancybox.iframe" title="北港迎媽祖 虎爺320週年新轎第一堆炮">虎爺</a>也跟著起轎，吃完三堆炮後，緩緩往中山路尾移動，福德正神等神轎也相繼出發！',
        '<br />',
        '<br />',
        '<span>廟門</span>開！首先出來的是莊儀團四小將，可愛模樣成為了瞬間焦點！鏘鏘鏘，千里眼、順風耳將軍扎實的步伐，大搖大擺展現出威風領領的姿態，後面出來的神轎也依序登場了！',



        // '<br />',
        // '<br />',
        // '<span>一般</span>神明出巡，大都走大路大街為主，而北港媽祖卻是大街小巷都走，只要那條巷子神轎進的去、走的出來，再小的巷子媽祖的隊伍都會進去走走繞繞，當看到神轎進去只能剛好容納轎子寬度的巷子時，心中真有著莫名的感動，看到朝向媽祖神轎跪拜的信徒，那種濃濃的神與人的情感與寄託，更是可以發現北港媽祖對於當地人的重要性。',
      ]
    },
    {
      a: 'left',
      is: [
        {s: '03-01.jpg', t: '家家戶戶大都在辦桌！'},
        {s: '03-02.jpg', t: '夕陽西下，夜間場才正要開始！'},
        {s: '03-03.jpg', t: '百年陣頭，一年成果都在這時候驗收啦～～'},
        {s: '03-04.jpg', t: '午夜場的ㄌㄨㄚˋ炮手！'}
      ],
      vs: [
        '<span>每年</span>的這兩天，朝天宮內的祖媽、二媽、三媽、四媽、五媽、六媽等媽祖鑾轎及其前鋒虎爺神轎等宮內的神明皆會出巡繞境，而且北港在地的廟宇與陣頭，也都會一起共襄盛舉，沿途信徒會用大量的鞭炮轟炸希望事業「愈炸愈發」，加上各式陣頭與藝閣，繞境隊伍綿延可達好幾公里都不誇張！',
        '<br />',
        '<br />',
        '<span>北港</span>每年農曆三月十九當天，家家戶戶大都會用<b>辦桌</b>的方式，邀請遠方親友來共享用美食！同時當廟口繞境隊伍出發後，北港街頭鞭炮聲四起，大家便知道遶境已經開始了！沿路每戶都會準備好香案，水果和金爐恭迎媽祖聖駕。從農曆十九當天至二十三日媽祖聖誕當天，也將會伴隨著<b>真人藝閣</b>遊行，這在別處是很少見的。',
      
        // '<span>三月瘋媽祖</span>如果你想知道這是什麼感覺，那你就來看看北港媽祖出巡繞境就知道，因為北港人對媽祖的熱情真的會讓你永生難忘！北港人會用<b>吃炮</b>來表示對媽祖的崇敬之意。吃炮那是個怎麼個吃法？依據北港當地陣頭的習慣最主要會分成三種方式 <b>犁炮</b>、<b>踩炮</b>、<b>炸轎</b>。',
        // '<br />',
        // '<br />',
        // '<span>犁炮</span>是北港最據有獨特性的一種施放鞭炮方式，其顧名思義就是用<b>犁頭鐵質部</b>搭配<b>火爐</b>，當火爐中的木炭將犁頭燒紅時，就可以用來點燃手中的<b>排炮</b>並在點燃的第一時間丟向神轎的放炮方式，稱為犁炮。近期幾年在<b>金垂髫鄉土文史協會</b>的推廣之下，慢慢的又回復成使用犁頭生搭配火爐的古早式，在媽祖繞境的這幾天，協會也會在媽祖廟廣場前<b>示範犁炮</b>，而現場民眾也都有機會可以參與犁炮的活動喔！',
      ]
    },
    {
      a: 'right',
      is: [
        {s: '04-03.jpg', t: '烘爐引炮驚奇火花驚震全場'},
        {s: '04-01.jpg', t: '北港藝閣也是三月十九特點之一'},
        {s: '04-02.jpg', t: '搖擺將軍 青紅開路展威風'}
      ],
      vs: [
        '<span>繞境</span>隊伍中，你不但可以看到具有歷史的傳統陣頭，還可以看到各式的<b>藝閣</b>花車，每個藝閣都會有個主題故事，而藝閣上也有著很小朋友扮演故事中的角色，那都是<b>真人</b>，可不是電動人偶！',
        // '<span>吃炮完</span>，你會發現轎班會的每個人都變成了「黑人」，但當神轎下的那堆鞭炮引燃時，剎那間火光四飛、煙霧滿天，聲音之大有如雷聲，炸完的下一秒，天空就會下起炮屑雨來，當炮屑灑落一地時，四周自然的就會響起歡呼掌聲，所以北港人常會驕傲的說<b>北港囝仔未驚炮</b>！',
        '<br />',
        '<br />',
        '<span>扮演藝閣</span>通常都會由十四歲以下的小朋友，著古裝扮演戲劇角色。在民國四十年左右，由人工扛抬改為獸力，將「閣棚」裝臵於牛車上拉動，後改以機動三輪車帶動，現在藝閣完全改用貨車車體，其外形比當年增大五倍之多，視覺與藝術美感更勝以往！',
      ]
    },
    {
      a: 'left',
      is: [
        {s: '05-01.jpg', t: '輪廓描繪傳承力量 霓彩妝童延續風華'},
        {s: '05-02.jpg', t: '北港囝仔的共同回憶ＸＤ'},
        {s: '05-03.jpg', t: '三天兩夜，圓滿結束前的最後衝刺！'},
        {s: '05-04.jpg', t: '兩聲哨鼓的北港黃袍勇士 砲火花中聞炮起舞、吞雲吐霧'},
      ],
      vs: [
        '<br />',
        '<br />',
        '<span>觀賞</span>藝閣時，你只要對這些小朋友招招手，他們就會丟糖果給你！北港的真人藝閣在台灣已經很少見了。',
        '<br />',
        '<br />',
        '<span>北港</span>的百年陣頭中，其實有很多都是即將失傳的民俗藝陣，甚至有些已經解散。身為一個北港人，我想應該讓更多人看到屬於臺灣特有的本土民俗文化，歡迎大家將北港這一份特色分享出去吧！',
      ]
    }
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