<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col cols="10" md="7" lg="6" xl="6">
        <b-form @submit.prevent="changeUserInfo">
          <b-form-group label="First Name" label-for="firstname" horizontal>
            <b-form-input id="firstname"
                          type="text"
                          v-model="user.first_name"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group label="Last Name" label-for="lastname" horizontal>
            <b-form-input id="lastname"
                          type="text"
                          v-model="user.last_name"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-for="emal" horizontal>
            <b-form-input id="email"
                          type="email"
                          v-model="user.email"
                          required>
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Update</b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row align-h="center" class="marginful">
      <b-col cols="10" md="7" lg="6" xl="6">
        <b-btn block v-b-toggle.collapse1 variant="success">Change Password</b-btn>
        <b-collapse id="collapse1" class="mt-2">
          <b-form @submit.prevent="changePassword">
            <b-form-group label="Old Password" label-for="oldpwd" horizontal>
              <b-form-input id="oldpwd"
                            type="password"
                            v-model="pwd.old">
              </b-form-input>
            </b-form-group>
            <b-form-group label="New Password" label-for="newpwd" horizontal>
              <b-form-input id="newpwd"
                            type="password"
                            v-model="pwd.new">
              </b-form-input>
            </b-form-group>
            <b-form-group label="Password Confirm" label-for="pwd2" horizontal aria-describedby="inputLiveFeedback">
              <b-form-input id="pwd2" :state="pwdState"
                            type="password"
                            v-model="pwd.new2">
              </b-form-input>
              <b-form-invalid-feedback id="inputLiveFeedback">
                Password should be identical
              </b-form-invalid-feedback>
            </b-form-group>
            <b-button :disabled="!pwdState" type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="4">
        <b-alert :show="dismissCountDown"
             dismissible
             dismissAfterSeconds
             fade
             variant="success"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
          {{ msg }}
        </b-alert>
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
      csrftoken: '',
      pwd: {
        old: '',
        new: '',
        new2: ''
      },
      dismissSecs: 2,
      dismissCountDown: 0,
      msg: ''
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    changeUserInfo (evt) {
      this.$axios.put(api.user.info, this.user)
        .then(res => {
          this.user = res.data
          this.msg = 'UserInfo Updated!'
          this.dismissCountDown = 2
        })
        .catch(err => {
          console.log(err)
          this.msg = 'UserInfo Update Failed!'
          this.dismissCountDown = 3
        })
    },
    changePassword () {
      this.$axios.post(api.user.changePWD, this.pwd)
        .then(res => {
          this.msg = 'Password Updated!'
          this.dismissCountDown = 2
          this.clearPwd()
        })
        .catch(err => {
          console.log(err)
          this.msg = 'Password Update Failed!'
          this.dismissCountDown = 3
          // this.clearPwd()
        })
    },
    clearPwd () {
      this.pwd = {
        old: '',
        new: '',
        new2: ''
      }
    }
  },
  computed: {
    pwdState () {
      if (this.pwd.old === '' || this.pwd.new === '') {
        return null
      } else {
        return this.pwd.new === this.pwd.new2
      }
    }
  },
  created () {
    var that = this
    this.$axios.get(api.user.info)
      .then(res => {
        that.user = res.data
      })
      .catch(function (error) {
        alert(error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.marginful {
  margin: 1em auto 1em auto;
}
</style>
