<template>
  <div>
    <base-card class="main">
      <button @click="pageLeave">
        Back
      </button>
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
    this.$store.dispatch('filterProducts', this.$route.params.category)
  },
  methods: {
    pageLeave() {
      this.$router.push('/')
    },
  }
}
</script>
