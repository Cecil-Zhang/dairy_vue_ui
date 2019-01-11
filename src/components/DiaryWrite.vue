<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <b-form-group label="Datetime:" label-for="datetime">
            <date-picker v-model="diary.datetime" :config="options"></date-picker>
          </b-form-group>
          <b-form-group label="Today's Weather" label-for="weather">
            <b-form-input id="weather"
                          type="text"
                          v-model="diary.weather"
                          required
                          placeholder="How is the weather?">
            </b-form-input>
          </b-form-group>
          <b-form-group label="I'm listening" label-for="content">
            <b-form-textarea id="content"
                         v-model="diary.content"
                         placeholder="Feel free"
                         :rows="3">
            </b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Clear</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import api from '../api/api-config'

export default {
  name: 'DiaryWrite',
  data () {
    return {
      diary: {},
      options: {
        locale: 'zh-CN',
        useCurrent: true,
        showTodayButton: true,
        showClose: true
      }
    }
  },
  methods: {
    onSubmit (evt) {
      this.$axios.post(api.diary.list, this.diary)
        .then(res => {
          this.$router.push('/diary/' + res.data.id + '/')
        })
        .catch(function (error) {
          alert(error)
        })
    },
    onReset (evt) {
      /* Reset our form values */
      this.diary.weather = ''
      this.diary.content = ''
    }
  },
  components: {
    datePicker
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
