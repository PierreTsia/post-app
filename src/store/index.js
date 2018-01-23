import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        loadedPosts:[
            {
                imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/1-1600.jpg',
                id: 'qsjhdqshdqshdkjqd',
                title: 'My First Post',
                content:'Le super contenu de mon premier post',
                date: '2018-01-04'
      
              },
              {
                imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/2-1600.jpg',
                id: 'hdqshdkjqshdkqj',
                title: 'My Second Post',
                content:'Le super contenu de mon second post',
                date: '2018-01-14'
              },
              {
                imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/13-1600.jpg',
                id: 'dfsqgfdgsqhfdhgqs',
                title: 'My Third Post',
                content:'Le super contenu de mon troisième post',
                date: '2017-11-21'
              },
              {
                imgUrl: 'http://sachinchoolur.github.io/lightGallery/static/img/4-1600.jpg',
                id: 'kfsdlfcxnxwncnxw',
                title: 'My Fourth Post',
                content:'Le super contenu de mon quatrième post',
                date: '2017-09-04'
              },
       ],
       user: {
           id:'skjqdhkjsqhdkjsq',
           authoredPosts:['hdqshdkjqshdkqj']

       }
    },
    mutations:{},
    actions:{},
    getters:{
        loadedPosts(state){
           return state.loadedPosts.sort((postA, postB) => {
                return postA.date < postB.date
            })
        },
        loadedPost(state){
            return (postId)=>{
                return state.loadedPosts.find((post)=>{
                    return post.id === postId
                })
            }
        },
        featuredPosts(state, getters){
            return getters.loadedPosts.slice(0, 5)            
        }
    }
})