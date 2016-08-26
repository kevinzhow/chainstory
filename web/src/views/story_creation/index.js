var Vue = require('vue')
import store from "../../store"

const currentUser = {
  username: "左耳朵耗子",
  uid: "",
  avatar: "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"
}

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
     
    }
  },
  components: {
    'creation': require('../../components/creation')
  }
})

module.exports = Component
