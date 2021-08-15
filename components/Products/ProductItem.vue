<template>
  <div
  :class="{unincluded: !includeStatus}"
  class="container"
  >
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
    <div class="include-button">
      <input id="status" name="include" type="checkbox" :checked="includeStatus" v-model="includeStatus">
    </div>
    <div class="product-price">
        € {{ price }}
    </div>
    <input id="productQuantity" class="product-quantity" type="number" step="0" v-model="productQuantity">
    <div class="remove-button">
      <button @click="removeItem()">
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
        quantity: {
            type: String,
            required: true
        },
        categories: {
            type: Array,
            required: false
        },
        productStatus: {
          type: Boolean,
          required: false
        }
    },
    data() {
      return {
        includeStatus: this.productStatus,
        productQuantity: this.quantity
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
        },
        saveEdits(){
          this.$store.dispatch('editProduct', {
            id: this.id,
            title: this.title,
            url: this.url,
            image: this.image,
            price: this.price,
            categories: this.categories,
            status: this.includeStatus,
            quantity: this.productQuantity
          })
        }
    },
    watch: {
      includeStatus() {
        this.saveEdits()
      },
      productQuantity(){
        this.saveEdits()
      }
    },
    
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

  .product-quantity {
    display: flex;
    font-size: 0.8rem;
    border: 0px;
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

  .unincluded {
    opacity: 30%;
  }
</style>
