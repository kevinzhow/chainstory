import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const store = new EventEmitter()
export default store

store.currentUser = {
  username: "左耳朵耗子",
  uid: "",
  avatar: "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"
}
/**
 * Fetch an story data with given id.
 */

store.fetchStory = id => {
  return fetch('/stories/'+id)
  .then(function(response) {
    return response.json()
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
  })
}

/**
 * Create an story.
 */

store.composeStory = () => {
  return fetch('/stories', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Hubot',
      login: 'hubot',
    })
  }).then(function(response) {
    return response.json()
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
  })
}
