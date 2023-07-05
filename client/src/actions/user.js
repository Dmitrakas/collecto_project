import axios from 'axios';
import { setUser } from '../reducers/userReducer';

export const registration = (username, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
        username,
        email,
        password
      });
      alert(response.data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      dispatch(setUser(response.data.user));
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log(response.data);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };
};
