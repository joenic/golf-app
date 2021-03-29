import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Scorecard from '@/components/Scorecard'
import HolePage from '@/components/HolePage'
import ChatPage from '@/components/ChatPage'
import Users from '@/components/Users'
import Games from '@/components/GamesPage'

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
      path: '/games',
      name: 'games',
      component: Games
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
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
