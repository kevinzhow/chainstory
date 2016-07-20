module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      msg: 'This is page A.',
      buttonMsg: '我要续写',
      leftName: 'Bruce Lee',
      rightName: 'Chuck Norris'
    }
  },
  components: {
    'app-header': require('../../components/header'),
    'app-pane': require('../../components/pane'),
    'app-compose-button': require('../../components/button')
  }
}
