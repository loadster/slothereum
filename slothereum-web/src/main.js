import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Api from './utils/Api'
import HomeComponent from './components/Home'
import RegistrationComponent from './components/Registration'
import LoginComponent from './components/Login'
import WalletsComponent from './components/Wallets'

Vue.config.productionTip = false

Vue.use(VueRouter)

const redirectIfLoggedIn = async (to, from, next) => {
  try {
    await Api.listMyWallets()

    next('/wallets')
  } catch (err) {
    next()
  }
}

const redirectIfNotLoggedIn = async (to, from, next) => {
  try {
    await Api.listMyWallets()

    next()
  } catch (err) {
    next('/')
  }
}


new Vue({
  render: h => h(App),
  router: new VueRouter({
    routes: [
      {
        path: '/',
        component: HomeComponent,
        beforeEnter: redirectIfLoggedIn
      },
      {
        path: '/registration',
        component: RegistrationComponent,
        beforeEnter: redirectIfLoggedIn
      },
      {
        path: '/login',
        component: LoginComponent,
        beforeEnter: redirectIfLoggedIn
      },
      {
        path: '/logout', beforeEnter: async (to, from, next) => {
          sessionStorage.clear()

          next('/')
        }
      },
      {
        path: '/wallets',
        component: WalletsComponent,
        beforeEnter: redirectIfNotLoggedIn
      }
    ]
  }),
}).$mount('#app')
