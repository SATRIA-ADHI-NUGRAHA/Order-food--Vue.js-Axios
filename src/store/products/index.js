import axios from 'axios'
import { IP_ADDRESS } from '../../helpers/env'

const state = () => {
  return {
    all: {
      products: [],
      productsDetail: [],
      category: [],
      isLoading: false
    }
  }
}
const getters = {
  getAllProducts (state) {
    return state.all.products
  },
  update (state) {
    return state.all.update
  },
  allCategory (state) {
    return state.all.category
  },
  detailProduct (state) {
    return state.all.getDetail
  }
}
const mutations = {
  SET_ALL_PRODUCTS (state, payload) {
    state.all.products = payload
  },
  SET_ALL_CATEGORY (state, payload) {
    state.all.category = payload
  },
  SET_ALL_DETAIL_PRODUCT (state, payload) {
    state.all.getDetail = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  }
}
const actions = {
  getAllProducts (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${IP_ADDRESS}/product/getall`).then((response) => {
        // console.log(response)
        context.commit('SET_ALL_PRODUCTS', response.data.data)
        // resolve()
      }).catch((error) => {
        console.log(error)
        reject(error)
      }).finally(() => {
        context.commit('SET_ALL_LOADING', false)
      })
    })
  },
  updateData (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.patch(`${IP_ADDRESS}/product/update/${payload.idProduk}`, payload.form).then((response) => {
        console.log(response)
        // context.commit('SET_ALL_PRODUCTS', response.data.data)
        resolve()
      }).catch((error) => {
        console.log(error)
        reject(error)
      }).finally(() => {
        context.commit('SET_ALL_LOADING', false)
      })
    })
  },
  deleteData (context, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${IP_ADDRESS}/product/delete/${payload}`, {
      }).then((response) => {
        resolve(response)
        window.location = '/home'
      }).catch((err) => {
        reject(err)
      })
    })
  },
  sendData (context, payload) {
    return new Promise((resolve, reject) => {
      const fd = new FormData()
      fd.append('gambar', payload.gambar)
      fd.append('nama_produk', payload.nama_produk)
      fd.append('harga', payload.harga)
      fd.append('id_category', payload.id_category)
      axios.post(`${IP_ADDRESS}/product/insert`, fd)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  update (context, payload) {
    return new Promise((resolve, reject) => {
      const fd = new FormData()
      fd.append('gambar', payload.gambar)
      fd.append('nama_produk', payload.oldnamaProduk)
      fd.append('harga', payload.oldHarga)
      fd.append('id_category', payload.oldidCategory)
      axios.patch('http://18.205.153.196:3000/product/update', fd)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getCategory (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get('http://18.205.153.196:3000/category/getall')
        .then(response => {
          context.commit('SET_ALL_CATEGORY', response.data.data)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
