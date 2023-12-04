import React from "react";
import styles from "../HeaderCategoriesNav.module.css";
import { Link } from "react-router-dom";
const SubCategoriesNavDrop = ({ subcategories,reloadPageAfterDelay}) => {
 
  if (subcategories?.length > 0) {
    return (
      <div className={styles.hiddenBlock}>
        {subcategories.map((el) => (
          <div key={el.id} className={styles.subcategories}>
            <Link onClick={reloadPageAfterDelay} to={`/ProductsPage/${el.slug}`} className={styles.LinkStyle}>
              {el.name}
            </Link>
          </div>
        ))}
      </div>
    );
  } else {
    return <div style={{ display: "none" }}></div>;
  }
};

export default SubCategoriesNavDrop;
