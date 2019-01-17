<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="10">
        <b-form>
          <b-form-group label="Datetime:" label-for="datetime" cols="5">
              <datetime v-model="diary.datetime" input-id="datetime" type="datetime" input-class="w-100"></datetime>
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
                         placeholder="I'm listening"
                         :rows="10">
            </b-form-textarea>
          </b-form-group>
          <!-- <b-button type="submit" variant="primary">Submit</b-button> -->
          <!-- <b-button type="reset" variant="danger">Clear</b-button> -->
        </b-form>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="4">
        <b-button-toolbar key-nav aria-label="Toolbar with button groups">
          <b-button-group>
            <b-btn :variant="'outline-success'" @click="onSubmit">Submit</b-btn>
            <b-btn :variant="'outline-warning'" @click="onReset">Reset</b-btn>
            <b-btn :variant="'outline-danger'" v-b-modal.modal-delete>Delete</b-btn>
          </b-button-group>
        </b-button-toolbar>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-modal id="modal-delete" centered title="Delete" size="sm" @ok="deleteDiary">
          <p class="my-4">Are you sure to delete this diary?</p>
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import api from '../api/api-config'
import { Datetime } from 'vue-datetime'

export default {
  name: 'DiaryWrite',
  data () {
    return {
      diary: {},
      mode: 'create'
    }
  },
  methods: {
    getDiary () {
      if (this.$route.params.id !== 'null') {
        this.$axios.get(api.diary.list + this.$route.params.id + '/')
          .then(res => {
            this.diary = res.data
            var dt = new Date(this.diary.datetime)
            this.diary.datetime = dt.toISOString()
          })
          .catch(function (error) {
            alert(error)
          })
        this.mode = 'edit'
      }
    },
    onSubmit (evt) {
      if (this.mode === 'edit') {
        this.$axios.put(api.diary.list + this.diary.id + '/', this.diary)
          .then(res => {
            this.$router.push('/diary/' + res.data.id + '/')
          })
          .catch(function (error) {
            alert(error)
          })
      } else {
        this.$axios.post(api.diary.list, this.diary)
          .then(res => {
            this.$router.push('/diary/' + res.data.id + '/')
          })
          .catch(function (error) {
            alert(error)
          })
      }
    },
    onReset (evt) {
      /* Reset our form values */
      this.diary.weather = ''
      this.diary.content = ''
    },
    deleteDiary () {
      this.$axios.delete(api.diary.list + this.diary.id + '/')
        .then(res => {
          this.$router.push('/diary')
        })
        .catch(function (error) {
          alert(error)
        })
    }
  },
  created () {
    this.getDiary()
  },
  components: {
    datetime: Datetime
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
