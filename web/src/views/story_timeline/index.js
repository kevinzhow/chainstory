import store from "../../store"
import config from "../../config"

var Vue = require('vue'),
     _ = require('lodash'),
     wx = require('weixin-js-sdk'),
     jquery=require('jquery')


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

  },
  route: {
      data() {
        this.fetchData()
        wx.ready(function(){
          store.prepareWeChatShare(window.storyData)
        });
      }
  },
  ready() {
  },
  events: {
    'storyCreated': function () {
      // Toggle the writting tips dialog display state
      this.storyCreated = true
      this.$dispatch('toggleTips', config.TIP.shareStory.name);
    },
    'toggleTips': function (tip) {
      // Toggle the writting tips dialog display state
      console.log(tip)
      switch (tip) {
        case config.TIP.storyLine.name:
          this.dialogContent = config.TIP.storyLine
          break
        case config.TIP.shareStory.name:
          this.dialogContent = config.TIP.shareStory
          break
      }
      this.toggleTips()
    },
    'toggleCard': function (card) {
      // Toggle the writting tips dialog display state
      this.dialogContent = card
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
    newStoryCompose: function() {
      this.$router.go("/")
    },
    toggleTips: function (event) {
      this.tipsDialogState = !this.tipsDialogState
    },
    toggleCompose: function (event) {
      console.log(config.WECHAT_URL)
      if (config.PRODUCTION && this.currentUser.access_token == undefined) {
        window.location.href = config.WECHAT_URL(config.WECHAT.REDIRECT_URL+"story/"+this.sid)
      } else {
        if(this.currentUser.username != '' || this.currentUser.username != undefined) {
          console.log("Login Success " + this.currentUser.username)
          
          if (this.composeDialogState == false) {
            this.card = config.CARDS[Math.floor(Math.random() * config.CARDS.length)]
          }
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
        // console.log(json)
        this.storytitle = json.title
        document.title = "故事接龙: " + this.storytitle  + " " + (json.nodes.length + 1)
        window.storyData = json
        store.prepareWeChatShare(window.storyData)
        if (json.status == "Error") {
          alert("没有找到这个故事!")
        } else {
          var initArray = [
          {
            sid:json.sid, author: json.author, content: json.content, title: json.title, card: json.card,
            create_at: json.create_at, like_status: json.like_status, likes: json.likes
          }] 
          initArray = initArray.concat( json.nodes )
          var processArray = _.sortBy(initArray, ['create_at'])
          this.bubbles = processArray;
        }

        this.hasNewTimeLine = json.child_node_ids.length > 0

        if (this.hasNewTimeLine) {
          store.fetchStoriesBySid(this.sid).then( stories => {
            // console.log(stories)
            this.newTimelineBubbles = stories
          })
        } else {
          this.newTimelineBubbles = []
        }

        Vue.nextTick(function () {
          let scrollNum = document.getElementById(window.storyData.sid).offsetTop
          window.scrollTo(0,scrollNum - 69) 
        })



      })
    }
  },
  data: () => {
    return {
      buttonMsg: '我要续写',
      newButtonMsg: '新故事',
      tipsDialogState: false,
      storyCreated: false,
      composeDialogState: false,
      sid: "",
      storytitle: "",
      currentUser: {},
      bubbles: [],
      card: {},
      hasNewTimeLine: false,
      newTimelineBubbles: [],
      tipsBubble: { user: {username: store.currentUser.username, avatar: store.currentUser.avatar}},
      dialogContent: {}
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
