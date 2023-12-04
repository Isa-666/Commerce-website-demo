import React from "react";
import styles from "./SearchResult.module.css";
import { Link } from "react-router-dom";
const SearchResult = ({ pro, handleChange }) => {
  return (
    <div className={styles.SearchResultWrapper}>
      <Link
        onClick={(e) => {
          handleChange("");
        }}
        to={`/details/${pro.id}`}
        className={styles.LinkCss}
      >
        <div className={styles.Product}>
          <img className={styles.productImage} src={pro.image?.url} alt="" />
          <div className={styles.NameAndPrice}>
            {pro.name}
            <span>{`${pro.price.raw} ${"$"}`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
