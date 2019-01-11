<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="8">
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <b-form-group label="Email" label-for="emal" horizontal>
            <b-form-input id="email"
                          type="email"
                          v-model="user.email"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group label="Username" label-for="username" horizontal>
            <b-form-input id="username"
                          type="text"
                          v-model="user.username"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group label="First Name" label-for="firstname" horizontal>
            <b-form-input id="firstname"
                          type="text"
                          v-model="user.first_name">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Last Name" label-for="lastname" horizontal>
            <b-form-input id="lastname"
                          type="text"
                          v-model="user.last_name">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Password" label-for="password" horizontal>
            <b-form-input id="password" type="password"
                         v-model="user.password" required>
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Register</b-button>
          <b-button type="reset" variant="danger">Clear</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import api from '../api/api-config'

export default {
  name: 'UserRegister',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    onSubmit (evt) {
      this.$axios.post(api.user.register, this.user)
        .then(res => {
          this.$router.push('/user/login')
        })
        .catch(function (error) {
          alert(error)
        })
    },
    onReset (evt) {
      /* Reset our form values */
      this.user.username = ''
      this.user.email = ''
      this.user.first_name = ''
      this.user.last_name = ''
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
