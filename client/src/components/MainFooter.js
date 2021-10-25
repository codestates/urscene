import React from "react";

function MainFooter() {
  return (
    <div className="mainFooter">
      <div className="mF-UI">
        <div className="mF-UI-content">ABOUT US</div>
        <div className="mF-UI-group">
          <div className="mF-UI-group-content">Repository Wiki</div>
        </div>
      </div>
      <div className="mF-contact">
        <div className="mF-contact-title">TEAM MEMBERS</div>
        <div className="mF-contact-Front">
          <div className="mF-contact-Front-title">Front</div>
          <div className="mF-contact-Front-name1">이상헌</div>
          <div className="mF-contact-Front-name2">임송하</div>
        </div>
        <div className="mF-contact-Backtitle">Back</div>
        <div className="mF-contact-Backname1">강석호</div>
        <div className="mF-contact-Backname2">손연주</div>
      </div>
      <div className="mf-divider"></div>
      <div className="mF-footer1">
        <div className="mF-footer-logo"></div>
        <div className="mF-footer-title">너의 장면은</div>
      </div>
      <div className="mF-footer2">© 2021 너의 장면은 | All Rights Reserved</div>
    </div>
  );
}

export default MainFooter;
