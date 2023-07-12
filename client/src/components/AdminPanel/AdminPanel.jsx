import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
  grantAdminAccess,
  revokeAdminAccess,
} from "../../actions/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faTrashAlt,
  faUserPlus,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      await blockUser(userId);
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, blocked: true } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error blocking user:", error.message);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await unblockUser(userId);
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, blocked: false } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error unblocking user:", error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleGrantAdminAccess = async (userId) => {
    try {
      await grantAdminAccess(userId);
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, isAdmin: true } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error granting admin access:", error.message);
    }
  };

  const handleRevokeAdminAccess = async (userId) => {
    try {
      await revokeAdminAccess(userId);
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, isAdmin: false } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error revoking admin access:", error.message);
    }
  };

  return (
    <div className="container">
      <h2>User List</h2>
      <div className="table-responsive">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Blocked</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
