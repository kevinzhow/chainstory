require('./style.less')
var Vue = require('vue'),
    moment = require('moment')

moment.locale('zh-cn')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['story'],
  methods: {
  },
  components: {
  },
  data: () => {
    return {
      moment: moment,
    }
  },
})

module.exports = component
