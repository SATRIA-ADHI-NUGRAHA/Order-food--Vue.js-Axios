<template>
  <div class="container">
    <div v-if="allProducts.isLoading">
      Loading...
    </div>
    <div v-else>
      <div class="row">
        <div v-for="(item, index) in allProducts" :key="index">
          <div class="card-img">
          <b-button type="submit" variant="inline"><img :src="'http://18.205.153.196:3000/'+item.gambar" alt=""></b-button>
          </div>
          <div class="card-item">
            <p>{{item.nama_produk}} </p>
            <p><b>Rp.  {{item.harga}}</b></p>
          </div>
          <button type="button" class="btn btn-sm btn-danger ml-1 pull-right" data-toggle="modal" @click="actionDeleteData(item.id)">Delete</button>
          <button class="btn btn-sm btn-success ml-1" v-b-modal.modal-update @click="updateProduk(item.id, index)">Update</button>
        </div>
        <b-modal id="modal-update" title="BoostrapVue" hide-header hide-footer>
          <div>
          <form @submit="updateProduk" enctype="multipart/form-data">
            <div class="row">
              <div class="col-sm-12">
                <h4 class="text-left font-weight-bold mt-1 mb-4">Edit Data</h4>
              </div>
            </div>
            <div class="form-group row">
              <label for="nama_produk" class="col-sm-2 col-form-label"><strong>Name</strong></label>
              <div class="form-group row">
                <input type="text" class="form-control bg-input" id="nama_produk" v-model="nameProduct" />
              </div>
            </div>
            <div class="form-grup row">
              <label for="gambar" class="col-sm-2 col-form-label"><strong>Image</strong></label>
              <div class="col-sm-10">
                <input type="file" @change="process($event)" class="form-control bg-input" id="gambar" />
              </div>
            </div>
            <div class="form-group row">
              <label for="harga" class="col-sm-2 col-form-label"><strong>Price</strong></label>
              <div class="form-group row">
                <input type="text" class="form-control bg-input" id="harga" v-model="price" />
              </div>
            </div>
            <div class="form-group row">
              <label for="id_category" class="col-sm-2 col-form-label"><strong>id_category</strong></label>
              <div class="form-group row">
                <input type="text" class="form-control bg-input" id="id_category" v-model="idCategory" />
              </div>
            </div>
            <div class="form-button">
              <input class="" type="submit" value="Send" @click.prevent="sendData"/>
              <input class="cancel" type="button" value="cancel" @click="$emit('addclose')"/>
            </div>
          </form>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Card',
  data () {
    return {
      newInput: {
        data: null,
        detail: {},
        id: null,
        namaProduk: null,
        idCategory: null,
        harga: null,
        image: null
      },
      input: {
        dataCategory: null,
        oldid: null,
        oldnamaProduk: null,
        oldidCategory: null,
        oldharga: null,
        oldgambar: null
      },
      idProduk: null,
      gambar: null,
      nameProduct: null,
      price: null,
      idCategory: null
    }
  },
  computed: {
    ...mapGetters({
      allProducts: 'products/getAllProducts',
      allCategory: 'products/allCategory'
    })
  },
  methods: {
    ...mapActions({
      actionGetAllProducts: 'products/getAllProducts',
      actionDeleteDatas: 'products/deleteData',
      getCategory: 'products/getCategory',
      updateData: 'products/updateData'
    }),
    actionDeleteData (id) {
      this.actionDeleteDatas(id)
    },
    loadOnce () {
      this.input.gambar = this.gambar
      console.log(this.input)
      this.updateData(this.input)
        .then((response) => {
          console.log(response)
          alert(response.data.message)
          location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    toggleModal () {
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    detail (id) {
      this.$router.push(`/detail/${id}`)
    },
    onAdd () {
      this.$emit('emitAdd')
    },
    processFile (event) {
      this.gambar = event.target.files[0]
    },
    updateProduk (id, index) {
      this.idProduk = this.allProducts[index].id
      this.gambar = this.allProducts[index].gambar
      this.nameProduct = this.allProducts[index].nama_produk
      this.price = this.allProducts[index].harga
      this.idCategory = this.allProducts[index].id_category
      // console.log(this.idProduk)
      // console.log(this.gambar)
      // console.log(this.nameProduct)
      console.log(this.price)
      // console.log(this.idCategory)
    },
    sendData () {
      const fd = new FormData()
      fd.append('gambar', this.gambar)
      fd.append('nama_produk', this.nameProduct)
      fd.append('harga', this.price)
      fd.append('id_category', this.idCategory)
      const data = {
        idProduk: this.idProduk,
        form: fd
      }
      this.updateData(data)
        .then((response) => {
          alert('update success')
          window.location = '/home'
        }).catch((err) => {
          alert(err)
        })
    },
    update (namaProduk, idCategory, harga, gambar) {
      this.newInput.namaProduk = namaProduk
      this.newInput.idCategory = idCategory
      this.newInput.harga = harga
      this.newInput.gambar = gambar
      this.input.oldnamaProduk = this.newInput.namaProduk
      this.input.oldidCategory = this.newInput.idCategory
      this.input.oldHarga = this.newInput.harga
      this.input.oldGambar = this.newInput.gambar
    }
  },
  mounted () {
    // this.allProducts()
    this.actionGetAllProducts()
  },
  created () {
    this.getCategory()
  }
}
</script>
