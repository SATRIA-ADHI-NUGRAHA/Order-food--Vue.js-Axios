import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
// import axios from 'axios'
import products from './products/'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    auth
  },
  state: {
    test: 'hello',
    product: []
  },
  mutations: {
    SET_TEST (state, payload) {
      state.test = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    }
  },
  actions: {
    onClickTes (context, payload) {
      context.commit('SET_TEST', payload)
    }
    // getProduct (context) {
    //   return new Promise((resolve, reject) => {
    //     axios.get('http://18.205.153.196:3000/getall').then((response) => {
    //       context.commit('SET_PRODUCT', response.data)
    //       resolve()
    //       console.log(this.product)
    //     }).catch((err) => {
    //       reject(err)
    //     })
    //   })
    // }
  },
  getters: {
    getterTest (state) {
      return state.test + '!!!!!'
    }
  }
})
