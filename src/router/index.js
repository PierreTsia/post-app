import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import CreatePost from '@/components/CreatePost'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Posts from '@/components/Posts'
import Post from '@/components/Post'
import AuthGuard from './auth-guard'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/post/new',
      name: 'Create Post',
      component: CreatePost,
      beforeEnter: AuthGuard

    },
    {
      path: '/posts/:id',
      name: 'Post',
      props: true,
      component: Post,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Sign up',
      component: Signup
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
      beforeEnter: AuthGuard
    }


  ]
})
