var Vue = require('vue')
import store from "../../store"
import config from "../../config"

var Component = Vue.extend({
  template: require('./template.html'),
  replace: true,
  created () {

  },
  events: {
    'toggleComposeDialog': function () {
      // Toggle the compose dialog display state
      this.toggleCompose()
    }
  },
  methods: {
    toggleCompose: function (event) {
      this.composeDialogState = !this.composeDialogState
    }
  },
  data: () => {
    return {
      currentUser: store.currentUser,
      composeDialogState: false,
      composeContent: ""
    }
  },
  components: {
    'creation': require('../../components/creation'),
    'app-compose-dialog': require('../../components/compose_dialog'),
    'app-dialog': require('../../components/dialog'),
  }
})

module.exports = Component
