require('./style.less')
import config from "../../config"
import store from "../../store"

var Vue = require('vue')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['dialog'],
  created() {
    if (this.$route.query.code != null && localStorage.getItem("access_token") == null) {
      store.fetchWXAccessToken(this.$route.query.code).then(json => {
        if (json.access_token == undefined) {
          console.log("Error Detacted")
        } else {
          this.currentUser = store.fullUser(json)
        }
      })
    } else {
      store.currentUser().then( user => {
        this.currentUser = user
      })
    }
  },
  methods: {
      toggleCompose: function (event) {
          // this.$dispatch('timeline-toggleTips', null);
          console.log(config.WECHAT_URL)
          if (config.PRODUCTION && this.currentUser.access_token == undefined) {
            window.location.href = config.WECHAT_URL(config.WECHAT.REDIRECT_URL)
          } else {
            if(this.currentUser.username != '' || this.currentUser.username != undefined) {
              console.log("Login Success " + this.currentUser.username)
              this.$dispatch('toggleComposeDialog', null);
            } 
          }

      },
      toggleTips: function (event) {
        this.$dispatch('toggleTips', config.TIP.brand.name);
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
