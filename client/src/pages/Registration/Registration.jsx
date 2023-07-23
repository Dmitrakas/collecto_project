import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registration } from "../../actions/user";
import InputField from "../../components/Common/InputField/InputField";
import SubmitButton from "../../components/Common/SubmitButton/SubmitButton";
import "./Registration.css";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registration(username, email, password);
      if (response && response.error) {
        setError(response.error);
      } else {
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } catch (error) {
      setError("Network error or server is down.");
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton label="Register" />
      </form>
    </div>
  );
}
