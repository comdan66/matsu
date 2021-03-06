/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var $container = $('#container');
  
  var $history = $('<div />').append ($('<h2 />').addClass ('t').text ('沿革簡介')).appendTo ($container);
  var $go_time = $('<div />').append ($('<h2 />').addClass ('t').text ('出巡時間')).appendTo ($container);
  var $path = $('<div />').append ($('<h2 />').addClass ('t').text ('繞境路關')).appendTo ($container);
  var $note = $('<div />').addClass ('n').text ('繞境行程如遇特殊情況，總領隊得視實際情況變更之。').appendTo ($container);
  var $sort = $('<div />').append ($('<h2 />').addClass ('t').text ('陣頭順序')).appendTo ($container);
  var $precaution = $('<div />').append ($('<h2 />').addClass ('t').text ('繞境注意事項')).appendTo ($container);

  var histories = [
        '清康熙卅三（公元一六九四年），福建湄洲朝天閣高僧樹璧奉請媽祖神尊來台，於農曆三月十九日午時登陸笨港（即今北港），神顯是永駐笨港，庇佑萬民，遂立祠奉祀，自此香火日盛。',
        '地方信眾為感念媽祖聖德，例由笨港渡海回湄洲謁祖，回程在台南安平登陸，三月十九日鑾駕回抵笨港，同時舉行盛大慶典與繞境。嗣因甲午戰爭後，清廷日漸衰弱，列強環伺，台灣割讓日本，海疆日險，謁祖行程因而停止，惟地方信眾為紀念此一例行謁祖活動，仍於每年十九日、二十日迎請聖母舉行繞境，祈求風調雨順、國泰民安，此即本盛會之由來。',
        '北港媽祖出巡繞境活動，經行政院文化部於民國九十九年六月十八日依據文化資產保存法第五十九條指定「北港朝天宮迎媽祖」為我國重要民俗。',
      ].forEach (function (t) {
        $history.append ($('<section />').addClass ('vs').text (t));
      });

  var go_times = {
        _19: [{ t: '三月十九日 日間',
                vs: [
                  '上午九時整，出巡笨南港繞境（南巡）。',
                  '下午一點半，各陣頭在中山路指定地點集合。',
                  '下午兩點整，隨聖母繞境遊行街內，下午六點入廟。',
                ]},
              { t: '三月十九日 晚間',
                vs: [
                  '晚間七點準備。',
                  '晚間七點半，各陣頭在中山路指定地點集合。',
                  '晚間八點整出廟。',
                ]}],
        _20: [{ t: '三月二十日 日間',
                vs: [
                  '上午九時整，出巡新街繞境（北巡）。',
                  '下午一點半，各陣頭在中山路指定地點集合。',
                  '下午兩點整，隨聖母繞境遊行街內，下午六點入廟。',
                ]},
              { t: '三月二十日 晚間',
                vs: [
                  '晚間七點準備。',
                  '晚間七點半，各陣頭在中山路指定地點集合。',
                  '晚間八點整出廟。',
                ]}]};

  $go_time.append ($('<div />').addClass ('p').append ($('<div />').addClass ('l').append (go_times._19.map (function (t) {
    return $('<h3 />').addClass ('st').text (t.t).add ($('<ul />').addClass ('vs').append (t.vs.map (function (t) { return $('<li>').text (t); })));
  }))).append ($('<div />').addClass ('r').append (go_times._20.map (function (t) {
    return $('<h3 />').addClass ('st').text (t.t).add ($('<ul />').addClass ('vs').append (t.vs.map (function (t) { return $('<li>').text (t); })));
  }))));

  var paths = [
        { t: '三月十九日 上午九點',
          vs: [
            {v: '出廟', t: ''},
            {v: '中山路', t: '宮口街'},
            {v: '民生路向西', t: '水林路'},
            {v: '大橋西引道', t: ''},
            {v: '北港大橋', t: ''},
            {v: '笨南港', t: '笨南港水仙宮午餐'},
            {v: '回程', t: ''},
            {v: '笨南港水仙宮', t: ''},
            {v: '北港大橋', t: ''},
            {v: '大橋東引道', t: ''},
            {v: '民生路', t: ''},
            {v: '休息', t: ''}
          ]
        },
        { t: '三月十九日 下午兩點',
          vs: [
            {v: '出廟', t: ''},
            {v: '中山路', t: '宮口街'},
            {v: '民生路', t: ''},
            {v: '益安路', t: ''},
            {v: '信義路', t: ''},
            {v: '捷發街', t: '捷發內'},
            {v: '光明路', t: ''},
            {v: '益安路', t: ''},
            {v: '東興街', t: '水廠後'},
            {v: '中秋路', t: '東仔寮'},
            {v: '東勢街', t: ''},
            {v: '東華巷', t: ''},
            {v: '彌陀寺前', t: ''},
            {v: '中央市場後', t: '豬砧後'},
            {v: '厚生路', t: ''},
            {v: '媽祖廟後', t: ''},
            {v: '國宮旅社前', t: ''},
            {v: '仁和路', t: '蜊仔街'},
            {v: '三連街', t: ''},
            {v: '公館街', t: ''},
            {v: '大同路', t: ''},
            {v: '博愛路大復戲院前', t: '舊戲園'},
            {v: '賜福街', t: '大復戲院(舊戲園)後'},
            {v: '義民路', t: '原北港戲院(新戲園)前'},
            {v: '復興街', t: ''},
            {v: '文化路', t: '王應東橋公園口'},
            {v: '民有路', t: '舊鎮托兒所前'},
            {v: '公園路', t: ''},
            {v: '民族路', t: '南風汽水場前'},
            {v: '文昌路', t: '原國宮戲院前'},
            {v: '民有路', t: ''},
            {v: '華勝路', t: ''},
            {v: '民治路', t: ''},
            {v: '文昌路', t: ''},
            {v: '民有路', t: '都城隍廟'},
            {v: '華興街', t: '聖安宮側'},
            {v: '民治路', t: ''},
            {v: '吉祥路', t: '清潔隊前'},
            {v: '民有路', t: '天主教堂前'},
            {v: '公園路', t: '原農田水利會前'},
            {v: '文星路', t: ''},
            {v: '吉祥路', t: ''},
            {v: '民享路', t: ''},
            {v: '文昌路', t: ''},
            {v: '文明路右轉', t: ''},
            {v: '吉祥路左轉', t: ''},
            {v: '文仁路左轉', t: ''},
            {v: '文昌路', t: ''},
            {v: '文明路', t: ''},
            {v: '文明路155巷', t: ''},
            {v: '仁愛路', t: ''},
            {v: '民享路', t: ''},
            {v: '文昌路', t: '水利局前'},
            {v: '民治路', t: ''},
            {v: '華勝路', t: ''},
            {v: '勝利路', t: ''},
            {v: '大同路', t: '北埔路頭'},
            {v: '文化路', t: ''},
            {v: '公民路', t: '陳聖王廟前'},
            {v: '義民路', t: ''},
            {v: '中正路', t: '石頭路'},
            {v: '電信局前', t: ''},
            {v: '媽祖廟西邊', t: ''},
            {v: '民主路', t: '橫街仔'},
            {v: '土銀前', t: ''},
            {v: '郵局前', t: '圓環'},
            {v: '中正路左轉', t: ''},
            {v: '民權路', t: ''},
            {v: '民主路左轉', t: ''},
            {v: '文化路右轉', t: ''},
            {v: '文化路27巷', t: ''},
            {v: '右轉西勢街慈德寺前', t: ''},
            {v: '光明路', t: ''},
            {v: '義民路', t: ''},
            {v: '信義路52巷', t: ''},
            {v: '博愛路', t: '溝仔墘'},
            {v: '信義路', t: ''},
            {v: '中山路', t: ''},
            {v: '光明路', t: ''},
            {v: '博愛路', t: '舊蕃簽市'},
            {v: '中華路', t: ''},
            {v: '中山路', t: ''},
            {v: '入廟', t: ''}
          ]
        },
        { t: '三月十九日 晚上八點',
          vs: [
            {v: '出廟', t: ''},
            {v: '中山路', t: '宮口街'},
            {v: '民生路', t: '溪墘尾'},
            {v: '博愛路', t: '溝仔墘'},
            {v: '光明路', t: '麥仔程'},
            {v: '南陽國小前', t: ''},
            {v: '文化路', t: ''},
            {v: '西勢街', t: ''},
            {v: '旌義街', t: ''},
            {v: '義民廟前', t: ''},
            {v: '民榮街', t: '打鐵街'},
            {v: '褒新街', t: '埔仔新街'},
            {v: '福泰大飯店', t: ''},
            {v: '中正路', t: ''},
            {v: '花旗銀行前', t: ''},
            {v: '郵局前', t: '圓環'},
            {v: '民眾服務站前', t: ''},
            {v: '民權路', t: ''},
            {v: '中正路', t: ''},
            {v: '新民路', t: ''},
            {v: '大同路', t: ''},
            {v: '義民路', t: ''},
            {v: '公民路', t: ''},
            {v: '博愛路', t: '溪仔底'},
            {v: '民主路', t: '橫街仔'},
            {v: '媽祖廟西邊', t: ''},
            {v: '仁和路', t: ''},
            {v: '公民路', t: '國宮旅行社邊'},
            {v: '仁德街', t: ''},
            {v: '大同路', t: '牛車路'},
            {v: '益安路', t: ''},
            {v: '彌陀寺前', t: ''},
            {v: '中秋路', t: '車仔寮'},
            {v: '東榮街', t: ''},
            {v: '東陽巷', t: ''},
            {v: '水源街', t: '水道頭'},
            {v: '民生路', t: ''},
            {v: '中正路', t: ''},
            {v: '入廟', t: ''}
          ]
        },
        { t: '三月二十日 上午九點',
          vs: [
            {v: '出廟', t: ''},
            {v: '中山路', t: '宮口街'},
            {v: '光明路', t: ''},
            {v: '義民路', t: '陸橋東'},
            {v: '公民路', t: ''},
            {v: '新民路', t: '第一樓前'},
            {v: '大同路', t: '北埔路頭'},
            {v: '民樂路', t: ''},
            {v: '萬有紙廠前', t: ''},
            {v: '新街竹圍仔', t: ''},
            {v: '新街北壇', t: '新街碧水寺午餐'},
            {v: '回程', t: ''},
            {v: '新街碧水寺', t: ''},
            {v: '公園路', t: ''},
            {v: '文仁路158巷', t: ''},
            {v: '文仁路', t: ''},
            {v: '華勝路', t: ''},
            {v: '大同路', t: '向西'},
            {v: '光復路', t: ''},
            {v: '光復四路', t: ''},
            {v: '光復三路', t: ''},
            {v: '光復二路', t: ''},
            {v: '光復一路', t: ''},
            {v: '光復路', t: ''},
            {v: '華南路', t: ''},
            {v: '民生路', t: ''},
            {v: '陸橋西引道', t: ''},
            {v: '陸橋東引道', t: ''},
            {v: '民生路', t: ''},
            {v: '休息', t: ''}
          ]
        },
        { t: '三月二十日 下午兩點',
          vs: [
            {v: '出廟', t: ''},
            {v: '中山路', t: '宮口街'},
            {v: '民生路', t: ''},
            {v: '義民路', t: '陸橋東'},
            {v: '光明路', t: '麥仔程'},
            {v: '博愛路', t: '溪底'},
            {v: '代天宮前', t: '十六神'},
            {v: '義民路192巷', t: '新吉巷'},
            {v: '義民路', t: '向北'},
            {v: '文化路', t: '公園內就神社'},
            {v: '太平路', t: '沙崙仔'},
            {v: '文仁路', t: ''},
            {v: '公園路', t: ''},
            {v: '民政路', t: ''},
            {v: '北辰路', t: ''},
            {v: '民治路', t: ''},
            {v: '公園路', t: '舊水利會前'},
            {v: '民族路', t: ''},
            {v: '吉祥路', t: ''},
            {v: '民有路', t: '都城隍廟'},
            {v: '文昌路', t: '舊水利局前'},
            {v: '民治路', t: ''},
            {v: '公園路', t: ''},
            {v: '民享路', t: ''},
            {v: '華勝路', t: ''},
            {v: '民政路', t: ''},
            {v: '公園路', t: ''},
            {v: '文星路', t: ''},
            {v: '華勝路', t: ''},
            {v: '文明路', t: ''},
            {v: '大同路516巷出', t: ''},
            {v: '長安街', t: ''},
            {v: '協和街', t: ''},
            {v: '長治街', t: ''},
            {v: '介壽街', t: ''},
            {v: '文仁路', t: ''},
            {v: '大同路右轉', t: ''},
            {v: '舊太子宮邊', t: ''},
            {v: '懷恩街', t: ''},
            {v: '文仁路', t: ''},
            {v: '民樂路', t: ''},
            {v: '文星路', t: ''},
            {v: '仁愛路', t: ''},
            {v: '民政路', t: ''},
            {v: '華勝路', t: '南向'},
            {v: '民治路', t: ''},
            {v: '民樂路', t: '北向'},
            {v: '民享路', t: '西三角地帶'},
            {v: '大同路', t: '北埔路頭'},
            {v: '義民路', t: ''},
            {v: '中正路', t: '石頭路'},
            {v: '花旗銀行前', t: ''},
            {v: '郵局前', t: '圓環'},
            {v: '文化路', t: ''},
            {v: '光明路', t: '南陽國小前'},
            {v: '義民路', t: ''},
            {v: '旌義街', t: '義民廟口'},
            {v: '義民廟前', t: ''},
            {v: '博愛路', t: ''},
            {v: '中華路', t: ''},
            {v: '共和街', t: '舊蕃簽市'},
            {v: '安和街', t: '暗街仔'},
            {v: '中山路', t: ''},
            {v: '光明路', t: '老鼠仔衛生'},
            {v: '德為街', t: '竹圍仔內'},
            {v: '信義路', t: ''},
            {v: '興南街', t: ''},
            {v: '民生路', t: ''},
            {v: '益安路', t: ''},
            {v: '中華路', t: ''},
            {v: '中山路', t: ''},
            {v: '入廟', t: ''}
          ]
        },
        { t: '三月二十日 晚上八點',
          vs: [
            {v: '出廟', t: ''},
            {v: '中山路', t: '宮口街'},
            {v: '民生路', t: ''},
            {v: '水源街', t: '水道頭'},
            {v: '東興街', t: ''},
            {v: '益安路', t: '豬砧後'},
            {v: '公民路', t: ''},
            {v: '仁和路', t: '蜊仔街'},
            {v: '三連街', t: ''},
            {v: '公館街', t: '公館口'},
            {v: '仁德街', t: ''},
            {v: '舊台南中小企銀前', t: ''},
            {v: '博愛路', t: ''},
            {v: '中興街', t: ''},
            {v: '媽祖廟東邊', t: ''},
            {v: '媽祖廟前', t: ''},
            {v: '媽祖廟西邊', t: ''},
            {v: '中正路', t: '石頭路'},
            {v: '文化路', t: ''},
            {v: '嘉義客運前公民路', t: ''},
            {v: '義民路', t: ''},
            {v: '大同路', t: ''},
            {v: '博愛路', t: ''},
            {v: '代天宮前', t: ''},
            {v: '復興街', t: '公車巷'},
            {v: '文化路', t: '王應東橋'},
            {v: '郵局前', t: '圓環'},
            {v: '文化路', t: ''},
            {v: '文化路27巷', t: ''},
            {v: '文明巷', t: ''},
            {v: '慈德堂前', t: ''},
            {v: '光明路', t: ''},
            {v: '南陽國小前', t: ''},
            {v: '文化路', t: ''},
            {v: '西勢街', t: ''},
            {v: '義民路', t: ''},
            {v: '民主路', t: ''},
            {v: '博愛路', t: ''},
            {v: '光明路', t: ''},
            {v: '新興街', t: ''},
            {v: '信義路', t: ''},
            {v: '義民路', t: ''},
            {v: '民生路', t: '溪墘尾'},
            {v: '中山路', t: ''},
            {v: '入廟', t: ''}
          ]
        }
      ];
  $path.append (paths.map (function (t) {
    return $('<h3 />').addClass ('st').text (t.t).add ($('<section />').addClass ('vs').addClass ('p').append (t.vs.map (function (t) {
      return $('<span >').attr ('title', t.t !== '' ? '(' + t.t + ')' : '').text (t.v);
    })));
  }));

  var sorts = {
        local: {
          t: '地方陣頭',
          vs: [
            '報馬仔',
            '開路鼓（路關）',
            '大燈車',
            '金聲順開路鼓',
            '菜鋪金義順大旗',
            '屠宰鋪大旗',
            '北港東榮國小宋江陣',
            '北港建國國中管樂隊、太鼓隊',
            '北港育英國小一輪車隊',
            '北港國中管樂隊',
            '雲林縣北港鎮德義堂龍鳳獅協會',
            '雲林北港愛樂協會（北港樂團）',
            '雲林縣德義堂龍鳳獅武術協會',
            '北港集雅軒（北管）',
            '北港汾雅齋（南管）',
            '北港勤習堂',
            '北港新龍團',
            '北港老塗獅',
            '北港聚英社玄龍陣',
            '新街錦陞社',
            '武德堂國術館',
            '北港濟世會',
            '北港武德堂本館',
            '誠心宮神童團',
            '國立北港高中龍鳳閣',
            '北港新龍團',
            '北港飛龍團',
            '聖濟宮神童團',
            '北港嘉北會大鼓',
            '北港太子會',
            '北港童聯會',
            '北港忠義堂神童團',
            '聖母宮神童團',
            '五聯境聖佛堂',
            '北港都城隍廟',
            '北港灣內社區達摩祖師會',
            '光星綜藝團',
            '雲林縣彌勒團協會'
          ]
        },
        official: {
          t: '駕前陣頭',
          vs: [
            '聖震聲開路鼓',
            '哨角震威團',
            '執事牌',
            '鑾駕儀仗隊（點心鋪誠心順七十二隊）',
            '閭山堂神童團',

            '太子爺金垂髫轎班會',
            '虎爺',
            '笨港境主、福德正神金福綏轎班會',
            '註生娘娘 金瑞昭轎班會',
            '莊儀團、千里眼、順風耳將軍',
            '六媽金順崇轎班會',
            '五媽金豐隆轎班會',
            '四媽金安瀾轎班會',
            '三媽金盛豐轎班會',
            '二媽金順安轎班會',
            '祖媽金順盛轎班會',
            '新街碧水寺',
            '北港彌陀寺'
          ]
        }
      };
  $sort.append ($('<div />').addClass ('p').append ($('<div />').addClass ('l').append ($('<h3 />').addClass ('st').text (sorts.local.t)).append ($('<ol />').addClass ('vs').append (sorts.local.vs.map (function (t) {
    return $('<li />').text (t);
  })))).append ($('<div />').addClass ('r').append ($('<h3 />').addClass ('st').text (sorts.official.t)).append ($('<ol />').addClass ('vs').append (sorts.official.vs.map (function (t) {
    return $('<li />').text (t);
  })))));

  var precautions = [
        '今年聖母繞境爰例於農曆三月十九、二十日舉行兩天。',
        '神轎路經街道兩旁，各商家佃戶請勿曝曬衣物於明顯處，以免有失觀瞻及對媽祖不敬。',
        '繞境所經接到，如有樹木、車輛等障礙物，請鎮公所、各里辦公處及警察單位協助宣導清除，以保持路線之暢通。',
        '請北港、朴子、民雄分局及所轄派出所，協助依本宮媽祖繞境路線，於五日前先做全面之交通整頓與疏導工作，以保持路線之暢通。',
        '繞境隊伍行鏡中，請警方配合依行程、地段、時間作局部交通管制，以維持交通順暢。',
        '請北港義勇警察分隊及北港義勇交通隊，協助繞境隊伍所經路線之交通疏導及管制任務。',
        '聖駕路經之處請各里辦公處、各單位協助鼓勵各里民、商家、住戶在門前恭設香案、鮮花、水果恭迎聖駕，以表誠敬。',
        '為推行環保觀念，減少噪音即空氣污染，在繞境沿途請各里辦公處、各單位協助宣導，請信徒減少燃放炮竹，如需然放炮竹，在購買時應選用合格廠牌，並符合國家訂定安全標準，同時嚴禁成推燃放爆竹，並禁止在神轎底下施放，以防發生意外及對媽祖不敬，聖駕經過後請各里戶自行清掃炮屑，並請北港鎮公所垃圾車協助清運，以維護街道整潔。',
        '參加繞境陣頭請提早依序在廟後仁和路整隊後，依次到朝天宮前「起馬」，各隊「起馬」參神時間請勿超過五分鐘，以免影響聖母出巡時間及各地前來進香寺廟團體進出。',
        '各參加隊伍於繞境途中，應服從本宮所指派人員指揮，並保持隊伍適當距離及連貫性，以維持隊伍整齊。',
        '凡參加繞境遊行隊伍，不得有違背善良風俗之演出，如經發現，本宮楖不補助。',
        '各陣頭在二十日晚間繞境遊行結束前，請依序在廟前或中山路參神「落馬」，儀式以五分鐘為限。但在十九日及二十日媽祖神轎隊伍進入中山路，請個隊伍禮讓媽祖神轎優先入廟安坐。',
        '各轎班會及莊儀團於每日下午四時至四時三十分，晚上十一時至十一時三十分，統一擇一適當地點就地休息二十分為點心用餐時間，請各單位配合，以免影響遊行時間。',
        '本宮聖母出巡為祈求閤境平安，請各陣頭、藝閣、轎班會負責幹部、爐主、隨行護駕人員，切實督導，不得在隊伍及神轎週邊拋灑過路紙錢、冥紙等行為。',
        '為配合本鎮遊行道路寬度，重新規範藝閣車輛製作，以不超過長750公分、寬280公分，高420公分之限制，請各里鋪戶社團在訂製藝閣車輛時，應切實與作者說明規定尺寸，以配合遊行。',
        '參加遊行藝閣或花車應注意安全設施，各單位事前應派員驗收，對車輛之性能、燈光、電氣安全性人員乘坐安全性，如有不妥之處，應儘速請作者改善，同時要求作者每部車輛各自配備滅火器及絕緣材質高桿各兩支以上以備之用。',
        '藝閣在遊行中嚴禁丟擲糖果，以免造成意外。如遇下雨應切斷藝閣車輛總電源，以維護人員乘坐之安全。'
      ];
  $precaution.append ($('<ol />').addClass ('vs').append (precautions.map (function (t) {
    return $('<li />').text (t);
  })));

  $('#loading').fadeOut (function () {
    $(this).hide (function () {
      $(this).remove ();
    });
  });
});