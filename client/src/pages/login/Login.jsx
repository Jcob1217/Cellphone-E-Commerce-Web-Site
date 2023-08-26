import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectFrom = queryParams.get("redirect");
  const [redirectReason, setRedirectReason] = useState(
    queryParams.get("redirect")
  );

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (redirectReason) {
      toast.info(localStorage.getItem("redirect"), {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.removeItem("redirect");
    }
  }, [redirectReason]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      let redirectTo;
      {
        redirectFrom ? (redirectTo = `${redirectFrom}`) : (redirectTo = "/");
      }
      navigate(redirectTo);
    } catch (err) {
      setInfo(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
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
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
        <div className="right">
          <h1>Welcome!</h1>
          <p>Don't have an Account?</p>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
