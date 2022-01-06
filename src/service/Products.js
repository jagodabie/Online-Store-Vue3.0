import axios from 'axios'; 
const http = 'http://localhost:8080';

const getProduct = async() => {
    await axios.get(`${http}/products`)
        .then(({data:{result}})=>{
            setProducts(result)
        })
};

export {
    getProduct,

}