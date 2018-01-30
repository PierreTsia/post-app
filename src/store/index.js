import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedPosts: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    userHasBookmarkedPost(state, payload) {
      const id = payload.id
      if (state.user.bookmarkedPosts.findIndex(post => post.id === id) >= 0) {
        return
      }
      state.user.bookmarkedPosts.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unBookmarkPost(state, payload) {
      const userBookmarkedPosts = state.user.bookmarkedPosts
      userBookmarkedPosts.splice(userBookmarkedPosts.findIndex(post => post.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedPosts(state, payload) {
      state.loadedPosts = payload
    },
    createPost(state, payload) {
      state.loadedPosts.push(payload)
    },
    updatePostData(state, payload) {
      const post = state.loadedPosts.find(post => {
        return post.id === payload.id
      })
      if (payload.title) {
        post.title = payload.title
      }
      if (payload.description) {
        post.description = payload.description
      }
      if (payload.content) {
        post.content = payload.content
      }
      post.date = new Date()
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    bookmarkPost({
      commit,
      getters
    }, payload) {
      commit('setLoading', true)
      const user = getters.getUser
      firebase.database().ref('/users/' + user.id).child('/bookmarks/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('userHasBookmarkedPost', {
            id: payload,
            fbKey: data.key
          })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unBookmarkPost({
      commit,
      getters
    }, payload) {
      commit('setLoading', true)
      const user = getters.getUser
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/bookmarks/').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unBookmarkPost', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadPosts({
      commit
    }) {
      commit('setLoading', true)
      firebase.database().ref('posts').once('value')
        .then((data) => {
          const posts = []
          const obj = data.val()
          for (let key in obj) {
            posts.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              content: obj[key].content,
              imgUrl: obj[key].imgUrl,
              date: obj[key].date,
              authorId: obj[key].authorId
            })
          }
          commit('setLoadedPosts', posts)
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    clearError({
      commit
    }) {
      commit('clearError')
    },
    createPost({
      commit,
      getters
    }, payload) {
      const newPost = {
        title: payload.title,
        description: payload.description,
        imgUrl: payload.imgUrl,
        content: payload.content,
        date: payload.date.toISOString(),
        authorId: getters.getUser.id
      }
      let imgUrl
      let key
      firebase.database().ref('posts').push(newPost)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('posts/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imgUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('posts').child(key).update({
            imgUrl: imgUrl
          })

        })
        .then(() => {
          commit('createPost', {
            ...newPost,
            imgUrl: imgUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updatePostData({
      commit
    }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.content) {
        updateObj.content = payload.content
      }
      updateObj.date = new Date()
      firebase.database().ref('posts').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updatePostData', payload)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    signUserUp({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              bookmarkedPosts: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              bookmarkedPosts: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          })
    },
    autoSignIn({
      commit
    }, payload) {
      commit('setUser', {
        id: payload.uid,
        bookmarkedPosts: [],
        fbKeys: {}
      })
    },
    fetchUserData({commit, getters}){
      commit('setLoading', true)
      firebase.database().ref('/users/'+ getters.getUser.id + '/bookmarks/').once('value')
      .then(data=>{
        const dataPairs = data.val()
        let bookmarkedPosts = []
        let swappedPairs = {}
        for(let key in dataPairs){
          bookmarkedPosts.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
        }
        const updatedUser = {
          id : getters.getUser.id,
          bookmarkedPosts : bookmarkedPosts,
          fbKeys : swappedPairs 
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },

    logout({
      commit
    }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    loadedPosts(state) {
      return state.loadedPosts.sort((postA, postB) => {
        return postA.date < postB.date
      })
    },
    loadedPost(state) {
      return (postId) => {
        return state.loadedPosts.find((post) => {
          return post.id === postId
        })
      }
    },
    featuredPosts(state, getters) {
      return getters.loadedPosts.slice(0, 5)
    },
    getUser(state) {
      return state.user
    },
    error(state) {
      return state.error
    },
    loading(state) {
      return state.loading
    }
  }
})
