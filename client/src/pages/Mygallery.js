import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MainNav from "../components/MainNav";
import LikeScene from "../components/LikeScene";
import LikeGallery from "../components/LikeGallery";
import MadeGallery from "../components/MadeGallery";
import MadeScene from "../components/MadeScene";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import { MyContext } from "../contexts/Store";
import axios from "axios";
axios.defaults.withCredentials = true;

function Mygallery() {
  const { userInfo } = useContext(MyContext); // 유저 정보를 확인
  console.log("MyContext 에서 받아온 userInfo ??? ", userInfo);
  const [isLikeSceneClicked, setIsLikeSceneClicked] = useState(false);
  const [isLikeGalleryClicked, setIsLikeGalleryClicked] = useState(false);
  const [haveScenes, setHaveScenes] = useState(true);
  const [haveGallery, setHaveGallery] = useState(true);
  const [haveLikeScene, setHaveLikeScene] = useState(true);
  const [haveLikeGallery, setHaveLikeGallery] = useState(true);
  // 좋아한 장면 펼치기
  const ClickLikeScene = () => {
    setIsLikeSceneClicked(!isLikeSceneClicked);
  };

  // 좋아한 갤러리 펼치기
  const ClickLikeGallery = () => {
    setIsLikeGalleryClicked(!isLikeGalleryClicked);
  };

  // TODO: 내가 만든 장면들, 싱글포스트 가져오기
  const getMadeScene = () => {
    axios
      .get("http://localhost:80/singlepost")
      .then((res) => {
        console.log("post res ???", res);
      })
      .catch((err) => {
        console.error("err message =>", err);
      });
  };

  // TODO: 내가 만든 갤러리 리스트 가져오기
  const getMadeGallery = () => {
    axios
      .get("http://localhost:80/????")
      .then((res) => {
        console.log("gallery res???", res);
      })
      .catch((err) => {
        console.error("err message =>", err);
      });
  };

  useEffect(() => {
    getMadeScene();
    getMadeGallery();
  }, []);

  return (
    <div>
      <MainNav />
      <div className="my-g-container">
        <div className="my-g-wrap">
          <div className="my-g-title">마이갤러리</div>
          <div className="my-g-user-wrap">
            <div className="my-g-account-icon"></div>
            {/* 회원정보 수정하기로 이동 */}
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
            {haveScenes ? (
              <MadeScene />
            ) : (
              <div className="no-results-wrap">
                <center>
                  <div className="no-results-icon"></div>
                  <div className="no-results-text">장면을 추가해 주세요.</div>
                </center>
              </div>
            )}
          </div>
          <div className="my-g-scene-wrap">
            <div className="my-g-sub-title">갤러리 리스트</div>
            <div className="my-g-add-list-wrap">
              <Link to="/makegallery">
                <div className="my-g-add-text">리스트추가</div>
              </Link>
              <div className="my-g-add-icon"></div>
            </div>
            {haveGallery ? (
              <MadeGallery />
            ) : (
              <div className="no-results-wrap">
                <center>
                  <div className="no-results-icon"></div>
                  <div className="no-results-text">리스트를 추가해 주세요.</div>
                </center>
              </div>
            )}
          </div>
          {/* 좋아한 장면, 좋아한 갤러리 부분 */}
          <div className="my-g-like-hr"></div>
          <div
            className={
              isLikeSceneClicked ? "my-g-like-minus-icon" : "my-g-like-add-icon"
            }
          ></div>
          <div onClick={ClickLikeScene} className="my-g-like-title">
            좋아한 장면
          </div>
          {isLikeSceneClicked ? (
            haveLikeScene ? (
              <LikeScene />
            ) : (
              <div>장면이 없습니다.</div>
            )
          ) : null}
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
          {isLikeGalleryClicked ? (
            haveLikeGallery ? (
              <LikeGallery />
            ) : (
              <div>갤러리가 없습니다.</div>
            )
          ) : null}
          <div className="my-g-like-hr"></div>
        </div>
      </div>
      <MainFooter></MainFooter>
      <TopButton></TopButton>
    </div>
  );
}

export default Mygallery;
