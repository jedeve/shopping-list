import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedProducts: [],
            filteredProducts: [],
            existingCategories: [],
            listOfColors: ['#FFBF00', '#FF7F50', '#DE3163', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF'],
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
                state.filteredProducts = state.filteredProducts.filter(productItem => productItem.id !== productId)
            },
            editProduct(state, productData) {
                const productIndex = state.filteredProducts.findIndex(
                    product => product.id === productData.id
                  );
                  state.filteredProducts[productIndex] = productData
            },
            addCategory(state, category) {
                state.existingCategories.push(category)
            },
            filterProducts(state, productList){
                state.filteredProducts = productList
            },
            updateTotal(state) {
                var parsedPrice = 0
                for( const product in state.filteredProducts ){
                    if(state.filteredProducts[product].status && state.filteredProducts[product].quantity > 0){
                        parsedPrice = parsedPrice + parseFloat(state.filteredProducts[product].price * state.filteredProducts[product].quantity )
                    }
                }
                state.totalPrice = parsedPrice
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
                        vuexContext.commit('updateTotal')
                    })
                    .catch(e => console.log(e));
            },
            addCategory(vuexContext, category) {
                vuexContext.commit('addCategory', category)
            },
            filterProducts(vuexContext, filterValue){
                if (filterValue) {
                    var productList = vuexContext.getters.loadedProducts.filter(product => product.categories.includes(filterValue))
                } else {
                    var productList = vuexContext.getters.loadedProducts
                }
                vuexContext.commit('filterProducts', productList)
            },
            updateTotal(vuexContext){
                vuexContext.commit('updateTotal')
            }
        },
        getters: {
            loadedProducts(state) {
                return state.loadedProducts
            },
            filteredProducts(state) {
                return state.filteredProducts
            },
            getProduct: (state) => (productId) => {
                console.log(state.loadedProducts.find(product => product.id === productId))
                return state.loadedProducts.find(product => product.id === productId)
            },
        },
    })
}

export default createStore
