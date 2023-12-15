import { token } from "../../API/commerce";
import axios from "axios";

const headers = {
  "X-Authorization": token,
  Accept: "application/json",
  "Content-Type": "application/json",
};


export const getProductsBySlug = async (setLoading,setProducts, params) => {
    const url = new URL("https://api.chec.io/v1/products");
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key,params[key])
    );
    try {
      setLoading(true)
      const { data: response } = await axios.get(url, { headers });
      setProducts(response);
      setLoading(false)
      return response.data;
    } catch (err) {
      return err.message;
    }
  };