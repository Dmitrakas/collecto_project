import React from 'react';

function SearchBar() {
  return (
    <div className="d-flex align-items-center">
      <input type="text" className="form-control me-2" placeholder="Search" />
      <button className="btn btn-outline-primary">Найти</button>
    </div>
  );
}

export default SearchBar;
