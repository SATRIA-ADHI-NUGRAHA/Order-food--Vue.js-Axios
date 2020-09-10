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
                          <b-dropdown-item v-model="sortNama" @click="sortProduct1">Name: A-Z</b-dropdown-item>
                          <b-dropdown-item v-model="sortNama2" @click="sortProduct4">Name: Z-A</b-dropdown-item>
                          <b-dropdown-item v-model="sortPrice2" @click="sortProduct3">Most Expensive</b-dropdown-item>
                          <b-dropdown-item v-model="sortPrice" @click="sortProduct2">Cheapest</b-dropdown-item>
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
                        <button type="button" class="btn btn-sm btn-danger ml-1 pull-right" data-toggle="modal" @click="deleteData(item.id)">Delete</button>
                        <button class="btn btn-sm btn-success ml-1" v-b-modal.modal-update @click="update(item.id, index)">Update</button>
                        <b-modal id="modal-update" title="BoostrapVue" hide-header hide-footer>
                          <div>
                          <form @submit="updateData" enctype="multipart/form-data">
                            <div class="row">
                              <div class="col-sm-12">
                                <h4 class="text-left font-weight-bold mt-1 mb-4">Edit Data</h4>
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="nama_produk" class="col-sm-2 col-form-label"><strong>Name</strong></label>
                              <div class="form-group row">
                                <input type="text" class="form-control bg-input" id="nama_produk" v-model="oldproductname" />
                              </div>
                            </div>
                            <div class="form-grup row">
                              <label for="gambar" class="col-sm-2 col-form-label"><strong>Image</strong></label>
                              <div class="col-sm-10">
                                <input type="file" @change="process($event)" class="form-control bg-input" id="gambar"/>
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="harga" class="col-sm-2 col-form-label"><strong>Price</strong></label>
                              <div class="form-group row">
                                <input type="text" class="form-control bg-input" id="harga" v-model="oldharga" />
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="id_category" class="col-sm-2 col-form-label"><strong>id_category</strong></label>
                              <div class="form-group row">
                                <input type="text" class="form-control bg-input" id="id_category" v-model="oldidcategory" />
                              </div>
                            </div>
                            <div class="form-button">
                              <input class="send" type="submit" value="Send"/>
                              <input class="cancel" type="button" value="cancel" @click="$emit('addclose')"/>
                            </div>
                          </form>
                          </div>
                        </b-modal>
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
                        <img :src="'http://localhost:5000/'+item.gambar" alt="" />
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

export default {
  data () {
    return {
      users: [],
      search: '',
      sortNama: 'nama_product',
      sortNama2: 'nama_product',
      sortPrice: 'harga',
      sortPrice2: 'harga',
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
    sortProduct4 () {
      axios.get('http://localhost:5000/product/getall?type=DESC&sort=nama_produk').then((response) => {
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
    sortProduct3 () {
      axios.get('http://localhost:5000/product/getall?type=DESC&sort=harga').then((response) => {
        this.users = response.data.data
        console.log(this.users)
      }).catch((err) => {
        console.log(err)
      })
    },
    update (id, index) {
      this.id_update = id
      this.oldproductname = this.data[index].nama_produk
      this.oldgambar = this.data[index].image
      this.oldharga = this.data[index].harga
      this.oldidcategory = this.data[index].id_category
    },
    updateData () {
      const fd = new FormData()
      fd.append('nama_produk', this.oldproductname)
      fd.append('gambar', this.gambar)
      fd.append('harga', this.oldharga)
      fd.append('id_category', this.id_category)
      console.log(this.oldproductname)
      console.log(this.image)
      console.log(this.oldharga)
      console.log(this.id_category)
      axios.patch(`http://localhost:5000/product/update/${this.id_update}`, fd).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    },
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
    //   axios.patch(`http://localhost:5000/product/update/${this.dataToEdit}`, formdata)
    //     .then((res) => {
    //       console.log(res.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    deleteData (id) {
      axios.delete(`http://localhost:5000/product/delete/${id}`).then((response) => {
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
    this.fetchAPI()

    axios
      .get('http://localhost:5000/category/getall')
      .then((response) => this.setCategory(response.data.data))
      .catch((err) => console.log(err))

    axios
      .get(`http://localhost:5000/products/getdetail/${this.idtoedit}`)
      .then((response) => this.latesData(response.data.data[0]))
      .catch((err) => console.log(err))
  }
}
</script>
