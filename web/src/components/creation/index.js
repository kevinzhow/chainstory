require('./style.less')
var Vue = require('vue')
import config from "../../config"
var VueRouter = require('vue-router')
var router = new VueRouter()

let component = Vue.extend({
  template: require('./template.html'),
  props: ['dialog', 'currentuser'],
  methods: {
      toggleCompose: function (event) {
          // this.$dispatch('timeline-toggleTips', null);
          console.log(config.WECHAT_URL)
          if(this.currentuser.username != '' ) {
            console.log("Login Success")
            this.currentuser.username = "来吧"
            router.go("/timeline")
          }
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
