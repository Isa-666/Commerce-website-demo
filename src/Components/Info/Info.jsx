import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./Info.module.css";
import MobileOption from "../Header/MobileNav/MobileOption/MobileOption";
import { optionsOrder } from "../../Pages/ProductsPage/data";
import { FcEmptyFilter } from "react-icons/fc";
const Info = ({
  loading,
  products,
  options,
  sort,
  setSort,
  setSelectedBrands,
  setFilteredProducts
}) => {
  const [sortDropDown, setSortDropDown] = useState(false);
  const [MobileOptionDown, setMobileOptionDown] = useState(false);
  const setMobileOptionDropDown = () => {
    setMobileOptionDown(true);
  };
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
          </div>
        </div>
      ) : (
        <div className={styles.sortWrapper}>
          <div className={styles.ProductFoundCounter}>
            {" "}
            <u>{products.meta?.pagination.total} </u> product found.
          </div>
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
          <div className={styles.MobileOptionWrapper}>
            <FcEmptyFilter
              onClick={setMobileOptionDropDown}
              className={styles.FilterIcon}
            />
          </div>
          <div className={styles.MobileOptionWrapperDown}>
            <MobileOption
              loading={loading}
              products={products}
              options={optionsOrder}
              sort={sort}
              setSort={setSort}
              setSelectedBrands={setSelectedBrands}
              MobileOptionDown={MobileOptionDown}
              setMobileOptionDown={setMobileOptionDown}
              setFilteredProducts={setFilteredProducts}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
