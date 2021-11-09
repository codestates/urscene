import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import BestGallery from "../components/BestGallery";
import GenreScene from "../components/GenreScene";
import LoadingIndicator from "../components/LoadingIndicator";
import mainAPI from "../api/mainAPI";
require("dotenv").config();

function Main() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  // 인기 갤러리 코드 : 시작
  const [rankingGallerys, setRankingGallerys] = useState([]);
  const [currentRankingGallery, setCurrentRankingGallery] = useState([]);
  const [galleryIcon] = useState([1, 2, 3]);
  const currentPage = useRef(1);
  const galleryPerPage = useRef(3);

  const handleLandingPage = async () => {
    try {
      const result = await mainAPI.rangking();
      setRankingGallerys(result);
      setCurrentRankingGallery(result.slice(0, 3));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  function handleCurrentRankingGallery() {
    const indexOfLast = currentPage.current * galleryPerPage.current;
    const indexOfFirst = indexOfLast - galleryPerPage.current;
    setCurrentRankingGallery(rankingGallerys.slice(indexOfFirst, indexOfLast));
  }

  const handleArrowLeft = () => {
    if (currentPage.current === 1) {
      currentPage.current = 3;
    } else {
      currentPage.current -= 1;
    }
    handleCurrentRankingGallery();
  };

  const handleArrowRight = () => {
    if (currentPage.current === 3) {
      currentPage.current = 1;
    } else {
      currentPage.current += 1;
    }
    handleCurrentRankingGallery();
  };

  useEffect(() => {
    handleLandingPage();
  }, []);
  // 인기 갤러리 코드 : 끝

  // 장르별 장면 코드 : 시작
  const genres = [
    "로맨스",
    "코미디",
    "SF/판타지",
    "액션",
    "미스터리/스릴러",
    "전쟁",
    "애니메이션",
  ];
  const curGenre = useRef("로맨스");
  const [curScenes, setCurScenes] = useState([]);
  const curScenePage = useRef(1);
  const scenePerPage = useRef(4);
  const [addSceneIcon, setAddSceneIcon] = useState(false);

  const handleCurrentScene = async () => {
    try {
      const genreScene = await mainAPI.genre(
        curGenre.current,
        curScenePage.current,
        scenePerPage.current,
      );
      if (genreScene.length !== 4) {
        setAddSceneIcon(true);
      }
      setCurScenes([...curScenes, ...genreScene]);
      curScenePage.current += scenePerPage.current;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const changeCurGenre = (e) => {
    curScenePage.current = 1;
    curGenre.current = e.target.innerText;
    setCurScenes([]);
    setAddSceneIcon(false);
  };

  useEffect(() => {
    handleCurrentScene();
  }, [curGenre.current]);

  return (
    <div>
      <div className="main-back">
        <MainNav />
        <div className="main-wrap">
          <div className="main-gallery">
            <div className="main-text">인기 갤러리</div>
            <Link to="/allgallery">
              <div className="main-gallery-all">모든 갤러리 보기</div>
            </Link>
            <div className="main-gallery-wrap">
              <div
                className="main-gallery-Arrowleft"
                onClick={handleArrowLeft}
              ></div>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                currentRankingGallery.map((gallery, idx) => {
                  return <BestGallery key={idx} gallery={gallery} />;
                })
              )}
              <div
                className="main-gallery-Arrowright"
                onClick={handleArrowRight}
              ></div>
            </div>
            <div className="main-gallery-page">
              {galleryIcon.map((ele, idx) => {
                return (
                  <div
                    key={idx}
                    className={
                      currentPage.current === idx + 1
                        ? "main-gallery-numSelect"
                        : "main-gallery-numNoSelect"
                    }
                    // onClick={() => setCurrentPage(idx + 1)}
                    onClick={() => (currentPage.current = idx + 1)}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="main-genre">
            <div className="main-text">장르별 장면</div>
            <Link to="/allscenes">
              <div className="main-text-all">모든 장면 보기</div>
            </Link>
            <div className="main-genre-category-wrap">
              {genres.map((el) => {
                return (
                  <div
                    onClick={changeCurGenre}
                    className={
                      curGenre === el
                        ? "main-genre-name-selected"
                        : "main-genre-name"
                    }
                    key={el}
                  >
                    {el}
                  </div>
                );
              })}
              <div className="main-genre-img-wrap">
                {curScenes.map((curScene, idx) => {
                  return (
                    <GenreScene
                      key={idx}
                      value={curScene}
                      onClick={() => {
                        history.push(`/post/${idx}`);
                      }}
                    />
                  );
                })}
              </div>
              {addSceneIcon ? null : (
                <div onClick={handleCurrentScene}>
                  <div className="addtext-wrap">
                    <div className="main-genre-img-addText">더 보기</div>
                    <div className="main-genre-img-addImage"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <TopButton />
      <MainFooter />
    </div>
  );
}

export default Main;
