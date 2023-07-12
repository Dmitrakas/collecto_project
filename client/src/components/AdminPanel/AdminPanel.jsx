import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
  grantAdminAccess,
  revokeAdminAccess,
} from "../../actions/user";

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
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Id</th>
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
                <td>{user._id}</td>
                <td>{user.isAdmin ? "true" : "false"}</td>
                <td>{user.blocked ? "true" : "false"}</td>
                <td>
                  <button onClick={() => handleBlockUser(user._id)}>
                    Block
                  </button>
                  <button onClick={() => handleUnblockUser(user._id)}>
                    Unblock
                  </button>
                  <button onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                  {!user.isAdmin && (
                    <button onClick={() => handleGrantAdminAccess(user._id)}>
                      Grant Admin
                    </button>
                  )}
                  {user.isAdmin && (
                    <button onClick={() => handleRevokeAdminAccess(user._id)}>
                      Revoke Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
