require('./style.less')
var Vue = require('vue')
import store from "../../store"

let component = Vue.extend({
  template: require('./template.html'),
  props: ['content', 'creation', 'sid'],
  methods: {
    toggleComposeDialog: function (event) {
      if (this.story_title.length < 1 && this.story_content < 1) {
        this.$dispatch('toggleComposeDialog', null);
      } 

    },
    toggleTips: function (event) {
        this.$dispatch('toggleTips', null);
    },
    submit: function(event) {
      console.log("Submit Story")
      store.composeStory({title: story_title, content: story_content}, sid)
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
