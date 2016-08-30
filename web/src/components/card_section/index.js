require('./style.less')
var Vue = require('vue')
 _ = require('lodash')
import config from "../../config"

let component = Vue.extend({
  template: require('./template.html'),
  props: ['author', 'card'],
  created () {
  	var cardType = this.card
  	var cardData =  _.find(config.CARDS, function(o) { return o.type == cardType })
  	this.cardName = cardData.name
  },
  methods: {
  },
  data: () => {
    return {
      cardName: "",
    }
  },
})

module.exports = component
