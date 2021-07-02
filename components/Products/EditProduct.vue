<template>
    <section>
        <button @click="pageLeave">
            Back
        </button>
        <h1>{{ status }} Product</h1>
        <div v-if="exisitingImage" class="product-image" :style="{backgroundImage: 'url(' + product.image + ')'}">
        </div>
        <form @submit.prevent="submitProduct">
            <div class="form-control">
            <h3>Name</h3>
            <input id="productTitle" type="text" v-model="product.title">
            </div>
            <div class="form-control">
            <h3>Product Page</h3>
            <input id="productURL" type="url" v-model="product.url">
            </div>
            <div class="form-control">
            <h3>Image Link</h3>
            <input id="productImage" type="url" v-model="product.image">
            </div>
            <div class="form-control">
            <h3>Price</h3>
            <input id="productPrice" type="number" v-model="product.price">
            </div>
            <div class="form-control">
            <h3>Categories</h3>
            <div v-for="cat in exisitingCategories" :key="cat">
                <input :id="cat" name="categories" type="checkbox" :value="cat" v-model="categories">
                <label :for="cat">{{ cat }}</label>
            </div>
            <input id="newCategory" type="text" v-model="newCategory" @keydown.enter.prevent="addNewCategory" placeholder="Add new category">
            </div>
            <button>{{ status }} Product</button>
        </form>
    </section>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: false
        },
        status: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            newCategory: "",
            categories: this.product.categories
        }
    },
    computed: {
        exisitingImage() {
            if(this.product.image) {
                return true
            } else {
                return false
            }
        },
        exisitingCategories() {
            return this.$store.state.existingCategories
        }
    },
    methods: {
        submitProduct() {
            this.$emit('submit', { ...this.product, categories: this.categories })
        },
        pageLeave() {
            this.$router.push('/')
        },
        addNewCategory() {
            this.$store.dispatch('addCategory', this.newCategory)
            this.newCategory = ""
        }
    }
}
</script>

<style scoped>
.product-image {
    height: 200px;
    background-size: contain;
    background-repeat: no-repeat;
  }

h3 {
  font-weight: bold;
  display: block;
  margin-bottom: 0.2rem;
  font-size: 1rem;
}

.form-control {
  margin: 1rem 0;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
  border-radius: 10px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

input[type='checkbox'],
input[type='radio'] {
  display: inline-block;
  width: auto;
  margin-right: 0.1rem;
}

input[type='checkbox'] + label,
input[type='radio'] + label {
  font-weight: normal;
}
</style>