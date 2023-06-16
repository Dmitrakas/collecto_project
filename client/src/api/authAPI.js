import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/register', userData);
    return response.data;
  } catch (error) {
    throw new Error('Error registering user');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Error logging in');
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users/status');
    return response.data;
  } catch (error) {
    throw new Error('Error checking authentication status');
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/logout');
    return response.data;
  } catch (error) {
    throw new Error('Error logging out');
  }
};
