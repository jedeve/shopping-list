<template>
<base-card>
  <edit-product
  :product="product"
  status="Edit"
  @submit="editProduct">
  </edit-product>
</base-card>
</template>

<script>
import EditProduct from '~/components/Products/EditProduct.vue'
import BaseCard from '~/components/UI/BaseCard.vue'
export default {
  components: { EditProduct, BaseCard },
  computed: {
      product() {
          return this.$store.getters.getProduct(this.$route.params.id)
      }
  },
  methods: {
      editProduct(productData) {
          this.$store.dispatch('editProduct', productData)
            .then(() => {
            this.$router.push('/')
            })
      }
  }

}
</script>

<style>

</style>