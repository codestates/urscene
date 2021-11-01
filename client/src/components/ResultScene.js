import React from "react";
require("dotenv").config();

function ResultScene({ scene }) {
  //console.log()
  return (
    <div>
      <div className="result-scene-img">
        <img
          src={`${process.env.REACT_APP_S3_URL_ImageUpload}/${scene.image}`}
          alt={scene.image}
        />
      </div>
    </div>
  );
}

export default ResultScene;
