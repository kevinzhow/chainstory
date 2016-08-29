var Vue = require('vue')
import store from "../../store"

var Component = Vue.extend({
  template: require('./template.html'),
  replace: true,
  created () {
    this.fetchData()
    store.currentUser().then( user => {
      this.tipsBubble = { user: {username: user.username, avatar: user.avatar}, content: "请点击我要续写抽取情节卡"}
    })
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
      this.composeDialogState = !this.composeDialogState
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
        if (json.status == "Error") {

        } else {
          var initArray = [
          {
            sid:json.sid, author: json.author, content: json.content, 
            create_at: json.create_at, like_status: json.like_status, likes: json.likes
          }] 

          console.log("Reload bubbles for "+ this.sid)
          console.log(json.nodes.length)
          this.bubbles = initArray.concat( json.nodes ).reverse()
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
    'app-compose-dialog': require('../../components/compose_dialog')
  }
})

module.exports = Component
