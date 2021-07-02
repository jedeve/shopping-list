<template>
    <section class="product-list">
        <product-item
        v-for="product in loadedProducts"
        :key="product.id"
        :id="product.id"
        :image="product.image"
        :title="product.title"
        :url="product.url"
        :price="product.price"
        :categories="product.categories"
        ></product-item>
    </section>
</template>

<script>
import ProductItem from './ProductItem.vue'
export default {
  components: { ProductItem },
  props: ['categoryFilter'],
  computed: {
      loadedProducts() {
          const products = this.$store.getters.loadedProducts
          if(this.categoryFilter){
            var parsedProducts = []
            console.log(this.categoryFilter)
            for(const product in products) {
                if(products[product].categories.includes(this.categoryFilter)) {
                    parsedProducts.push(products[product])
                }
            }
            return parsedProducts
          } else {
              return products
          }
      }
  },

}
</script>

<style scoped>
.product-list{

}
</style>