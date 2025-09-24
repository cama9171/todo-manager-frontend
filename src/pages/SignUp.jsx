import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import imagePassword from "../assets/password.png";
import imageUser from "../assets/person.png";

import api from "../api/axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username == "" || password == "" || reEnteredPassword == ""){
        setMessage("Enter username, password and re enter the password");
        return;
    }
    if (password !== reEnteredPassword) {
      setMessage("Re entered password does not match!");
    } else {
      try {
        const res = await api.post("/api/register", {
          username,
          password,
        });
        setUsername("");
        setPassword("");
        setReEnteredPassword("");
        setMessage("Registered successfully!");
        navigate("/login");
      } catch (error) {
        if (!error?.response) {
          setMessage("No Server Response");
          console.error(error);
        } else {
          setMessage("Login failed. Please try again.");
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
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
            required
          />
        </div>
        <div className="input">
          <img src={imagePassword} alt="password" />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <img src={imagePassword} alt="password" />
          <input
            type="password"
            placeholder="Re enter password"
            name="Re enter password"
            onChange={(e) => setReEnteredPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleRegister}>
          Register
        </div>
        <div className="login-existing-account">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default SignUp;
