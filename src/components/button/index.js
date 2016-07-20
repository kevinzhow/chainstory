require('./style.less')
var Vue = require('vue')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['buttonmsg', 'side']
})

module.exports = component
