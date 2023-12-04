import React from "react";
import styles from "./HeaderCategoriesNav.module.css";
import SubCategoriesNavDrop from "./SubCategoriesNavDrop/SubCategoriesNavDrop";
import { Link } from "react-router-dom";
const HeaderCategoriesNav = ({ navBar, categories, loading }) => {
  const reloadPageAfterDelay = () => {
    setTimeout(function () {
      window.location.reload();
    }, 300);
  };

  if (loading) {
    return (
      <div className={styles.CategoriesWrapper}>
        {" "}
        {navBar?.slice(0, 9).map((el, index) => {
          return (
            <div className={styles.categoriesBlock} key={el.id}>
              <Link
                to={`/ProductsPage/${el.slug}`}
                className={styles.LinkStyle}
                onClick={reloadPageAfterDelay}
              >
                {el.name}
              </Link>
              <span>
                <SubCategoriesNavDrop
                  subcategories={categories[index]?.children}
                />
              </span>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles.CategoriesWrapper}>
        {categories?.slice(0, 9).map((el, index) => {
          return (
            <div className={styles.categoriesBlock} key={el.id}>
              <Link
                onClick={reloadPageAfterDelay}
                to={`/ProductsPage/${el.slug}`}
                className={styles.LinkStyle}
              >
                {el.name}
              </Link>
              <span className={styles.pan}>
                <SubCategoriesNavDrop
                  subcategories={categories[index].children}
                  reloadPageAfterDelay={reloadPageAfterDelay}
                />
              </span>
            </div>
          );
        })}
      </div>
    );
  }
};

export default HeaderCategoriesNav;
