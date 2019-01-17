<template>
  <b-container>
    <b-row>
      <b-col>
        <div v-if="code == 0">
          <b-list-group>
            <template v-for="d in diaries">
              <b-list-group-item v-bind:key="d.id">
                <b-link :to="'/diary/' + d.id" cols="3">{{d.datetime}}</b-link>
                <span cols="3">{{d.weather}}</span>
              </b-list-group-item>
            </template>
          </b-list-group>
        </div>
        <div v-else>
          <p>{{msg}}</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
  <!-- <div>
    <h2>Your Diaries</h2>
    <b-button>Write</b-button>
    <ul>
      <li v-for="d in diaries" v-bind:key="d.id">
            <p>{{ d.datetime }}</p>
      </li>
    </ul>
  </div> -->
</template>

<script>
import api from '../api/api-config'

export default {
  name: 'DiaryList',
  data () {
    return {
      msg: 'Welcome to Your Dairy App',
      diaries: [],
      code: 0
    }
  },
  methods: {
    getDiaries () {
      var that = this
      this.$axios.get(api.diary.list)
        .then(res => {
          if (res.data.code === 404) {
            that.code = res.data.code
            that.msg = res.data.msg
          } else {
            that.diaries = res.data
          }
        })
        .catch(function (error) {
          alert(error)
        })
    }
  },
  created () {
    this.getDiaries()
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
