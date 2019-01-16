<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import jQuery from 'jquery'
import api from './api/api-config'

export default {
  name: 'App',
  data () {
    return {
      user: {}
    }
  },
  components: {
    NavBar
  },
  created () {
    this.autoLoginIfSessionValid()
    this.$axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken')
  },
  methods: {
    autoLoginIfSessionValid () {
      var that = this
      this.$axios.get(api.user.info)
        .then(res => {
          that.$store.commit('login', res.data)
        })
        .catch(err => {
          console.log('auto login failed due to' + err)
        })
    }
  }
}

function getCookie (name) {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i])
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
