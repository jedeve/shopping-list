<template>
  <new-product @submit="onSubmitted"></new-product>
</template>

<script>
import axios from 'axios'
import NewProduct from '~/components/Products/NewProduct.vue'
export default {
  components: { NewProduct },
    methods: {
        onSubmitted(productData) {
            axios.post('https://shopping-list-aa6a9-default-rtdb.europe-west1.firebasedatabase.app/products.json', productData)
            .then(result => console.log(result))
            .catch(e => console.log(e))
        }
    }
}
</script>

<style>

</style>