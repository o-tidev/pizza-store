import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

const handleClick = (e) => {
  console.log(e);
};

function Pagination({ onPageChange }) {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onPageChange(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination;
