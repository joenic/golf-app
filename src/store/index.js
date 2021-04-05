import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import EventService from '@/services/EventService.js'
import { restapi } from '@/services/messages'

Vue.use(Vuex, axios)

const UPDATE_USER = 'UPDATE_USER'
const UPDATE_CURRENT_HOLE = 'UPDATE_CURRENT_HOLE'
const UPDATE_CURRENT_SHOT = 'UPDATE_CURRENT_SHOT'

export default new Vuex.Store({
  state: {
    currentGame: 0,
    currentHole: 0,
    currentShot: 0,
    user:
      {
        username: '',
        password: '',
        games: [
          {
            courseName: '',
            createdAt: '',
            teeTime: '',
            isWalking: true,
            frontNine: '',
            backNine: '',
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
                tee: '',
                pin: {
                  lat: 0,
                  lng: 0
                }
              }
            ]
          }
        ]
      }
  },
  mutations: {
    // The mutation below adds a name and password to the user array
    ADD_USER (state) {
      state.user = {
        username: '',
        password: ''
      }
    },
    ADD_COURSE (state, name) {
      const { currentGame } = state
      if (!state.user.games[currentGame]) {
        state.user.games.push({ courseName: name })
        state.currentGame += 1
      } else {
        state.user.games[currentGame].courseName = name
      }
    },
    UPDATE_USER (state, user) {
      state.user = user
    },
    UPDATE_CURRENT_GAME (state, currentGame) {
      state.currentGame = currentGame
    },
    UPDATE_CURRENT_HOLE (state, currentHole) {
      state.currentHole = currentHole
    },
    UPDATE_CURRENT_SHOT (state, currentShot) {
      state.currentShot = currentShot
    },
    NEW_SHOT (state, newShot) {
      const { currentGame, currentHole } = state
      state.user.games[currentGame].holes[currentHole].shots.push(newShot)
    },
    NEW_HOLE (state, newHole) {
      const { currentGame } = state
      state.user.games[currentGame].holes.push(newHole)
    }
  },
  // Below is an action that calls the above mutation then post it to the mock api
  actions: {
    NEW_USER ({ commit }, username, password) {
      EventService.postUser(username, password)
      commit('ADD_USER', username, password)
    },
    NEW_COURSE ({ commit }, name) {
      // EventService.postCourse(name)
      commit('ADD_COURSE', name)
    },
    GET_USER ({ commit }, username, password) {
      EventService.getUser(username, password)
        .then(res => {
          commit('UPDATE_USER', res.data[0])
        })
    },
    NEW_SHOTS ({ commit, state }, newShot) {
      const { user, currentHole, currentShot } = state
      commit('NEW_HOLE', newShot)
      restapi
        .service('users')
        .update(user._id, user)
        .then(updatedUser => {
          state.currentShot += 1
          commit(UPDATE_CURRENT_SHOT, currentShot)
          commit(UPDATE_CURRENT_HOLE, currentHole)
          commit(UPDATE_USER, updatedUser)
        })
        .catch(error => console.log('Scoooooby doooooo! Seems we have a mystery on our hands', error.message))
    },
    NEW_HOLES ({ commit, state }, newHole) {
      const { user, currentHole } = state
      commit('NEW_HOLE', newHole)
      restapi
        .service('users')
        .update(user._id, user)
        .then(updatedUser => {
          state.currentHole += 1
          commit(UPDATE_CURRENT_HOLE, currentHole)
          commit(UPDATE_USER, updatedUser)
        })
        .catch(error => console.log('ruh-roh raggy! Seems we have a mystery on our hands', error.message))
    },
    UPDATE_CURRENT_GAME ({ commit }, gameID) {
      commit('UPDATE_CURRENT_GAME', gameID)
    },
    UPDATE_CURRENT_HOLE ({ commit }, holeID) {
      commit('UPDATE_CURRENT_HOLE', holeID)
    },
    UPDATE_CURRENT_SHOT ({ commit }, shotID) {
      commit('UPDATE_CURRENT_SHOT', shotID)
    },
    UPDATE_USER ({ commit }, gameID) {
      commit('UPDATE_USER', gameID)
    }
  },
  getters: {
    games: state => state.user.games,
    game: state => state.user.games.find(g => g._id === state.currentGame),
    hole: (state, getters) => getters.game?.holes.find(h => h._id === state.currentHole) || { number: 1, tee: 'Blue', yards: 0, shots: [], par: 3, pin: { lat: 0, lng: 0 } },
    shot: (state, getters) => getters.hole?.shots.find(s => s._id === state.currentShot) || { position: { lat: 0, lng: 0 }, club: 'Driver', time: new Date() }
    // hole: state => ({
    //   shots: [
    //     {
    //       time: 0,
    //       position: {
    //         lat: 38.42345466879392,
    //         lng: -78.87565709341992
    //       },
    //       club: ''
    //     },
    //     {
    //       time: 0,
    //       position: {
    //         lat: 38.4242274,
    //         lng: -78.872773
    //       },
    //       club: ''
    //     }
    //   ],
    //   number: 0,
    //   yards: 0,
    //   par: 0,
    //   tee: ''
    // })
  },
  modules: {
  }
})
