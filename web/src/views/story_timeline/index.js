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
      dialogContent: { title: "情节卡", content: "为了推动剧情的发展，每个人在续写故事的时候都会抽取一个情节卡并续写和情节卡一致的内容，例如抽到了 狗血卡 那么无论当前剧情多么很单纯很不做作，都要续写一段狗血的剧情。" }
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
