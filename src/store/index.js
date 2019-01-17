import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '../api/api-config'

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
  actions: {
    auto_login (context) {
      return new Promise((resolve, reject) => {
        axios.get(api.user.info)
          .then(res => {
            context.commit('login', res.data)
            resolve(res)
          })
          .catch(err => {
            console.log('auto login failed due to' + err)
            reject(err)
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => state.isAuthenticated
  }
})
