<template>
  <div id="login">
    <div class="message">{{ message }}</div>
    <label for="login-username">Email</label>
    <form @submit.prevent="submit">
      <div>
        <input id="login-username" name="username" v-model="username" autofocus="autofocus"/>
      </div>
      <label for="login-password">Password</label>
      <div>
        <input id="login-password" name="password" type="password" v-model="password" v-on:keyup.13="submit"/>
      </div>
      <div>
        <input type="submit" value="Sign In"/>
      </div>
    </form>
    <div class="footer">
      <router-link :to="{path: '/registration'}">Create Account</router-link>
    </div>
  </div>
</template>

<script>

import Api from '../utils/Api'

export default {
  name: 'Login',
  data () {
    return {
      username: "",
      password: "",
      message: "Please sign in to access your Slothereum wallet."
    }
  },
  methods: {
    async submit () {
      try {
        let response = await Api.login(this.username, this.password)

        sessionStorage.setItem('token', response.token)

        this.$router.push({path: '/wallets'})
      } catch (err) {
        this.password = ""
        this.message = "Oops! Please try again."
      }
    }
  }
}

</script>
