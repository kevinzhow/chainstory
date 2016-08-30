var Vue = require('vue')
import store from "../../store"
import config from "../../config"
var moment = require('moment')
moment.locale('zh-cn');

var Component = Vue.extend({
  template: require('./template.html'),
  replace: true,
  created () {
    if (this.$route.query.code != null && localStorage.getItem("access_token") == null) {
      store.fetchWXAccessToken(this.$route.query.code).then(json => {
        if (json.access_token == undefined) {
          console.log("Error Detacted")
        } else {
          this.currentUser = store.fullUser(json)
          this.tipsBubble = { user: { username: this.currentUser.username, avatar: this.currentUser.avatar }, content: "请点击我要续写抽取情节卡"}
        }
      })
    } else {
      store.currentUser().then( user => {
        this.currentUser = user
        this.tipsBubble = { user: { username: user.username, avatar: user.avatar }, content: "请点击我要续写抽取情节卡"}
      })
    }
    this.fetchData()
  },
  events: {
    'toggleTips': function () {
      // Toggle the writting tips dialog display state
      this.toggleTips()
    },
    'toggleComposeDialog': function () {
      // Toggle the compose dialog display state
      this.toggleCompose()
    },
    'refetchData': function (sid) {
      // Toggle the compose dialog display state
      this.fetchData(sid)
    }
  },
  methods: {
    toggleTips: function (event) {
      this.tipsDialogState = !this.tipsDialogState
    },
    toggleCompose: function (event) {
      console.log(config.WECHAT_URL)
      if (config.PRODUCTION && this.currentUser.access_token == undefined) {
        window.location.href = config.WECHAT_URL
      } else {
        if(this.currentUser.username != '' || this.currentUser.username != undefined) {
          console.log("Login Success " + this.currentUser.username)
          this.composeDialogState = !this.composeDialogState
        } 
      }
    },
    fetchData: function(sid) {
      if (sid != undefined) {
        this.sid = sid
      } else {
        this.sid = this.$route.params.sid
      }
      // Fetch story by story id
      store.fetchStory(this.sid).then(json => {
        console.log(json)
        this.storytitle = json.title
        document.title = this.storytitle

        if (json.status == "Error") {
          alert("没有找到这个故事!")
        } else {
          var initArray = [
          {
            sid:json.sid, author: json.author, content: json.content, title: json.title,
            create_at: moment.unix(json.create_at).calendar(), like_status: json.like_status, likes: json.likes
          }] 

          console.log("Reload bubbles for "+ this.sid)
          console.log(json.nodes)
          var processArray = []
          json.nodes.forEach(function (story) {
            story.create_at = moment.unix(story.create_at).calendar()
            processArray.push(story)
          });
          this.bubbles = initArray.concat( processArray ).reverse()
        }
      })
    }
  },
  data: () => {
    return {
      buttonMsg: '我要续写',
      tipsDialogState: false,
      composeDialogState: false,
      composeContent: "",
      sid: "",
      storytitle: "",
      currentUser: {},
      bubbles: [],
      tipsBubble: { user: {username: store.currentUser.username, avatar: store.currentUser.avatar}, content: ""},
      dialogContent: { title: "矛盾", content: "在这一段内容里，我们建议您创作本故事的矛盾。小说故事中的矛盾冲突是形成情节的基础，也是推动情节发展的动力，冲突双方的人物性格，则直接决定了情节进展的趋向。矛盾往往代表了阻挠主角欲望的内容。" }
    }
  },
  components: {
    'app-compose-button': require('../../components/button'),
    'app-bubble': require('../../components/bubble'),
    'app-tips-bubble': require('../../components/tips_bubble'),
    'app-tips-dialog': require('../../components/dialog'),
    'app-compose-dialog': require('../../components/compose_dialog'),
    'card-section': require('../../components/card_section')
  }
})

module.exports = Component
