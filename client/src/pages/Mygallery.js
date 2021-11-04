import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../contexts/Store";
import { Link } from "react-router-dom";
import MainNav from "../components/MainNav";
import LikeScene from "../components/LikeScene";
import LikeGallery from "../components/LikeGallery";
import MadeGallery from "../components/MadeGallery";
import MadeScene from "../components/MadeScene";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import axios from "axios";
require("dotenv").config();
axios.defaults.withCredentials = true;

function Mygallery() {
  const { userInfo, isLogin } = useContext(MyContext); // 유저 정보를 확인
  const [isLikeSceneClicked, setIsLikeSceneClicked] = useState(false);
  const [isLikeGalleryClicked, setIsLikeGalleryClicked] = useState(false);
  const [haveScenes, setHaveScenes] = useState([]);
  const [haveGallery, setHaveGallery] = useState([]);
  const [haveLikeScene, setHaveLikeScene] = useState([]);
  const [haveLikeGallery, setHaveLikeGallery] = useState([]);
  const [reRender, setReRender] = useState(false);

  console.log("reRender===", reRender);
  // 페이지 리 랜더링용
  const handleRender = () => {
    setReRender(!reRender);
  };

  // 좋아한 장면 펼치기
  const ClickLikeScene = () => {
    setIsLikeSceneClicked(!isLikeSceneClicked);
  };

  // 좋아한 갤러리 펼치기
  const ClickLikeGallery = () => {
    setIsLikeGalleryClicked(!isLikeGalleryClicked);
  };

  // 갤러리, 싱글포스트, 좋아한 갤러리, 좋아한 장면 불러오기
  // const getAllGallery = () => {
  //   axios
  //     .get("http://localhost:80/gallery")
  //     .then((res) => {
  //       console.log("post res ???", res);
  //       setHaveScenes(res.data.singlepost);
  //       setHaveGallery(res.data.gallery);
  //       setHaveLikeScene(res.data.liked_singlepost);
  //       setHaveLikeGallery(res.data.liked_gallery);
  //     })
  //     .catch((err) => {
  //       console.error("singlepost err message =>", err);
  //       setHaveScenes(false);
  //       setHaveGallery(false);
  //       setHaveLikeScene(false);
  //       setHaveLikeGallery(false);
  //     });
  // };

  // 나의 장면 불러오기
  const getAllMyScene = () => {
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/user/singlepost`)
      .then((res) => {
        setHaveScenes(res.data.my);
      });
  };

  // 나의 갤러리 불러오기
  const getAllMyGallery = () => {
    axios
      .get(`${process.env.REACT_APP_EC2_URL}/user/gallerypost`)
      .then((res) => {
        setHaveGallery(res.data.my);
      });
  };

  useEffect(() => {
    getAllMyScene();
    getAllMyGallery();
  }, [reRender]);

  return (
    <div>
      <MainNav />
      <div className="my-g-container">
        <div className="my-g-wrap">
          <div className="my-g-title-wrap">
            <div className="my-g-title">마이갤러리</div>
            <div className="my-g-user-wrap">
              <div className="my-g-account-icon"></div>
              {/* 회원정보 수정하기로 이동 */}
              <Link to="/userinfo">
                <div className="my-g-account-name">{userInfo.nickname}</div>
              </Link>
            </div>
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
              <div className="made-scene-wrap">
                {haveScenes.map((scene) => {
                  return (
                    <MadeScene
                      key={scene.id}
                      scene={scene}
                      haveGallery={haveGallery}
                      handleRender={handleRender}
                    />
                  );
                })}
              </div>
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
              <div className="like-gallery-container">
                {haveGallery.map((gallery) => {
                  return <MadeGallery key={gallery.id} gallery={gallery} />;
                })}
              </div>
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
              <div className="my-g-like-no">장면이 없습니다.</div>
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
              <div className="my-g-like-no">갤러리가 없습니다.</div>
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
