<template>
  <b-row>
    <b-navbar toggleable="md" type="dark" variant="info" fixed="top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand :to="'/diary/page/1'">Dairy</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse" v-model="showCollapse">

        <b-navbar-nav>
          <b-nav-item :to="'/diary/page/1'">Diary Home</b-nav-item>
          <b-nav-item :to="'/diary/write/null'">Write</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-select v-for="f in filters" size="sm" :key="f.key" v-model="f.select" :options="f.options" class="mr-sm-2" />
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" v-model="search"/>
            <b-button size="sm" class="my-2 my-sm-0" @click="onSearchPressed">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{ login_user }}</em>
            </template>
            <b-dropdown-item-button @click="goSettings">Profile</b-dropdown-item-button>
            <b-dropdown-item-button @click.prevent="onSignout">Signout</b-dropdown-item-button>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </b-row>
</template>

<script>
import api from '../api/api-config'

export default {
  name: 'NavBar',
  props: ['filters'],
  /* passed from parent component
  filters = [{
      show: false,
      options: [],
      selected: null,
      key: ''
    }]
  */
  data () {
    return {
      user: {},
      search: '',
      showCollapse: false
    }
  },
  methods: {
    onSignout () {
      this.$axios.post(api.user.logout)
        .then(res => {
          this.$router.push('/user/login')
        })
        .catch(function (error) {
          alert(error)
        })
    },
    goSettings () {
      this.$router.push('/user/settings')
    },
    onSearchPressed () {
      var queryParams = 'search=' + this.search
      this.filters.forEach(f => {
        queryParams = queryParams + '&' + f.key + '=' + f.select
      })
      this.showCollapse = false
      this.$emit('searchPressed', queryParams)
    }
  },
  computed: {
    login_user () {
      return this.$store.state.user.username
    }
  }
}
</script>
