import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams,Link } from "react-router-dom";
import { getProductsBySlug } from "../../API/commerce";
import { optionsOrder } from "./data";
import styles from "./ProductPage.module.css";
import Product from "../../Components/Product/Product";
import Info from "../../Components/Info/Info";
import Filter from "../../Components/Filter/Filter";
import Pagination from "../../Components/Pagination/Pagination";
import Navigation from "../../Components/Navigation/Navigation";
import PriceFilter from "../../Components/PriceFilter/PriceFilter";
import GoBackButton from "../../Components/Button/GoBackButton";
const ProductsPage = () => {
  window.scrollTo(0, 0);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState("");
  const [sort, setSort] = useState(optionsOrder.find((el) => el.active));
  const { slug } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

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
    getProductsBySlug(setLoading, setProducts, params);
  }, [slug, params]);

  return (
    <>
      <Navigation />
    <GoBackButton/>
      <div className={styles.klav}>
        <div className={styles.FilterWrapper}>
          <Filter setSelectedBrands={setSelectedBrands} />
          <PriceFilter
            setFilteredProducts={setFilteredProducts}
            products={products?.data || []}
          />
        </div>

        <div className={styles.slugWrapper}>
          <div className={styles.InfoWrapper}>
            <Info
              loading={loading}
              products={products}
              setSort={setSort}
              sort={sort}
              options={optionsOrder}
              setSelectedBrands={setSelectedBrands}
              setFilteredProducts={setFilteredProducts}
            />
          </div>

          <div className={styles.Wrapper}>
            <div className={styles.terp}>
              <div className={styles.ProductWrapper}>
                {!loading &&
                  (filteredProducts.length > 0 ? (
                    filteredProducts
                      .slice(0, 9)
                      .map((el) => (
                        <Product
                          key={el.id}
                          id={el.id}
                          name={el.name}
                          image={el.image.url}
                          price={el.price.raw}
                          el={el}
                        />
                      ))
                  ) : (products?.data?.length || 0) > 0 ? (
                    products.data
                      .slice(0, 9)
                      .map((el) => (
                        <Product
                          key={el.id}
                          id={el.id}
                          name={el.name}
                          image={el.image.url}
                          price={el.price.raw}
                          el={el}
                        />
                      ))
                  ) : (
                    <div>Products not found.</div>
                  ))}
              </div>
              <div className={styles.paginationContainer}>
                {!loading && (
                  <Pagination
                    data={products?.meta?.pagination}
                    currentPage={currentPage}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
