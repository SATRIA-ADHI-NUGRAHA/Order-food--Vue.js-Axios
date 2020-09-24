<template>
  <div>
    <div class="your-cart">
      <img src="../assets/img/food-and-restaurant.png" alt="your-cart" />
      <p class="cart-text-1"><b>Your cart is empty</b></p>
      <p class="cart-text-2" v-cantik="'red'">Please add some items from {{addres}}</p>
    </div>
  </div>
</template>

<script>
import naon from '../mixins/index'

export default {
  mixins: [naon]
}
</script>
