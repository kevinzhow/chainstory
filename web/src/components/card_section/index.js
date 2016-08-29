require('./style.less')
var Vue = require('vue')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['author'],
  created () {
  },
  methods: {
  },
})

module.exports = component
