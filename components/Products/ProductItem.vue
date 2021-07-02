<template>
  <div class="container">
  <div class="product-image"
  @click="toProduct"
    :style="{backgroundImage: 'url(' + image + ')'}">
    </div>
  <div class="product-data">
    <div class="product-title" @click="toProduct">
        {{ title }}
    </div>
    <div class="product-url">
        <a :href="url" v-on:click.stop target="_blank">Go to product</a>
    </div>
    <base-category v-for="cat in categories" :key="cat" @click.native="filterItems(cat)" v-on:click.stop>
        {{ cat }}
    </base-category>
    </div>
    <div>
    <div class="product-price">
        € {{ price }}
    </div>
    <div class="remove-button">
      <button @click="removeItem" v-on:click.stop>
        Remove
      </button>
    </div>
    </div>
</div>
</template>

<script>
import BaseCategory from '../UI/BaseCategory.vue'
export default {
  components: { BaseCategory },
    props: {
        id: {
          type: String,
          required: true
        },
        image: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        categories: {
            type: Array,
            required: false
        } 
    },
    methods: {
        toProduct() {
            this.$router.push('/products/' + this.id)
        },
        removeItem() {
          this.$store.dispatch('removeProduct', this.id)
        },
        filterItems(cat) {
          this.$router.push('/products/categories/' + cat)
        }
    }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    border: 2px solid black;
    border-radius: 10px;
    width: auto;
    padding: 10px;
    margin: 10px;
  }

  .remove-button {
    position: relative;
    right:    -20px;
    bottom:   -15px;
  }

  .product-price {
    display: flex;
    font-size: 1.5rem;
    justify-content: flex-end;

  }

  .product-title {
    font-size: 1.5rem;
  }

  .product-image {
    width: 25%;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .product-data {
    flex: 1;
  }
</style>