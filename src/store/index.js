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
    setLoadedPosts(state, payload){
      state.loadedPosts = payload
    },
    createPost(state, payload) {
      state.loadedPosts.push(payload)
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
    loadPosts({commit}){
      commit('setLoading', true)
      firebase.database().ref('posts').once('value')
        .then((data) =>{
          const posts = []
          const obj = data.val()
          for (let key in obj){
            posts.push({
              id: key,
              title: obj[key].title,
              description : obj[key].description,
              content : obj[key].content,
              imgUrl : obj[key].imgUrl,
              date: obj[key].date,
              authorId : obj[key].authorId

            })
          }
          commit('setLoadedPosts', posts)
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        }
      )

    },
    clearError({commit}){
      commit('clearError')
    },
    createPost({commit, getters}, payload) {
      const newPost = {
        title: payload.title,
        description: payload.description,
        imgUrl: payload.imgUrl,
        content: payload.content,
        date: payload.date.toISOString(),
        authorId : getters.getUser.id
      }
      let imgUrl
      let key
      firebase.database().ref('posts').push(newPost)
        .then((data) => {
            key = data.key
            return key  
          }
        )
        .then( key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('posts/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imgUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('posts').child(key).update({imgUrl : imgUrl})
           
        })
        .then(()=> {
            commit('createPost', {
            ...newPost,
            imgUrl : imgUrl,
            id : key
            })
        })
        .catch((error) => {
            console.log(error)
          }
        )
      
    },
    signUserUp({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              authoredPost: []
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
    signUserIn({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              authoredPost: []
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
    autoSignIn({commit}, payload){
      commit('setUser', {id : payload.uid,  authoredPost : []})
    },
    logout({commit}){
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
    error(state){
      return state.error
    },
    loading(state){
      return state.loading
    }

  }
})
