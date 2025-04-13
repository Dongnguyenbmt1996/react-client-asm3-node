import React, { useState } from "react";

export default function Search({ setSearchTerm }) {
  const [inputSearch, setInputSearch] = useState("");
  const handleSearch = (e) => {
    const value = e.target.value;
    setInputSearch(value);
    setSearchTerm(value);
  };
  return (
    <div className="col-lg-4 mb-3">
      <input
        className="py-2"
        type="text"
        placeholder="Enter Search Here!"
        onChange={handleSearch}
        value={inputSearch}
        style={{ width: "300px", border: "1px solid #d3d3d3" }}
      />
    </div>
  );
}
