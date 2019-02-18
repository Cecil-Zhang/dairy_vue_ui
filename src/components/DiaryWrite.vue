<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="10">
        <b-form>
          <b-form-group label="Datetime:" label-for="datetime" cols="5">
              <datetime v-model="diary.datetime" input-id="datetime" type="datetime"
                        input-class="w-100" @change="modified=true"></datetime>
          </b-form-group>
          <b-form-group label="Today's Weather" label-for="weather">
            <b-form-input id="weather"
                          type="text"
                          v-model="diary.weather"
                          @change="modified=true"
                          required
                          placeholder="How is the weather?">
            </b-form-input>
          </b-form-group>
          <b-form-group label="I'm listening" label-for="content">
            <b-form-textarea id="content"
                         v-model="diary.content"
                         placeholder="I'm listening"
                         @input="modified=true"
                         :rows="10">
            </b-form-textarea>
          </b-form-group>
          <b-form-group>
            <b-form-file v-model="file" accept="image/*" :state="Boolean(file)" @change="fileModified = true" placeholder="Choose a file..." multiple></b-form-file>
            <!-- <div class="mt-3">Selected file: {{file && file.name}}</div> -->
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row align-h="center" v-if="file.length > 0">
      <b-col cols="10">
        <b-btn @click="showCollapse = !showCollapse"
               :class="showCollapse ? 'collapsed' : null"
               aria-controls="collapse4"
               :aria-expanded="showCollapse ? 'true' : 'false'">
          Toggle Pictures
        </b-btn>
        <b-collapse class="mt-2" v-model="showCollapse" id="collapse4">
          <p class="text-warning">Click to delete pictures</p>
          <b-card-group deck>
            <b-card v-for="pic in diary.pictures" v-b-modal="'modalDelPic'" @click="pic_to_delete = pic.id" :img-src="pic.file" :key="pic.id" :img-alt="'image' + pic.id">
            </b-card>
          </b-card-group>
        </b-collapse>
        <b-modal id="modalDelPic" centered title="Delete Picture" size="sm" @ok="deletePictures">
          <p class="my-4">Are you sure to delete picture {{pic_to_delete}}?</p>
        </b-modal>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="7" sm="6" md="4" lg="3">
        <div>
          <b-button-toolbar v-show="uploadPercentage === 0" key-nav aria-label="Toolbar with button groups" class="marginful">
            <b-button-group>
              <b-btn :variant="'outline-success'" @click="onSubmit">Submit</b-btn>
              <b-btn :variant="'outline-warning'" @click="onReset">Reset</b-btn>
              <b-btn :variant="'outline-danger'" v-b-modal.modal-delete>Delete</b-btn>
            </b-button-group>
          </b-button-toolbar>
        </div>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="4">
        <b-progress v-show="uploadPercentage > 0" :value="uploadPercentage" :max="100" :variant="'success'" show-value animated></b-progress>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-modal id="modal-delete" centered title="Delete" size="sm" @ok="deleteDiary">
          <p class="my-4">Are you sure to delete this diary?</p>
        </b-modal>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="4">
        <b-alert :show="dismissCountDown"
             dismissible
             dismissAfterSeconds
             fade
             variant="success"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
          Auto save<span v-show="polling.res">d!</span><span v-show="!polling.res"> failed!</span>
        </b-alert>
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
      mode: 'create',
      polling: {
        id: '',
        res: ''
      },
      showCollapse: false,
      pic_to_delete: undefined,
      file: [],
      modified: false,
      fileModified: false,
      uploadPercentage: 0,
      dismissSecs: 2,
      dismissCountDown: 0
    }
  },
  methods: {
    changeModifed () {
      this.modified = true
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    _initDiary (diary) {
      this.diary = diary
      var dt = new Date(this.diary.datetime)
      this.diary.datetime = dt.toISOString()
    },
    pollData () {
      var that = this
      this.polling.id = setInterval(() => {
        if (that.modified) {
          if (!that.diary.id) {
            that.$axios.post(api.diary.list, that.diary)
              .then((res) => {
                that.modified = false
                that.polling.res = true
                that._initDiary(res.data)
                that.showAlert()
              }).catch((err) => {
                console.log(err)
                that.showAlert()
                that.polling.res = false
                that.modified = true
              })
          } else {
            that.$axios.put(api.diary.list + that.diary.id + '/', that.diary)
              .then(res => {
                that.modified = false
                that.polling.res = true
                that.showAlert()
              }).catch((err) => {
                console.log(err)
                that.showAlert()
                that.polling.res = false
                that.modified = true
              })
          }
        }
        this._submitPic()
      }, 300000)
    },
    getDiary () {
      if (this.$route.params.id !== 'null') {
        this.$axios.get(api.diary.list + this.$route.params.id + '/')
          .then(res => {
            this._initDiary(res.data)
            this.file = this.diary.pictures
          })
          .catch(function (error) {
            alert(error)
          })
        this.mode = 'edit'
      }
    },
    onSubmit (evt) {
      if (this.mode === 'edit' || this.diary.id) {
        this.$axios.put(api.diary.list + this.diary.id + '/', this.diary)
          .then(res => {
            this._initDiary(res.data)
            return this._submitPic()
          })
          .then(res => {
            this.$router.push('/diary/' + this.diary.id + '/')
          })
          .catch(function (error) {
            alert(error)
          })
      } else {
        this.$axios.post(api.diary.list, this.diary)
          .then(res => {
            this._initDiary(res.data)
            return this._submitPic()
          })
          .then(res => {
            this.$router.push('/diary/' + this.diary.id + '/')
          })
          .catch(function (error) {
            alert(error)
          })
      }
    },
    deletePictures () {
      var that = this
      this.$axios.delete(api.diary.list + this.diary.id + '/files/' + this.pic_to_delete + '/')
        .then(() => {
          for (var i = 0; i < that.file.length; i++) {
            if (that.file[i].id === that.pic_to_delete) {
              that.file.splice(i, 1)
              break
            }
          }
          that.pic_to_delete = undefined
        })
    },
    _submitPic () {
      if (this.fileModified) {
        var fd = new FormData()
        for (var i = 0; i < this.file.length; i++) {
          var file = this.file[i]
          fd.append('file', file)
        }
        fd.append('diary', this.diary.id)
        var that = this
        return this.$axios.put(api.diary.upload, fd, {
          onUploadProgress: function (progressEvent) {
            var percents = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
            this.uploadPercentage = percents
          }.bind(that)
        }).then((res) => { this.fileModified = false })
      } else {
        return Promise.resolve()
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
  mounted () {
    this.pollData()
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
.marginful {
  margin: 1em auto 1em auto;
}
</style>
