<template>
<div class="products">
    <div v-for="(product,index) in products" :key="product.id" class="product-card">
           <div class="product-card__img" @click="singleProduct(index)">
            <img src="./logo.png" width="'100%'" height="'100%'" alt="pic">
           </div>
           <div class="product-card__content">
                <div class="product-card__header">
                    <div class = "product-card__name">
                        {{ product.product_name }}
                    </div>
                    <div class = "product-card__price">
                        {{  `${product.product_price} $` }}
                    </div>
                </div>
                <p class = "product-card__descrition_short">
                    {{ product.product_description_short }}
                </p>
                <div class = "product-card__addToCard">
                    <button @click="addToCart(product)" class="btn-primary">{{`Add product + `}}</button>
                </div>
            </div>
           
    </div>
</div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


export default {
    name:'Products',
    setup(){
        const store = useStore();
        const router = useRouter();
        const products = computed(() => store.getters.products);
        const cart = computed(() => store.getters.cart);
        const totalPrice = computed(() => store.getters.totalPrice);
        const addToCart = (product) => {
            store.dispatch("addToCart", product);
            store.dispatch("countTotalPrice");
        }; 
        const removeFromCart = (product) => store.dispatch("removeFromCart", product);
        const singleProduct = (index) => router.push({ path: `/product/${index}`});
        const getProducts = () => store.dispatch("getProducts");
        getProducts();
        return{
            products, 
            singleProduct,
            store,
            addToCart,
            removeFromCart,
            cart,
            totalPrice
        }
    },
}
</script>

<style scoped>
.products{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 5rem;
}

.product-card {
  margin: 1rem;
  border: 1px solid;
  height: 20rem;
  width: 15rem;
  border-color: rgb(108, 116, 116);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  border-style: solid;
}

img {
    width:100%;
    height: 100%
}

.product-card__img{
    height: 10rem
}

.product-card__header{
  padding: 0.5rem ;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.product-card__content{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  border-top: 1px solid rgb(108, 116, 116);
}

.product-card__descrition_short{
  font-size: 12px;
  overflow: hidden;
  height: 2rem
}

.product-card__price, .product-card__name{
  font-weight: 700;
  color: rgb(75, 77, 77);
}

.product-card__addToCard{
   padding: 0.5rem;
}
.btn-primary{
   padding: 0.6rem;
   background-color: rgb(157, 175, 175);
   border: 1px solid rgb(157, 175, 175);
   border-radius: 4px;
   color: #1b2631;
   font-weight: 600;
   width: 80%;
}
.btn-primary:hover{
   padding: 0.6rem;
   background-color: rgb(188, 207, 207);
   border: 1px solid rgb(167, 180, 180);
   border-radius: 6px;
   color: #3b4a5a;
}
</style>