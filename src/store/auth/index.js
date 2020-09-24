import axios from 'axios'

const state = () => {
  return {
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  isLogin (state) {
    if (state.token !== null || state.token !== undefined) {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('http://18.205.153.196:3000/users/register', payload).then((response) => {
        // console.log(response)
        resolve(response.data.message)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  login (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post('http://18.205.153.196:3000/users/login', payload).then((response) => {
        localStorage.setItem('token', response.data.data.token)
        resolve(response.data.message)
      }).catch((err) => {
        reject(err, 'gagal login')
      })
    })
  },
  logout (context) {
    return new Promise((resolve) => {
      localStorage.removeItem('token')
      resolve('Logout Success')
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters
}
