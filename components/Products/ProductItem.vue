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
        <a :href="url">link</a>
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
  display: grid;
  grid-template-columns: 1.6fr 1.7fr;
  grid-template-rows: 1.8fr;
  grid-auto-columns: 1fr;
  gap: 5px 5px;
  grid-auto-flow: row;
  grid-template-areas:
    "product-image product-data";
  width: 300px;
  height: 150px;
  border: 1px solid black;
  margin: 5px;
    text-overflow: ellipsis;

}

.product-image {
  justify-self: stretch;
  align-self: stretch;
  background-size: contain;
  grid-area: product-image;
    border: 1px solid black
}

.product-data {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "product-title"
    "product-url"
    "product-price";
  grid-area: product-data;
}

.product-title {
  justify-self: start;
  align-self: start;
  grid-area: product-title;
}

.product-url {

  justify-self: start;
  align-self: start;
  grid-area: product-url;
  text-overflow: ellipsis;
}

.product-price {

  justify-self: end;
  align-self: end;
  grid-area: product-price;
}


</style>