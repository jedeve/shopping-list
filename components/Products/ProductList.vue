<template>
    <section class="product-list">
        <product-item
        v-for="product in loadedProducts"
        :key="product.id"
        :image="product.image"
        :title="product.title"
        :url="product.url"
        :price="product.price"
        :categories="['living room']"
        ></product-item>
    </section>
</template>

<script>
import ProductItem from './ProductItem.vue'
export default {
  components: { ProductItem },
  computed: {
      loadedProducts() {
          return this.$store.getters.loadedProducts
      }
  }

}
</script>

<style scoped>
.product-list{

}
</style>