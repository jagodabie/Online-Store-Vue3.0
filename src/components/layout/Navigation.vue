<template>
    <ul>
        <li><router-link to="/products">Products</router-link></li>        
        <li><router-link to="/createProduct">Add product</router-link></li>
        <li><router-link to="/cart">Cart<i class="fas fa-shopping-cart"/></router-link></li>      
        <router-view />
    </ul>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

library.add(faPhone);
export default {
    name: 'Navigation',
    setup() {
        
    }
}
</script>
<style scoped>
ul {
  list-style-type: none;
  margin: 0rem;
  padding: 0rem;
}
li {
    display: inline-block;
}
li a {
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #555;
  color: white;
}
.fas .fa-shopping-cart{
  padding:1rem;
}
</style>