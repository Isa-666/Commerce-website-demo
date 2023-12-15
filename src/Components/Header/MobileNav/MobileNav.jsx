import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./MobileNav.module.css"

import { IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart, AiFillHeart } from "react-icons/ai";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { commerce } from "../../../API/commerce";
import { PacmanLoader } from "react-spinners";
const MobileNav = ({
  setMobileNavbar,
  mobileNavbar,
  categories,
  loading,
  ProductCounter,
  handleBasket
}) => {
  const [currentDropdown, setCurrentDropdown] = useState(null);
const [OpenCat,setOpenCat]=useState(categories)
  const openDropdown = (index) => {
    setCurrentDropdown(index);
    if (index === currentDropdown) {
      setCurrentDropdown(null);
    }
  };
 
  const isLogin = commerce.customer.isLoggedIn();
  const [user, setUser] = useState({});
  
  const closeNavbar = () => {
    setMobileNavbar((prev) => !prev);
  };
  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToRegister = () => {
    navigate("/register");
  };
  const hasSubcategories = (category) => {
    return category.children && category.children.length > 0;
  };

  const toggleCategory = (categoryId) => {
    setOpenCat((prevOpenCategories) =>
      prevOpenCategories.includes(categoryId)
        ? prevOpenCategories.filter((id) => id !== categoryId)
        : [...prevOpenCategories, categoryId]
    );
  };
  useEffect(() => {
    isLogin && commerce.customer.about().then((customer) => setUser(customer));
  }, [isLogin]);

  const reloadPageAfterDelay = () => {
    setTimeout(function () {
      window.location.reload();
    }, 300);
  };


  
  return <div className={`${styles.mobileNavbarWrapper} ${mobileNavbar ? styles.block : styles.none}`}>
    <div className={styles.LogosContainerWrapper}>
    <IoMdClose onClick={closeNavbar} className={styles.CloseButton} />
    <div className={styles.LogosContainer}>
          <div className={styles.ProfileLogoContainer}>
            {user.firstname ? (
              <Link to={"/user-profile/user-info"} className="user">
                {user && <h3 className="user-Name">{user.firstname}</h3>}
              </Link>
            ) : (
              <Link className={styles.LinkStyle} to={"/SignUp"}>
                <CgProfile className={styles.mainLogosProfile} />
              </Link>
            )}
          </div>
          <div className={styles.FavoriteLogoContainer}>
            <Link className={styles.LinkStyle} to={"/FavoritesProducts"}>
              <AiFillHeart className={styles.mainLogosFav} />
            </Link>
          </div>
          <div className={styles.ShoppingLogoContainer}>
            <AiOutlineShoppingCart
              onClick={() => handleBasket()}
              className={styles.mainLogosBasket}
            />
            <div className={styles.ShoppingCounter}>{ProductCounter}</div>
          </div>
        </div>
    </div>
    <div className={styles.categoriesWrapperFundament}>
    <ul className={styles.categoriesWrapper}>
      {loading ? <div className={styles.LoaderWrapper}><PacmanLoader color="yellow"
      size={20}/></div> :categories.map((category) => (
        <li className={styles.categoryList} key={category.id}>
          <div className={styles.ArrowAndName}>
          {hasSubcategories(category) && (
            <span onClick={() => toggleCategory(category.id)}>
              {OpenCat.includes(category.id) ? <IoMdArrowDropdown className={styles.arrowStyle}/> : <IoMdArrowDropright className={styles.arrowStyle}/>}
            </span>
          )} 
          <Link to={`/ProductsPage/${category.slug}`} onClick={reloadPageAfterDelay} className={styles.LinkStyle}>{category.name}</Link></div>
          <div>{OpenCat.includes(category.id) && (
            <ul className={styles.subcategoriesWrapper}>
              {category.children.map((subcategory) => (
                <li key={subcategory.id}><Link className={styles.LinkStyle} to={`/ProductsPage/${subcategory.slug}`} onClick={reloadPageAfterDelay}>{subcategory.name}</Link></li>
              ))}
            </ul>
          )}</div>
       </li>
      ))}
    </ul>
    </div>
    <div className={styles.ButtonsWrapper}><Link className={styles.LinkStyle} to={"/SignUp"}><button className={styles.RegisterButton}>Register</button></Link><Link className={styles.LinkStyle} to={"/login"}><button className={styles.SignInButton}>Sign Up</button></Link></div>
    </div>;
};

export default MobileNav;

/*
{loading
          ? navBar?.slice(0, 5).map((el, index) => {
              return (
                <li key={el.id}>
                  <Link onClick={closeNavbar} to={`/ProductsPage/${el.slug}`}>
                    {el.name}
                  </Link>
                  <CiFaceSmile 
                    onClick={() => openDropdown(index)}
                    className={
                      currentDropdown === index
                      ? styles.DropDownOpened
                      : styles.dropDown
                    }
                  />
                  {currentDropdown === index && (
                    <div className={styles.dropDown}>
                      <ul>
                        {navBar[index].children.map((el) => {
                          return (
                            <li key={el.id}>
                              <Link
                                onClick={closeNavbar}
                                to={`/ProductsPage/${el.slug}`}
                              >
                                {el.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })
          : categories.slice(0, 5).map((el, index) => {
              return (
                <li key={el.id}>
                  <Link className={styles.LinkStyle} onClick={closeNavbar} to={`/ProductsPage/${el.slug}`}>
                    {el.name}
                  </Link>
                  <CiFaceSmile
                    onClick={() => openDropdown(index)}
                    className={
                      currentDropdown === index
                        ? styles.DropDownOpened
                        : styles.dropDown
                    }
                  />
                  {currentDropdown === index && (
                    <div className={styles.dropDown}>
                      <ul>
                        {categories[index]?.children.map((el) => {
                          return (
                            <li key={el.id}>
                              <Link
                                onClick={closeNavbar}
                                to={`/ProductsPage/${el.slug}`}
                              >
                                {el.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}

*/