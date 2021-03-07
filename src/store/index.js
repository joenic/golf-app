import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '1',
      name: 'Joe Nicol',
      game: {
        game: 0,
        shot: {
          shot: 0,
          marker: []
        }
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
