<template>
    <div class="cart">
    <div class="cart-header">
     <p>{{cart.length ? 'Shopping cart':'Your shopping cart is empty!' }}</p>
     <p class="cart-price"> Price</p>
    </div>
      <div v-if = "cart.length" class="cart-items">
        <div className = "cart-item" v-for="(cartItem) in cart" :key="cartItem.id" >
        <div className="item-img">
          <img src="../Products/logo.png" alt="pic" :style="imgStyle">
        </div>
        <div className ="item-content">
          <div class="item-content-info">
            <p>  {{ cartItem.product_name }}</p>
            <div class="item-content-quantity">
            <span> Quantity </span>
            <div class="item-content-quantity__buttons">
              <button @click="addToCart(cartItem)">+</button><span>{{ cartItem.quantity }}</span><button @click="removeFromCart(cartItem)">-</button>
            </div>
          </div>
            <p>{{ cartItem.product_price }} $</p>
          </div>
           <div class="item-content-action">
             <button>Delete</button>
          </div>
        </div>
      </div>
      </div>
      <div v-else class="cart-items">
      </div>
       <h4 class="cart-totalPrice">{{`Total price: ${totalPrice} $`}}</h4>
      <div class="cart-btn">
        <button class="btn" @click="removeBasketsItems">Remove items</button>
      </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name:'Cart',
  setup(){
    const imgStyle = {
      width:"5rem",
      height:"5rem"
    }
    const store = useStore();
    const cart = computed(() => store.getters.cart);
    const totalPrice = computed(() => store.getters.totalPrice);
    const removeBasketsItems = () => {
      store.dispatch("cleanCart");
      store.dispatch("totalPriceReset");

      localStorage.removeItem('totalPrice');
    }
    const addToCart = (product) => {
      store.dispatch("addToCart", product);
      store.dispatch("countTotalPrice");
     }; 
    const removeFromCart = (product) => store.dispatch("removeFromCart", product);
    return{
      cart,
      totalPrice,
      removeBasketsItems,
      imgStyle,
      addToCart,
      removeFromCart
    }
  },
  components: {
  },
}
</script>

<style>
.cart {
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  height: 80vh;
  width: 40%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
} 
.btn{
  width:150px;
  height: 45px
} 

.cart-totalPrice{
  border-top: 1px solid rgb(198, 204, 204);
  padding: 0.5rem;
  text-align: right;
}

.cart-price{
  text-align: right;
  border-bottom: 1px solid rgb(198, 204, 204);
  padding: 0.2rem;
  color: rgb(142, 148, 148);
  font-size: 12px;
  font-weight: bold;
  width: 100%
}
.cart-item{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgb(198, 204, 204);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between
}
.item-img{
  width:6rem;
  height: 100%;

}
.item-delete :first-child{
  font-size: 20px;
  margin: 1.5rem;
}
.item-content{
  width:100rem;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
}
.item-content-info{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
}
.item-content-info > p {
  font-weight: 700
}
.item-content-action{
 text-align: left;
 padding: 0.5rem
}
.item-content-quantity__buttons{
    border: 1px solid rgb(198, 204, 204);
    margin-top: 0.5rem;
}
.item-content-quantity__buttons > span{
 margin: 0.7rem;
}
</style>