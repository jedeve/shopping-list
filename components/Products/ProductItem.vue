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
        <a :href="url" v-on:click.stop target="_blank">{{ parsedUrl }}</a>
    </div>
    <base-category v-for="cat in categories" :key="cat" :style="'background-color: ' + colors[cat]" @click.native="filterItems(cat)" v-on:click.stop>
        {{ cat }}
    </base-category>
  </div>

  <div class="product-settings">
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
    computed: {
      parsedUrl() {
        var url = this.url
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
          domain = url.split('/')[2];
        }
        else {
          domain = url.split('/')[0];
        }
        
        //find & remove www
        if (domain.indexOf("www.") > -1) { 
          domain = domain.split('www.')[1];
        }
        
        domain = domain.split(':')[0]; //find & remove port number
        domain = domain.split('?')[0]; //find & remove url params

        return domain;
      },
      colors() {
        return this.$store.state.categoryColors
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



  .product-price {
    font-size: 1.5rem;

  }

  .product-quantity {
    font-size: 0.8rem;
    border: 0px;
  }
  

  .product-title {
    font-size: 1.5rem;
  }

  .product-image {
    background: no-repeat center center/cover;
    border-radius: 7px;
    flex: 1;
    margin-right: 10px;
  }

  .product-data {
    flex: 3.5;
  }

  .product-settings {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center space-between;
  }

  .unincluded {
    opacity: 30%;
  }
</style>
