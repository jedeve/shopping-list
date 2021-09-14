<template>
    <section class="product-list">
        <product-item
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :image="product.image"
        :title="product.title"
        :url="product.url"
        :price="product.price"
        :quantity="product.quantity"
        :categories="product.categories"
        :productStatus="product.status"
        ></product-item>
    </section>
</template>

<script>
import ProductItem from './ProductItem.vue'
export default {
  components: { ProductItem },
  data() {
      return {
          products: []
      }
  },
  updated() {
      this.products = this.$store.getters.filteredProducts
  },
  created() {
      this.products = this.$store.getters.filteredProducts
  }
}
</script>

