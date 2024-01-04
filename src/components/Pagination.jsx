// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link" onClick={handlePrevClick}>
          &laquo; Previous
        </button>
      </li>
      {renderPageNumbers()}
      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <button className="page-link" onClick={handleNextClick}>
          Next &raquo;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
