import React from "react";
import { useHistory } from "react-router";

function TopButton() {
  const moveToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  const history = useHistory();

  return (
    <div>
      <div className="backbutton" onClick={() => history.goBack()}>
        <div />
      </div>
      <div className="topbutton" onClick={moveToTop}>
        <div />
      </div>
      <div className="homebutton" onClick={() => history.push("/main")}>
        <div />
      </div>
      <div className="addbutton" onClick={() => history.push("/makepost")}>
        <div />
      </div>
      <div className="userbutton" onClick={() => history.push("/mygallery")}>
        <div />
      </div>
    </div>
  );
}

export default TopButton;
