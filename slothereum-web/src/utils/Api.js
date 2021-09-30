import Axios from 'axios'

const options = () => {
  let token = sessionStorage.getItem('token') || ''

  return {
    auth: {
      username: token,
      password: token
    }
  }
}

export default {
  async register (username, password) {
    let response = await Axios.post(`${process.env.VUE_APP_API_BASE}/api/registration`, {
      username: username,
      password: password
    }, options())

    return response.data
  },

  async login (username, password) {
    let response = await Axios.post(`${process.env.VUE_APP_API_BASE}/api/login`, {
      username: username,
      password: password
    }, options())

    return response.data
  },

  async listMyWallets () {
    let response = await Axios.get(`${process.env.VUE_APP_API_BASE}/api/wallets?mine=true&friends=false`, options())

    return response.data
  },

  async listOtherWallets () {
    let response = await Axios.get(`${process.env.VUE_APP_API_BASE}/api/wallets?mine=false&friends=true`, options())

    return response.data
  },

  async transferCoin (sourceWalletId, destinationWalletId, amount) {
    let response = await Axios.post(`${process.env.VUE_APP_API_BASE}/api/transactions`, {
      source: sourceWalletId,
      destination: destinationWalletId,
      amount: amount
    }, options())

    return response.data
  }
}
