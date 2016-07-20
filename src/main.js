// With proper loader configuration you can load,
// pre-process and insert css directly with require().
// See webpack.config.js for details.
require('./main.less')

var Vue = require('vue')
var app = new Vue({
  el: '#app',
  data: {
    view: 'story-timeline'
  },
  components: {
    // define the main pages as async components.
    'story-timeline': function (resolve) {
      require(['./views/story_timeline'], resolve)
    },
    'story-compose': function (resolve) {
      require(['./views/story_compose'], resolve)
    }
  }
})

/**
 * Some really crude routing logic here, just for
 * demonstration purposes. The key thing to note here is
 * that we are simply changing the view of the root app -
 * Vue's async components and Webpack's code splitting will
 * automatically handle all the lazy loading for us.
 */

function route () {
  app.view = window.location.hash.slice(1) || 'story-timeline'
}

window.addEventListener('hashchange', route)
window.addEventListener('load', route)
