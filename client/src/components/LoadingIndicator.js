import React from "react";
import aaa from "../img/aaa.gif";
import lo from "../img/lo.gif";

function LoadingIndicator() {
  return (
    <div className="loading-wrap">
      <img className="loading" src={lo} alt="loading" />
    </div>
  );
}

export default LoadingIndicator;
