// With proper loader configuration you can load,
// pre-process and insert css directly with require().
// See webpack.config.js for details.
require('./main.less')

var Vue = require('vue')
var VueRouter = require('vue-router')
Vue.use(VueRouter)

var router = new VueRouter()

router.map({
    '/': {
      component: function (resolve) {
        require(['./views/story_creation'], resolve)
      }
    },
    '/timeline': {
      component: function (resolve) {
        require(['./views/story_timeline'], resolve)
      }
    }
})

Vue.config.debug = true

var App = Vue.extend({})
/**
 * Some really crude routing logic here, just for
 * demonstration purposes. The key thing to note here is
 * that we are simply changing the view of the root app -
 * Vue's async components and Webpack's code splitting will
 * automatically handle all the lazy loading for us.
 */

router.start(App, '#app')
