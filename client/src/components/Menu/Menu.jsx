import React from "react";
import { useSelector } from "react-redux";

export default function Menu() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  return (
    <ul className="navbar-nav mx-auto">
      <li className="nav-item">
        <a className="nav-link" href="/">
          Main Page
        </a>
      </li>

      {isAuth && (
        <>
          <li className="nav-item">
            <a className="nav-link" href="/collections">
              My Collections
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile">
              Profile
            </a>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <a className="nav-link" href="/admin">
                Admin Panel
              </a>
            </li>
          )}
        </>
      )}
    </ul>
  );
}
