import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DiaryList from '@/components/DiaryList'
import DiaryDetail from '@/components/DiaryDetail'
import DiaryWrite from '@/components/DiaryWrite'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/diary',
      name: 'DiaryList',
      component: DiaryList
    },
    {
      path: '/diary/write',
      name: 'DiaryWrite',
      component: DiaryWrite
    },
    {
      path: '/diary/:id',
      name: 'DiaryDetail',
      component: DiaryDetail
    }
  ]
})
