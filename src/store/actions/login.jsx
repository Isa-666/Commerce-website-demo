import axios from "axios";
import { commerce } from "../../API/commerce";

const headers = {
    "X-Authorization": "sk_52514629d2b34154adce0c0e384418435557490a7f25e",
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  export const userLogin = async ({ email, baseUrl }) => {
    const url = new URL("https://api.chec.io/v1/customers/email-token");
    try {
      let body = {
        email: email,
        base_url: `${baseUrl}/create-token`,
      };
      const response = await axios.post(url, body, { headers });
      return response.data;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };
  export const userRegister = async ({ firstname, lastname, email,phone}) => {
    const url = new URL("https://api.chec.io/v1/customers");
    let body = {
      firstname,
      lastname,
      email,
      phone
    };
    try {
      const response = await axios.post(url, body,{headers});
      return response.data;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };
  
  export const updateUser = async ({ firstname, lastname, email,phone }, id) => {
    // console.log(lastname, firstname, email, id);
    try {
      const response = await commerce.customer.update(
        {
          email,
          firstname,
          lastname,
          phone
        },
        id
      );
      console.log(response);
      return response;
      
    } catch (err) {
      return err.message;
    }
  };
  