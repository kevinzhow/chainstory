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
    if (this.$route.query.code != null) {
      console.log("Has code " + this.$route.query.code)
      store.fetchWXAccessToken(this.$route.query.code).then(json => {
        console.log(json)
        if (json.status == "Error" || json.sid == undefined) {

        } else {
        }
      })
    }
    store.currentUser().then( user => {
      this.currentUser = user
    })
  },
  methods: {
      toggleCompose: function (event) {
          // this.$dispatch('timeline-toggleTips', null);
          console.log(config.WECHAT_URL)
          if (config.PRODUCTION) {
            window.location.href = config.WECHAT_URL
          } else {
            if(this.currentUser.username != '' ) {
              console.log("Login Success " + this.currentUser.username)
              this.$dispatch('toggleComposeDialog', null);
            } 
          }

      },
      toggleTips: function (event) {
        
      }
  },
  data: () => {
    return {
      currentUser: {},
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
