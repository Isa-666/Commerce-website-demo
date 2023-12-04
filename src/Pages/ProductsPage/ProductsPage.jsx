import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getProductsBySlug } from "../../API/commerce";
import { optionsOrder } from "./data";
import styles from "./ProductPage.module.css";
import Product from "../../Components/Product/Product";
import Info from "../../Components/Info/Info";
import Filter from "../../Components/Filter/Filter";
import Pagination from "../../Components/Pagination/Pagination";

const ProductsPage = () => {
  window.scrollTo(0, 0);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState("");
  const [sort, setSort] = useState(optionsOrder.find((el) => el.active));
  const { slug } = useParams();
 

  const currentPage = useCallback(
    Number(searchParams.get("page") || 1, [searchParams])
  );
  const params = useCallback(
    {
      category_slug: [slug],
      limit: 6,
      page: currentPage,
      ...(selectedBrands && { query: selectedBrands }),
      ...(sort && {
        sortBy: sort.actions.sortBy,
        sortDirection: sort.actions.sortDirection,
      }),
    },
    [searchParams, selectedBrands, sort]
  );
  useEffect(() => {
    getProductsBySlug(setLoading,setProducts, params);
  }, [slug, params]);
console.log(products);
  return (
    <div className={styles.klav}>
      <div className={styles.FilterWrapper}>
        <Filter setSelectedBrands={setSelectedBrands} />
      </div>
      <div className={styles.slugWrapper}>  
        <div className={styles.InfoWrapper}>
          <Info
            loading={loading}
            products={products}
            setSort={setSort}
            sort={sort}
            options={optionsOrder}
          />
        </div>
        <div className={styles.Wrapper}>
          <div className={styles.terp}>
          <div className={styles.ProductWrapper}>
            {!loading &&
              products?.data?.length > 0 &&
              products.data.slice(0, 9).map((el) => {
                return (
                    <Product 
                    key={el.id}
                      id={el.id}
                      name={el.name}
                      image={el.image.url}
                      price={el.price.raw}
                      el={el}
                    />
               
                );
              })}
          </div>
          <div className={styles.paginationContainer}>{!loading && (
            <Pagination
              data={products?.meta?.pagination}
              currentPage={currentPage}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          )}</div></div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
