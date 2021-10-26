import React from "react";

function MainNav() {
  return (
    <div className="mainNav">
      <div className="mainNav-group-logo"></div>
      <div className="form-wrap">
        <form id="nav-form" onSubmit="">
          <div className="mainNav-search-wrap">
            <div className="Lens"></div>
            <input
              className="mainNav-search"
              type="text"
              placeholder="눈, 비, 팽이, 인셉션"
            ></input>
          </div>
        </form>
      </div>
      <div className="mainNav-icon">
        <div className="mainNav-create"></div>
      </div>
      <div className="mainNav-icon">
        <div className="mainNav-my"></div>
      </div>
    </div>
  );
}

export default MainNav;
