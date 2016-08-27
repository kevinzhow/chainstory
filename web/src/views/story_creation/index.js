var Vue = require('vue')
import store from "../../store"
import config from "../../config"

var Component = Vue.extend({
  template: require('./template.html'),
  replace: true,
  created () {

  },
  events: {

  },
  methods: {

  },
  data: () => {
    return {
      currentUser: store.currentUser
    }
  },
  components: {
    'creation': require('../../components/creation')
  }
})

module.exports = Component
