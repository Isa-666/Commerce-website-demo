import React from "react";
import styles from "./HeaderCategoriesNav.module.css";
import SubCategoriesNavDrop from "./SubCategoriesNavDrop/SubCategoriesNavDrop";
import { Link } from "react-router-dom";
const HeaderCategoriesNav = ({ navBar, categories, loading }) => {
  const reloadPageAfterDelay = () => {
    setTimeout(function () {
      window.location.reload();
    }, 100);
  };

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
  
};

export default HeaderCategoriesNav;
