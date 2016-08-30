require('./style.less')
var Vue = require('vue')
import store from "../../store"
var VueRouter = require('vue-router')
var router = new VueRouter()

let component = Vue.extend({
  template: require('./template.html'),
  props: ['content', 'creation', 'sid', 'storytitle', 'tip', 'card'],
  created() {

  },
  methods: {
    toggleComposeDialog: function (event) {
      if (this.story_title.length < 1 && this.story_content < 1) {
        this.$dispatch('toggleComposeDialog', null);
      } 

    },
    toggleTips: function (event) {
      if (this.tip == null) {
        this.$dispatch('toggleCard', this.card);
      } else {
        this.$dispatch('toggleTips', this.tip);
      }

    },
    submit: function(event) {
      console.log("Submit Story " + this.sid)
      if (this.sid != undefined) {
        this.story_title = this.storytitle
      }
      store.composeStory({title: this.story_title, content: this.story_content}, this.sid).then(json => {
        console.log(json)
        if (json.status == "Error" || json.sid == undefined) {

        } else {
          router.go({path:"/story/"+json.sid})
          this.$dispatch('refetchData', json.sid);
          this.$dispatch('toggleComposeDialog', null);
        }
      })
    }
  },
  data: () => {
    return {
      story_title: "",
      story_content: ""
    }
  },
  components: {
    'app-background-cover': require('../background_cover'),
    'submit-button': require('../button'),
    'app-tips-bubble': require('../tips_bubble'),
  }
})

module.exports = component
