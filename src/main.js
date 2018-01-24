// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import moment from 'moment'


const locale_moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {
    locale_moment
})

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
  template: '<App/>'
})
