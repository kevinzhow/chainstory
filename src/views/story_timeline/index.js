var Vue = require('vue')

var Component = Vue.extend({
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      msg: 'This is page A.',
      buttonMsg: '我要续写',
      leftName: 'Bruce Lee',
      rightName: 'Chuck Norris',
      bubbles: [
        { user: { username:"左耳朵耗子", avatar: "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg" }, content: "小方这年刚刚考上北邮，正准备投身到祖国四化的伟大事业中，没想到一个人的发是无法预料的，要看历史的进程，小方的爸爸给小方取了个伟大的名字——滨兴，寓意着万邦来朝，祖国可以兴盛伟大。", likes: 130, created_at: "1 分钟前" },
        { user: { username:"周楷雯Kevin", avatar: "http://tva2.sinaimg.cn/crop.0.0.1242.1242.180/68c9c44djw8f0y66adyekj20yi0yigmt.jpg" }, content: "2017 年，北京政府实行了全面断网的政策，一时间，中国失去了和外界的联系，无数人都在猜测，这是新一代的闭关锁国，还是有所策划的一场大阴谋", likes: 130, created_at: "1 分钟前" }
      ],
      tipsBubble: {
        user: { username:"左耳朵耗子", avatar: "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg" }, content: "请点击我要续写续写本故事的矛盾"
      }
    }
  },
  components: {
    'app-header': require('../../components/header'),
    'app-pane': require('../../components/pane'),
    'app-compose-button': require('../../components/button'),
    'app-bubble': require('../../components/bubble'),
    'app-tips-bubble': require('../../components/tips_bubble')
  }
})

module.exports = Component
