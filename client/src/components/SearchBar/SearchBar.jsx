import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {};

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="d-flex align-items-center">
      <input
        type="text"
        className="custom-input me-2"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-danger" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
