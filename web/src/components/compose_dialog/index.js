require('./style.less')
var Vue = require('vue')

let component = Vue.extend({
  template: require('./template.html'),
  props: ['content'],
  methods: {
    toggleComposeDialog: function (event) {
        this.$dispatch('toggleComposeDialog', null);
    }
  },
  components: {
    'app-background-cover': require('../background_cover'),
    'submit-button': require('../button')
  }
})

module.exports = component
