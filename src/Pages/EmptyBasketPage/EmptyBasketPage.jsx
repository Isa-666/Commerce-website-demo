import React from 'react'
import styles from "./EmptyBasketPage.module.css"
import EmptyBoxAnimation from "./Assets/Animation.gif";
const EmptyBasketPage = () => {
  return (
    <div className={styles.EmptyPageWrapper}>
    <img className={styles.AnimationImage} src={EmptyBoxAnimation} alt="" />
    <span>
      Sorry, but you don't have any products in your basket. Add products
      to your basket.
    </span>
  </div>
  )
}

export default EmptyBasketPage