import React from 'react'
import { useParams, useSearchParams,Link } from "react-router-dom";
import styles from "./Button.module.css";
import { HiArrowLongLeft } from "react-icons/hi2";
const GoBackButton = () => {
  return (
    <div className={styles.BackIconWrapper}>
    <Link className={styles.LinkStyles} to={"/"}><button className={styles.GoBackBtn}><HiArrowLongLeft /> Go back</button></Link>
  </div>
  )
}

export default GoBackButton