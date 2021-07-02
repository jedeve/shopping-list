import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedProducts: [],
            existingCategories: ['kitchen', 'living room'],
            totalPrice: 0
        },
        mutations: {
            setProducts(state, products) {
                state.loadedProducts = products
            },
            setCategories(state, categories) {
                state.existingCategories = categories
            },
            addProduct(state, product) {
                state.loadedProducts.push(product)
            },
            removeProduct(state, productId) {
                const productIndex = state.loadedProducts.findIndex( (productItem) => productItem.id === productId)
                state.loadedProducts.splice(productIndex, 1)
            },
            editProduct(state, productData) {
                const productIndex = state.loadedProducts.findIndex(
                    product => product.id === productData.id
                  );
                  state.loadedProducts[productIndex] = productData
            },
            addCategory(state, category) {
                state.existingCategories.push(category)
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get('https://shopping-list-aa6a9-default-rtdb.europe-west1.firebasedatabase.app/products.json')
                .then(res => {
                    const productsArray = []
                    const categoriesArray = []
                    for (const key in res.data) {
                        if(res.data[key].categories){
                            productsArray.push({ ...res.data[key], id: key})
                            for (const cat in res.data[key].categories) {
                                categoriesArray.push(res.data[key].categories[cat])
                            }
                        } else {
                            productsArray.push({ ...res.data[key], id: key, categories: []})
                        }
                        
                    }
                    console.log(categoriesArray)
                    vuexContext.commit('setProducts', productsArray)
                    vuexContext.commit('setCategories', [...new Set(categoriesArray)])
                })
                .catch(e => context.error(e))
            },
            setProducts(vuexContext, products) {
                vuexContext.commit('setProducts', products)
            },
            addProduct(vuexContext, productData) {
                return axios.post('https://shopping-list-aa6a9-default-rtdb.europe-west1.firebasedatabase.app/products.json', productData)
                    .then(result => {
                        vuexContext.commit('addProduct', {...productData, id: result.data.name})
                    })
                    .catch(e => console.log(e));
            },
            removeProduct(vuexContext, productId) {
                axios.delete('https://shopping-list-aa6a9-default-rtdb.europe-west1.firebasedatabase.app/products/' + productId + '.json')
                .then(result => {
                    vuexContext.commit('removeProduct', productId)
                })
                .catch(e => console.log(e));

            },
            editProduct(vuexContext, productData) {
                return axios.put('https://shopping-list-aa6a9-default-rtdb.europe-west1.firebasedatabase.app/products/' + productData.id + '.json', productData)
                    .then(result => {
                        vuexContext.commit('editProduct', productData)
                    })
                    .catch(e => console.log(e));
            },
            addCategory(vuexContext, category) {
                vuexContext.commit('addCategory', category)
            }
        },
        getters: {
            loadedProducts(state) {
                return state.loadedProducts
            },
            getProduct: (state) => (productId) => {
                console.log(state.loadedProducts.find(product => product.id === productId))
                return state.loadedProducts.find(product => product.id === productId)
            },
            totalPrice(state) {
                var parsedPrice = 0
                for( const product in state.loadedProducts ){
                    console.log(product)
                    parsedPrice = parsedPrice + parseFloat(state.loadedProducts[product].price)
                }
                return parsedPrice
            },
        },
    })
}

export default createStore