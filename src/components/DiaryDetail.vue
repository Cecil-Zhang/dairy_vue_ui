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
          <div class="w-100">
            <b-button-toolbar key-nav class="w-100" justify aria-label="Toolbar with button groups">
              <b-button-group class="mx-1">
                <b-btn>&laquo;</b-btn>
              </b-button-group>
              <b-button-group class="mx-1">
                <b-btn :variant="'outline-success'" :to="'/diary/write/' + d.id">Edit</b-btn>
                <b-btn :variant="'outline-danger'" v-b-modal.modal-delete>Delete</b-btn>
              </b-button-group>
              <b-button-group class="mx-1">
                <b-btn>&raquo;</b-btn>
              </b-button-group>
            </b-button-toolbar>
            <b-modal id="modal-delete" centered title="Delete" size="sm" @ok="deleteDiary">
              <p class="my-4">Are you sure to delete this diary?</p>
            </b-modal>
          </div>
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
      this.$axios.get(api.diary.list + this.$route.params.id + '/')
        .then(res => {
          this.d = res.data
        })
        .catch(function (error) {
          alert(error)
        })
    },
    deleteDiary () {
      this.$axios.delete(api.diary.list + this.$route.params.id + '/')
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
