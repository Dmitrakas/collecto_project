import React from "react";
import { useSelector } from "react-redux";

export default function Main() {
  const user = useSelector(
    (state) => state.user.currentUser
  );

  return (
    <div>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <p>isAdmin: {user.isAdmin ? 'true' : 'false'}</p>
      <p>Username: {user.username}</p>
    </div>
  );
}
