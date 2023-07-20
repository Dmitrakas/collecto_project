import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registration = async (username, email, password) => {
  try {
    const response = await axios.post(
      `https://collecto-app.onrender.com/api/auth/registration`,
      {
        username,
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return { error: error.response.data.error };
    } else {
      return { error: 'Network error or server is down.' };
    }
  }
};


export const login = createAsyncThunk("user/loginUser", async (param) => {
  try {
    const { email, password } = param;
    const response = await axios.post("https://collecto-app.onrender.com/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Network error or server is down.');
    }
  }
});

export const auth = createAsyncThunk("user/authUser", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.user.token;

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await axios.get("https://collecto-app.onrender.com/api/auth/auth", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else if (error.message === 'Authorization token is missing') {
      throw error;
    } else {
      throw new Error('Network error or server is down.');
    }
  }
});

export const logout = createAsyncThunk('user/logoutUser', async () => {
  return 'Logged out successfully';
});


export const getAllUsers = async () => {
  try {
    const response = await axios.get(`https://collecto-app.onrender.com/api/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

export const getUserUsernameById = async (userId) => {
  try {
    const response = await axios.get(`https://collecto-app.onrender.com/api/user/username/${userId}`);
    return response.data.username;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

export const blockUser = async (userId) => {
  try {
    const response = await axios.put(`https://collecto-app.onrender.com/api/user/${userId}/block`);
    return response.data;
  } catch (error) {
    console.error("Error blocking user:", error.message);
    throw error;
  }
};

export const unblockUser = async (userId) => {
  try {
    const response = await axios.put(`https://collecto-app.onrender.com/api/user/${userId}/unblock`);
    return response.data;
  } catch (error) {
    console.error("Error unblocking user:", error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`https://collecto-app.onrender.com/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};

export const grantAdminAccess = async (userId) => {
  try {
    const response = await axios.put(`https://collecto-app.onrender.com/api/user/${userId}/admin/grant`);
    return response.data;
  } catch (error) {
    console.error("Error granting admin access:", error.message);
    throw error;
  }
};

export const revokeAdminAccess = async (userId) => {
  try {
    const response = await axios.put(`https://collecto-app.onrender.com/api/user/${userId}/admin/revoke`);
    return response.data;
  } catch (error) {
    console.error("Error revoking admin access:", error.message);
    throw error;
  }
};

