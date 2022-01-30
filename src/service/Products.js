import axios from 'axios'; 

const getProducts = async() => {
    return await axios.get(`/products`)
};

export {
    getProducts,
}