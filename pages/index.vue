<template>
  <base-card class="main">
    <product-list></product-list>
    <nuxt-link to="/products/new-product">Add new product</nuxt-link>
  </base-card>
</template>

<script>
import ProductList from '~/components/Products/ProductList.vue'
import BaseCard from '~/components/UI/BaseCard.vue'
export default {
  components: { 
    ProductList,
    BaseCard 
    },
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
