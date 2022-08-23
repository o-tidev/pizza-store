import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type Pagination = {
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Pagination> = ({ currentPage, onPageChange }) => {
  return (
    <>
      {/* HERE GOES YOUR HTML */}

      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onPageChange(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
      />
    </>
  );
};

export default Pagination;
