import React from "react";
import { Link } from "react-router-dom";

function MainFooter() {
  return (
    <div className="mF-container">
      <div className="mainFooter">
        <div className="footer-wrap">
          <Link to="/">
            <div className="mF-footer-logo"></div>
          </Link>
          <div className="mF-UI-about">
            <div className="mF-UI-title">ABOUT US</div>
            <div className="mF-UI-text">Repository Wiki</div>
          </div>
          <div className="mF-contact">
            <div className="mF-UI-title">TEAM MEMBERS</div>
            <div className="contact-front">
              <div className="mF-UI-text">Front</div>
              <a
                href="https://github.com/LeeSangHeon86/urscene"
                target="_blank"
                className="mF-contact-name"
                rel="noreferrer"
              >
                이상헌
              </a>
              <a
                href="https://github.com/dddtttt000/urscene"
                target="_blank"
                className="mF-contact-name"
                rel="noreferrer"
              >
                임송하
              </a>
            </div>
            <div className="contact-back">
              <div className="mF-UI-text"> Back </div>

              <a
                href="https://github.com/kangseokho/urscene"
                target="_blank"
                className="mF-contact-name"
                rel="noreferrer"
              >
                강석호
              </a>
              <a
                href="https://github.com/usreon/urscene"
                target="_blank"
                className="mF-contact-name"
                rel="noreferrer"
              >
                손연주
              </a>
            </div>
          </div>
        </div>
        <div className="mf-divider-wrap">
          <div className="mf-divider"></div>
          <div className="mF-footer2">
            © 2021 너의 장면은 | All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFooter;
