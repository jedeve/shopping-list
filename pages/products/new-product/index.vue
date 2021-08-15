<template>
  <base-card>
    <edit-product
      :product="product"
      status="Add"
      @submit="onSubmitted"></edit-product>
  </base-card>
</template>

<script>
import axios from 'axios'
import EditProduct from '~/components/Products/EditProduct.vue'
import BaseCard from '~/components/UI/BaseCard.vue'

export default {
  data() {
    return {
      product: {
        title: '',
        url: '',
        image: '',
        price: 0,
        quantity: 1,
        categories: []
      }
    }
  },
  components: {EditProduct, BaseCard},
  methods: {
    onSubmitted(productData) {
      this.$store.dispatch('addProduct', productData)
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>

<style>

</style>
