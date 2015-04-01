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
        {t: '信箱', v: 'comdan66@gmail.com', h: 'mailto:comdan66@gmail.com?subject=關於北港迓媽祖網頁..&body=Hi OA,%0d%0a%0d%0a    關於北港迓媽祖網頁，我有些相關問題..'},
        {t: '臉書', v: 'https://www.facebook.com/comdan66', h: 'https://www.facebook.com/comdan66'},
        {t: '相簿', v: 'https://www.flickr.com/photos/comdan66', h: 'https://www.flickr.com/photos/comdan66'},
        {t: '網站', v: 'http://www.ioa.tw', h: 'http://www.ioa.tw'},
        {t: 'GitHub', v: 'https://github.com/comdan66', h: 'https://github.com/comdan66'}
      ],
      vs: [
        '藉由上傳照片的功能，讓廟會使人感動的美感分享給同好！站內多數資料是參考網路上前輩們對於地方研究敘述的資料藉由上傳照片的功能，讓廟會使人感動的美感分享給同好！站內多數資料是參考網路上前輩們對於地方研究敘述的資料藉由上傳照片的功能，讓廟會使人感動的美感分享給同好！站內多數資料是參考網路上前輩們對於地方研究敘述的資料藉由上傳照片的功能，讓廟會使人感動的美感分享給同好！站內多數資料是參考網路上前輩們對於地方研究敘述的資料',
        '藉由上傳照片的功能，讓廟會使人感動的美感分享給同好！站內多數資料是參考網路上前輩們對於地方研究敘述的資料藉由上傳照片的功能，讓廟會使人感動的美感分享給同好！站內多數資料是參考網路上前輩們對於地方研究敘述的資料',
        '藉由上傳照片的功能，讓廟會使人感動的美感分享給同好！站內多數資料是參考網路上前輩們對於地方研究敘述的資料藉由上傳照片的功能，讓廟會使人感動的美感分享給同好！站內多數資料是參考網路上前輩們對於地方研究敘述的資料藉由上傳照片的功能，讓廟會使人感動的美感分享給同好！站內多數資料是參考網路上前輩們對於地方研究敘述的資料',
        '藉由上傳照片的功能，讓廟會使人感動的美感分享給同好！站內多數資料是參考網路上前輩們對於地方研究敘述的資料'
      ],
      d: '2015.04.01'
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