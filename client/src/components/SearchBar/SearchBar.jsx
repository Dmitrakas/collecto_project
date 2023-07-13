import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="d-flex align-items-center me-4">
      <input
        type="text"
        className="custom-input me-2"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-danger" onClick={handleSearch}>
        Найти
      </button>
    </div>
  );
}

export default SearchBar;
