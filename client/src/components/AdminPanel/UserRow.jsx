import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faTrashAlt,
  faUserPlus,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";

const UserRow = ({
  user,
  handleBlockUser,
  handleUnblockUser,
  handleDeleteUser,
  handleGrantAdminAccess,
  handleRevokeAdminAccess,
}) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.isAdmin ? "true" : "false"}</td>
      <td>{user.blocked ? "true" : "false"}</td>
      <td>
        <button
          className="btn btn-danger me-2"
          onClick={() => handleBlockUser(user._id)}
        >
          <FontAwesomeIcon icon={faBan} /> Block
        </button>
        <button
          className="btn btn-success me-2"
          onClick={() => handleUnblockUser(user._id)}
        >
          <FontAwesomeIcon icon={faCheck} /> Unblock
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={() => handleDeleteUser(user._id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </button>
        {!user.isAdmin && (
          <button
            className="btn btn-primary me-2"
            onClick={() => handleGrantAdminAccess(user._id)}
          >
            <FontAwesomeIcon icon={faUserPlus} /> Grant Admin
          </button>
        )}
        {user.isAdmin && (
          <button
            className="btn btn-warning me-2"
            onClick={() => handleRevokeAdminAccess(user._id)}
          >
            <FontAwesomeIcon icon={faUserMinus} /> Revoke Admin
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
