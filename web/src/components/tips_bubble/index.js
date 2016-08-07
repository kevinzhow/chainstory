require('./style.less')
var Vue = require('vue')

let component = Vue.extend({
    template: require('./template.html'),
    props: ['bubble'],
    methods: {
        toggleTips: function (event) {
            this.$dispatch('timeline-toggleTips', null);
        }
    }
})

module.exports = component
