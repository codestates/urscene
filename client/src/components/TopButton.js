import React from "react";

function TopButton() {
  const moveToTop = () => {
    document.documentElement.scrollTop = 0;
  };
  return (
    <div>
      <div className="topbutton" onClick={moveToTop}>
        <div />
      </div>
    </div>
  );
}

export default TopButton;
