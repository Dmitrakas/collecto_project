import React, { useState } from 'react';
import RegistrationForm from '../components/Auth/RegistrationForm';
import { registerUser } from '../api/authAPI';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Вызываем функцию для регистрации пользователя
      await registerUser({ username, email, password });

      // Обрабатываем успешную регистрацию
      // ...
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Registration Page</h1>
      {error && <div className="error">{error}</div>}
      <RegistrationForm
        username={username}
        email={email}
        password={password}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        handleRegistration={handleRegistration}
      />
    </div>
  );
};

export default RegistrationPage;
