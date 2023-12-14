import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { IoMdArrowDropright } from "react-icons/io";
import styles from "./Navigation.module.css"
const Navigation = ({product}) => {
    const { pathname } = useLocation();
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0)?.toUpperCase() + str.slice(1);
      };
   
  return (
    <div className={styles.NavigationWrapper}>
<div className={styles.HomePagePath}>
    <Link to={"/"}>Home page</Link>
<IoMdArrowDropright/>
</div>
<div className={styles.PathNameNav}>{product?.categories ? product.categories.map((c) => {
return (
    <div className={styles.PathNames} key={c.id}><Link to={`/ProductsPage/${c.slug}`}>{capitalizeFirstLetter(c.name)}</Link>
    <IoMdArrowDropright className={styles.arrowIcon}/>
    </div>
)
}) : (pathname?.split("/ProductsPage/").map((p,index) => {
    return (
      <div key={Math.floor(Math.random() * 100)} className={styles.slugName}>
        <Link to={`/ProductsPage/${p}`}>{capitalizeFirstLetter(p)}</Link>
      </div>
    );
  }))}</div>
    </div>
  )
}

export default Navigation