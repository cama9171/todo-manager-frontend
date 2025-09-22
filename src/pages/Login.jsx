import { use, useState, useContext } from "react";
import imagePassword from "../assets/password.png";
import imageUser from "../assets/person.png";
import AuthContext from "../context/AuthProvider";

import api from "../api/axios";
const LOGIN_URL = "/auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const submitLoginData = (e) => {
    e.preventDefault();

    try {
      const response = api.post("/api/login", { username, password });
      console.log(JSON.stringify(response));
      console.log(username, password);
      setUsername("");
      setPassword("");
      setSuccess(true);
    } catch (error) {}
  };

  return success ? (
    <div className="message">Login successfully!</div>
  ) : (
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
      </div>
    </div>
  );
}

export default Login;
