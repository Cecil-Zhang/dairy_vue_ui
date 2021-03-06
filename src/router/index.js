import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import DiaryList from '@/components/DiaryList'
import DiaryDetail from '@/components/DiaryDetail'
import DiaryWrite from '@/components/DiaryWrite'
import UserLogin from '@/components/UserLogin'
import UserRegister from '@/components/UserRegister'
import Settings from '@/components/Settings'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: DiaryList
    },
    {
      path: '/user/login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/user/register',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/user/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/diary/page/:page',
      name: 'DiaryList',
      component: DiaryList
    },
    {
      path: '/diary/write/:id',
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

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/user/login', '/user/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = store.getters.isLoggedIn

  if (authRequired && !loggedIn) {
    store.dispatch('auto_login')
      .then(() => {
        next()
      }, () => {
        next('/user/login')
      })
  } else {
    next()
  }
})

export default router
