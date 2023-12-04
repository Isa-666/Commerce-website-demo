import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./Info.module.css";
const Info = ({ loading, products, options, sort, setSort }) => {
  const [sortDropDown, setSortDropDown] = useState(false);
  const setDropdownOpen = () => {
    setSortDropDown((prev) => !prev);
  };
  const onClickHandler = (id, option) => {
    options.map((el) => {
      if (el.id == id) {
        el.active = true;
      } else {
        el.active = false;
      }
    });
    setSort(option);
  };
 
  return (
    <div className={styles.InfoWrapper}>
      {loading ? (
        <div className={styles.Empty}>
        <div className={styles.SearchingLoadWrapper}>
          Searching
          <BeatLoader color="purple" size={5} />
        </div></div>
      ) : (
        <div className={styles.sortWrapper}>
          {products.meta?.pagination.total} product found.
          <div onClick={setDropdownOpen} className={styles.srotLabelWrapper}>
            <span className={styles.sortLabel}>{sort.label}</span>
            {sortDropDown && (
              <div className={styles.optionsNames}>
                {options.map((el) => {
                  if (!el.active) {
                    return (
                      <div
                        key={el.id}
                        onClick={() => onClickHandler(el.id, el)}
                        className={styles.optionsChildren}
                      >
                        {el.label}
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
