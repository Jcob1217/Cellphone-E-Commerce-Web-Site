import React, { useState, useEffect } from "react";
import axios from "axios";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [info, setInfo] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/auth/register", inputs);
      setInfo("Account Created");
      setTimeout(() => {
        navigate("/login"); // Zmień ścieżkę na odpowiednią
      }, 1000);
    } catch (err) {
      setInfo(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Welcome!</h1>
          <p>Already have an Account?</p>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </div>
        <div className="right">
          <h1>Create Account</h1>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{info && info}</p>
            <button onClick={handleRegister}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
