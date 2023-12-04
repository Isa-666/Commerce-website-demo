import React from 'react'
import styles from "./Pagination.module.css"
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
const Pagination = ({ data, currentPage, searchParams, setSearchParams }) => {
    const totalPages = new Array(data?.total_pages).fill(0);

    const pageClickHandler = (page) => {
      const params = Object.fromEntries([...searchParams]);
      setSearchParams({ ...params, page: page });
    };
    const nextButton = () => {
      if (currentPage !== data?.total_pages) {
        const params = Object.fromEntries([...searchParams]);
        setSearchParams({ ...params, page: currentPage + 1 });
      }
    };
    const prevButton = () => {
      if (currentPage !== 1) {
        const params = Object.fromEntries([...searchParams]);
        setSearchParams({ ...params, page: currentPage - 1 });
      }
    };

  return (
    <div className={styles.PaginationWrapper}>
           <button
        disabled={currentPage === 1 && "disabled"}
        onClick={prevButton} className={styles.buttonClick}>
        <CiSquareChevLeft className={styles.LeftArrows} />
      </button>
      <div className={styles.NumberSection}>
        {totalPages.map((_, i) => (
          <span
            key={i}
            className={i + 1 == currentPage ? styles.active : ""}
            onClick={() => pageClickHandler(i + 1)}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <button
        onClick={nextButton}
        className={styles.buttonClick}
        disabled={data?.total_pages === currentPage && "disabled"}
      >
        <CiSquareChevRight className={styles.LeftArrows}/>
      </button>
    </div>
  )
}

export default Pagination