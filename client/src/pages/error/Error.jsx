import React from "react";
import "./error.scss";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <div className="card">
        <h1>Error 404</h1>
        <h2>Page Not Found</h2>
        <Link to="/">Go back to the Home Page</Link>
      </div>
    </div>
  );
};

export default Error;
