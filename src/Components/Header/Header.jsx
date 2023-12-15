import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import ShopLogo from "./HeaderAssets/shop.logo.png";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart, AiFillHeart } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { commerce, getProductFromBasket } from "../../API/commerce";
import { useDispatch, useSelector } from "react-redux";
import { setCartLength } from "../../store/reducers/BasketReducers";
import SearchResultList from "../SearchResultSection/SearchResultList/SearchResultList";
import HeaderCategoriesNav from "./HeaderCategoriesNav/HeaderCategoriesNav";
import MobileNav from "./MobileNav/MobileNav";
import { getCategoriesName } from "../../store/actions/categories";
import useFetch from "../../API/hooks/UseFetch";

const params = {
  depth: "2",
  sortDirection: "asc",
  limit: 5,
};
const Header = () => {

  const { products } = useFetch(commerce);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate;
  const ProductCounter = useSelector(
    (state) => state.basketProducts.cartLength
  );

  const dispatch = useDispatch();
  const isLogin = commerce.customer.isLoggedIn();
  const [user, setUser] = useState({});
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const setDropdownOpen = () => {
    setMobileNavbar(true);
  };
  const getResult = (value) => {
    const results = products.filter((pro) => {
      if (pro) {
        return (
          value &&
          pro &&
          pro.name &&
          pro.name?.toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    setResults(results);
  };

  const handleChange = (value) => {
    if (value == " ") {
      setSearchTerm("");
    } else {
      setSearchTerm(value);
    }
    getResult(value);
  };
  function handleBasket() {
    if (ProductCounter > 0) {
      navigate("/BasketProduct");
    } else navigate("/EmptyBasketProduct");
  }
  let navBar;
  if (categories.length > 0 && !loading) {
    navBar = categories.map((el) => {
      return {
        id: el.id,
        name: el.name,
        slug: el.slug,
        children: el.children.map((el) => {
          return {
            id: el.id,
            name: el.name,
            slug: el.slug,
          };
        }),
      };
    });
    localStorage.setItem("categories", JSON.stringify(navBar));
  } else if (JSON.parse(localStorage.getItem("categories"))?.length > 0) {
    navBar = JSON.parse(localStorage.getItem("categories"));
  }
  useEffect(() => {
    isLogin && commerce.customer.about().then((customer) => setUser(customer));
  }, [isLogin]);
  useEffect(() => {
    getProductFromBasket().then((p) =>
      dispatch(setCartLength(p?.total_unique_items))
    );
    getCategoriesName(setLoading, setCategories, params);
  }, [params]);

  return (
    <>
      <div className={styles.HeaderWrapper}>
        <div className={styles.HeaderContainer}>
          <div className={styles.MobileHamburgerWrapper}>
            <RxHamburgerMenu
              onClick={setDropdownOpen}
              className={styles.MobileHamburger}
            />
          </div>
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
          handleBasket={handleBasket}
        />
      </div>
    </>
  );
};

export default Header;
