import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isAuthenticated: false
  },
  mutations: {
    login (state, payload) {
      state.user = payload
      state.isAuthenticated = true
    },
    logout (state) {
      state.user = {}
      state.isAuthenticated = false
    }
  },
  getters: {
    isLoggedIn: state => state.isAuthenticated
  }
})
