<template>
  <div class="container">
  <div class="product-image"
    :style="{backgroundImage: 'url(' + image + ')'}">
    </div>
  <div class="product-data">
    <div class="product-title">
        {{ title }}
    </div>
    <div class="product-url">
        <a :href="url">Go to product</a>
    </div>
    <div class="product-price">
        € {{ price }}
    </div>
  </div>
  <!-- <div class="product-category">
      <p v-for="cat in categories" :key="cat">{{ cat}}</p>
  </div> -->
</div>
</template>

<script>
export default {
    props: {
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
            this.$router.push('/products/' + this.title)
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