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
      {'name': 'position.html', 'titles': ['交通位置']},
      {'name': 'food.html', 'titles': ['小吃美食']}
    ]},

    {'titles': ['百年藝陣'], 'sub': [
      {'name': 'din-tao.html', 'titles': ['藝陣', '文化']},
      {'name': 'din-tao_map-19an.html', 'titles': ['十九下午', '繞境地圖']},
      {'name': 'din-tao_map-19ni.html', 'titles': ['十九晚間', '繞境地圖']},
      {'name': 'din-tao_map-20an.html', 'titles': ['二十下午', '繞境地圖']},
      {'name': 'din-tao_map-20ni.html', 'titles': ['二十晚間', '繞境地圖']}
    ]},

    {'titles': ['藝閣遊行'], 'sub': [
      {'name': 'i-ko.html', 'titles': ['藝閣', '文化']},
      {'name': 'i-ko_map-19an.html', 'titles': ['十九下午', '繞境地圖']},
      {'name': 'i-ko_map-19ni.html', 'titles': ['十九晚間', '繞境地圖']},
      {'name': 'i-ko_map-20an.html', 'titles': ['二十下午', '繞境地圖']},
      {'name': 'i-ko_map-20ni.html', 'titles': ['二十晚間', '繞境地圖']},
      {'name': 'i-ko_map-21ni.html', 'titles': ['廿一晚間', '繞境地圖']},
      {'name': 'i-ko_map-22ni.html', 'titles': ['廿二晚間', '繞境地圖']},
      {'name': 'i-ko_map-23ni.html', 'titles': ['廿三晚間', '繞境地圖']}
    ]},

    {'titles': ['網站聲明'], 'sub': [
      {'name': 'resource.html', 'titles': ['資料引用']},
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

  menu.forEach (function (t) {
    $items.append ($('<a />').addClass ('item').addClass (t.active ? 'active' : null).attr ('href', t.name).text (t.titles.join (' ')));
    $headerLeft.append ($('<a />').addClass (t.active ? 'active' : null).attr ('href', t.name).text (t.titles.join (' ')));

    if (t.sub && t.sub.length) {
      t.sub.forEach (function (u) {$items.append ($('<a />').addClass ('sub').addClass (u.active ? 'active' : null).attr ('href', u.name).text (u.titles.join (' ')));});

      if (t.active)
        t.sub.forEach (function (u) {
          $subItems.append ($('<a />').addClass (u.active ? 'active' : null).attr ('href', u.name).append (u.titles.map (function (v) {return $('<div />').text (v);})));});
    }
  });

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

});