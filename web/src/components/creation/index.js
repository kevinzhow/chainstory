require('./style.less')
var Vue = require('vue')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['dialog'],
  methods: {
      toggleCompose: function (event) {
          // this.$dispatch('timeline-toggleTips', null);
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
