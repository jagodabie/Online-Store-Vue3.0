<template>
<div class="product-form">
    <h4 v-if="route?.params?.id">Edit product</h4>
    <h4>Add product</h4>
    <form id="product-form" @submit="submit">

          <p>
            <label for="name"> Product's name:&nbsp;</label>
            <input 
                v-model="product.product_name"
                class="product-form__input"
                name="name"
                type="text"
                required
            >
          </p>
           <p>
            <label for="description">Product's description:&nbsp;</label>
            <input 
                v-model="product.product_despcription"
                class="product-form__input"
                name="description"
                type="text"
                required
                >
            </p>
            <p>
            <label for="price">Product's price:&nbsp;</label>
            <input 
                v-model="product.product_price"
                class="product-form__input"
                name="price"
                type="number"
                required
            >
            </p>
            <p>
            <label for="amount">Product's amount:&nbsp;</label>
            <input 
                v-model="product.product_ammount"
                class="products_ammount"
                name="amount"
                type="number"
                required
            >
            </p>
            <p>
            <label for="file">Product's picture:&nbsp;</label>
            <input 
                class="product-form__input"
                name="file"
                type="file"
            >
            </p>
            <div class="buttons">
                <button class="button-submit button">Submit</button>
                <button @click="cancel" class="button-cancel button">Cancel</button>
            </div>
    </form>
</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios'; 
export default {
    name:'ProductsForm',
 
    setup(){
 
    const product = ref({});
    const route = useRoute();
    const router = useRouter();

    axios.get(`http://localhost:8000/products/${route.params.id}`).then(({data:{result}})=>{
            product.value = result[0];
            console.log(product.value)
        });

    const submit = (e) => {
          e.preventDefault();
        let myForm = document.getElementById('product-form');
        let formData = new FormData(myForm);
       
        const id = route?.params?.id
        let service = id ? axios.put(`http://localhost:8000/products`, formData): axios.post(`http://localhost:8000/products`, formData);

           service.then((response) => {
              console.log(response)
            })
            .catch((e) => {
                console.log(e)
            })
        }
        const cancel = () =>{
            router.push({ path: '/' })
        }

        return {
            submit,
            product,
            cancel
        }
    },
  
}
</script>

<style scoped>
.product-form {
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    border: 1px solid rgb(108, 116, 116);
}
form > p {
    height: 2rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
}
label {
    display:inline-block;
    width: 40%

}
.product-form__input {
    height: 1.4rem;
    width: 49%
  
}
/** TODO global style & button exdends*/
.buttons {
    display: flex;
    margin: 2rem;
    justify-content: space-evenly
}
.button {
padding: 0.5rem 0.7rem;
border: solid 1px round;
} 

</style>