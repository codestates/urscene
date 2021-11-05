import React from "react";
import { useHistory } from "react-router";
require("dotenv").config();

function LikeScene({ likeScene }) {
  const history = useHistory();
  return (
    <div>
      <div
        className="result-scene-img"
        onClick={() => history.push(`/post/${likeScene.id}`)}
      >
        <img
          src={`${process.env.REACT_APP_S3_URL_ImageUpload}/${likeScene.image}`}
          alt={likeScene.image}
        />
      </div>
    </div>
  );
}

export default LikeScene;
