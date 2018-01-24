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
        description :'Description du premier post',
        content: 'Le super contenu de mon premier post',
        date: '2018-01-04'

      },
      {
        imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/2-1600.jpg',
        id: 'hdqshdkjqshdkqj',
        title: 'My Second Post',
        description :'Description du second post',
        content: 'Le super contenu de mon second post',
        date: '2018-01-14'
      },
      {
        imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/13-1600.jpg',
        id: 'dfsqgfdgsqhfdhgqs',
        title: 'My Third Post',
        description :'Description du troisième post',
        content: 'Le super contenu de mon troisième post',
        date: '2017-11-21'
      },
      {
        imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/4-1600.jpg',
        id: 'kfsdlfcxnxwncnxw',
        title: 'My Fourth Post',
        description :'Description du quatrième post',
        content: 'Le super contenu de mon quatrième post',
        date: '2017-09-04'
      },
    ],
    user: {
      id: 'skjqdhkjsqhdkjsq',
      authoredPosts: ['hdqshdkjqshdkqj']

    }
  },
  mutations: {
    createPost(state, payload) {
      state.loadedPosts.push(payload)
    },
    setUser (state, payload) {
        state.user = payload
    }
  },
  actions: {
    createPost({commit}, payload) {
      const newPost = {
        title : payload.title,
        description : payload.description,
        imgUrl : payload.imgUrl,
        content : payload.content,
        date : payload.date,
        id: payload.id
      }
      commit('createPost', newPost )
    },
    onSignUserUp({commit}, payload){
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then ( 
            user => {
                const newUser = {
                    id: user.uid,
                    authoredPost: []
                }
                commit('setUser', newUser )
            }
        )
        .catch(
            error => {
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
    }
  }
})
