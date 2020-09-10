<template>
  <div>
    <div>
      <div class="card-img">
        <b-button type="submit" @click="onAdd()" variant="inline"><img :src="'http://localhost:5000/'+product.gambar" alt=""></b-button>
      </div>
      <div class="card-item">
        <p>{{product.nama_produk}}</p>
        <p><b>Rp.  {{product.harga}}</b></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['product'],
  methods: {
    onAdd () {
      this.$emit('emitAdd')
    }
  },
  mounted () {
    this.result = this.product
  }
}
</script>
