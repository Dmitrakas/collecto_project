import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";

export default function Profile() {
  const user = useSelector(
    (state) => state.user.currentUser
  );

  return (
    <div className="container-card">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Profile</h5>
          <p className="card-text">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="card-text">
            <strong>ID:</strong> {user.id}
          </p>
          <p className="card-text">
            <strong>isAdmin:</strong>{" "}
            {user.isAdmin ? "true" : "false"}
          </p>
        </div>
      </div>
    </div>
  );
}
