<template>
  <div id="wallets">
    <h2>My Wallets</h2>
    <div class="wallet" v-for="wallet in wallets" v-if="wallets" :key="wallet.address">
      <div class="balance">
        {{ wallet.balance.toFixed(2) }}
      </div>
      <div class="address">
        {{ wallet.address }}
      </div>
    </div>
    <div class="transfer">
      <h2>Transfer Currency</h2>
      <label for="amount">Amount</label>
      <div>
        <input id="amount" name="amount" type="number"
               min="0.01" max="1000000" class="transfer-amount" v-model="amount"/>
      </div>
      <label for="source">Source Wallet</label>
      <div>
        <select id="source" name="source" class="transfer-source" v-model="sourceSelected">
          <option v-for="wallet in wallets" :key="wallet.address">{{ wallet.address }}</option>
        </select>
      </div>
      <label for="destination">Destination Wallet</label>
      <div>
        <select id="destination" name="destination" class="transfer-destination" v-model="destinationSelected">
          <option v-for="wallet in network" :key="wallet.address">{{ wallet.address }}</option>
        </select>
      </div>
      <div>
        <input type="button" value="Transfer" v-on:click="confirmTransfer" v-model="transferButton"/>
      </div>
    </div>
    <div class="footer">
      <router-link to="/logout">Sign Out</router-link>
    </div>
  </div>
</template>

<script>

import Api from '../utils/Api'

export default {
  name: 'Wallets',
  data: function () {
    return {
      loading: false,
      wallets: [],
      network: [],
      sourceSelected: null,
      destinationSelected: null,
      amount: 1,
      transferButton: "Transfer"
    }
  },
  created: function () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.loading = true
      this.wallets = await Api.listMyWallets()
      this.network = await Api.listOtherWallets()
      this.sourceSelected = this.wallets.length ? this.wallets[0].address : null
      this.network = this.network.filter(w => {
        return !this.wallets.find(myWallet => {
          return myWallet.address === w.address
        })
      })
      this.loading = false
    },
    async confirmTransfer () {
      await Api.transferCoin(this.sourceSelected, this.destinationSelected, this.amount)

      this.loadData()
      this.transferButton = "Transferred!"

      setTimeout(() => {
        this.transferButton = "Transfer"
        this.loadData()
      }, 2000)
    }
  }
}

</script>
