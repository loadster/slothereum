<template>
  <div id="app">
    <div class="logo">
      <img id="logo" src="./assets/logo.png"/>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>

import Axios from 'axios'
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
  methods: {
    init: () => {
      var token = sessionStorage.getItem('token')

      if (token) {
        this.token = token
        this.refreshWallets()
      } else {
        this.token = null
        this.wallets = []
      }
    },
    loggedIn: (token) => {
      sessionStorage.setItem('token', token)

      this.init()
    },
    handleLogout: () => {
      this.token = null
      this.wallets = []
      this.error = null

      sessionStorage.removeItem('token')
    },
    refreshWallets: () => {
      Axios.get(process.env.VUE_APP_API_BASE + '/api/wallets/mine', {
        auth: {
          password: sessionStorage.getItem('token')
        }
      }).then(function (response) {
        this.wallets = response.data
      })
    }
  },
  data () {
    return {
      wallets: [],
      token: null
    }
  }
}

</script>

<style>

@import "assets/main.css";

</style>
