// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import moment from 'moment'
import * as firebase from 'firebase'
import Alert from './components/shared/Alert.vue' 
import EditPostDetails from './components/EditPostDetails.vue'
import Bookmarks from './components/Bookmarks.vue'

const locale_moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {
    locale_moment
})

Vue.component('app-alert', Alert)
Vue.component('app-edit-post-details', EditPostDetails)
Vue.component ('app-bookmark-dialog', Bookmarks)

Vue.use(Vuetify, { theme: {
  primary: '#22264b',
  secondary: '#b569692',
  accent: '#b56969',
  error: '#FF5252',
  info: '#e8edf3',
  success: '#4CAF50',
  warning: '#e6cf8b'
}})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyDJM0rYcZAscxaT8f5rt6bBkexen9oH4IY",
      authDomain: "post-app-69c24.firebaseapp.com",
      databaseURL: "https://post-app-69c24.firebaseio.com",
      projectId: "post-app-69c24",
      storageBucket: "gs://post-app-69c24.appspot.com",
      messagingSenderId: "1065353154276"
    })
    firebase.auth().onAuthStateChanged((user)=>{
      if(user) {
        this.$store.dispatch('autoSignIn', user) 
        this.$store.dispatch('fetchUserData') 
      } 
    })
    this.$store.dispatch('loadPosts')
  }
})
