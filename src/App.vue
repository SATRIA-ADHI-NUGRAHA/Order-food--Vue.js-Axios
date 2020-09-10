<template>
  <div id="app">
    <div class="row">
      <div class="col-lg-8">
        <Navbar/>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<!--
<template>
  <div id="app">
    <div id="nav">
      <div class="container-fluit">
        <div class="row">
          <div class="col-lg-8 nopadding">
            <Navbar/>
            <div class="row">
              <div class="col-lg-1 nopadding">
                <div class="menu">
                  <Menu/>
                </div>
              </div>
              <div class="col-lg-11 nopadding">
                <div class="content">
                  <div class="search-sort">
                    <b-input-group>
                      <template v-slot:prepend>
                        <b-input-group-text><b-icon-search></b-icon-search></b-input-group-text>
                      </template>
                      <b-form-input v-model="search" @keyup="searchProduct" placeholder="Search here..."></b-form-input>
                      <template v-slot:append>
                        <b-dropdown text="Sort By" variant="dark">
                          <b-dropdown-item v-model="sortNama" @click="sortProduct1">Name</b-dropdown-item>
                          <b-dropdown-item v-model="sortPrice" @click="sortProduct2">Price</b-dropdown-item>
                        </b-dropdown>
                      </template>
                    </b-input-group>
                  </div>
                  <div v-if="users.length === 0">
                    Product not found ..!
                  </div>
                  <div v-else>
                    <div class="row">
                      <div class="p-1" v-for="(item, index) in users" :key="index">
                        <Card v-on:emitAdd="onAdd(item.id)" type="user" :product="item"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 nopadding">
            <Cart/>
            <div class="col-md-12">
              <div v-if="cart.length===0" class="text-center">
                <Orders1/>
              </div>
              <div v-else>
                <div v-for="(item, index) in cart" :key="index">
                  <div class="cart-list">
                    <div class="d-flex">
                      <div class="p-2">
                        <img src="./assets/img/bear.png" alt="" />
                      </div>
                      <div class="p-2 align-self-start">
                        <p class="name-list"><b>{{item.nama_produk}}</b></p>
                        <div class="plus-minus btn-group mr-2" role="group" aria-label="Second group">
                          <button type="button" class="minus btn" @click="minus(index)">-</button>
                          <button type="button" class="number btn">{{item.qty}}</button>
                          <button type="button" class="plus btn" @click="plus(index)">+</button>
                        </div>
                      </div>
                      <div class="p-2">
                        <p class="price"><b>Rp. {{item.harga*item.qty}}</b></p>
                      </div>
                    </div>
                  </div>
                </div>
                  <div class="main-counting-cart">
                    <div class="cart-counting">
                        <h3><b>Total :</b></h3>
                        <h3><b>Rp. 105.000*</b></h3>
                    </div>
                    <p>*Belum termasuk ppn</p>
                    <div class="main-btn-cart">
                        <button>Checkout</button>
                        <button>Cancel</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Card from './components/Card'
import Orders1 from './components/Orders1'
import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      search: '',
      sortNama: 'nama_product',
      sortPrice: 'harga',
      cart: []
    }
  },
  components: {
    Navbar,
    Menu,
    Cart,
    Card,
    Orders1
  },
  methods: {
    fetchAPI () {
      axios.get('http://localhost:5000/product/getall').then((response) => {
        this.users = response.data.data
        console.log(this.users)
      }).catch((err) => {
        console.log(err)
      })
    },
    searchProduct () {
      axios.get('http://localhost:5000/product/getall?namaProduk=' + this.search).then((response) => {
        this.users = response.data.data
        console.log(this.users)
      }).catch((err) => {
        console.log(err)
      })
    },
    sortProduct1 () {
      axios.get('http://localhost:5000/product/getall?type=&sort=nama_produk').then((response) => {
        this.users = response.data.data
        console.log(this.users)
      }).catch((err) => {
        console.log(err)
      })
    },
    sortProduct2 () {
      axios.get('http://localhost:5000/product/getall?type=&sort=harga').then((response) => {
        this.users = response.data.data
        console.log(this.users)
      }).catch((err) => {
        console.log(err)
      })
    },
    onAdd (id) {
      const cart = this.cart.filter((e) => e.id === id)
      if (cart.length === 0) {
        const data = this.users.filter((e) => e.id === id)
        data[0].qty = 1
        this.cart = [...this.cart, data[0]]
      } else {
        const dataBaru = this.cart.map((e) => {
          if (e.id === id) {
            e.qty += 1
          }
          return e
        })
        this.cart = dataBaru
      }
    },
    minus (index) {
      const dataBaru = this.cart.map((e, i) => {
        if (i === index) {
          e.qty -= 1
        }
        return e
      })
      this.cart = dataBaru
    },
    plus (index) {
      const dataBaru = this.cart.map((e, i) => {
        if (i === index) {
          e.qty += 1
        }
        return e
      })
      this.cart = dataBaru
    }
  },
  mounted () {
    this.fetchAPI()
  }
}
</script> -->
