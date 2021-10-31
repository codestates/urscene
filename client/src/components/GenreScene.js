import React from "react";

function GenreScene({ value }) {
  return (
    <div>
      <div className="genre-img">
        <img src={value.image} alt={value.title} />
      </div>
    </div>
  );
}

export default GenreScene;
