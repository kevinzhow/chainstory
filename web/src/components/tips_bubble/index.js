require('./style.less')
var Vue = require('vue')
import config from "../../config"

let component = Vue.extend({
    template: require('./template.html'),
    props: ['bubble'],
    methods: {
        toggleTips: function (event) {
            this.$dispatch('toggleTips', config.TIP.storyLine.name);
        }
    }
})

module.exports = component
