import React, { useState } from 'react';
import AuthLoginForm from '../components/Auth/AuthLoginForm';
import { loginUser } from '../api/authAPI';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);
      localStorage.setItem('token', response.token);

      navigate('/profile');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {error && <div className="error">{error}</div>}
      <AuthLoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
