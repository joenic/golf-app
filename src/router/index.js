import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import User from '@/components/User'
import Scorecard from '@/components/Scorecard'
import HolePage from '@/components/HolePage'
import Main from '@/components/Main'
import ChatPage from '@/components/ChatPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/users',
      name: 'users',
      component: User
    },
    {
      path: '/scorecard',
      name: 'scorecard',
      component: Scorecard
    },
    {
      path: '/hole',
      name: 'HolePage',
      component: HolePage
    },
    {
      path: '/chat',
      name: 'ChatPage',
      component: ChatPage
    }
  ]
})
