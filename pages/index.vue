<template>
<div>
  <h1>All Products</h1>
  <base-card class="main">
    <product-list></product-list>
    <nuxt-link to="/products/new-product">Add new product</nuxt-link>
  </base-card>
  <base-card>
    <products-total></products-total>
  </base-card>
</div>
</template>

<script>
import ProductList from '~/components/Products/ProductList.vue'
import ProductsTotal from '/components/Products/ProductsTotal.vue'
import BaseCard from '~/components/UI/BaseCard.vue'
export default {
  components: { 
    ProductList,
    BaseCard,
    ProductsTotal 
    },
    created() {
        return this.$store.dispatch('filterProducts', false)
    }
}
</script>
<style scoped>
  /* .main {
    flex-direction: column;
      align-items: center;
      display: flex;
      justify-content: center;
  } */
</style>
