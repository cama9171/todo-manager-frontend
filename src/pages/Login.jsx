import { useState, useContext } from "react";
import imagePassword from "../assets/password.png";
import imageUser from "../assets/person.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import api from "../api/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitLoginData = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/login", { username, password });

      console.log(JSON.stringify(response?.data));
      console.log(username, password);

      setUsername("");
      setPassword("");
      login(username);
      navigate("/dashboard");
    } catch (error) {
      if (!error?.response) {
        setMessage("No Server Response");
      } else {
        setMessage("Login failed. Incorrect Username or Password!");
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={imageUser} alt="username" />
          <input
            type="text"
            placeholder="Username"
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>
        <div className="input">
          <img src={imagePassword} alt="password" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={submitLoginData}>
          Login
        </div>
        <div className="login-existing-account">
          New to To-Do Manager? <Link to="/register">Register here</Link>
        </div>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Login;
