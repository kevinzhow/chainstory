require('./style.less')
var Vue = require('vue')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['dialog'],
  components: {
    'app-background-cover': require('../background_cover')
  }
})

module.exports = component