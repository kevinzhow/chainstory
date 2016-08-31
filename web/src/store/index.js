import { EventEmitter } from 'events'
import CONFIG from "../config"
var wx = require('weixin-js-sdk')

const demoUser = CONFIG.DEMOUSER1
const serverURL = CONFIG.SERVER_URL
const store = new EventEmitter()
export default store

var _currentUser = {}

store.prepareWeChatShare = story => {
  wx.checkJsApi({
    jsApiList: ["onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareTimeline"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
      if (res.checkResult.onMenuShareTimeline) {
         wx.onMenuShareTimeline({
          title: document.title + " - " + story.author.name, // 分享标题
          link: location.href, // 分享链接
          imgUrl: story.author.avatar, // 分享图标
          success: function () { 
          },
          cancel: function () { 
          }
        });
      }

      if (res.checkResult.onMenuShareAppMessage) {
        wx.onMenuShareAppMessage({
            title: document.title + " - " + story.author.name, // 分享标题
            desc: story.content, // 分享描述
            link: location.href, // 分享链接
            imgUrl: story.author.avatar, // 分享图标
            success: function () { 
            },
            cancel: function () { 
            }
        });
      }
    }
  });

}

store.prepareWeChatHomePageShare = story => {
  wx.checkJsApi({
    jsApiList: ["onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareTimeline"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
      if (res.checkResult.onMenuShareTimeline) {
         wx.onMenuShareTimeline({
          title: document.title, // 分享标题
          link: location.href, // 分享链接
          imgUrl: story.author.avatar, // 分享图标
          success: function () { 
          },
          cancel: function () { 
          }
        });
      }

      if (res.checkResult.onMenuShareAppMessage) {
        wx.onMenuShareAppMessage({
            title: document.title, // 分享标题
            desc: story.content, // 分享描述
            link: location.href, // 分享链接
            imgUrl: story.author.avatar, // 分享图标
            success: function () { 
            },
            cancel: function () { 
            }
        });
      }
    }
  });

}

store.fetchWXAccessToken = wechat_code => {
  return fetch(serverURL+'/user/wx_oauth?wx_code='+wechat_code, {
    method: 'GET',
  }).then(function(response) {
    console.log("Wexin User Fetched")
    return response.json()
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
  })
}

store.fetchWXUserInfo = (access_token, open_id) => {
  return fetch(CONFIG.WECHAT_USERINFO_URL(access_token, open_id), {
    method: 'GET',
  }).then(function(response) {
    console.log("Wexin User Info Fetched")
    return response.json()
  }).catch(function(ex) {
    console.log('parsing story failed', ex)
  })
}

store.currentUser = ()=> {
  return new Promise(function (resolve, reject){
    if (_currentUser.username == undefined && !CONFIG.PRODUCTION) {
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
      _currentUser = {
        username: localStorage.getItem("nickname"),
        avatar: localStorage.getItem("avatar"),
        uid: localStorage.getItem("uid"),
        wx_openid: localStorage.getItem("wx_openid"),
        wb_openid: localStorage.getItem("wb_openid"),
        access_token: localStorage.getItem("access_token")
      }
      resolve(_currentUser)
    }
  })
}

/**
 * Fill user data
 */

store.fullUser = user => {
  localStorage.setItem("access_token", user.access_token)
  localStorage.setItem("nickname", user.name)
  localStorage.setItem("avatar", user.avatar)
  localStorage.setItem("uid", user.uid)
  localStorage.setItem("wx_openid", user.wx_openid)
  _currentUser = {
    username: user.name,
    avatar: user.avatar,
    uid: user.uid,
    wx_openid: user.wx_openid,
    wb_openid: user.wb_openid,
    access_token: user.access_token
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
 * Fetch stories data.
 */

store.fetchStories = id => {
  return fetch(serverURL+'/stories')
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
      parent_id: sid,
      card: story.card
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
