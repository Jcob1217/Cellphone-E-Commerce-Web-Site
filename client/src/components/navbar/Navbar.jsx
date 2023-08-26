import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { AuthContext } from "../../context/authContext";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleClick = () => {
    logout();
    // navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="navbar-link">
          <HomeIcon fontSize="medium" />
          Home
        </Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div>
            <Link to={"/cart"} className="navbar-link">
              <ShoppingCartIcon fontSize="medium" />
              Cart
            </Link>
            <span onClick={handleClick}>
              <LogoutIcon />
              Logout
            </span>
          </div>
        ) : (
          <Link to="/login" className="navbar-link">
            <LoginIcon />
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
