import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import EventService from '@/services/EventService.js'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    currentGame: '',
    currentHole: '',
    user:
      {
        username: '',
        password: '',
        games: [
          {
            courseName: '',
            holes: [
              {
                shots: [
                  {
                    time: 0,
                    position: {
                      lat: 0,
                      lng: 0
                    },
                    club: ''
                  }
                ],
                number: 0,
                yards: 0,
                par: 0,
                tee: ''
              }
            ]
          }
        ]
      }
  },
  mutations: {
    // The mutation below adds a name and password to the user array
    ADD_USER (state, name, password) {
      state.user.push(name)
      state.user.push(password)
    },
    ADD_COURSE (state, courseName) {
      state.user.push(courseName)
    },
    SHOW_USER (state, user) {
      state.user = user
    }
  },
  // Below is an action that calls the above mutation then post it to the mock api
  actions: {
    NEW_USER ({ commit }, name, password) {
      EventService.postUser(name, password)
      commit('ADD_USER', name, password)
    },
    NEW_COURSE ({ commit }, courseName) {
      EventService.postCourse(courseName)
      commit('ADD_COURSE', courseName)
    },
    GET_USER ({ commit }) {
      EventService.getUser()
        .then(response => {
          commit('SHOW_USER', response.data)
        })
    }
  },
  getters: {
    // hole: state => state.user.games[state.currentGame].holes[state.currentHole]
    hole: state => ({
      shots: [
        {
          time: 0,
          position: {
            lat: 38.42345466879392,
            lng: -78.87565709341992
          },
          club: ''
        },
        {
          time: 0,
          position: {
            lat: 38.4242274,
            lng: -78.872773
          },
          club: ''
        }
      ],
      number: 0,
      yards: 0,
      par: 0,
      tee: ''
    })
  },
  modules: {
  }
})
