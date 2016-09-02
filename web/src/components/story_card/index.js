require('./style.less')
var Vue = require('vue'),
    moment = require('moment')

moment.locale('zh-cn')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['story'],
  methods: {
    moveToStory: function(event) {
      this.$router.go('/story/'+this.story.sid)
    }
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
