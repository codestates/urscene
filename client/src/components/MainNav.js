import React, { useState } from "react";
import { Link } from "react-router-dom";

function MainNav() {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  const handleSearch = () => {
    console.log("???", searchText);
  };

  return (
    <div className="mainNav">
      <Link to="/">
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
            ></input>
          </div>
        </form>
      </div>{" "}
      <Link to="/makepost">
        <div className="mainNav-icon">
          <div className="mainNav-create"></div>
        </div>
      </Link>
      <Link to="/mygallery">
        <div className="mainNav-icon">
          <div className="mainNav-my"></div>
        </div>
      </Link>
    </div>
  );
}

export default MainNav;
