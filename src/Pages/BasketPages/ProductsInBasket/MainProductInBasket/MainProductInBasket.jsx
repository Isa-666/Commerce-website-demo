import React, { useState, useEffect } from "react";
import styles from "./MainProductInBasket.module.css";
import { AiTwotoneDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCart,
  getProductFromBasket,
} from "../../../../API/commerce";
import { toast, ToastContainer } from "react-toastify";
import { setCartLength } from "../../../../store/reducers/BasketReducers";
import Pagination from "../../../../Components/Pagination/Pagination";

const MainProductInBasket = ({
  name,
  price,
  image,
  quantity,
  item_id,
  options,
  setProducts,
  setCount,
  setTotalPrice,
}) => {
  const [productQuantity, setQuantity] = useState(quantity);
  const [loading, setLoading]=useState(false);
  const notifyMeError = () => {
    toast.warning("The selected number of products are not available!");
  };

  const selected = options?.find((el) => el.group_name == "Color");
  const dispatch = useDispatch();

  const DeleteProduct = (id) => {
    removeFromCart(id).then(
      (res) => (
        setLoading(true),
        setProducts(res.line_items),
        setTotalPrice(res.subtotal.raw),
        setCount(res.total_items),
        dispatch(setCartLength(res.total_unique_items))
      )
    );
  };
  const handleIncrement = (id, quantity) => {
    if (productQuantity < 10) {
      setQuantity((prev) => prev + 1);
      updateCart(id, quantity).then(
        (p) => (
          setProducts(p.line_items),
          setTotalPrice(p.subtotal.raw),
          setCount(p.total_items)
        )
      );
    } else {
      notifyMeError();
    }
  };
  const handleDecrement = (id, quantity) => {
    if (productQuantity > 1) {
      setQuantity((prev) => prev - 1);
      updateCart(id, quantity).then(
        (p) => (
          setProducts(p.line_items),
          setTotalPrice(p.subtotal.raw),
          setCount(p.total_items)
        )
      );
    } else {
      DeleteProduct(id);
    }
  };

  return (
    <div className={styles.Product_Wrapper}>
      <img className={styles.ProductImage} src={image} alt="" />
      <div className={styles.ProductInfo}>
        {name}
        <div>Color: {selected?.option_name}</div>
        <div>Price: {`${price} ${"$"}`}</div>
        <div className={styles.quantityUpdateWrapper}>
          Quantity:{" "}
          <AiOutlineMinus
            onClick={() =>
              productQuantity >= 1 &&
              handleDecrement(item_id, +(productQuantity - 1))
            }
            className={styles.quantityButton}
          />
          {productQuantity}
          <AiOutlinePlus
            onClick={() => handleIncrement(item_id, +(productQuantity + 1))}
            className={styles.quantityButton}
          />
        </div>
        <div>
          <AiTwotoneDelete
            onClick={() => DeleteProduct(item_id)}
            className={styles.DeleteButton}
          />
        </div>
      </div>
      <ToastContainer />
      
    </div>
  );
};

export default MainProductInBasket;
