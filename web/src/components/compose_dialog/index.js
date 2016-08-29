require('./style.less')
var Vue = require('vue')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['content', 'creation'],
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
        this.$dispatch('toggleComposeDialog', null);
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
