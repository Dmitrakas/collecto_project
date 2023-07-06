import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthButtons() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    navigate("/registration");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

    const handleLogoutClick = () => {
    navigate("/logout");
  };

  return (
    <div>
      {isAuth ? (
        <button className="btn btn-outline-primary" onClick={handleLogoutClick}>
          Logout
        </button>
      ) : (
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={handleRegistrationClick}
          >
            Registration
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={handleLoginClick}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthButtons;
