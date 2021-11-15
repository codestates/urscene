import React from "react";
import { useHistory } from "react-router";
require("dotenv").config();

function ResultScene({ scene }) {
  const history = useHistory();
  // console.log(scene);
  return (
    <div>
      <div
        className="result-scene-img"
        onClick={() => {
          history.push(`/post/${scene.id}`);
        }}
      >
        <img
          src={`${process.env.REACT_APP_S3_URL_ImageUpload}/${scene.image}`}
          alt={scene.image}
        />
      </div>
    </div>
  );
}

export default ResultScene;
