<template>
  <div class="container">
    <h1>products</h1>
    <div v-if="allProducts.isLoading">
      Loading...
    </div>
    <div v-else>
      <div class="row">
        <div v-for="(item, index) in allProducts.products.data" :key="index">
          <div class="card-img">
          <b-button type="submit" variant="inline"><img :src="'http://18.205.153.196:3000/'+item.gambar" alt=""></b-button>
          </div>
          <div class="card-item">
            <p>{{item.nama_produk}} </p>
            <p><b>Rp.  {{item.harga}}</b></p>
          </div>
          <!-- <button type="button" class="btn btn-sm btn-danger ml-1 pull-right" data-toggle="modal" @click="deleteData(item.id)">Delete</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      allProducts: 'products/getAllProducts'
    })
  },
  methods: {
    ...mapActions({
      actionGetAllProducts: 'products/getAllProducts'
    })
  },
  mounted () {
    this.actionGetAllProducts()
  }
}
</script>
