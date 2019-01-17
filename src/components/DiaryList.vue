<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div v-if="code == 0">
          <b-list-group>
            <template v-for="d in diaries.data">
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
    <b-row>
      <b-col>
        <div>
          <b-pagination-nav base-url="/diary/page/" :number-of-pages="diaries.num_pages" v-model="currentPage"/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import api from '../api/api-config'

export default {
  name: 'DiaryList',
  data () {
    return {
      msg: 'Welcome to Your Dairy App',
      diaries: {
        data: [],
        num_pages: 10
      },
      page_size: 10,
      currentPage: 1,
      code: 0
    }
  },
  methods: {
    getDiaries () {
      var that = this
      this.$axios.get(api.diary.list + '?page_size=' + this.page_size + '&page=' + this.currentPage)
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
    },
    linkGen (pageNum) {
      return '#page/' + pageNum + '/foobar'
    }
  },
  created () {
    if (this.$route.params.page) {
      this.currentPage = parseInt(this.$route.params.page)
    }
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
