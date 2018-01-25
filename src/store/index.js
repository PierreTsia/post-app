import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedPosts: [{
        imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/1-1600.jpg',
        id: 'qsjhdqshdqshdkjqd',
        title: 'My First Post',
        description: 'Description du premier post',
        content: 'Le super contenu de mon premier post',
        date: '2018-01-04'

      },
      {
        imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/2-1600.jpg',
        id: 'hdqshdkjqshdkqj',
        title: 'My Second Post',
        description: 'Description du second post',
        content: 'Le super contenu de mon second post',
        date: '2018-01-14'
      },
      {
        imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/13-1600.jpg',
        id: 'dfsqgfdgsqhfdhgqs',
        title: 'My Third Post',
        description: 'Description du troisième post',
        content: 'Le super contenu de mon troisième post',
        date: '2017-11-21'
      },
      {
        imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/4-1600.jpg',
        id: 'kfsdlfcxnxwncnxw',
        title: 'My Fourth Post',
        description: 'Description du quatrième post',
        content: 'Le super contenu de mon quatrième post',
        date: '2017-09-04'
      },
    ],
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
              date: obj[key].date

            })
          }
          console.log(posts)
          commit('setLoadedPosts', posts)
        })
        .catch((error) => {
          console.log(error)
        }
      )

    },
    clearError({commit}){
      commit('clearError')
    },
    createPost({commit}, payload) {
      const newPost = {
        title: payload.title,
        description: payload.description,
        imgUrl: payload.imgUrl,
        content: payload.content,
        date: payload.date.toISOString()
      }
      firebase.database().ref('posts').push(newPost)
        .then((data) => {
            const key = data.key
            commit('createPost', {
              ...newPost,
              id : key
            })
          }
        )
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
