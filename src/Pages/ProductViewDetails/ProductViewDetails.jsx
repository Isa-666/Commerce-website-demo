import React, { useState, useEffect } from "react";
import styles from "./ProductViewDetails.module.css";
import { useParams } from "react-router-dom";
import { getProductById } from "../../API/commerce";
import Main from "./Main/Main";
import SliderProducts from "./SliderProducts/SliderProducts";
import { PacmanLoader } from "react-spinners";
import Navigation from "../../Components/Navigation/Navigation";

const ProductViewDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(null);
  useEffect(() => {
    getProductById(setLoading, setProduct, setCurrentVariant, id);
  }, [id]);

  return (
    <>
    <Navigation id={product?.id} product={product} />
      {loading ? (
        <div className={styles.PacmanLoad}><PacmanLoader color="#ffe600" size={50} /></div>
      ) : (
        <div className={styles.ProductViewDetailsContainers}>
          <SliderProducts
            images={product?.assets}
            currentVariant={currentVariant}
          />
          <Main
            product={product}
            name={product?.name}
            id={product?.id}
            loading={loading}
            currentVariant={currentVariant}
            setCurrentVariant={setCurrentVariant}
            available={
              product?.inventory?.managed ? product?.inventory?.available : 10
            }
            price={currentVariant?.price?.raw || product?.price.raw}
            variant_groups={product?.variant_groups}
          />
        </div>
      )}
    </>
  );
};

export default ProductViewDetails;
