<template>
  <div>
    <router-link to="/products">Products</router-link> |
    <router-link to="/createProduct">Add product</router-link> |
     <router-link to="/cart">cart</router-link>      
  <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
