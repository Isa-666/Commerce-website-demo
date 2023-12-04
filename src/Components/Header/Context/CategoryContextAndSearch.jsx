import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { commerce, getCategoriesName } from "../../../API/commerce";
import UseFetch from "../../../API/hooks/UseFetch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const { products } = UseFetch(commerce);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const ProductCounter = useSelector(
    (state) => state.basketProducts.cartLength
  );

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
  const contextValue = {
    setCategories,
    categories,
    getResult,
    handleChange,
    results,
    searchTerm,
    handleBasket,
    ProductCounter,
    navBar,
    loading,
    setLoading,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
