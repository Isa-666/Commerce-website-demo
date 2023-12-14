import React from 'react'
import styles from "./EmptyBasketPage.module.css"
import EmptyBoxAnimation from "./Assets/Animation.gif";
import GoBackButton from '../../Components/Button/GoBackButton';
const EmptyBasketPage = () => {
  return (
    <div className={styles.EmptyPageWrapper}>
    <img className={styles.AnimationImage} src={EmptyBoxAnimation} alt="" />
    <span className={styles.TextBlock}>
      Sorry, but you don't have any products in your basket. Add products
      to your basket.
    </span>
    <GoBackButton/>
  </div>
  )
}

export default EmptyBasketPage