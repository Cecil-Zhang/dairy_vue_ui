<template>
  <b-container fluid>
    <b-row align-h="center" align-v="center">
      <b-col cols="8">
        <b-form @submit.prevent="onSubmit">
          <b-form-group label="Username" label-for="username" horizontal>
            <b-form-input id="username"
                          type="text"
                          v-model="user.username"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group label="Password" label-for="password" horizontal>
            <b-form-input id="password" type="password"
                         v-model="user.password" required>
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Login</b-button>
          <b-button :href="'/user/register'" type="register" >Register</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import api from '../api/api-config'

export default {
  name: 'UserLogin',
  data () {
    return {
      user: {},
      csrftoken: ''
    }
  },
  methods: {
    onSubmit (evt) {
      var that = this
      this.$axios.post(api.user.login, this.user)
        .then(res => {
          that.$store.commit('login', res.data)
          this.$router.replace({name: 'index'})
        })
        .catch(function (error) {
          alert(error)
        })
    },
    onReset (evt) {
      /* Reset our form values */
      this.user.username = ''
      this.user.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
