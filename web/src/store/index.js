import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const serverURL = "http://0.0.0.0:9527"

const store = new EventEmitter()
export default store

store.currentUser = {
}

/**
 * Fetch user by wechat ID.
 */

store.createUser = wechat_id => {
  return fetch(serverURL+'/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "左耳朵耗子",
      type: 0,
      wx_openid: wechat_id,
      wb_openid: 'Gheri',
      avator: 'http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg'
    })
  }).then(function(response) {
    return response.json()
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
  })
}


/**
 * Fetch user by wechat ID.
 */

store.fetchUserWithWXOpenID = wechat_id => {
  return fetch(serverURL+'/users/wx_openid/'+wechat_id)
  .then(function(response) {
    return response
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
  })
}

/**
 * Fetch an story data with given id.
 */

store.fetchStory = id => {
  return fetch(serverURL+'/stories/'+id)
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
  return fetch(serverURL+'/stories', {
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
