var Vue = require('vue')
import store from "../../store"
import config from "../../config"

var Component = Vue.extend({
  template: require('./template.html'),
  replace: true,
  created () {
    document.title = "故事接龙 —— 字里行间"
  },
  events: {
    'toggleTips': function (tip) {
      // Toggle the writting tips dialog display state
      console.log(tip)
      if (tip == "new_story") {
        this.dialogContent = { title: "起头", content: "在第一段，我们建议设定故事的时间，地点，人物。当起好头，埋好坑之后，分享给你的朋友，他将抽取一张剧情卡来完成续写任务。" }
      } else if (tip == "brand") {
        this.dialogContent = { title: "故事接龙", content: "故事接龙是 字里行间(zi.com) 出品的一款 HTML5 文字互动游戏，旨在发现创作的乐趣。" }
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
      composeContent: "",
      tipsDialogState: false,
      dialogContent: {},
    }
  },
  components: {
    'creation': require('../../components/creation'),
    'app-compose-dialog': require('../../components/compose_dialog'),
    'app-dialog': require('../../components/dialog'),
    'app-tips-dialog': require('../../components/dialog'),
  }
})

module.exports = Component
