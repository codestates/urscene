import React from "react";

function GenreScene({ value }) {
  //console.log("value genre ==>", value.genre);

  return (
    <div>
      <div className="genre-img">
        <img src={`${value.image}`} alt={value.title} />
      </div>
    </div>
  );
}

export default GenreScene;
