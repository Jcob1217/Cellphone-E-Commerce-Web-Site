import React from "react";
import "./loading.scss";

const Loading = () => {
  return (
    <div className="loading-page">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
