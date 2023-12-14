import React from 'react'
import ErrorImg from "./assets/5203299.jpg"
import styles from "./Error.module.css"
const Error = () => {
  return (
    <div className={styles.ErrorWrapper}>

        <img className={styles.ErrorImage} src={ErrorImg} alt="" />
    </div>
  )
}

export default Error