import { createStore } from 'vuex';
import axios from 'axios'; 
const baseUrl ='http://localhost:8000';
const store = createStore({
  state () {
    return {
      products: [],
      product: {
      },
      cart: [],
      totalPrice: 0
    }
  },
  getters:{
    products(state){
      return state.products;
    },
    product(state){
      return state.product;
    },
    cart(state){
      return state.cart;
    },
    totalPrice(state){
      return state.totalPrice
    }
  },
  mutations: {
    setProducts(state, payload){
      state.products = payload; 
    },
    setProduct(state, payload){
      state.product = payload; 
    },
    setCart(state, payload){
      state.cart = payload; 
    },
    addToCart (state) {
      if(state.count > 0){
      state.count--
      }
    },
    removeFromCart (state) {
      if(state.count > 0){
      state.count--
      }
    },
    setTotalPrice(state, payload ){
      state.totalPrice = payload; 
    },
  },
  actions: {
    getProducts({commit}){
      axios.get(`${baseUrl}/products`).then(({data:{result}})=>{
        commit("setProducts", result);
     }).catch(error => {
      console.log(error);
     });
    },

    addToCart({ commit, getters}, payload){
      let cart = getters.cart;
      if( cart.find((item)=> item.id === payload.id)){
        cart.find((item)=> item.id === payload.id).quantity ++
        commit("setCart",cart)
      }else{
        cart.push({ ...payload, quantity:1 })
        commit("setCart",cart)
      }
    },
    removeFromCart({ commit, getters}, payload){
      let cart = getters.cart;
      if(cart.find((item)=> item.id === payload.id).quantity > 1){
        cart.find((item)=> item.id === payload.id).quantity --;
        commit("setCart",cart);
      } else{
        cart.splice(cart.findIndex( (item)=> item.id === payload.id),1);
        commit("setCart",cart);
      } 
    },
    cleanCart({ commit }){
      commit("setCart",[]);
    },
    // ?
    getProduct({commit},id){
      axios.get(`${baseUrl}/products/${id}`, { params: { id: id } }).then(({data:{result}}) => {
        commit("setProduct", result[0]);
        console.log(result)
      }).catch(function (error) {
        console.log(error);
    });
    },
    countTotalPrice({ commit, getters}){
      let cart = getters.cart;
      let totalPrice = getters.totalPrice;
      const reducer = (prevValue, currValue) => prevValue + currValue.product_price * currValue.quantity;
      totalPrice = cart.reduce(reducer, 0);
      commit("setTotalPrice",totalPrice);
      localStorage.setItem('totalPrice', JSON.stringify(totalPrice))

    },
    totalPriceReset({ commit }){
      commit("setTotalPrice", 0);
    },

  }
})
export default store;