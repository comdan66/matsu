/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var $rightSlide = $('#right_slide');
  var $slideCover = $('#slide_cover');
  var $headerLeft = $('#header .l');
  var $subItems = $('#sub_items');
  var $items = $rightSlide.children ('.items');
  var $option = $('#option');

  var overflow = $('body').css ('overflow');
  var now = document.URL.replace (/^.*[\\\/]/, '');
  var timer = null;

  var menu = [
    {'titles': ['北港媽祖'], 'sub': [
      {'name': 'chao-tian.html', 'titles': ['朝天宮']},
      {'name': '03-19.html', 'titles': ['三月十九']},
      {'name': 'position.html', 'titles': ['交通資訊']},
      {'name': 'tourism-food.html', 'titles': ['旅遊美食']}
    ]},

    {'titles': ['百年藝陣'], 'sub': [
      {'name': 'din-tao.html', 'titles': ['陣頭隊伍', '路關總覽']},
      {'name': 'din-tao_map-19an.html', 'titles': ['十九下午', '繞境地圖']},
      {'name': 'din-tao_map-19ni.html', 'titles': ['十九晚間', '繞境地圖']},
      {'name': 'din-tao_map-20an.html', 'titles': ['二十下午', '繞境地圖']},
      {'name': 'din-tao_map-20ni.html', 'titles': ['二十晚間', '繞境地圖']}
    ]},

    {'titles': ['藝閣遊行'], 'sub': [
      {'name': 'i-ko.html', 'titles': ['藝閣路關', '路關總覽']},
      {'name': 'i-ko_map-19an.html', 'titles': ['十九下午', '繞境地圖']},
      {'name': 'i-ko_map-19ni.html', 'titles': ['十九晚間', '繞境地圖']},
      {'name': 'i-ko_map-20an.html', 'titles': ['二十下午', '繞境地圖']},
      {'name': 'i-ko_map-20ni.html', 'titles': ['二十晚間', '繞境地圖']},
      {'name': 'i-ko_map-21ni.html', 'titles': ['廿一晚間', '繞境地圖']},
      {'name': 'i-ko_map-22ni.html', 'titles': ['廿二晚間', '繞境地圖']},
      {'name': 'i-ko_map-23ni.html', 'titles': ['廿三晚間', '繞境地圖']}
    ]},

    {'titles': ['網站聲明'], 'sub': [
      {'name': 'reference.html', 'titles': ['參考資料']},
      {'name': 'disclaimer.html', 'titles': ['分享聲明']},
      {'name': 'developer.html', 'titles': ['開發人員']}
    ]}
  ];

  menu = menu.map (function (t) {
    var has = false;

    if (t.sub && t.sub.length) {
      t.name = t.sub[0].name;
      t.sub = t.sub.map (function (u) {
        has |= u.active = (now == u.name);
        return u;
      });
    }

    t.active = has ? true : false;
    return t;
  });

  var subs = menu.map (function (t) {
    $items.append ($('<a />').addClass ('item').addClass (t.active ? 'active' : null).attr ('href', t.name).text (t.titles.join (' ')));
    $headerLeft.append ($('<a />').addClass (t.active ? 'active' : null).attr ('href', t.name).text (t.titles.join (' ')));

    if (t.sub && t.sub.length) {
      t.sub.forEach (function (u) {$items.append ($('<a />').addClass ('sub').addClass (u.active ? 'active' : null).attr ('href', u.name).text (u.titles.join (' ')));});

      if (t.active)
        t.sub.forEach (function (u) {
          $subItems.append ($('<a />').addClass (u.active ? 'active' : null).attr ('href', u.name).append (u.titles.map (function (v) {return $('<div />').text (v);})));});

      return t.sub;
    } else {
      return null;
    }
  })
  .filter (function (t) { return t; })
  .reduce (function (t, u) { return t.concat (u); });

  var index = subs.map (function (t) { return t.active; }).indexOf (true);
  var next = subs[index + 1] ? subs[index + 1] : {'name': subs[0].name, 'titles': ['回首頁'], 'active': false};
  var prev = subs[index - 1] ? subs[index - 1] : {'name': subs[subs.length - 1].name, 'titles': subs[subs.length - 1].titles, 'active': false};

  $('#pagination .l').append ($('<a />').attr ('href', prev.name).append ($('<div />').addClass ('a')).append ($('<div />').addClass ('v').append ($('<div />').text ('上一頁')).append ($('<div />').text (prev.titles.join (' ')))));
  $('#pagination .r').append ($('<a />').attr ('href', next.name).append ($('<div />').addClass ('a')).append ($('<div />').addClass ('v').append ($('<div />').text ('下一頁')).append ($('<div />').text (next.titles.join (' ')))));
  $('a.icon-home').attr ('href', subs[0].name);

  $option.click (function () {
    if ($rightSlide.hasClass ('close')) {
      $rightSlide.removeClass ('close');
      $('body').css ('overflow', 'hidden');
      $option.addClass ('close');
    } else {
      $rightSlide.addClass ('close');
      $('body').css ('overflow', overflow);
      $option.removeClass ('close');
    }

  });
  $slideCover.click (function () {
    if (!$rightSlide.hasClass ('close')) {
      $rightSlide.addClass ('close');
      $('body').css ('overflow', overflow);
      $option.removeClass ('close');
    }
  });

  $('#sub_items a').OAripple ().OAjelly ().click (function (e) {
    $(this).siblings ().removeClass ('active');
    clearTimeout (timer);
    timer = setTimeout (function () {
      window.location.assign ($(this).attr ('href'));
    }.bind ($(this)), 500);
    return false;
  });

  $('#pagination .l a, #pagination .r a').OAripple ().OAjelly ().click (function (e) {
    clearTimeout (timer);
    timer = setTimeout (function () {
      window.location.assign ($(this).attr ('href'));
    }.bind ($(this)), 550);
    return false;
  });
});