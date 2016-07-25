require('./style.less')
var Vue = require('vue')

let component = Vue.extend({
    template: require('./template.html'),
    props: ['state']
})

module.exports = component
