import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import User from '@/components/User'
import Scorecard from '@/components/Scorecard'
import GPS from '@/components/GPS'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
      path: '/GPS',
      name: 'gps',
      component: GPS
    }
  ]
})
