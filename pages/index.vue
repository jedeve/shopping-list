<template>
  <div>
    <product-list></product-list>
    <nuxt-link to="/products/new-product">Add new product</nuxt-link>
  </div>
</template>

<script>
import ProductList from '~/components/Products/ProductList.vue'
export default {
  components: { ProductList },}
</script>
