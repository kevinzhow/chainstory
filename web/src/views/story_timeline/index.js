var Vue = require('vue')

var Component = Vue.extend({
  template: require('./template.html'),
  replace: true,
  methods: {
      toggle: function (event) {
        this.dialogState = !this.dialogState
      }
    },
  data: function () {
    return {
      msg: 'This is page A.',
      buttonMsg: '我要续写',
      leftName: 'Bruce Lee',
      rightName: 'Chuck Norris',
      dialogState: false,
      bubbles: [
        { user: { username:"左耳朵耗子", avatar: "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg" }, content: "小方这年刚刚考上北邮，正准备投身到祖国四化的伟大事业中，没想到一个人的发是无法预料的，要看历史的进程，小方的爸爸给小方取了个伟大的名字——滨兴，寓意着万邦来朝，祖国可以兴盛伟大。", likes: 130, created_at: "1 分钟前" },
        { user: { username:"周楷雯Kevin", avatar: "http://tva2.sinaimg.cn/crop.0.0.1242.1242.180/68c9c44djw8f0y66adyekj20yi0yigmt.jpg" }, content: "2017 年，北京政府实行了全面断网的政策，一时间，中国失去了和外界的联系，无数人都在猜测，这是新一代的闭关锁国，还是有所策划的一场大阴谋", likes: 130, created_at: "1 分钟前" }
      ],
      tipsBubble: {
        user: { username:"左耳朵耗子", avatar: "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg" }, content: "请点击我要续写续写本故事的矛盾"
      },
      dialogContent: { title: "矛盾", content: "在这一段内容里，我们建议您创作本故事的矛盾。小说故事中的矛盾冲突是形成情节的基础，也是推动情节发展的动力，冲突双方的人物性格，则直接决定了情节进展的趋向。矛盾往往代表了阻挠主角欲望的内容。" }
    }
  },
  components: {
    'app-header': require('../../components/header'),
    'app-compose-button': require('../../components/button'),
    'app-bubble': require('../../components/bubble'),
    'app-tips-bubble': require('../../components/tips_bubble'),
    'app-background-cover': require('../../components/background_cover'),
    'app-dialog': require('../../components/dialog')
  }
})

module.exports = Component
