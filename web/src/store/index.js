import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const store = new EventEmitter()
export default store

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
