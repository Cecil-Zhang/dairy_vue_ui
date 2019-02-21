<template>
  <b-container>
    <b-row align-h="center">
      <b-col sm="11" cols="11" xl="8" lg="8">
        <h5 v-if="!d.title" class="text-info">{{d.datetime}}</h5>
        <h3 v-if="d.title" class="text-info">{{d.title}}</h3>
        <span v-if="d.title" class="text-muted">{{d.datetime}} &nbsp;</span>
        <span v-if="d.weather" class="text-muted">{{d.weather}}</span>
        <p class="diary text-left">
          {{ d.content }}
        </p>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col sm="11" cols="11" xl="8" lg="8">
        <div class="w-100 marginful">
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
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col sm="11" cols="11" xl="8" lg="8">
        <b-carousel id="carousel1" v-if="d.pictures && d.pictures.length > 0"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">
          <b-carousel-slide v-for="pic in d.pictures" :img-src="pic.file" :key="pic.id" :img-alt="d.datetime">
          </b-carousel-slide>
        </b-carousel>
        <b-card v-if="d.pictures && d.pictures.length === 0"
          img-src="https://picsum.photos/600/300/?random"
          img-alt="Image"
          img-top
          overlay
          tag="article"
          class="mb-2">
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
      dismissCountDown: 0,
      slide: 0,
      sliding: null
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
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
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
p {
  color: black;
}
.marginful {
  margin: 1em auto 1em auto;
}
.diary {
  text-indent: 2rem;
}
</style>
