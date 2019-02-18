<template>
  <b-container fluid>
    <b-row align-h="center" v-if="msg === ''">
      <b-col cols="6" sm="4" v-for="d in diaries.data" v-bind:key="d.id">
          <b-card :title="formatDate(d.datetime)" class="marginful"
                  :sub-title="d.weather">
              <p class="card-text text-truncate">
                  {{ d.content }}
              </p>
              <font-awesome-icon v-if="d.pictures.length > 0" icon="images" />
              <b-link :to="'/diary/' + d.id" class="card-link">Read More</b-link>
          </b-card>
      </b-col>
    </b-row>
    <b-row align-h="center" v-if="msg !== ''">
      <b-col cols="4">
        <p>{{msg}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="marginful">
          <b-pagination-nav align="center" base-url="/diary/page/" :number-of-pages="diaries.num_pages" v-model="currentPage"/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import api from '../api/api-config'

export default {
  name: 'DiaryList',
  props: ['searchCriteria'],
  watch: {
    searchCriteria: function (criteria) {
      var queries = criteria.split('&')
      queries.forEach(q => {
        var kv = q.split('=')
        if (kv[0] === 'year') {
          this.filters[0].select = kv[1]
        } else if (kv[0] === 'month') {
          this.filters[1].select = kv[1]
        }
      })
      this.getDiaries(criteria)
    }
  },
  data () {
    return {
      msg: '',
      diaries: {
        data: [],
        num_pages: 10,
        years: []
      },
      page_size: 12,
      currentPage: 1,
      filters: [
        {
          'key': 'year',
          'options': [],
          'show': true,
          'select': ''
        },
        {
          'key': 'month',
          'options': [
            {'value': '', 'text': 'All month'},
            {'value': 1, 'text': 'Jan'},
            {'value': 2, 'text': 'Feb'},
            {'value': 3, 'text': 'Mar'},
            {'value': 4, 'text': 'Apr'},
            {'value': 5, 'text': 'May'},
            {'value': 6, 'text': 'Jun'},
            {'value': 7, 'text': 'Jul'},
            {'value': 8, 'text': 'Aug'},
            {'value': 9, 'text': 'Sep'},
            {'value': 10, 'text': 'Oct'},
            {'value': 11, 'text': 'Nov'},
            {'value': 12, 'text': 'Dec'}
          ],
          'show': true,
          'select': ''
        }
      ]
    }
  },
  methods: {
    formatDate (date) {
      var dt = new Date(date)
      var str = dt.toLocaleString('zh-CN', {hour12: false})
      return str.substring(0, str.lastIndexOf(':'))
    },
    getDiaries (searchCriteria) {
      if (!searchCriteria) {
        searchCriteria = ''
      } else {
        searchCriteria = '&' + searchCriteria
      }
      var that = this
      this.$axios.get(api.diary.list + '?page_size=' + this.page_size + '&page=' + this.currentPage + searchCriteria)
        .then(res => {
          if (res.data.data.length === 0) {
            that.msg = 'nothing here'
          } else {
            that.msg = ''
            that.diaries = res.data
            that.emitShowFilter()
          }
        })
        .catch(function (error) {
          alert(error)
        })
    },
    linkGen (pageNum) {
      return '#page/' + pageNum + '/foobar'
    },
    emitShowFilter () {
      var yearOption = this.diaries.years.map(y => { return {'value': y.year, 'text': y.year} })
      yearOption.unshift({'value': '', 'text': 'All year'})
      this.filters[0].options = yearOption
      this.$emit('show-filter-on-nav', this.filters)
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
.marginful {
  margin: 1em auto 0.5em auto;
}
</style>
