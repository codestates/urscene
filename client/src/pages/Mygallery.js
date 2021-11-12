/*eslint-disable*/
import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../contexts/Store";
import { Link } from "react-router-dom";
import MainNav from "../components/MainNav";
import LikeScene from "../components/LikeScene";
import LikeGallery from "../components/LikeGallery";
import ResultGallery from "../components/ResultGallery";
import MadeScene from "../components/MadeScene";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import sceneAPI from "../api/sceneAPI";
import galleryAPI from "../api/galleryAPI";
require("dotenv").config();

function Mygallery() {
  const { userInfo } = useContext(MyContext); // 유저 정보를 확인
  const [isLikeSceneClicked, setIsLikeSceneClicked] = useState(false);
  const [isLikeGalleryClicked, setIsLikeGalleryClicked] = useState(false);

  const [haveScenes, setHaveScenes] = useState([]);
  const [renderScenes, setRenderScenes] = useState([]);
  const [currentPageScene, setCurrentPageScene] = useState(1);
  const [scenePerPage] = useState(4);
  const [addSceneIcon, setAddSceneIcon] = useState(false);

  // 좋아한 장면 펼치기
  const ClickLikeScene = () => {
    setIsLikeSceneClicked(!isLikeSceneClicked);
  };

  // 좋아한 갤러리 펼치기
  const ClickLikeGallery = () => {
    setIsLikeGalleryClicked(!isLikeGalleryClicked);
  };

  // 나의 장면 불러오기
  const getAllMyScene = async () => {
    try {
      const result = await sceneAPI.user();
      setHaveScenes(result);
      setRenderScenes(result.slice(0, scenePerPage));
    } catch (err) {
      console.log(err);
    }
  };

  // 나의 장면 더보기
  const handleAddCurrentScene = () => {
    const indexOfLastScene = (currentPageScene + 1) * scenePerPage;
    const indexOfFirstScene = indexOfLastScene - scenePerPage;
    const addScenes = haveScenes.slice(indexOfFirstScene, indexOfLastScene);
    setRenderScenes([...renderScenes, ...addScenes]);

    if (addScenes.length !== 4) {
      setAddSceneIcon(true);
    }
    setCurrentPageScene(currentPageScene + 1);
  };

  const [haveGallery, setHaveGallery] = useState([]);
  const [renderGallery, setRenderGallery] = useState([]);
  const [currentPageGallery, setCurrentPageGallery] = useState(1);
  const [galleryPerPage] = useState(2);
  const [addGalleryIcon, setAddGalleryIcon] = useState(false);

  // 나의 갤러리 불러오기
  const getAllMyGallery = async () => {
    try {
      const result = await galleryAPI.user();
      setHaveGallery(result);
      setRenderGallery(result.slice(0, galleryPerPage));
    } catch (err) {
      console.log(err);
    }
  };

  // 나의 갤러리 더보기
  const handleAddCurrentGallery = () => {
    const indexOfLastGallery = (currentPageGallery + 1) * galleryPerPage;
    const indexOfFirstGallery = indexOfLastGallery - galleryPerPage;
    const addGallery = haveGallery.slice(
      indexOfFirstGallery,
      indexOfLastGallery,
    );
    setRenderGallery([...renderGallery, ...addGallery]);
    setCurrentPageGallery(currentPageGallery + 1);
    if (addGallery.length !== 2) {
      setAddGalleryIcon(true);
    }
  };

  const [haveLikeScenes, setHaveLikeScenes] = useState([]);
  const [renderLikeScenes, setRenderLikeScenes] = useState([]);
  const [currentPageLikeScene, setCurrentPageLikeScene] = useState(1);
  const [likeScenePerPage] = useState(4);
  const [addLikeSceneIcon, setAddLikeSceneIcon] = useState(false);

  // 내가 좋아요 한 전체 장면 불러오기
  const getAllMyLikeScene = async () => {
    try {
      const result = await sceneAPI.userLike();
      setHaveLikeScenes(result);
      setRenderLikeScenes(result.slice(0, likeScenePerPage));
    } catch {
      return;
    }
  };

  // 내가 좋아요 한 전체 장면 더보기
  const handleAddCurrentLikeScene = () => {
    const indexOfLastLikeScene = (currentPageLikeScene + 1) * likeScenePerPage;
    const indexOfFirstLikeScene = indexOfLastLikeScene - likeScenePerPage;
    const addLikeScenes = haveLikeScenes.slice(
      indexOfFirstLikeScene,
      indexOfLastLikeScene,
    );
    setRenderLikeScenes([...renderLikeScenes, ...addLikeScenes]);

    if (addLikeScenes.length !== 4) {
      setAddLikeSceneIcon(true);
    }
    setCurrentPageLikeScene(currentPageLikeScene + 1);
  };

  const [haveLikeGallerys, setHaveLikeGallerys] = useState([]);
  const [renderLikeGallerys, setRenderLikeGallerys] = useState([]);
  const [currentPageLikeGallery, setCurrentPageLikeGallery] = useState(1);
  const [likeGalleryPerPage] = useState(2);
  const [addLikeGalleryIcon, setAddLikeGalleryIcon] = useState(false);

  // 내가 좋아요 한 전체 갤러리 불러오기
  const getAllMyLikeGallery = async () => {
    try {
      const result = await galleryAPI.userLike();
      setHaveLikeGallerys(result);
      setRenderLikeGallerys(result.slice(0, likeGalleryPerPage));
    } catch (err) {
      console.log(err);
    }
  };
  // 내가 좋아요 한 전체 갤러리 더보기
  const handleAddCurrentLikeGallery = () => {
    const indexOfLastLikeGallery =
      (currentPageLikeGallery + 1) * likeGalleryPerPage;
    const indexOfFirstLikeGallery = indexOfLastLikeGallery - likeGalleryPerPage;
    const addLikeGallerys = haveLikeGallerys.slice(
      indexOfFirstLikeGallery,
      indexOfLastLikeGallery,
    );
    setRenderLikeGallerys([...renderLikeGallerys, ...addLikeGallerys]);

    if (addLikeGallerys.length !== 2) {
      setAddLikeGalleryIcon(true);
    }
    setCurrentPageLikeGallery(currentPageLikeGallery + 1);
  };

  useEffect(() => {
    getAllMyScene();
    getAllMyGallery();
    getAllMyLikeScene();
    getAllMyLikeGallery();
  }, []);

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
            {renderScenes.length !== 0 ? (
              <div>
                <div className="made-scene-wrap">
                  {renderScenes.map((scene) => {
                    return (
                      <MadeScene
                        key={scene.id}
                        scene={scene}
                        haveGallery={haveGallery}
                      />
                    );
                  })}
                </div>
                {addSceneIcon ? null : (
                  <div
                    onClick={() => {
                      handleAddCurrentScene();
                    }}
                  >
                    <div className="main-genre-img-addText">더 보기</div>
                    <div className="main-genre-img-addImage"></div>
                  </div>
                )}
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
            <div className="my-g-sub-title">나의 갤러리</div>
            <div className="my-g-add-list-wrap">
              <Link to="/makegallery">
                <div className="my-g-add-text">갤러리추가</div>
              </Link>
              <div className="my-g-add-icon"></div>
            </div>
            {renderGallery.length !== 0 ? (
              <div>
                <div className="like-gallery-container">
                  {renderGallery.map((gallery) => {
                    return <ResultGallery key={gallery.id} gallery={gallery} />;
                  })}
                </div>
                {addGalleryIcon ? null : (
                  <div
                    onClick={() => {
                      handleAddCurrentGallery();
                    }}
                  >
                    <div className="main-genre-img-addText">더 보기</div>
                    <div className="main-genre-img-addImage"></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-results-wrap">
                <center>
                  <div className="no-results-icon"></div>
                  <div className="no-results-text">갤러리를 추가해 주세요.</div>
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
            renderLikeScenes.length !== 0 ? (
              <div>
                <div className="like-scene-wrap">
                  {renderLikeScenes.map((likeScene) => {
                    return (
                      <LikeScene key={likeScene.id} likeScene={likeScene} />
                    );
                  })}
                </div>
                {addLikeSceneIcon ? null : (
                  <div
                    onClick={() => {
                      handleAddCurrentLikeScene();
                    }}
                  >
                    <div className="main-genre-img-addText">더 보기</div>
                    <div className="main-genre-img-addImage"></div>
                  </div>
                )}
              </div>
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
            renderLikeGallerys.length !== 0 ? (
              <div>
                <div className="like-scene-wrap">
                  {renderLikeGallerys.map((likeGallery) => {
                    return (
                      <LikeGallery
                        key={likeGallery.id}
                        likeGallery={likeGallery}
                      />
                    );
                  })}
                </div>
                {addLikeGalleryIcon ? null : (
                  <div
                    onClick={() => {
                      handleAddCurrentLikeGallery();
                    }}
                  >
                    <div className="main-genre-img-addText">더 보기</div>
                    <div className="main-genre-img-addImage"></div>
                  </div>
                )}
              </div>
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
