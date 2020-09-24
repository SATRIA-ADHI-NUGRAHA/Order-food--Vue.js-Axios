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
          <form @submit.prevent="insertData" enctype="multipart/form-data">
            <div class="m-2">
              <label>Name</label>
              <input type="text" v-model="input.nama_produk"/>
            </div>
            <div class="m-2">
              <label>Price</label>
              <input type="text" v-model="input.harga"/>
            </div>
            <div class="m-2">
              <label>id category</label>
              <input type="text" v-model="input.id_category"/>
            </div>
            <!-- <b-form-select v-model="input.category" class="mb-3 category-select">
              <b-form-select-option :value="null">Please select an option </b-form-select-option>
              <b-form-select-option v-for="(item, index) in allCategory" :key="index" :value="item.id_category">{{item.category}}</b-form-select-option>
            </b-form-select><br><br> -->
            <div class="m-2">
              <label>File</label>
              <input type="file" @change="processFile($event)"/>
            </div>
            <span></span>
            <div class="form-button">
              <b-button class="mt-3" type="submit" block @click="loadOnce" name="button">Add</b-button>
              <input type="button" value="cancel" @click="$emit('addclose')" />
            </div>
          </form>
         </b-modal>
      <!-- END MODAL ADD -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Menu',
  data () {
    return {
      input: {
        nama_produk: null,
        harga: null,
        id_category: null,
        gambar: null
      }
    }
  },
  computed: {
    ...mapGetters({
      allCategory: 'products/allCategory'
    })
  },
  methods: {
    ...mapActions({
      insertData: 'products/sendData',
      getCategory: 'products/getCategory'
    }),
    loadOnce () {
      this.input.gambar = this.gambar
      this.insertData(this.input)
        .then((response) => {
          console.log(response)
          alert(response.data.message)
          location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    processFile (event) {
      this.gambar = event.target.files[0]
    }
    // insert () {
    //   this.insertData(this.input).then((response) => {
    //     console.log(response)
    //     alert(response)
    //   }).catch((err) => {
    //     alert(err)
    //   })
    // }
  }
}
</script>
