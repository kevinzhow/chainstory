require('./style.less')
var Vue = require('vue'),
    moment = require('moment')
moment.locale('zh-cn')
let component = Vue.extend({
    template: require('./template.html'),
    props: ['bubble'],
	data: () => {
		return {
		  moment: moment,
		}
	},
	methods: {
		moveToStory: function(event) {
		  console.log(this.bubble.sid)
		  if (this.bubble.sid != "") {
		  	this.$router.go('/story/'+this.bubble.sid)
		  }
		}
	},
})

module.exports = component
