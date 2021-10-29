import React from "react";

function Dropdown({ options, handleDropDownClick }) {
  return (
    <ul className="MP-movie-DropDownContainer">
      {options.map((option, idx) => {
        return (
          <li key={idx} onClick={() => handleDropDownClick(option)}>
            {option}
          </li>
        );
      })}
      <li>원하시는 결과가 없을 경우 단어를 추가해주세요.</li>
    </ul>
  );
}

export default Dropdown;
