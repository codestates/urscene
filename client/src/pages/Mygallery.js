import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainNav from "../components/MainNav";

function Mygallery() {
  const [isLikeSceneClicked, setIsLikeSceneClicked] = useState(false);
  const [isLikeGalleryClicked, setIsLikeGalleryClicked] = useState(false);

  // 좋아한 장면 펼치기
  const ClickLikeScene = () => {
    setIsLikeSceneClicked(!isLikeSceneClicked);
  };

  // 좋아한 갤러리 펼치기
  const ClickLikeGallery = () => {
    setIsLikeGalleryClicked(!isLikeGalleryClicked);
  };

  return (
    <div>
      <MainNav />
      <div className="MP-container">
        <div className="my-g-wrap">
          <div className="my-g-title">마이갤러리</div>
          <div className="my-g-user-wrap">
            <div className="my-g-account-icon"></div>
            <Link to="/userinfo">
              <div className="my-g-account-name">dddtttt000</div>
            </Link>
          </div>
          <div className="my-g-hr"></div>
          <div className="my-g-scene-wrap">
            <div className="my-g-sub-title">나의 장면들</div>

            <div className="my-g-add-wrap">
              <Link to="/makepost">
                <div className="my-g-add-text">장면추가</div>
              </Link>
              <div className="my-g-add-icon"></div>
            </div>
            {/* 장면들이 없는 경우 */}
            <div className="no-results-wrap">
              <center>
                <div className="no-results-icon"></div>
                <div className="no-results-text">장면을 추가해 주세요.</div>
              </center>
            </div>
          </div>
          <div className="my-g-scene-wrap">
            <div className="my-g-sub-title">갤러리 리스트</div>
            <div className="my-g-add-list-wrap">
              <Link to="/makegallery">
                <div className="my-g-add-text">리스트추가</div>
              </Link>
              <div className="my-g-add-icon"></div>
            </div>
            {/* 갤러리 리스트가 없는 경우 */}
            <div className="no-results-wrap">
              <center>
                <div className="no-results-icon"></div>
                <div className="no-results-text">리스트를 추가해 주세요.</div>
              </center>
            </div>
          </div>
          <div className="my-g-like-hr"></div>
          <div
            className={
              isLikeSceneClicked ? "my-g-like-minus-icon" : "my-g-like-add-icon"
            }
          ></div>
          <div onClick={ClickLikeScene} className="my-g-like-title">
            좋아한 장면
          </div>
          <div className="my-g-like-hr"></div>
          <div
            className={
              isLikeGalleryClicked
                ? "my-g-like-minus-icon"
                : "my-g-like-add-icon"
            }
          ></div>
          <div onClick={ClickLikeGallery} className="my-g-like-title">
            좋아한 갤러리
          </div>
          <div className="my-g-like-hr"></div>
        </div>
      </div>
    </div>
  );
}

export default Mygallery;
