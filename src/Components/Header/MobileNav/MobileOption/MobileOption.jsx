import React, { useState } from "react";
import styles from "./MobileOption.module.css";
import { IoMdClose } from "react-icons/io";
import Filter from "../../../Filter/Filter";
import PriceFilter from "../../../PriceFilter/PriceFilter";
const MobileOption = ({
  loading,
  products,
  setSelectedBrands,
  setSort,
  sort,
  options,
  MobileOptionDown,
  setMobileOptionDown,
  setFilteredProducts
}) => {
  const [orders, setOrders] = useState(false);
  const [filters, setFilters] = useState(false);
  const handleOrders = () => {
    setOrders((prev) => !prev);
  };
  const filtersToggle = () => {
    setFilters((prev) => !prev);
  };
  const closeNavbar = () => {
    setMobileOptionDown((prev) => !prev);
  };
  return (
    <div
      className={`${styles.mobileFilterWrapper} ${
        MobileOptionDown ? styles.block : styles.none
      }`}
    >
      <div className={styles.BrandsWrapper}>
        <div>
          <IoMdClose onClick={closeNavbar} className={styles.CloseButton} />
        </div>
        <div className={styles.FiltersWrapper}>
          <Filter setSelectedBrands={setSelectedBrands} />
          <PriceFilter
            setFilteredProducts={setFilteredProducts}
            products={products?.data || []}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileOption;
