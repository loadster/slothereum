<template>
  <div id="home">
    <p>
      Introducing Slothereum: the self-regulated, community-driven cryptocurrency!
    </p>

    <h2>-- Slothereum Manifesto --</h2>
    <p>
      <strong>Universal Basic Income?</strong>
      Hell yeah! All owners of Slothereum get a new coin each day, just for participating in the New Economy.
    </p>

    <p>
      <strong>Public Ledger?</strong>
      We'll do you one better! The Slothereum network is completely open and self-regulated, outside the
      rich of greedy governments and The Man.
    </p>

    <p>
      <strong>No Transaction Fees!</strong>
      It shouldn't cost money to exchange money. That's why the Slothereum Exchange charges no processing fees.
    </p>

    <div class="buttons">
      <router-link to="/registration" tag="button">Create Account</router-link>
      <router-link to="/login" tag="button">Sign In</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}

</script>

<style scoped>

h3 {
  margin: 40px 0 0;
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
