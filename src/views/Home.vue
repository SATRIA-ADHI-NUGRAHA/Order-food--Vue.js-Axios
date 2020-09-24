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
                <button class="btn btn-inline btn-xl" @click="onLogout()"><img src="../assets/logout.png" alt=""></button>
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
                          <b-dropdown-item v-model="sortNama" @click="sortProduct1">Name: A-Z</b-dropdown-item>
                          <b-dropdown-item v-model="sortNama2" @click="sortProduct4">Name: Z-A</b-dropdown-item>
                          <b-dropdown-item v-model="sortPrice2" @click="sortProduct3">Most Expensive</b-dropdown-item>
                          <b-dropdown-item v-model="sortPrice" @click="sortProduct2">Cheapest</b-dropdown-item>
                        </b-dropdown>
                      </template>
                    </b-input-group>
                  </div>
                    <div class="row">
                      <Card v-on:emitAdd="onAdd(item.id)" type="user" :product="item"/>
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
                        <img :src="'http://18.205.153.196:3000/'+item.gambar" alt="" />
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
                        <h3><b>Rp. 150000</b></h3>
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
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Cart from '../components/Cart'
import Card from '../components/Card'
import Orders1 from '../components/Orders1'
import axios from 'axios'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      users: [],
      product: [],
      search: '',
      sortNama: 'nama_product',
      sortNama2: 'nama_product',
      sortPrice: 'harga',
      sortPrice2: 'harga',
      cart: [],
      // testVid
      inputTest: ''
    }
  },
  computed: {
    ...mapState(['test']),
    ...mapState({
      testing: 'test',
      getAllProduct: 'product'
    }),
    ...mapGetters({
      getter2: 'getterTest',
      produk: 'products/getAllProducts',
      allProducts: 'products/getAllProducts'
    })
  },
  components: {
    Navbar,
    Menu,
    Cart,
    Card,
    Orders1
  },
  methods: {
    ...mapActions({
      onClickTest: 'onClickTes',
      onGetProduct: 'getProduct',
      actionLogout: 'auth/logout',
      actionGetAllProducts: 'products/getAllProducts',
      actionDeleteData: 'products/deleteData'
    }),
    onLogout () {
      this.actionLogout().then((responses) => {
        alert('Logout Success')
        window.location = '/login'
      })
    },
    submitForm () {
      this.onClickTest(this.inputTest)
    },
    // fetchAPI () {
    //   axios.get('http://18.205.153.196:3000/product/getall').then((response) => {
    //     this.users = response.data.data
    //     console.log(this.users)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    searchProduct () {
      axios.get('http://18.205.153.196:3000/product/getall?namaProduk=' + this.search).then((response) => {
        this.users = response.data.data
        console.log(this.users)
      }).catch((err) => {
        console.log(err)
      })
    },
    sortProduct1 () {
      axios.get('http://18.205.153.196:3000/product/getall?type=&sort=nama_produk').then((response) => {
        this.users = response.data.data
        console.log(this.users)
      }).catch((err) => {
        console.log(err)
      })
    },
    sortProduct4 () {
      axios.get('http://18.205.153.196:3000/product/getall?type=DESC&sort=nama_produk').then((response) => {
        this.users = response.data.data
        console.log(this.users)
      }).catch((err) => {
        console.log(err)
      })
    },
    sortProduct2 () {
      axios.get('http://18.205.153.196:3000/product/getall?type=&sort=harga').then((response) => {
        this.users = response.data.data
        console.log(this.users)
      }).catch((err) => {
        console.log(err)
      })
    },
    sortProduct3 () {
      axios.get('http://18.205.153.196:3000/product/getall?type=DESC&sort=harga').then((response) => {
        this.users = response.data.data
        console.log(this.users)
      }).catch((err) => {
        console.log(err)
      })
    },
    // update (id, index) {
    //   this.id_update = id
    //   this.oldproductname = this.data[index].nama_produk
    //   this.oldgambar = this.data[index].image
    //   this.oldharga = this.data[index].harga
    //   this.oldidcategory = this.data[index].id_category
    // },
    // updateData () {
    //   const fd = new FormData()
    //   fd.append('nama_produk', this.oldproductname)
    //   fd.append('gambar', this.gambar)
    //   fd.append('harga', this.oldharga)
    //   fd.append('id_category', this.id_category)
    //   console.log(this.oldproductname)
    //   console.log(this.image)
    //   console.log(this.oldharga)
    //   console.log(this.id_category)
    //   axios.patch(`http://18.205.153.196:3000/product/update/${this.id_update}`, fd).then((result) => {
    //     console.log(result)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    // sendData () {
    //   if (this.nama_produk == null) {
    //     this.nama_produk = this.dataToEdit.nama_produk
    //   } if (this.id_category == null) {
    //     this.id_category = this.dataToEdit.id_category
    //   } if (this.price == null) {
    //     this.price = this.dataToEdit.price
    //   }
    //   const formdata = new FormData()
    //   formdata.append('nama_produk', this.nama_produk)
    //   formdata.append('id_category', this.id_category)
    //   formdata.append('harga', this.harga)
    //   formdata.append('gambar', this.gambar)
    //   axios.patch(`http://18.205.153.196:3000/product/update/${this.dataToEdit}`, formdata)
    //     .then((res) => {
    //       console.log(res.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    deleteData (id) {
      axios.delete(`http://18.205.153.196:3000/product/delete/${id}`).then((response) => {
        console.log(response.data)
      }).catch((err) => { console.log(err) })
    },
    // updateData () {
    //   const fd = new FormData()

    // }
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
    // this.fetchAPI()
    this.onGetProduct()
    this.actionGetAllProducts()

    // axios
    //   .get('http://18.205.153.196:3000/category/getall')
    //   .then((response) => this.setCategory(response.data.data))
    //   .catch((err) => console.log(err))

    // axios
    //   .get(`http://18.205.153.196:3000/products/getdetail/${this.idtoedit}`)
    //   .then((response) => this.latesData(response.data.data[0]))
    //   .catch((err) => console.log(err))
  }
}
</script>
