import React from "react";
import gogo from "../img/gogo.gif";

function LoadingIndicator() {
  return (
    <div className="loading-wrap">
      <img className="loading" src={gogo} alt="loading" />
    </div>
  );
}

export default LoadingIndicator;
