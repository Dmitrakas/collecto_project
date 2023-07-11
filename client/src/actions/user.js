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
    console.log(`email: ${email}, password: ${password}`);
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response;
  } catch (error) {
    return error.message;
  }
});

export const logout = createAsyncThunk("user/logoutUser", async () => {
  try {
    localStorage.removeItem("token");
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
