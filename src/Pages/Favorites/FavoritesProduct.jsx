import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./FavoritesProduct.module.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteProduct } from "../../Storage/indexDDB";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../Components/Button/GoBackButton";
const FavoritesProduct = ({ getAllProducts }) => {
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchFavorites = async () => {
      const allProducts = await getAllProducts();
      try {
        const favoriteProducts = await allProducts.filter(
          (product) => product.isFavorite
        );
        setFavorites(favoriteProducts);
        if (favoriteProducts.length == 0) {
          navigate("/EmptyFavoritePage");
        } else if (favoriteProducts.length > 0) {
          navigate("/FavoritesProducts");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className={styles.ProductFavFundament}>
      <GoBackButton/>
            {favorites.map((pro) => (
        <div className={styles.ProductFav} key={pro.id}>
          <div className={styles.ProductName}>{pro.name}</div>
          <div>
            <img className={styles.ProductImage} src={pro.image?.url} alt="" />
          </div>
          <div>{`${pro.price.raw} ${"$"}`}</div>
          <div>
            <button className={styles.ProductDetails}>View Details</button>
          </div>
          <div className={styles.DeleteBtn}>
            {" "}
            <Button
              onClick={() => DeleteProduct(pro.id)}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>   
        </div>
      ))}
  
    </div>
  );
};

export default FavoritesProduct;
