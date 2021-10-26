import React from "react";
import MainNav from "../components/MainNav";

function Main() {
  return (
    <div className="main-back">
      <MainNav />
      <center>
        <div className="main-wrap">
          <div className="main-gallery">
            <div className="main-text">인기 갤러리</div>
            <div className="main-gallery-wrap">
              갤러리 컴포넌트가 불러와진다.
            </div>
          </div>
          <div className="main-genre">
            <div className="main-text">장르별 장면</div>
            <ul className="main-genre-category-wrap">
              <li className="main-genre-name">로맨스</li>
              <li className="main-genre-name">코미디</li>
              <li className="main-genre-name">SF/판타지</li>
              <li className="main-genre-name">액션</li>
              <li className="main-genre-name">미스터리/스릴러</li>
              <li className="main-genre-name">전쟁</li>
              <div className="main-genre-img-wrap">
                장면 컴포넌트가 불러와진다.
              </div>
            </ul>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Main;
