import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'
import CONFIG from "../config"

const demoUser = CONFIG.DEMOUSER1
const serverURL = CONFIG.SERVER_URL
const store = new EventEmitter()
export default store

var _currentUser = {}

store.fetchWXAccessToken = wechat_code => {
  return fetch(serverURL+'/user/wx_oauth?wx_code='+wechat_code, {
    method: 'GET',
  }).then(function(response) {
    console.log("Wexin User Fetched")
    console.log(response)
    return response.json()
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
  })
}

store.currentUser = ()=> {
  return new Promise(function (resolve, reject){
    if (_currentUser.username == undefined) {
      console.log("Fetch Current User")
      store.fetchUserWithWXOpenID(demoUser.wx_openid).then(response => {
        if (response.status == "Error") {
          console.log("Prepare User Creation")
          store.createUser(demoUser.wx_openid).then(response => {
            resolve(store.fullUser(response))
          })
        } else {
          console.log("User Found")
          resolve(store.fullUser(response))
        }
      })
    } else {
      console.log("User Prepared")
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
  console.log(user)
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
      name: demoUser.username,
      type: 0,
      wx_openid: wechat_id,
      wb_openid: demoUser.wb_openid,
      avatar: demoUser.avatar
    })
  }).then(function(response) {
    console.log("User Created")
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
