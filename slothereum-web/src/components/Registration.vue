<template>
  <div id="registration">
    <div class="message">{{ message }}</div>
    <label for="registration-username">Email</label>
    <form>
      <div>
        <input id="registration-username" name="username" v-model="username"/>
      </div>
      <label for="registration-password">Password</label>
      <div>
        <input id="registration-password" name="password" type="password" v-model="password" v-on:keyup.13="submit"/>
      </div>
      <div>
        <input type="button" value="Create Account" v-on:click="submit"/>
      </div>
    </form>
    <div class="footer">
      <router-link :to="{path: '/login'}">Sign In</router-link>
    </div>
  </div>
</template>

<script>

import Api from '../utils/Api'

export default {
  name: 'Registration',
  data () {
    return {
      username: "",
      password: "",
      message: "Create your Slothereum wallet and claim your 100 founder-class coins!"
    };
  },
  methods: {
    async submit () {
      try {
        let response = await Api.register(this.username, this.password)

        sessionStorage.setItem('token', response.token)

        this.$router.push({path: '/wallets'})
      } catch (err) {
        this.message = "Sorry, an error has occured... Please try again"
      }
    }
  }
}

</script>

