/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var now = document.URL.replace (/^.*[\\\/]/, '');
  var footer = [
    'matsu © 2015',
    "如有相關問題歡迎<a href='mailto:comdan66@gmail.com?subject=關於北港迎媽祖網頁..&body=Hi OA,%0d%0a%0d%0a    關於北港迎媽祖網頁，我有些相關問題..'>來信</a>或至<a href='https://www.facebook.com/comdan66' target='_blank'>作者臉書</a>留言。"
  ];
  var mainMenu = [
    {name: '首頁', file: 'index.html'},
  ];

  var $loading = $('<div />').attr ('id', 'loading').append ($('<div />')).appendTo ($('body').append ($('<div />').attr ('id', 'footer').append (footer.map (function (t) {
    return $('<div />').append (t);
  }))).prepend ($('<div />').attr ('id', 'header').append ($('<div />').append (mainMenu.map (function (t) {
    return $('<a />').addClass (now == t.file ? 'active' : null).attr ('href', t.file).append (t.name);
  })))));

  $('pre').each (function () {
    var length = $(this).parent ().html ().indexOf ('<pre') + 1;
    $(this).html ($(this).html ().replace (new RegExp ("(\n {" + length + "})|(^ {" + length + "})", 'g'), '\n').replace (/^\n/g, '').replace (/ *$/g, ''));
  });

  $loading.fadeOut (function () {
    $(this).hide (function () {
      $(this).remove ();
      console.error ('ss');
    });
  });
});