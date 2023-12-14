import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import ShopLogo from "./HeaderAssets/shop.logo.png";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart, AiFillHeart } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  commerce,
  getCategoriesName,
  getProductFromBasket,
} from "../../API/commerce";
import { useDispatch } from "react-redux";
import { setCartLength } from "../../store/reducers/BasketReducers";
import SearchResultList from "../SearchResultSection/SearchResultList/SearchResultList";
import { useMyContext } from "./Context/CategoryContextAndSearch";
import HeaderCategoriesNav from "./HeaderCategoriesNav/HeaderCategoriesNav";
import MobileNav from "./MobileNav/MobileNav";


const params = {
  depth: "2",
  sortDirection: "asc",
  limit: 5,
};
const Header = () => {
  const dispatch = useDispatch();
  const {
    categories,
    setCategories,
    searchTerm,
    results,
    handleChange,
    handleBasket,
    ProductCounter,
    navBar,
    loading,
    setLoading,
  } = useMyContext();
  const isLogin = commerce.customer.isLoggedIn();
  const [user, setUser] = useState({});
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const setDropdownOpen = () => {
    setMobileNavbar(true);
  };

  useEffect(() => {
    isLogin && commerce.customer.about().then((customer) => setUser(customer));
  }, [isLogin]);
  useEffect(() => {
    getProductFromBasket().then((p) =>
      dispatch(setCartLength(p?.total_unique_items))
    );
    getCategoriesName(setCategories,setLoading,params);
  }, [params]);
console.log("Header");
  return (<>
    <div className={styles.HeaderWrapper}>
      <div className={styles.HeaderContainer}>
        <div className={styles.MobileHamburgerWrapper}><RxHamburgerMenu onClick={setDropdownOpen} className={styles.MobileHamburger}/></div>
        <Link className={styles.ShopLogo} to={"/"}>
          <img className={styles.shopLogo} src={ShopLogo} alt="" />
        </Link>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Type porduct name here..."
            className={styles.inputSearch}
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
          />
          <div
            style={{ display: searchTerm ? "block" : "none" }}
            className={styles.input_products_filter}
          >
            <SearchResultList handleChange={handleChange} results={results} />
          </div>
        </div>
        
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
            <Link to={"/FavoritesProducts"}>
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
      <HeaderCategoriesNav
        categories={categories}
        loading={loading}
        navBar={navBar}
      />
<MobileNav
mobileNavbar={mobileNavbar}
categories={categories}
loading={loading}
ProductCounter={ProductCounter}
setMobileNavbar={setMobileNavbar}
/>
    </div>

    </>
  );
};

export default Header;
