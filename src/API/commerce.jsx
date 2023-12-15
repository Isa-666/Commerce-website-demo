import Commerce from "@chec/commerce.js";
import axios from "axios";

// Create a Commerce instance
export const commerce = new Commerce("pk_52514a0e3417abcc6766ba7419ad204979fbdbf97942b");
export const token="pk_52514a0e3417abcc6766ba7419ad204979fbdbf97942b"

const headers = {
    "X-Authorization": token,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  export const getProductById = async (
    setLoading,
    setProduct,
    setCurrentVariant,
    id
  ) => {
    const urlProduct = `https://api.chec.io/v1/products/${id}`;
    try {
      setLoading(true);
      const {data:product} = await axios.get(urlProduct, {
        headers,
      });
      const firstVariant = {
        color: product?.variant_groups?.[0]?.options[0],
      };
      setProduct(product);
      setCurrentVariant(firstVariant);
      setLoading(false);
      return "success";
    } catch (err) {
      setLoading(false);
      return err.message;
    }
  };

  export async function addProductToCart(phoneId, count,variant){
    try {
        const product= await commerce.cart.add(`${phoneId}`, count,variant)
        return product
    } catch (error) {
        console.log(error.message);
    }
}
  export async function getProductFromBasket(){
    try {
        const product= await commerce.cart.retrieve()
        return product
    } catch (error) {
        console.log(error.message);
    }
}
export async function updateCart(phoneId, count){
  try {
      const product= await  commerce.cart.update(`${phoneId}`, { quantity: `${count}` })
      return product
  } catch (error) {
      console.log(error.message);
  }
}


export const removeFromCart=async (id)=>{
  try {
      const product= await commerce.cart.remove(`${id}`)
      return product
      
  } catch (error) {
      console.log(error.message);
  }
}