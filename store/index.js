import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedProducts: [
                {
                    id: 1,
                    image: "https://images-na.ssl-images-amazon.com/images/I/51plDYMeulL._SL1280_.jpg",
                    title:"super awesome couch!",
                    url:"www.amazon.nl",
                    price:"50,00",
                    categories: ['living room'],
                },
                {
                    id: 1,
                    image: "https://images-na.ssl-images-amazon.com/images/I/71AcCPDMa2L._AC_SL1500_.jpg",
                    title: "Another cool couch",
                    url: "www.bol.com",
                    price: "159,00",
                    categories: "['living room']"
                }
            ]
        },
        mutations: {
            setProducts(state, products) {
                state.loadedProducts = products
            },
            addProduct(state, product) {
                state.loadedProducts.push(product)
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get('https://shopping-list-aa6a9-default-rtdb.europe-west1.firebasedatabase.app/products.json')
                .then(res => {
                    const productsArray = []
                    for (const key in res.data) {
                        productsArray.push({ ...res.data[key], id: key})
                    }
                    vuexContext.commit('setProducts', productsArray)
                })
                .catch(e => context.error(e))
            },
            setProducts(vuexContext, products) {
                vuexContext.commit('setProducts', products)
            },
            addProduct(vuexContext, product) {
                vuexContext.commit('addProduct', product)
            }
        },
        getters: {
            loadedProducts(state) {
                return state.loadedProducts
            }
        },
    })
}

export default createStore