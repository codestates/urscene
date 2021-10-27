import React from "react";

function MainFooter() {
  return (
    <div className="mF-container">
      <div className="mainFooter">
        <div className="footer-wrap">
          <div className="mF-footer-logo"></div>
          <div className="mF-UI-about">
            <div className="mF-UI-title">ABOUT US</div>
            <div className="mF-UI-text">Repository Wiki</div>
          </div>
          <div className="mF-contact">
            <div className="mF-UI-title">TEAM MEMBERS</div>
            <div className="mF-UI-text">Front</div>
            <div className="mF-contact-name">이상헌</div>
            <div className="mF-contact-name">임송하</div>
            <div className="mF-UI-text contact-back">Back</div>
            <div className="mF-contact-name">강석호</div>
            <div className="mF-contact-name">손연주</div>
          </div>
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
