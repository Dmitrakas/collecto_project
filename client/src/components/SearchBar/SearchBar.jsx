import React from "react";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="d-flex align-items-center me-4">
      <input type="text" className="custom-input me-2" placeholder="Search" />
      <button className="btn btn-outline-danger">Найти</button>
    </div>
  );
}

export default SearchBar;
