import React, { useState, useEffect } from "react";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { saveProduct, getAllProducts } from "../../Storage/indexDDB";
import { AiFillHeart } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import _ from "lodash";
import { debounce } from "lodash";
import "react-toastify/dist/ReactToastify.css";
const Product = ({ el }) => {
  const [products, setProducts] = useState([]);
  const showToastWarning = () => {
    toast.warning("The product is already in the cart", {
      closeOnClick: false,
      closeButton: false,
      autoClose: 1500,
    });
  };

  const showToast = debounce(() => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("Your message");
        }, 1000); 
      }),
     {
        success: {
          render: 'Successfully resolved!',
          autoClose: 1500, // Set the time duration for success in milliseconds
        },
        error: "An error occurred!",
      },
      {
        autoClose: 2000,
        closeOnClick: false,
        closeButton: false, // Set the time duration in milliseconds
      }
    );
  });

  const handleAddToFavorites = async (product) => { 
   
    if (!products.find((item) => item.id == product.id)) {
    await saveProduct({ ...product, isFavorite: true },),
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, isFavorite: true } : p
        ),
        showToast()
      );
    } else {
      showToastWarning();
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProducts();
      setProducts(result);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className={styles.ProductFundament}>
        <div className={styles.ProductContainer}>
          <div className={styles.productImageAndName}>
            <img className={styles.productImage} src={el.image?.url} alt="" />
            <div className={styles.NameAndPrice}>
              <span>{el.name}</span>
              <div className={styles.productPrice}>
                {el.price?.formatted_with_code}
              </div>
            </div>
          </div>
          <Link to={`/details/${el.id}`}>
            <button className={styles.ProductDetails}>Product Details</button>
          </Link>
        </div>
        <div onClick={() => handleAddToFavorites(el)}>
          <AiFillHeart className={styles.FavBut} />
        </div>
      </div>
      <ToastContainer limit={2} />
    </>
  );
};

export default Product;
