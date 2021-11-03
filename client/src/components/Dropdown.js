import React from "react";

function Dropdown({ options, handleDropDownClick }) {
  console.log("options===", options);
  return (
    <ul className="MP-movie-DropDownContainer">
      {options.map((movie) => {
        return (
          <li key={movie.id} onClick={() => handleDropDownClick(movie.title)}>
            {movie.title} ({movie.genre})
          </li>
        );
      })}
      <li>원하시는 결과가 없을 경우 단어를 추가해주세요.</li>
    </ul>
  );
}

export default Dropdown;
