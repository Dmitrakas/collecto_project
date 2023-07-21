import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../actions/user";
import UserRow from "./UserRow";
import {
  blockUserAction,
  unblockUserAction,
  deleteUserAction,
  grantAdminAccessAction,
  revokeAdminAccessAction,
} from "./adminActions";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    await blockUserAction(userId, users, setUsers);
  };

  const handleUnblockUser = async (userId) => {
    await unblockUserAction(userId, users, setUsers);
  };

  const handleDeleteUser = async (userId) => {
    await deleteUserAction(userId, users, setUsers);
  };

  const handleGrantAdminAccess = async (userId) => {
    await grantAdminAccessAction(userId, users, setUsers);
  };

  const handleRevokeAdminAccess = async (userId) => {
    await revokeAdminAccessAction(userId, users, setUsers);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchLowercase = searchQuery.toLowerCase();
    const emailMatch = user.email.toLowerCase().includes(searchLowercase);
    const usernameMatch = user.username.toLowerCase().includes(searchLowercase);
    return emailMatch || usernameMatch;
  });

  return (
    <div className="container">
      <h2>User List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Email or Username"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="table-responsive">
        {filteredUsers.length === 0 ? (
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
              {filteredUsers.map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  handleBlockUser={handleBlockUser}
                  handleUnblockUser={handleUnblockUser}
                  handleDeleteUser={handleDeleteUser}
                  handleGrantAdminAccess={handleGrantAdminAccess}
                  handleRevokeAdminAccess={handleRevokeAdminAccess}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
