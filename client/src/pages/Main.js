import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import MainFooter from "../components/MainFooter";
import TopButton from "../components/TopButton";
import BestGallery from "../components/BestGallery";
import GenreScene from "../components/GenreScene";
import mainGenre from "../components/dummy/mainGenre";
import axios from "axios";
require("dotenv").config();

let dummyData = {
  Ranking_gallery: [
    {
      id: 2,
      title: "너무 오싹한이야기들..",
      content: "여름에 너무추웠어요",
      image: [
        {
          image: "헠.jpg",
        },
        {
          image: "기름뜨겁.jpg",
        },
      ],
    },
    {
      id: 1,
      title: "너무행복한 장면들",
      content: "정말 재미있었던 장면들만",
      image: [
        {
          image: "내 장면.jpg",
        },
        {
          image: "귀요미.jpg",
        },
        {
          image: "돈잃으면 속쓰린법.jpg",
        },
      ],
    },
    {
      id: 3,
      title: "전쟁터의 잔혹함",
      content: "실제로 전쟁이나면 진짜 무서울듯",
      image: [
        {
          image: "제가슴만봐요.jpg",
        },
        {
          image: "무서워 이러다 다 주글꺼야.jpg",
        },
      ],
    },
    {
      id: 4,
      title: "진짜 배꼽빠지게웃긴",
      content: "눈물이 났어요...웃겨서",
      image: [
        {
          image: "뭐라도해야지 두두두.jpg",
        },
      ],
    },
  ],
};

function Main() {
  // 인기 갤러리 코드 : 시작
  const [rankingGallerys, setRankingGallerys] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [galleryPerPage] = useState(3);
  const [galleryIcon] = useState([1, 2, 3]);

  const handleLandingPage = () => {
    axios.get(process.env.REACT_APP_EC2_URL + "main").then((res) => {
      // console.log("인기갤러리 자료를 받아옵니다. ");
      // console.log(res.data.Ranking_gallery);
      setRankingGallerys(res.data.Ranking_gallery);
      setCurrentRankingGallery(res.data.Ranking_gallery.slice(0, 3));
    });
  };

  const [currentRankingGallery, setCurrentRankingGallery] = useState([]);

  function handleCurrentRankingGallery() {
    // console.log("인기 갤러리 페이지네이션 함수 시작");
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
        `${process.env.REACT_APP_EC2_URL}main/single/?genre=${curGenre}&page=1&limit=${scenePerPage}`,
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
        `${process.env.REACT_APP_EC2_URL}main/single/?genre=${curGenre}&page=${curScenePage}&limit=${scenePerPage}`,
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
            <div className="main-text">인기 갤러리</div>
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
                  return <GenreScene key={idx} value={curScene} />;
                })}
              </div>
              {addSceneIcon ? (
                <div className="main-genre-img-noadd">영화가 없습니다.</div>
              ) : (
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
