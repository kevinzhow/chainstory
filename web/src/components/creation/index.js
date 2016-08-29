require('./style.less')
import config from "../../config"
import store from "../../store"

var Vue = require('vue'),
    VueRouter = require('vue-router'),
    router = new VueRouter()

let component = Vue.extend({
  template: require('./template.html'),
  props: ['dialog'],
  created() {

    

  },
  methods: {
      toggleCompose: function (event) {
          // this.$dispatch('timeline-toggleTips', null);
          console.log(config.WECHAT_URL)
          if(store.currentUser.username != '' ) {
            console.log("Login Success")
            this.$dispatch('toggleComposeDialog', null);
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
