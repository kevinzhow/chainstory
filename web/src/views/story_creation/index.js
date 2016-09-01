var Vue = require('vue'),
     wx = require('weixin-js-sdk')
import store from "../../store"
import config from "../../config"

var Component = Vue.extend({
  template: require('./template.html'),
  replace: true,
  created () {
    document.title = "故事接龙 —— 字里行间"
    store.fetchStories().then(stories => {
      this.recent_stories = stories
    });
    wx.ready(function(){
      store.prepareWeChatHomePageShare({author:{avatar: "https://img.zi.com/images/logo.jpg/s120"}, content: "故事接龙，发现创作的乐趣"})
    });
  },
  events: {
    'toggleTips': function (tip) {
      // Toggle the writting tips dialog display state
      console.log(tip)

      switch (tip) {
        case config.TIP.newStory.name:
          this.dialogContent = config.TIP.newStory
          break
        case config.TIP.brand.name:
          this.dialogContent = config.TIP.brand
          break
      }
      
      this.toggleTips()
      
    },
    'toggleComposeDialog': function () {
      // Toggle the compose dialog display state
      this.toggleCompose()
    }
  },
  methods: {
    toggleTips: function (event) {
      this.tipsDialogState = !this.tipsDialogState
    },
    toggleCompose: function (event) {
      this.composeDialogState = !this.composeDialogState
    }
  },
  data: () => {
    return {
      composeDialogState: false,
      tipsDialogState: false,
      dialogContent: {},
      card: { name: "起头", type: 0 },
      recent_stories: []
    }
  },
  components: {
    'creation': require('../../components/creation'),
    'app-compose-dialog': require('../../components/compose_dialog'),
    'app-dialog': require('../../components/dialog'),
    'app-tips-dialog': require('../../components/dialog'),
    'story-card': require('../../components/story_card'),
  }
})

module.exports = Component
