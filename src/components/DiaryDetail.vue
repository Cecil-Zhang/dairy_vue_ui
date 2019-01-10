<template>
  <b-container>
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
          <b-button :to="'/diary'" variant="primary">Go back</b-button>
        </b-card>
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
      d: {}
    }
  },
  methods: {
    getDiary () {
      this.$axios.get(api.diary.list + this.$route.params.id)
        .then(res => {
          this.d = res.data
        })
        .catch(function (error) {
          alert(error)
        })
    }
  },
  created () {
    this.getDiary()
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
