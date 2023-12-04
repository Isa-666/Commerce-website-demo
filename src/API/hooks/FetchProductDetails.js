import { useState, useEffect } from "react";
import { commerce } from "../commerce";

export default function FetchProductViewDetails() {
  const [product, setProduct] = useState({});
  const [originalPrice, SetOriginalPrice] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(null);
  const FectProductView = async (id) => {
    const response = await commerce.products.retrieve(id);
    const {
      name,
      price,
      image,
      quantity,
      description,
      assets,
      variant_groups,
    } = response;
    const firstVariant = {
      color: variant_groups?.[0]?.options[0],
      storage: variant_groups?.[1]?.options[0],
    };
    try {
      setCurrentVariant(firstVariant);
    } catch (error) {
      return error.message;
    }
    SetOriginalPrice(price.raw);
    setProduct({
      id,
      name,
      image: image.url,
      price: `${price.raw} ${"$"}`,
      quantity,
      description,
      assets,
      variant_groups,
    });
  };
  useEffect(() => {
    const id = window.location.pathname.split("/");
    FectProductView(id[2]);
  }, []);
  return {
    product,
    setProduct,
    originalPrice,
    currentVariant,
    setCurrentVariant,
  };
}
