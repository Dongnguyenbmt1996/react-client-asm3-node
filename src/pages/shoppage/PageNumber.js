import React from "react";
import "../../custom.css";
export default function PageNumber({
  currentPage,
  setCurrentPage,
  totalProducts,
  productsPerPage,
}) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div className="d-flex flex-column justify-content-center align-items-end  pt-5">
      <div className="">
        <button
          className=" mx-2 btn-pagenumber"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          {"\u00AB"}
        </button>
        <span className="current-page fw-bold mx-1 bg-dark text-white px-3 py-2">
          {currentPage}
        </span>
        <button
          className=" mx-2 btn-pagenumber"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          {"\u00BB"}
        </button>
      </div>
      <div className="justify-content-center align-items-center px-2">
        <p className="mt-2">
          Showing {startProduct}-{endProduct} of {totalProducts} results
        </p>
      </div>
    </div>
  );
}
