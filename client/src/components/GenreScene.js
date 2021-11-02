import React from "react";
import { useHistory } from "react-router";

function GenreScene({ value }) {
  const history = useHistory();
  return (
    <div>
      <div
        className="genre-img"
        onClick={() => {
          history.push(`/post/${value.id}`);
        }}
      >
        <img src={value.image} alt={value.title} />
      </div>
    </div>
  );
}

export default GenreScene;
