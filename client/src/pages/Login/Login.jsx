import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import InputField from "../../components/Common/InputField/InputField";
import SubmitButton from "../../components/Common/SubmitButton/SubmitButton";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/");
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        setError("An error occurred during login. Please try again later.");
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <SubmitButton label="Login" />
      </form>
    </div>
  );
}
