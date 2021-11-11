import React, { useContext } from "react";
import { useHistory } from "react-router";
import { MyContext } from "../contexts/Store";

function TopButton() {
  const { isLogin } = useContext(MyContext);

  const moveToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  const handleUserButton = (e) => {
    if (isLogin === false) {
      history.push("/login");
    } else {
      history.push("/mygallery");
    }
  };

  const handlePostButton = (e) => {
    if (isLogin === false) {
      history.push("/login");
    } else {
      history.push("/makepost");
    }
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
      <div className="addbutton" onClick={(e) => handlePostButton(e)}>
        <div />
      </div>
      <div className="userbutton" onClick={(e) => handleUserButton(e)}>
        <div />
      </div>
    </div>
  );
}

export default TopButton;
