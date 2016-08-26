require('./style.less')
var Vue = require('vue')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['dialog'],
  methods: {
      toggleCompose: function (event) {
          // this.$dispatch('timeline-toggleTips', null);
      }
  },
  data: () => {
    return {
      buttonMsg: '我要起头'
    }
  },
  components: {
    'button': require('../button'),
    'bubble': require('../bubble')
  }
})

module.exports = component
