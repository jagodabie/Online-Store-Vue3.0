import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products/Products.vue';
import ProductsForm from '../views/Products/ProductsForm.vue';
import Cart from '../views/Cart/Cart.vue';
  
import Home from '../views/Home.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/createProduct',
    name: 'ProductsForm',
    component: ProductsForm
  },
  { path: '/product/:id', component: ProductsForm },
  { path: '/cart', component:  Cart },
  Cart
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
