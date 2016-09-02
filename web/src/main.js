// With proper loader configuration you can load,
// pre-process and insert css directly with require().
// See webpack.config.js for details.
require('./main.less')
var Vue = require('vue'),
    VueRouter = require('vue-router'),
    VueTouch = require('vue-touch'),
    config = require('./config'),
    wx = require('weixin-js-sdk');
Vue.use(VueRouter)
Vue.use(VueTouch)

var router = new VueRouter({history: true, root: '/chainstory'})
var locationUrl = encodeURIComponent(location.href.replace(/\#.*/,''))

fetch("https://zi.com/zi/mp/jsapi?url="+locationUrl, {
    method: 'GET',
  }).then(function(response) {
    return response.json()
  }).then(function(data) {
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx9cff8ab5cdfc158d', // 必填，公众号的唯一标识                 
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, //必填，签名，见附录1
        jsApiList: ["onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareTimeline", "hideMenuItems","showMenuItems","previewImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
})

router.map({
    '/': {
      component: function (resolve) {
        require(['./views/story_creation'], resolve)
      }
    },
    '/story/:sid': {
      component: function (resolve) {
        require(['./views/story_timeline'], resolve)
      }
    },
    '*': {
      component: require('./views/story_creation')
    },
})

Vue.config.debug = true

var App = Vue.extend({})
/**
 * Some really crude routing logic here, just for
 * demonstration purposes. The key thing to note here is
 * that we are simply changing the view of the root app -
 * Vue's async components and Webpack's code splitting will
 * automatically handle all the lazy loading for us.
 */

router.start(App, '#app')
