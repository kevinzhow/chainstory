import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const serverURL = "http://0.0.0.0:9527/api"

const store = new EventEmitter()
export default store

var _currentUser = {}

store.currentUser = ()=> {
  return new Promise(function (resolve, reject){
    if (_currentUser.username == undefined) {
      console.log("Fetch Current User")
      store.fetchUserWithWXOpenID("zuoerduo").then(response => {
        if (response.status == "Error") {
          store.createUser("zuoerduo").then(response => {
            resolve(store.fullUser(response))
          })
        } else {
          resolve(store.fullUser(response))
        }
      })
    } else {
      resolve(_currentUser)
    }
  })
}

/**
 * Fill user data
 */

store.fullUser = user => {
  _currentUser = {
    username: user.name,
    avatar: user.avatar,
    uid: user.uid,
    wx_openid: user.wx_openid,
    wb_openid: user.wb_openid
  }
  return _currentUser
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
      name: "左耳朵耗子2",
      type: 0,
      wx_openid: wechat_id,
      wb_openid: 'Gheri',
      avatar: 'http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg'
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
  return fetch(serverURL+'/user/wx_openid/'+wechat_id)
  .then(function(response) {
    return response.json()
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
  })
}

/**
 * Fetch an story data with given id.
 */

store.fetchStory = id => {
  return fetch(serverURL+'/story/'+id)
  .then(function(response) {
    return response.json()
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
  })
}

/**
 * Create an story.
 */

store.composeStory = (story, sid) => {
  var storyData = {
      author: { uid: _currentUser.uid },
      title: story.title,
      content: story.content,
      parent_id: sid
  }
  console.log(storyData)
  return fetch(serverURL+'/story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(storyData)
  }).then(function(response) {
    return response.json()
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
  })
}
