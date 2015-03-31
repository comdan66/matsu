/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {
  var datas = [
    {
      t: '國道系統',
      vs: [
        {
          t: '國道<b>3號</b> <b>古坑</b>系統交流道下轉接<b>78號快速道路</b>，由78號快速道路，<b>往台西方向</b>從<b>虎尾交流道下轉接145縣道</b>。',
          as: [
            {t: '路線地圖', h: 'https://mapsengine.google.com/map/u/0/embed?mid=zEfmZC4Gl95M.kGcuJxIpA6nE', p: 'iframe'}
          ]
        },
        {
          t: '國道<b>3號</b> <b>古坑</b>系統交流道下轉接<b>78號快速道路</b>，由78號快速道路，<b>往台西方向</b>從<b>元長交流道下轉接台19線</b>。',
          as: [
            {t: '路線地圖', h: 'https://mapsengine.google.com/map/u/0/embed?mid=zEfmZC4Gl95M.k-QyNTQBsO10', p: 'iframe'}
          ]
        },
        {
          t: '國道<b>1號</b> <b>雲林</b>系統交流道下轉接<b>78號快速道路</b>，由78號快速道路，<b>往台西方向</b>從<b>虎尾交流道下轉接145縣道</b>。',
          as: [
            {t: '路線地圖', h: 'https://mapsengine.google.com/map/u/0/embed?mid=zEfmZC4Gl95M.kRxbgqcFvGwE', p: 'iframe'}
          ]
        },
        {
          t: '國道<b>1號</b> <b>雲林</b>系統交流道下轉接<b>78號快速道路</b>，由78號快速道路，<b>往台西方向</b>從<b>元長交流道下轉接台19線</b>。',
          as: [
            {t: '路線地圖', h: 'https://mapsengine.google.com/map/u/0/embed?mid=zEfmZC4Gl95M.k3KNoro2Rf2g', p: 'iframe'}
          ]
        },
        {
          t: '國道<b>1號 嘉義</b>系統交流道下轉接<b>159縣道</b>，至<b>新港後轉接164縣道</b>。',
          as: [
            {t: '路線地圖', h: 'https://mapsengine.google.com/map/u/0/embed?mid=zAkuxpNutKN4.kJepdtkQsjYw', p: 'iframe'}
          ]
        }
      ]
    },
    {
      t: '大眾運輸',
      vs: [
        {
          t: '<b>高鐵嘉義站</b>往北港<b>嘉義客運</b>接駁車。',
          as: [
            {t: '路線資訊', h: 'img/site/position/01-01.jpg', p: 'pic'},
            {t: '網站資訊', h: 'http://wwm.cibus.com.tw/modules/tinyd1/index.php?id=4#place', p: 'link'}
          ]
        },
        {
          t: '<b>台北轉運總站</b>搭乘<b>統聯客運</b>往北港方向。',
          as: [
            {t: '路線資訊', h: 'http://www.ubus.com.tw/html/line/show.php?ix=1&page=1&station1=1&station2=207', p: 'link'},
            {t: '網站資訊', h: 'http://www.ubus.com.tw/html/line/search_list.php', p: 'link'}
          ]
        },
        {
          t: '<b>台中火車站</b>前搭乘<b>台中客運</b>往北港方向。',
          as: [
            {t: '路線資訊', h: 'img/site/position/01-02.png', p: 'pic'},
            {t: '網站資訊', h: 'http://www.taisibus.com/index.php?option=com_xmap', p: 'link'}
          ]
        },
        {
          t: '<b>斗六火車站</b>後站旁搭<b>台西客運</b>往北港。',
          as: [
            {t: '路線資訊1', h: 'img/site/position/01-03.png', p: 'pic'},
            {t: '路線資訊2', h: 'img/site/position/01-04.png', p: 'pic'},
            {t: '網站資訊', h: 'http://www.taisibus.com/content/view/180/', p: 'link'}
          ]
        },
        {
          t: '<b>嘉義市</b>火車站搭乘<b>嘉義客運</b>往北港方向。',
          as: [
            {t: '路線資訊1', h: 'img/site/position/01-06.jpg', p: 'pic'},
            {t: '路線資訊2', h: 'img/site/position/01-05.jpg', p: 'pic'},
            {t: '網站資訊', h: 'http://wwm.cibus.com.tw/modules/tinyd1/index.php?id=4#place', p: 'link'}
          ]
        },
        {
          t: '<b>高雄</b>搭乘<b>統聯客運</b>往北港方向。',
          as: [
            {t: '路線資訊1', h: 'http://www.ubus.com.tw/html/line/show.php?ix=1&page=1&station1=7&station2=207', p: 'link'},
            {t: '路線資訊2', h: 'http://www.ubus.com.tw/html/line/show.php?ix=2&page=1&station1=7&station2=207', p: 'link'},
            {t: '網站資訊', h: 'http://www.ubus.com.tw/html/line/search_list.php', p: 'link'}
          ]
        }
      ]
    }
  ];

  function setObjFeature ($obj) {
    if ($obj.attr ('target') !== '_blank')
      $obj.fancybox ({
        padding : 0,
        helpers : {overlay: {locked: false}, title : {type : 'over'}, thumbs: {width: 50, height: 50}},
        beforeLoad: function () { this.title = $(this.element).attr ('title'); }
      });
    return $obj;
  }

  $('#container').append (datas.map (function (t) {
    return $('<h2 />').addClass ('t').append (t.t).add (
      $('<ol />').addClass ('vs').append (t.vs.map (function (u) {
        return $('<li />').append (u.t).append (u.as.map (function (v) {
          return setObjFeature ($('<a />').addClass (v.p !== 'iframe' ? v.p !== 'pic' ? 'icon-link-external' : 'icon-map' : 'fancybox.iframe icon-location').attr ('title', $('<p />').html (u.t).text ()).attr ('href', v.h).attr ('target', v.p !== 'link' ? '_self' : '_blank').text (v.t));
        }));
      })));
  }));

  $('#loading').fadeOut (function () {
    $(this).hide (function () {
      $(this).remove ();
    });
  });
});