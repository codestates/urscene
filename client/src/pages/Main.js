import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import BestGallery from "../components/BestGallery";
import GenreScene from "../components/GenreScene";
import mainGenre from "../components/dummy/mainGenre";
import axios from "axios";
import { useHistory } from "react-router";
require("dotenv").config();

function Main() {
  const history = useHistory();

  // 인기 갤러리 코드 : 시작
  const [rankingGallerys, setRankingGallerys] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [galleryPerPage] = useState(3);
  const [galleryIcon] = useState([1, 2, 3]);

  const handleLandingPage = () => {
    axios.get(process.env.REACT_APP_EC2_URL + "/main").then((res) => {
      setRankingGallerys(res.data.Ranking_gallery);
      setCurrentRankingGallery(res.data.Ranking_gallery.slice(0, 3));
    });
  };

  const [currentRankingGallery, setCurrentRankingGallery] = useState([]);

  function handleCurrentRankingGallery() {
    const indexOfLast = currentPage * galleryPerPage;
    const indexOfFirst = indexOfLast - galleryPerPage;
    setCurrentRankingGallery(rankingGallerys.slice(indexOfFirst, indexOfLast));
  }

  const handleArrowLeft = () => {
    if (currentPage === 1) {
      setCurrentPage(3);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleArrowRight = () => {
    if (currentPage === 3) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    handleLandingPage();
  }, []);

  useEffect(() => {
    handleCurrentRankingGallery();
  }, [currentPage]);

  // 인기 갤러리 코드 : 끝

  // 장르별 장면 코드 : 시작
  const genres = [
    "로맨스",
    "코미디",
    "SF/판타지",
    "액션",
    "미스터리/스릴러",
    "전쟁",
  ];
  const [curGenre, setCurGenre] = useState(genres[0]);
  const [previousGenre, setPreviousGenre] = useState("");
  const [curScenes, setCurSenes] = useState([]);

  const [curScenePage, setCurScenePage] = useState(4);
  const [scenePerPage] = useState(4);

  const [addSceneIcon, setAddSceneIcon] = useState(false);

  const changeCurGenre = (e) => {
    setCurScenePage(4);
    setAddSceneIcon(false);
    setPreviousGenre(curGenre);
    setCurGenre(e.target.innerText);
  };

  const handleCurrentScene = () => {
    axios
      .get(
        `${process.env.REACT_APP_EC2_URL}/main/single/?genre=${curGenre}&page=1&limit=${scenePerPage}`,
      )
      .then((res) => {
        setCurSenes(res.data.single);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleCurrentScene();
  }, [curGenre]);

  const handleAddCurrentScene = () => {
    setCurScenePage(curScenePage + scenePerPage);
    axios
      .get(
        `${process.env.REACT_APP_EC2_URL}/main/single/?genre=${curGenre}&page=${curScenePage}&limit=${scenePerPage}`,
      )
      .then((res) => {
        if (res.data.single.length === 0) {
          setAddSceneIcon(true);
        } else {
          setCurSenes([...curScenes, ...res.data.single]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="main-back">
        <MainNav />
        <div className="main-wrap">
          <div className="main-gallery">
            <div
              className="main-text"
              onClick={() => {
                history.push("/gallery/1");
              }}
            >
              인기 갤러리
            </div>
            <div className="main-gallery-wrap">
              <div
                className="main-gallery-Arrowleft"
                onClick={handleArrowLeft}
              ></div>
              <div> </div>
              {currentRankingGallery.map((gallery, idx) => {
                return <BestGallery key={idx} gallery={gallery} />;
              })}
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
                      currentPage === idx + 1
                        ? "main-gallery-numSelect"
                        : "main-gallery-numNoSelect"
                    }
                    onClick={() => setCurrentPage(idx + 1)}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="main-genre">
            <div className="main-text">장르별 장면</div>
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
                <div onClick={handleAddCurrentScene}>
                  <div className="main-genre-img-addText">더 보기</div>
                  <div className="main-genre-img-addImage"></div>
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
