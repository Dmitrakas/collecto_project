import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registration = async (username, email, password) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/auth/registration`,
      {
        username,
        email,
        password,
      }
    );
    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = createAsyncThunk("user/loginUser", async (param) => {
  try {
    const { email, password } = param;
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const logout = createAsyncThunk("user/logoutUser", async () => {
  try {
    return console.log("logged out");
  } catch (error) {
    return error.message;
  }
});

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

export const blockUser = async (userId) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/user/${userId}/block`);
    return response.data;
  } catch (error) {
    console.error("Error blocking user:", error.message);
    throw error;
  }
};

export const unblockUser = async (userId) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/user/${userId}/unblock`);
    return response.data;
  } catch (error) {
    console.error("Error unblocking user:", error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};

export const grantAdminAccess = async (userId) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/user/${userId}/admin/grant`);
    return response.data;
  } catch (error) {
    console.error("Error granting admin access:", error.message);
    throw error;
  }
};

export const revokeAdminAccess = async (userId) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/user/${userId}/admin/revoke`);
    return response.data;
  } catch (error) {
    console.error("Error revoking admin access:", error.message);
    throw error;
  }
};

