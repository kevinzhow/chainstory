require('./style.less')
var Vue = require('vue')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['dialog'],
  methods: {
      toggleDialog: function (event) {
          this.$dispatch('toggleTips', null);
      }
  },
  components: {
    'app-background-cover': require('../background_cover')
  }
})

module.exports = component
