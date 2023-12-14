import React, { useEffect, useState } from "react";
import { getProductFromBasket, removeFromCart } from "../../../API/commerce";

import styles from "./ProductInBasket.module.css";
import MainProductInBasket from "./MainProductInBasket/MainProductInBasket";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PacmanLoader from "react-spinners/PacmanLoader";
import Pagination from "../../../Components/Pagination/Pagination";
import GoBackButton from "../../../Components/Button/GoBackButton";

const ProductInBasket = () => {
  const [product, setProducts] = useState([]);
  const [count, setCount] = useState(product.length);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState();
  const ProductCounter = useSelector(
    (state) => state.basketProducts.cartLength
  );


  useEffect(() => {
    getProductFromBasket().then(
      (p) => (
        setLoading(true),
        setCart(p),
        setProducts(p?.line_items, p?.id),
        setTotalPrice(p?.subtotal.raw),
        setCount(p?.total_items)
        // setCount(p.length),
      )
    );
     if (window.location.reload && ProductCounter == 0) {
    navigate("/");
  }

  }, []);

  return (
    <>
 
      {loading ? (
        <div className={styles.wrapper}>
          <GoBackButton/>
          <div>{`You have ${product?.length} products in the card.`}</div>
          <div className={styles.Product_Wrapper_Container}>
            <div className={styles.ProductSection}>
              {product?.map((pro) => {
                return (
                  <MainProductInBasket
                    key={pro.id}
                    item_id={pro.id}
                    name={pro.product_name}
                    price={pro.price.raw}
                    image={pro.image.url}
                    quantity={pro.quantity}
                    options={pro?.selected_options}
                    setProducts={setProducts}
                    setTotalPrice={setTotalPrice}
                    setCount={setCount}
                    count={count}
                  />
                );
              })}
            </div>
            <div className={styles.totalPriceWrapper}> 
              <div className={styles.TotalPriceText}>
                Amount: <span> {`${totalPrice} ${"$"}`}</span>
              </div>
              <div>Promo code: 0.00 $</div>
              <div>Gift: 0.00 $</div>
              <div>
                <h4>
                  Total price: <span>{`${totalPrice} ${"$"}`}</span>{" "}
                </h4>
              </div> 
<button className={styles.CheckBtn}>Check Out</button>
            </div>
          </div>
         
        </div>
      ) : (
        <div className={styles.LoadingWrapper}>
          Wait Please...
          <PacmanLoader
            className={styles.LoadingScreen}
            color="#ffe600"
            size={50}
          />
        </div>
      )}
     
    </>
  );
};

export default ProductInBasket;
