import React from "react";
import SearchResult from "../SearchResult/SearchResult";
import styles from "./SearchResultList.module.css"
const SearchResultList = ({ handleChange, results }) => {
  return (
    <div className={styles.Fundament}>
      {results.map((pro) => {
        return (
          <div className={styles.ResultWrapper} key={pro.id}>
            <SearchResult pro={pro} handleChange={handleChange} />
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultList;
