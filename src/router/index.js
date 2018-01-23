import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import CreatePost from '@/components/CreatePost'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Posts from '@/components/Posts'
import Post from '@/components/Post'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/posts/new',
      name: 'Create Post',
      component: CreatePost
    },
    {
      path:'/posts/:id',
      name:'Post',
      props:true,
      component:Post
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
      path:'/posts',
      name: 'Posts',
      component: Posts
    }


  ]
})
