import React from "react";

export default function SortProduct({ setSortOrder }) {
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  return (
    <div className="mb-3 d-flex justify-content-end align-items-center col-xl-12 col-lg-8 col-sm-4">
      <select onChange={handleSortChange}>
        <option value="default">Default sorting</option>
        <option value="LowToHight">Price: Low to High</option>
        <option value="HighToLow">Price: High to Low</option>
      </select>
    </div>
  );
}
