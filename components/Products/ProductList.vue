<template>
    <section>
        <product-item class="product-list"
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
    margin-bottom: 10px;
}
</style>