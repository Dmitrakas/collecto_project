import {
  blockUser as apiBlockUser,
  unblockUser as apiUnblockUser,
  deleteUser as apiDeleteUser,
  grantAdminAccess as apiGrantAdminAccess,
  revokeAdminAccess as apiRevokeAdminAccess,
} from "../../actions/user";

export const blockUserAction  = async (userId, users, setUsers) => {
  try {
    await apiBlockUser(userId);
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, blocked: true } : user
    );
    setUsers(updatedUsers);
  } catch (error) {
    console.error("Error blocking user:", error.message);
  }
};

export const unblockUserAction  = async (userId, users, setUsers) => {
  try {
    await apiUnblockUser(userId);
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, blocked: false } : user
    );
    setUsers(updatedUsers);
  } catch (error) {
    console.error("Error unblocking user:", error.message);
  }
};

export const deleteUserAction  = async (userId, users, setUsers) => {
  try {
    await apiDeleteUser(userId);
    const updatedUsers = users.filter((user) => user._id !== userId);
    setUsers(updatedUsers);
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
};

export const grantAdminAccessAction  = async (userId, users, setUsers) => {
  try {
    await apiGrantAdminAccess(userId);
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, isAdmin: true } : user
    );
    setUsers(updatedUsers);
  } catch (error) {
    console.error("Error granting admin access:", error.message);
  }
};

export const revokeAdminAccessAction  = async (userId, users, setUsers) => {
  try {
    await apiRevokeAdminAccess(userId);
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, isAdmin: false } : user
    );
    setUsers(updatedUsers);
  } catch (error) {
    console.error("Error revoking admin access:", error.message);
  }
};
