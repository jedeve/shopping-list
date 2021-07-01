<template>
    <div>
        <h1>Add new Product</h1>
        <form @submit.prevent="addProduct">
            <div>
            <label for="productTitle">Name</label>
            <input id="productTitle" type="text" v-model="newProduct.title">
            </div>
            <div>
            <label for="productURL">Product Page</label>
            <input id="productURL" type="url" v-model="newProduct.url">
            </div>
            <div>
            <label for="productImage">Image Link</label>
            <input id="productImage" type="url" v-model="newProduct.image">
            </div>
            <div>
            <label for="productPrice">Price</label>
            <input id="productPrice" type="number" v-model="newProduct.price">
            </div>
            <button>Add Product</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newProduct: {
                title: "",
                url: "",
                image: "",
                price: 0
            }
        }
    },
    methods: {
        addProduct() {
            this.$emit('submit', this.newProduct)
            // this.$store.dispatch('addProduct', {
            //     title: this.name,
            //     url: this.url,
            //     image: this.image,
            //     price: this.price
            // })

            this.name = ""
            this.url = "",
            this.image = "",
            this.price = 0
        }
    }
}
</script>

<style>

</style>