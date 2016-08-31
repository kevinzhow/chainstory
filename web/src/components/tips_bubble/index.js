require('./style.less')
var Vue = require('vue')
import config from "../../config"

let component = Vue.extend({
    template: require('./template.html'),
    props: ['bubble'],
    created() {
    },
    methods: {
        toggleTips: function (event) {
            this.$dispatch('toggleTips', config.TIP.storyLine.name);
        }
    },
	data: () => {
		return {
		  styleData: "",
		  hasCurrentUser: false
		}
	},
})

module.exports = component
