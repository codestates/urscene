import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../contexts/Store";
import { Link, useHistory } from "react-router-dom";

function MainNav() {
  const { isLogin } = useContext(MyContext); // 유저 정보를 확인
  //console.log("mainvav islogin ???", isLogin);
  //console.log("mainvav, userInfo ??? ", userInfo);

  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (searchText !== "") {
      history.push(`/search/${searchText}`);
    }
  };

  const handleMoveSearchPage = (e) => {
    if (e.key === "Enter" && searchText !== "") {
      history.push(`/search/${searchText}`);
    }
  };

  return (
    <div className="mainNav">
      <Link to="/main">
        <div className="mainNav-group-logo"></div>
      </Link>
      <div className="form-wrap">
        <form id="nav-form" onSubmit={(e) => e.preventDefault()}>
          <div className="mainNav-search-wrap">
            <div className="Lens"></div>
            <input
              className="mainNav-search"
              type="text"
              placeholder="눈, 비, 팽이, 인셉션"
              onChange={handleChange}
              value={searchText}
              onKeyPress={(e) => handleMoveSearchPage(e)}
            ></input>
            <div className="mainNav-btn" onClick={handleSearch}>
              검색
            </div>
          </div>
        </form>
      </div>
      <Link to={isLogin ? "/makepost" : "/login"}>
        <div className="mainNav-icon">
          <div className="mainNav-create"></div>
        </div>
      </Link>
      <Link to={isLogin ? "/mygallery" : "/login"}>
        <div className="mainNav-icon">
          <div className="mainNav-my"></div>
        </div>
      </Link>
    </div>
  );
}

export default MainNav;
