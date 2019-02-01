<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-card :title="d.datetime"
          :sub-title="d.weather"
          img-src="https://picsum.photos/600/300/?random"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2">
          <p class="card-text">
            {{ d.content }}
          </p>
          <div class="w-100">
            <b-button-toolbar key-nav class="w-100" justify aria-label="Toolbar with button groups">
              <b-button-group class="mx-1">
                <b-btn @click="lastDiary">&laquo;</b-btn>
              </b-button-group>
              <b-button-group class="mx-1">
                <b-btn :variant="'outline-success'" :to="'/diary/write/' + d.id">Edit</b-btn>
                <b-btn :variant="'outline-danger'" v-b-modal.modal-delete>Delete</b-btn>
              </b-button-group>
              <b-button-group class="mx-1">
                <b-btn @click="nextDiary">&raquo;</b-btn>
              </b-button-group>
            </b-button-toolbar>
            <b-modal id="modal-delete" centered title="Delete" size="sm" @ok="deleteDiary">
              <p class="my-4">Are you sure to delete this diary?</p>
            </b-modal>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="4">
        <b-alert :show="dismissCountDown"
             dismissible
             dismissAfterSeconds
             fade
             variant="info"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
          Nothing more!
        </b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import api from '../api/api-config'

export default {
  name: 'DiaryDetail',
  data () {
    return {
      d: {},
      dismissSecs: 2,
      dismissCountDown: 0
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    getDiary (id = this.$route.params.id) {
      this.$axios.get(api.diary.list + id + '/')
        .then(res => {
          this.d = res.data
        })
        .catch(function (error) {
          alert(error)
        })
    },
    lastDiary () {
      this.$axios.get(api.diary.list + '?page_size=1&page=1&earlier_than=' + this.d.datetime)
        .then(res => {
          if (res.data.data.length > 0) {
            this.$router.push('/diary/' + res.data.data[0].id)
          } else {
            this.dismissCountDown = this.dismissSecs
          }
        })
        .catch(function (error) {
          alert(error)
        })
    },
    nextDiary () {
      this.$axios.get(api.diary.list + '?order_by=datetime&page_size=1&page=1&later_than=' + this.d.datetime)
        .then(res => {
          if (res.data.data.length > 0) {
            this.$router.push({name: 'DiaryDetail', params: {id: res.data.data[0].id}})
          } else {
            this.dismissCountDown = this.dismissSecs
          }
        })
        .catch(function (error) {
          alert(error)
        })
    },
    deleteDiary () {
      this.$axios.delete(api.diary.list + this.$route.params.id + '/')
        .then(res => {
          this.$router.push('/diary/page/1')
        })
        .catch(function (error) {
          alert(error)
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getDiary()
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.getDiary(to.params.id)
    next()
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
