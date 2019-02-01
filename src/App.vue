<template>
  <div id="app">
    <NavBar :filters="filters" @searchPressed="onSearchPressed"/>
    <router-view @show-filter-on-nav="onShowFilterOnNav" :searchCriteria="searchCriteria"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import jQuery from 'jquery'

export default {
  name: 'App',
  data () {
    return {
      user: {},
      filters: [], // pass to NavBar
      searchCriteria: ''
    }
  },
  methods: {
    onShowFilterOnNav (filters) {
      this.filters = filters
    },
    onSearchPressed (query) {
      this.searchCriteria = query
    },
    refreshCsrfToken () {
      var csrftoken = getCookie('csrftoken')
      console.log('get csrftoken=' + csrftoken)
      this.$axios.defaults.headers.common['X-CSRFToken'] = csrftoken
    }
  },
  components: {
    NavBar
  },
  created () {
    this.refreshCsrfToken()
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
