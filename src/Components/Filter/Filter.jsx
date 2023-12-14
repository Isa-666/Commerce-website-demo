import React, { useState } from "react";
import styles from "./Filter.module.css";
import { optionsFilter } from "../../Pages/ProductsPage/data";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
const Filter = ({ setSelectedBrands }) => {
  const [filter, setFilter] = useState(false);
  const setFilterOpen = () => {
    setFilter((prev) => !prev);
  };
  const onChangeHandler = (e, value) => {
    setSelectedBrands((prev) => {
      let newOptions = prev;
      if (e.target.checked) {
        newOptions = prev.concat(",", value.join(","));
      } else {
        newOptions = newOptions.split(value);
        newOptions = newOptions.join("");
      }
      if (newOptions.startsWith(",")) {
        newOptions = newOptions.replace(",", "");
      }
      if (newOptions.endsWith(",")) {
        newOptions = newOptions.slice(0, -1);
      }
      newOptions = newOptions.replace(",,", ",");
      return newOptions;
    });
  };

  return (
    <div className={styles.FilterWrapper}>
      <div className={styles.BrandsAndIcon}>
        <span className={styles.BrandsText}>Brands</span>
        {filter ? (
          <LuMinus className={styles.icons} onClick={setFilterOpen} />
        ) : (
          <GoPlus className={styles.icons} onClick={setFilterOpen} />
        )}
      </div>
      <div>{filter && (
        <ul className={`${filter ? styles.active : styles.inactive}`} >
          {optionsFilter.map((el) => {
            return (
              <li className={styles.optionsChildren} key={el.id}>
                <label className={styles.container}>
                <input
                  onChange={(e) => onChangeHandler(e, el.value)}
                  name={el.name}
                  id={el.name}
                  type="checkbox"
                  className={styles.checkBoxStyle}
                  
                />
                <span className={styles.checkmark}></span>
                </label>
                <label className={styles.labelName} htmlFor={el.name}>{el.label}</label>
              </li>
            );
          })}
        </ul>
      )}</div>
    </div>
  );
};

export default Filter;
