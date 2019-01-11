<template>
  <b-row>
    <b-navbar toggleable="md" type="dark" variant="info" fixed="top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="'/diary">Dairy</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item :to="'/diary'">Diary Home</b-nav-item>
          <b-nav-item :to="'/diary/write'">Write</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{ login_user }}</em>
            </template>
            <b-dropdown-item-button disabled>Profile</b-dropdown-item-button>
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
  data () {
    return {
      user: {}
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
    }
  },
  computed: {
    login_user () {
      return this.$store.state.user.username
    }
  }
}
</script>
