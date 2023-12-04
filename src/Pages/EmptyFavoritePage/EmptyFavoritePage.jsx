import React from "react";
import styles from "./EmptyFavoritePage.module.css";
import EmptyBoxAnimation from "./Assets/Animation.gif";
const EmptyFavoritePage = () => {
  return (
    <div className={styles.EmptyPageWrapper}>
      <img className={styles.AnimationImage} src={EmptyBoxAnimation} alt="" />
      <span>
        Sorry, but you don't have any products in your favorites. Add products
        to favorites.
      </span>
    </div>
  );
};

export default EmptyFavoritePage;
