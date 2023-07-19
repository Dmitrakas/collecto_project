import React from "react";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import AuthButtons from "../AuthButtons/AuthButtons";
import "./Header.css";

export default function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Logo />

        <div className="collapse navbar-collapse" id="navbarNav">
          <Menu />
        </div>

        <div className="d-flex align-items-center">
          <SearchBar />
          <AuthButtons />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </header>
  );
}
