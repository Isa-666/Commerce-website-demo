import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./PriceFilter.module.css";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
const PriceFilter = ({ setFilteredProducts, products }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filter, setFilter] = useState(false);
  const setFilterOpen = () => {
    setFilter((prev) => !prev);
  };
  const handleFilter = () => {
    const [min, max] = priceRange;
    const filteredProducts = products.filter(
      (product) =>
        (!min || product.price.raw >= min) && (!max || product.price.raw <= max)
    );

    setFilteredProducts(filteredProducts);

  };

  return (
    <>
      <div className={styles.PriceFilterFundament}>
        <div className={styles.PriceandIcon}>
          <span className={styles.PriceText}>Price</span>
          {filter ? (
            <LuMinus className={styles.icons} onClick={setFilterOpen} />
          ) : (
            <GoPlus className={styles.icons} onClick={setFilterOpen} />
          )}
        </div>
        {filter && (
          <div className={`${filter ? styles.active : styles.inactive}`}>
            <label htmlFor="minPrice">Min Price:</label>
            <Slider
              range
              min={0}
              max={5000}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
            />
            <div className={styles.PriceLabels}>
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <button className={styles.ButtonApply} onClick={handleFilter}>Apply Filter</button>
          </div>
        )}
      </div>
    </>
  );
};

export default PriceFilter;
