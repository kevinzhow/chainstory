require('./style.less')
var Vue = require('vue')
import config from "../../config"

let component = Vue.extend({
  template: require('./template.html'),
  props: ['dialog'],
  methods: {
      toggleCompose: function (event) {
          // this.$dispatch('timeline-toggleTips', null);
          console.log(config.WECHAT_URL)
      },
      toggleTips: function (event) {
        
      }
  },
  data: () => {
    return {
      buttonMsg: '我要起头'
    }
  },
  components: {
    'button': require('../button'),
    'bubble': require('../bubble'),
    'tips-bubble': require('../tips_bubble')
  }
})

module.exports = component
