<template>
  <b-container>
    <b-row>
      <b-col>
        <b-list-group>
          <template v-for="d in diaries">
            <b-list-group-item v-bind:key="d.id">
              <b-link :to="'/diary/' + d.id">{{d.datetime}}</b-link> {{d.weather}}
            </b-list-group-item>
          </template>
        </b-list-group>
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
export default {
  name: 'DiaryList',
  data () {
    return {
      msg: 'Welcome to Your Dairy App',
      diaries: []
    }
  },
  methods: {
    getDiaries () {
      this.$axios.get('http://localhost:8000/diary/')
        .then(res => {
          this.diaries = res.data
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
