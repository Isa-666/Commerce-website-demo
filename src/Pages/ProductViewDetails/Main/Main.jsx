import React, { useState } from "react";
import styles from "./Main.module.css";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { addProductToCart } from "../../../API/commerce";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { setCartLength } from "../../../store/reducers/BasketReducers";
import { debounce } from "lodash";
const Main = ({
  name,
  id,
  price,
  loading,
  variant_groups,
  currentVariant,
  setCurrentVariant,
  available,
  product,
}) => {
  const showToast = debounce(() => {
    toast.promise(
      new Promise((resolve) => {
        // Simulate some asynchronous operation
        setTimeout(() => {
          resolve("Your message");
        }, 1000); // Simulating a delay of 1000 milliseconds
      }),
      {
        pending: "Waiting for result...",
        success: "Successfully resolved!",
        error: "An error occurred!",
      },
      {
        autoClose: 3000,
        closeOnClick: false,
        closeButton: false, // Set the time duration in milliseconds
      }
    );
  });
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const notifyMeError = () => {
    toast.warning("The selected quantity of products is not available!");
  };

  const color = variant_groups?.find((el) => el.name);
  const changeColor = (id) => {
    const selectedColor = color.options.find((el) => el.id == id);
    setCurrentVariant((prev) => ({ ...prev, color: selectedColor }));
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < available) {
      setQuantity((prev) => prev + 1);
    } else notifyMeError();
  };
  function AddToBasket() {
    let variant = {};
    if (color?.options) {
      variant_groups.forEach((el) => {
        if (el.name == "Color") {
          variant[el.id] = currentVariant.color.id;
        }
      });
    }

    showToast(
      addProductToCart(id, quantity, variant).then((res) => {
        dispatch(setCartLength(res.total_unique_items));
      }),
      {
        pending: "Adding to cart...",
        success: "Successfully added to your cart.",
        error: "Not added to cart.",
      }
    );
  }

  return (
    <div className={styles.Main_Product}>
      <div className={styles.ProductSwitchNameandPrice}>
        {`${name} ${currentVariant?.color?.name || ""}`}
        <div className={styles.ProductPrice}>
          {`${currentVariant?.color?.price.raw}${"$"}`}
        </div>
        <div className={styles.ChooseColorCon}>
          {color?.options && <span>Choose Color:</span>}
          <div className={styles.productColorsContainer}>
            {variant_groups?.length
              ? variant_groups?.[0].options.map((pro) => (
                  <div
                    className={styles.Color}
                    key={pro.id}
                    style={{ backgroundColor: pro.name }}
                    onClick={() => changeColor(pro.id)}
                  >
                    <span>{pro.name}</span>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div
          className={styles.ProductDescription}
          dangerouslySetInnerHTML={{ __html: product?.description }}
        />
        <div />
        <div className={styles.quantityProductContainer}>
          <AiFillMinusCircle
            onClick={handleDecrement}
            className={styles.minusQuantity}
          />
          <span>{quantity}</span>
          <AiFillPlusCircle
            onClick={handleIncrement}
            className={styles.plusQuantity}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={AddToBasket} className={styles.AddProduct}>
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Main;
