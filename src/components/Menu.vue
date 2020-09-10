<template>
  <div>
    <div>
      <!-- MENU -->
      <a href>
        <b-button variant="inline-warning">
          <router-link to="/Home"><img src="../assets/img/fork.png" alt /></router-link>
        </b-button>
      </a>
      <a href>
        <b-button variant="inline-warning">
          <router-link to="/History"><img src="../assets/img/clipboard.png" alt /></router-link>
        </b-button>
      </a>
      <!-- MODAL ADD-->
      <b-button v-b-modal.modal-lg variant="inline">
        <img src="../assets/img/add.png" alt />
      </b-button>
      <b-modal id="modal-lg" size="lg" title="Add Item" hide-header hide-footer>
          <h4 style="text-align: left;">
          <b>Add Item</b>
          </h4>
          <form @submit="sendData" enctype="multipart/form-data">
            <div class="m-2">
              <label>Name</label>
              <input type="text" v-model="nama_produk"/>
            </div>
            <div class="m-2">
              <label>Price</label>
              <input type="text" v-model="harga"/>
            </div>
            <div class="m-2">
              <label>id category</label>
              <input type="text" v-model="id_category"/>
            </div>
            <!-- <b-form-select v-model="id_category" class="mb-3 category-select">
              <b-form-select-option :value="null">Please select an option </b-form-select-option>
              <b-form-select-option v-for="(item, index) in category" :key="index" :value="item.id_category">{{item.category}}</b-form-select-option>
            </b-form-select> -->
            <div class="m-2">
              <label>File</label>
              <input type="file" @change="processFile($event)"/>
            </div>
            <span></span>
            <div class="form-button">
              <input class="send" type="submit" value="Send"/>
              <input class="cancel" type="button" value="cancel" @click="$emit('addclose')"/>
            </div>
          </form>
         </b-modal>
      <!-- END MODAL ADD -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Menu',
  data () {
    return {
      nama_produk: null,
      harga: null,
      id_category: null,
      gambar: null
    }
  },
  methods: {
    processFile (event) {
      this.gambar = event.target.files[0]
    },
    sendData () {
      const fd = new FormData()
      fd.append('gambar', this.gambar)
      fd.append('nama_produk', this.nama_produk)
      fd.append('harga', this.harga)
      fd.append('id_category', this.id_category)

      axios.post('http://localhost:5000/product/insert', fd)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
