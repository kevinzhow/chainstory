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
})

module.exports = component
